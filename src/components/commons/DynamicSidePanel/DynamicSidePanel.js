import React, { useState, useEffect } from 'react';
import './DynamicSidePanel.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import NavBar from '../../NavBar/NavBar';

const DynamicSidePanel = ({ loading, mapMenuResponse, flexDirection, component, onPanelWidthChange,renderCmp,setRenderCmp }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [panelWidth, setPanelWidth] = useState(250);
  const [isResizing, setIsResizing] = useState(false);

  const handleClick = () => {
    setIsCollapsed(!isCollapsed);
    const newWidth = isCollapsed ? 250 : 50; // Adjust the width when collapsing/expanding
    setPanelWidth(newWidth);
    onPanelWidthChange(newWidth);
  };

  const handleMouseDown = (e) => {
    e.preventDefault(); // this helps not to select the text in browser
    setIsResizing(true);
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    if (isResizing) {
      const newWidth = e.clientX > 50 ? e.clientX : 50;
      console.log(newWidth)
      if (newWidth<=445 && newWidth>=215 ) {
        setPanelWidth(newWidth);
        onPanelWidthChange(newWidth);
      }
     
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div
      className={`side-panel ${isCollapsed ? 'collapsed' : ''}`}
      style={{ width: `${panelWidth}px` }}
    >
      <div
        className="resize-handle"
        onMouseDown={handleMouseDown}
      />
      <div className="panel-content">
        <div className="panel-header-container">
          <div>{component}</div>
          <div className={`icon-container ${isCollapsed ? 'inverted' : ''}`} onClick={handleClick}>
            <ArrowBackIosIcon className="arrow-icon" />
          </div>
        </div>
        {!loading && mapMenuResponse?.length > 0 ? (
        <ul >
          {mapMenuResponse.map((item, index) => (
            <li key={index} >
              <div onClick={()=>setRenderCmp(item.componentName)}>{item.componentName}</div>
            </li>
          ))}
        </ul>
      ) : (
        <ul >loading...</ul>
      )}
      </div>
    </div>
  );
};

DynamicSidePanel.defaultProps = {
  loading: false,
  mapMenuResponse: [],
  flexDirection: 'column',
  component: null,
};

export default DynamicSidePanel;