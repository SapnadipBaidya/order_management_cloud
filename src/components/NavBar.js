import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function NavBar() {
  const loading = useSelector((state) => state?.mapMenuReducer?.loading);
  const mapMenuResponse = useSelector(
    (state) => state?.mapMenuReducer?.responseData
  );

  console.log("sapi", loading, mapMenuResponse);
  console.log("sapi1",loading , mapMenuResponse?.length , typeof mapMenuResponse)
  return (
    <nav>
      {!loading && mapMenuResponse?.length > 0  ? (
       <ul>
       {mapMenuResponse?.map((item) => (
         <li>
           <Link to={item?.componentRoute}>{item?.fkMenuId?.menuName}</Link>
         </li>
       ))}
     </ul>
      ) : (
        <ul>loading...</ul>
      )}
    </nav>
  );
}

export default NavBar;
