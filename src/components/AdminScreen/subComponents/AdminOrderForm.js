import React from "react";
import { Button, TextField, Stack } from "@mui/material";
import Chip from "@mui/material/Chip";
import { Card, Divider } from "@material-ui/core";
import DraggableField from "../../../utils/DraggableComponents/DraggableField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  parentContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dynamicFieldContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
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
  },
}));

function AdminOrderForm() {
  const classes = useStyles();

  const [fieldType, setFieldType] = React.useState("None");
  const [fieldName, setFieldName] = React.useState("");
  const [displayText, setDisplayText] = React.useState("");
  const [fieldNameHasError, setFieldNameHasError] = React.useState({
    validFieldName: true,
    validDisplayName: true,
  });
  const [currentFields, setCurrentFields] = React.useState(new Map());
  const [dropppedItems, setDroppedItems] = React.useState(new Map());

  const [fieldTypes, setFieldTypes] = React.useState([
    { key: "number", value: "Number" },
    { key: "string", value: "String" },
    { key: "dropdown", value: "Drop Down" },
  ]);

  // Memoizing field types to avoid recalculating every render
  const memoizedFieldTypes = React.useMemo(
    () => [
      { key: "number", value: "Number" },
      { key: "string", value: "String" },
      { key: "dropdown", value: "Drop Down" },
    ],
    []
  );


  const createBtnDisabled = (fieldName, fieldType, displayText) => {
    return !(fieldName && fieldType && displayText && !dropppedItems.get(fieldName));
  };

  const editBtnDisabled = (fieldName, fieldType, displayText) => {
    return !(dropppedItems.get(fieldName));
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

  const handleFieldNameChange = React.useCallback(
    (event) => {
      const value = event?.target?.value;
      const hasError = validateInput(value);
      setFieldName(value.trim());
      setFieldNameHasError((prev) => ({ ...prev, validFieldName: hasError }));
    },
    [validateInput]
  );

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
    setDisplayText("");
    setFieldType("");
    handleFieldTypeChange("")

  };
const handleDraggablefieldClick= (key,value)=>{
    setFieldName(key)
    setDisplayText(value?.displayText)
    handleFieldTypeChange(value?.fieldType)
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
      switch (actionType) {
        case "create":
          setCurrentFields((prevFields) =>
            updateFieldInMap(prevFields, fieldName, { fieldType, displayText })
          );
          break;
        case "edit":
          setDroppedItems((prevFields) =>
            updateFieldInMap(prevFields, fieldName, { fieldType, displayText })
          );
          break;
        default:
          console.warn(`Unknown action type: ${actionType}`);
          break;
      }
  
      // Reset the form states after operation
      setFieldName("");
      setDisplayText("");
      setFieldTypes(memoizedFieldTypes);
    },
    [fieldName, fieldType, displayText, memoizedFieldTypes]
  );
  

// For creating a new field
const handleFieldCreate = React.useCallback(() => {
  handleFieldOperation("create");
}, [handleFieldOperation]);

// For editing an existing field
const handleFieldEdit = React.useCallback(() => {
  handleFieldOperation("edit");
}, [handleFieldOperation]);


  React.useEffect(() => {
    console.log(currentFields);
  }, [currentFields]);

  const handleOnDrop = (event) => {
    event.preventDefault();

    // Retrieve the data that was set during the drag event
    const data = event.dataTransfer.getData("text/plain");
    if (data) {
      const parsedData = JSON.parse(data);
      // setDroppedItems((prevItems) => [...prevItems, parsedData]);
      setDroppedItems((prevFields) => {
        const updatedFields = new Map(prevFields);
        updatedFields.set(parsedData?.fieldName, {
          fieldType: parsedData?.fieldType,
          displayText: parsedData?.displayText,
        });
        return updatedFields;
      });

      setCurrentFields((prevFields) => {
        const updatedFields = new Map(prevFields);
        updatedFields.delete(parsedData?.fieldName)
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
            disabled={!editBtnDisabled(fieldName,fieldType,displayText)}
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
          <Button variant="contained" onClick={handleFieldCreate} disabled={createBtnDisabled(fieldName,fieldType,displayText)}>
            Create
          </Button>
          <Button variant="outlined" onClick={handleFieldEdit} disabled={editBtnDisabled(fieldName,fieldType,displayText)}>Edit</Button>
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
                handleOnDelete={()=>handleFieldDelete(key)}
                handleOnClick={()=>handleDraggablefieldClick(key,value)}
              />
            ))}
          </Stack>
        </Card>
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
            {Array.from(dropppedItems.entries()).map(([key, value]) => (
              <DraggableField
                key={key}
                fieldName={key}
                fieldType={value.fieldType}
                displayText={value?.displayText}
                handleOnDelete={()=>handleFieldDelete(key)}
                handleOnClick={()=>handleDraggablefieldClick(key,value)}
                
              />
            ))}
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default AdminOrderForm;
