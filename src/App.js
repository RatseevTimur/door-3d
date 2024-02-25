import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from './pages/Home.js'
// import Save from './pages/save/Save.js'

import './App.css';

// import Base from "./base/base.js";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<Base />}> */}

          <Route index element={<Home />} />
          <Route path="/*" element={<Home />} />

          {/* <Route path='/save' element={<Save />} /> */}
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
