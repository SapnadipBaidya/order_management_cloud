import React, { useEffect, useState } from 'react';
import DynamicSidePanel from '../commons/DynamicSidePanel/DynamicSidePanel';
import { useDispatch, useSelector } from 'react-redux';
import { adminMenuRequested } from '../../state-management/actions';
import DynamicRightPanel from '../commons/DynamicRightPanel/DynamicRightPanel';

function AdminScreenIndex() {
  const dispatch = useDispatch();
  const [panelWidth, setPanelWidth] = useState(250);
const[renderCmp,setRenderCmp]=useState(null)
  useEffect(() => {
    dispatch(adminMenuRequested("ADMIN-1"));
  }, [dispatch]);

  const loading = useSelector((state) => state?.adminMenuReducer?.loading);
  const mapMenuResponse = useSelector(
    (state) => state?.adminMenuReducer?.responseData
  );

  const handlePanelWidthChange = (newWidth) => {
    setPanelWidth(newWidth);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <DynamicSidePanel
        loading={loading}
        mapMenuResponse={mapMenuResponse}
        flexDirection="column"
        component={<div>Side Panel Header</div>}
        onPanelWidthChange={handlePanelWidthChange}
        renderCmp={renderCmp}
        setRenderCmp={setRenderCmp}
      />
      <div
        style={{
          flex: 1,
          marginLeft: panelWidth,
          transition: 'margin-left 1s',
          padding: '20px',
        }}
      >
       <DynamicRightPanel renderCmp={renderCmp}/>
      </div>
    </div>
  );
}

export default AdminScreenIndex;