import React from "react";
import "./App.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import HomeScreen from "./components/HomeScreen";

const App = () => {
    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route exact path="/" element={<Navigate to="/home" />} />
                    <Route exact path="/home" element={<HomeScreen />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
