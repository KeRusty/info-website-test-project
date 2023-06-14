import React, { useState, useEffect, useRef } from 'react';
import globalConfig from './Utils/global';
import { BrowserRouter } from 'react-router-dom';

// Utils
import useWindowSize from './Utils/mobileView';

// Navigation
import AllRoutes from './Navigation/routes';

// Views
import Login from './Views/Login/Login';

// Style
import './App.scss';

function App() {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(1080)
  const [screenWidth, screenHeight] = useWindowSize();
  globalConfig.width = width;

  useEffect(() => {
    if (ref.current !== null) {
      setWidth(ref.current.clientWidth);
    }

  });

  return (
    <div style={{ width: screenWidth, height: screenHeight }}>
      <BrowserRouter>
        <AllRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
