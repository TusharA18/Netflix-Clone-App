import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./components/HomeScreen";

const App = () => {
    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route exact path="/home" element={<HomeScreen />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
