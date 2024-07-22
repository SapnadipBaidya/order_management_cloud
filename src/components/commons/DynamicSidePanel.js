import React, { useState } from 'react';
import './DynamicSidePanel.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import NavBar from '../NavBar/NavBar';

const DynamicSidePanel = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [panelWidth, setPanelWidth] = useState(250);
  const [isResizing, setIsResizing] = useState(false);

  const handleClick = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleMouseDown = (e) => {
    e.preventDefault(); // this helps not to select the text in browser
    setIsResizing(true);
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    if (isResizing) {
      const newWidth = e.clientX > 50 ? e.clientX : 50;
      setPanelWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  React.useEffect(() => {
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
        onMouseUp={handleMouseUp}
      />
      <div className="panel-content">
        <div className="panel-header-container">
          <div>{props?.component}</div>
          <div className={`icon-container ${isCollapsed ? 'inverted' : ''}`} onClick={handleClick}>
            <ArrowBackIosIcon className="arrow-icon" />
          </div>
        </div>
        <NavBar loading={props?.loading} mapMenuResponse={props?.mapMenuResponse} flexDirection={props?.flexDirection} />
      </div>
    </div>
  );
};

// Add defaultProps
DynamicSidePanel.defaultProps = {
  loading: false,
  mapMenuResponse: [],
  flexDirection: 'column',
  component: null,
};

export default DynamicSidePanel;