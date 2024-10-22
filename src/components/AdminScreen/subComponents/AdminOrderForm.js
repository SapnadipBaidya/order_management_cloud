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
    padding :"1vh"
  },
  actionFooter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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

  const validateInput = React.useCallback((value) => {
    return value.match(/\s/);
  }, []);

  const handleFieldTypeChange = React.useCallback(
    (e, i) => {
      setFieldType(e);
      const updatedFieldTypes = memoizedFieldTypes.map((item, index) => {
        return index === i
          ? { ...item, variant: item.variant === "contained" ? "outlined" : "contained" }
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
      setFieldName(value);
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

  // Memoizing field creation function
  const handleFieldCreate = React.useCallback(() => {
    setCurrentFields((prevFields) => {
      const updatedFields = new Map(prevFields);
      updatedFields.set(fieldName, { fieldType, displayText });
      return updatedFields;
    });

    setFieldName("");
    setDisplayText("");
    setFieldTypes(memoizedFieldTypes); // Reset field types
  }, [fieldName, fieldType, displayText, memoizedFieldTypes]);

  React.useEffect(() => {
    console.log(currentFields);
  }, [currentFields]);

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
                onClick={() => handleFieldTypeChange(e?.key, i)}
              />
            ))}
          </Stack>
        </div>
        <Divider style={{ margin: 10 }} />
        <div className={classes.actionFooter}>
          <Button variant="contained" onClick={handleFieldCreate}>
            Create
          </Button>
          <Button variant="outlined">Edit</Button>
        </div>
        <Divider style={{ margin: 10 }} />
        <Card className={classes.dynamicFieldContainer}>
          <Stack direction="column" spacing={1}>
            {Array.from(currentFields.entries()).map(([key, value]) => (
              <DraggableField key={key} fieldName={key} displayText={value?.displayText} />
            ))}
          </Stack>
        </Card>
      </div>
      <div>
        <h1>Drag to Here for quick saving</h1>
      </div>
    </div>
  );
}

export default AdminOrderForm;
