import React from "react";
import { Button, TextField, Stack } from "@mui/material";
import Chip from "@mui/material/Chip";
import { Card, Divider } from "@material-ui/core";
import DraggableField from "../../../utils/DraggableComponents/DraggableField";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@mui/icons-material/Save';
import { makeAPIcall, makeGetAPIcall } from "../../../state-management/sagas/handlers/constants";
import axios from "axios";
import { generateSHA256Hash } from "../../../utils/miscellaneousFunctions";
const useStyles = makeStyles((theme) => ({
  parentContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dynamicFieldContainer: {
    display: "flex",
    flexDirection: "column",
    border: "dashed 1px black",
    height: "35vh",
    maxHeight: "35vh",
    overflow: "scroll",
    padding: "1vh",
  },
  actionFooter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropContainer: {
    display: "flex",
    flexDirection: "column",
    border: "dotted 0.15vw black",
    borderRadius: "0.2vw",
    height: "65vh",
    maxHeight: "65vh",
    padding: "5vh",
    width:"25vw",
    maxWidth:"25vw",
    overflow: "scroll",
  },
}));

function AdminOrderForm() {
  const classes = useStyles();
  const dragItem = React.useRef("");
  const dragOverItem = React.useRef("");
  const [fieldType, setFieldType] = React.useState("None");
  const [fieldName, setFieldName] = React.useState("");
  const [displayText, setDisplayText] = React.useState("");
  const [itemValue,setItemValue]= React.useState({});
  const [fieldNameHasError, setFieldNameHasError] = React.useState({
    validFieldName: true,
    validDisplayName: true,
  });
  const [currentFields, setCurrentFields] = React.useState(new Map());
  const [droppedItems, setDroppedItems] = React.useState(new Map());
  const [pollingHashForDroppedItems,setPollingHashForDroppedItems] = React.useState(""); 

  const saveItems = async (droppedItems) => {
    try {
     axios.post('http://localhost:8081/api/polling/saveOrderFormFields',Array.from(droppedItems))
    } catch (error) {
      console.error("Error saving items:", error);
    }
  };

  // Function to handle polling
  const pollItems = async () => {
    try {
      const response = makeGetAPIcall('http://localhost:8081/api/polling/getOrderFormFields');
      if (response) {
       response.then(item=>{
        if (item?.status==200) {
          setDroppedItems((prevItems) => {
            const updatedItems = new Map(prevItems); // Create a copy to avoid mutating the original state
            mergeMapsOptimized(updatedItems, new Map(item?.data)); // Merge currentFields into the copy
            return updatedItems; // Return the updated map
          });
        }return null;
      })
    }
    } catch (error) {
      console.error("Error polling items:", error);
    }
  };

   // Initial loading and polling setup
   React.useEffect(() => {
    pollItems(); // Poll immediately on component load
    const pollInterval = setInterval(pollItems, 10000); // Poll every 10 seconds
    return () => clearInterval(pollInterval);
  }, []);

  React.useEffect(()=>{
    console.log("sapii",pollingHashForDroppedItems)
    saveItems(droppedItems)
  },[pollingHashForDroppedItems])


  const [fieldTypes, setFieldTypes] = React.useState([
    { key: "number", value: "Number" },
    { key: "string", value: "String" },
    { key: "dropdown", value: "Drop Down" },
    { key: "datefield", value: "Date Field" }
  ]);

  // Memoizing field types to avoid recalculating every render
  const memoizedFieldTypes = React.useMemo(
    () => [
      { key: "number", value: "Number" },
      { key: "string", value: "String" },
      { key: "dropdown", value: "Drop Down" },
      { key: "datefield", value: "Date Field" }
    ],
    []
  );


  const createBtnDisabled = (fieldName, fieldType, displayText) => {
    return !(fieldName && fieldType && displayText && !droppedItems.get(fieldName));  
  };

  const editBtnDisabled = (fieldName, fieldType, displayText) => {
    return !(droppedItems.get(fieldName));
  };

  const cancelBtnDisabled = (fieldName, fieldType, displayText) => {
    return !(
      !createBtnDisabled(fieldName, fieldType, displayText) ||
      !editBtnDisabled(fieldName, fieldType, displayText)
    );
  };

  const validateInput = React.useCallback((value) => {
    return value.match(/\s/);
  }, []);

  const handleFieldTypeChange = React.useCallback(
    (e) => {
      setFieldType(e);
      const updatedFieldTypes = memoizedFieldTypes.map((item) => {
        return item.key === e
          ? {
              ...item,
              variant: item.variant === "contained" ? "outlined" : "contained",
            }
          : item;
      });
      setFieldTypes(updatedFieldTypes);
    },
    [memoizedFieldTypes]
  );

  const handleFieldNameChange = (event) => {
    const value = event?.target?.value?.trim(); // Trim input value right away
    const hasError = validateInput(value);
  
    setFieldName(value); // Update fieldName
  
    // Define a common function to handle dropped and current fields
    const handleFieldClickIfExists = (map) => {
      const field = map.get(value);
      if (field) {
        handleDraggablefieldClick(value, {
          displayText: field?.displayText,
          fieldType: field?.fieldType,
        });
      }
    };
  
    // Check for the field in both maps
    handleFieldClickIfExists(droppedItems);
    handleFieldClickIfExists(currentFields);
  
    // Update field name error state
    setFieldNameHasError((prev) => ({ ...prev, validFieldName: hasError }));
  };
  

  const handleDisplayTextChange = React.useCallback((event) => {
    const value = event?.target?.value;
    const hasError = value.length < 3;
    setDisplayText(value);
    setFieldNameHasError((prev) => ({ ...prev, validDisplayName: hasError }));
  }, []);

  const handleFieldDelete = (key) => {
    setDroppedItems((prevDroppedItems) => {
      const updatedDroppedItems = new Map(prevDroppedItems);
      updatedDroppedItems.delete(key);

      // Update both droppedItems and currentFields at the same time
      setCurrentFields((prevCurrentFields) => {
        const updatedCurrentFields = new Map(prevCurrentFields);
        updatedCurrentFields.delete(key);
        return updatedCurrentFields;
      });

      return updatedDroppedItems;
    });
    generateSHA256Hash(new Date()).then(e=>setPollingHashForDroppedItems(e));
    setFieldName("");
    setDisplayText("");
    setFieldType("");
    handleFieldTypeChange("")

  };
  const handleDragEnd = (e, dragItem, dragOverItem) => {
    // Get the current items in the Map
    droppedItems.get(dragItem.current);
    droppedItems.get(dragOverItem.current);

    // Convert Map to an array to allow swapping
    let swappableArr = Array.from(droppedItems);

    // Find the index of the dragItem and dragOverItem in the array
    let dragItemIndex = swappableArr.findIndex(item => item[0] === dragItem.current);
    let dragOverItemIndex = swappableArr.findIndex(item => item[0] === dragOverItem.current);

    // Swap the items in the array using array destructuring
    [swappableArr[dragItemIndex], swappableArr[dragOverItemIndex]] = [swappableArr[dragOverItemIndex], swappableArr[dragItemIndex]];
    setDroppedItems(new Map(swappableArr));
    generateSHA256Hash(new Date()).then(e=>setPollingHashForDroppedItems(e));
}
const [isDroppedFieldActive,setIsDroppedFieldActive] = React.useState(false);

const handleDraggablefieldClick= (key,value)=>{
    setIsDroppedFieldActive(true)
    setFieldName(key)
    setDisplayText(value?.displayText)
    handleFieldTypeChange(value?.fieldType)
    setItemValue(value)
}

  // Helper function to add or update field in a given map
  const updateFieldInMap = (map, key, value) => {
    const updatedMap = new Map(map);
    updatedMap.set(key, value);
    return updatedMap;
  };
// Memoizing field creation function
const handleFieldOperation = React.useCallback(
  (actionType) => {
    const resetFields = () => {
      setFieldName("");
      setDisplayText("");
      setFieldTypes(memoizedFieldTypes);
    };

    switch (actionType) {
      case "create":
        // Optimized split and trim process with filtering to ignore empty items
        let fieldNameArr = fieldName.split(",").map(item => item.trim()).filter(Boolean);  // O(n)
        let displayTextArr = displayText.split(",").map(item => item.trim()).filter(Boolean);  // O(n)
        // Apply the same displayText to all fieldNames if only one displayText exists
        if (fieldNameArr.length > 1 && displayTextArr.length === 1) {
          displayTextArr = new Array(fieldNameArr.length).fill(displayTextArr[0]);  // O(m) where m = fieldNameArr.length
        }
        // Check that fieldNameArr and displayTextArr lengths match
        if (fieldNameArr.length === displayTextArr.length) {
          setCurrentFields((prevFields) => {
            let updatedFields = new Map(prevFields);  // Copy the previous map (O(1) for shallow copy)
            
            // Insert fields in one pass (O(n))
            for (let i = 0; i < fieldNameArr.length; i++) {
              updatedFields = updateFieldInMap(updatedFields, fieldNameArr[i], { fieldType, displayText: displayTextArr[i] });
            }
            return updatedFields;
          });
        } else {
          alert("Field name and display text arrays do not match in length.");
        }
        // Reset fields after the update
        resetFields();
        break;
      case "edit":
        setDroppedItems((prevFields) =>{ 
          generateSHA256Hash(new Date()).then(e=>setPollingHashForDroppedItems(e));
          return updateFieldInMap(prevFields, fieldName, {...itemValue, fieldType, displayText })}
         
        );
        break;
      default:
        console.warn(`Unknown action type: ${actionType}`);
        resetFields();
        break;
    }
  },
  [fieldName, fieldType, displayText, memoizedFieldTypes]
);


function mergeMapsOptimized(existingMap, newMap) {
  // Iterate over the newMap and add each entry to the existingMap in O(n) time
  for (const [key, value] of newMap) {
    existingMap.set(key, value); // Add each key-value pair from newMap to existingMap
  }
}


  // For creating a new field
  const handleFieldCreate = React.useCallback(() => {
    handleFieldOperation("create");
  }, [handleFieldOperation]);

  // For editing an existing field
  const handleFieldEdit = React.useCallback(() => {
    handleFieldOperation("edit");
  }, [handleFieldOperation]);

  // For canceling an create/edit field operation
  const handleFieldEditCreateCancel = React.useCallback(() => {
    setIsDroppedFieldActive(false)
    handleFieldOperation("cancel");
  }, [handleFieldOperation]);

  const handleSaveAll = () => {
    setDroppedItems((prevItems) => {
      const updatedItems = new Map(prevItems); // Create a copy to avoid mutating the original state
      mergeMapsOptimized(updatedItems, currentFields); // Merge currentFields into the copy
      generateSHA256Hash(new Date()).then(e=>setPollingHashForDroppedItems(e));
      return updatedItems; // Return the updated map
    });
  
    setCurrentFields(new Map()); // Clear currentFields

  };
  

  const handleOnDrop = (event) => {
    event.preventDefault();

    // Retrieve the data that was set during the drag event
    const data = event.dataTransfer.getData("text/plain");
    if (data) {
      const parsedData = JSON.parse(data);
      setDroppedItems((prevFields) =>   {
        let data  = updateFieldInMap(prevFields, parsedData?.fieldName, {...parsedData })
        generateSHA256Hash(new Date()).then(e=>setPollingHashForDroppedItems(e));
        return data})

      setCurrentFields((prevFields) => {
        const updatedFields = new Map(prevFields);
        updatedFields.delete(parsedData?.fieldName);
        return updatedFields;
      });

      console.log("Dropped:", parsedData);
    } else {
      console.log("No data found");
    }
  };
  return (
    <div className={classes.parentContainer}>
      <div>
        <h1>Create or Edit Fields</h1>
        <div>
          <TextField
            fullWidth
            label="Field Name"
            name="fieldName"
            margin="normal"
            required
            error={fieldNameHasError?.validFieldName}
            onChange={handleFieldNameChange}
            value={fieldName} // Controlled input
          />
          <TextField
            fullWidth
            label="Display Text"
            name="displayText"
            margin="normal"
            required
            error={fieldNameHasError?.validDisplayName}
            onChange={handleDisplayTextChange}
            value={displayText} // Controlled input
          />
        </div>
        <div>
          <Stack direction="row" spacing={1}>
            {fieldTypes?.map((e, i) => (
              <Chip
                color="success"
                label={e?.value}
                variant={e?.variant ? e?.variant : "outlined"}
                clickable
                key={e.key}
                onClick={() => handleFieldTypeChange(e?.key)}
              />
            ))}
          </Stack>
        </div>
        <Divider style={{ margin: 10 }} />
        <div className={classes.actionFooter}>
          <Button
            variant="contained"
            onClick={handleFieldCreate}
            disabled={createBtnDisabled(fieldName, fieldType, displayText)}
          >
            Create
          </Button>
          <Button
            variant="outlined"
            onClick={handleFieldEdit}
            disabled={editBtnDisabled(fieldName, fieldType, displayText)}
          >
            Edit
          </Button>
          <Button
            variant="text"
            onClick={handleFieldEditCreateCancel}
            disabled={cancelBtnDisabled(fieldName, fieldType, displayText)}
          >
            Cancel
          </Button>
        </div>
        <Divider style={{ margin: 10 }} />
        <Card className={classes.dynamicFieldContainer}>
          <Stack direction="column" spacing={1}>
            {Array.from(currentFields.entries()).map(([key, value]) => (
              <DraggableField
                key={key}
                fieldName={key}
                fieldType={value.fieldType}
                displayText={value?.displayText}
                handleOnDelete={() => handleFieldDelete(key)}
                handleOnClick={() => handleDraggablefieldClick(key, value)}
                handleDragEnd={(e) => handleDragEnd(e, dragItem, dragOverItem)}
                dragItem={dragItem}
                dragOverItem={dragOverItem}
                isDroppedFieldActive={isDroppedFieldActive && key == fieldName}
                value={value}
              />
            ))}
          </Stack>
        </Card>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button variant="outlined" endIcon={<SaveIcon />} onClick={handleSaveAll} disabled={currentFields?.size<=0}>
          Save All
        </Button>
      </div>
      <div>
        <h1>Drag to Here for quick saving</h1>
        <div
          className={classes.dropContainer}
          onDrop={handleOnDrop}
          onDragOver={(e) => {
            e.preventDefault();
          }}
        >
          <Stack direction="column" spacing={1}>
            {Array.from(droppedItems.entries()).map(([key, value]) => (
              <DraggableField
                key={key}
                fieldName={key}
                fieldType={value.fieldType}
                displayText={value?.displayText}
                handleOnDelete={() => handleFieldDelete(key)}
                handleOnClick={() => handleDraggablefieldClick(key, value)}
                handleDragEnd={(e) => handleDragEnd(e, dragItem, dragOverItem)}
                dragItem={dragItem}
                dragOverItem={dragOverItem}
                isDroppedFieldActive={isDroppedFieldActive && key == fieldName}
                value={value}
              />
            ))}
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default AdminOrderForm;
