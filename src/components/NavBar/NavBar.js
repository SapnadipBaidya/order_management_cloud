import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  nav: {
    padding: theme.spacing(1)
  },
  menu: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex"
  },
  menuItem: {
    margin: theme.spacing(0.5, 0),
    [theme.breakpoints.up("md")]: {
      margin: theme.spacing(0, 1),
    },
  },
}));

function NavBar({ loading, mapMenuResponse,flexDirection }) {
  const classes = useStyles();

  return (
    <nav className={classes.nav}>
      {!loading && mapMenuResponse?.length > 0 ? (
        <ul className={classes.menu} style={{flexDirection:flexDirection == "column"?"column":"row"}}>
          {mapMenuResponse.map((item, index) => (
            <li key={index} className={classes.menuItem}>
              <Link to={item.componentRoute}>{item.fkMenuId.menuName}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <ul className={classes.menu}>loading...</ul>
      )}
    </nav>
  );
}

export default NavBar;