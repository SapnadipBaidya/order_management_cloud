import React from 'react'
import DynamicSidePanel from '../commons/DynamicSidePanel'
import { useSelector } from 'react-redux';

function AdminScreenIndex() {
  const loading = useSelector((state) => state?.mapMenuReducer?.loading);
  const mapMenuResponse = useSelector(
    (state) => state?.mapMenuReducer?.responseData
  );
  return (
    <div>
      <DynamicSidePanel loading={loading} mapMenuResponse={mapMenuResponse} flexDirection={"column"}/>
    </div>
  )
}

export default AdminScreenIndex