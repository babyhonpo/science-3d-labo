import React from "react";
import { Route, Routes } from "react-router";
import Home from "./route/Home";
import Top from "./route/Top";
import Effect from "./route/Effect";

const App = () => {
  return (
    <Routes>
      <Route path='/top' element={<Top />} />
      <Route path='/home' element={<Home />} />
      <Route path='/test/effect' element={<Effect />} />
    </Routes>
  );
};

export default App;
