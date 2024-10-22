import React from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    border: "dashed 0.15vw grey",
    padding: "1vh",
    margin: "1vh",
    borderRadius: "0.5vh",
  },
}));

function DraggableField({fieldName,displayText}) {
    debugger
  const classes = useStyles();
  return (
    <div className={classes.container} draggable>
      {" "}
      <DragIndicatorIcon fontSize="small" />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
       {fieldName||"fieldName"} - {displayText||"displayText"}
      
      </div>
      <DeleteForeverIcon fontSize="small"/>
    </div>
  );
}

export default DraggableField;
