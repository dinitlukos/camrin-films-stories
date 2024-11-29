import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StoryPage from "./pages/StoryPage";
import CollectionPage from "./pages/CollectionPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/solo/:storyId" element={<StoryPage />} />
        <Route path="/collection/:storyId" element={<CollectionPage />} />
      </Routes>
    </Router>
  );
};

export default App;
