import React from "react";
import logo from "./logo.svg";
import "./App.css";
import FeaturesScreen from "./Features";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import NotFoundLayout from "./NotFound/notFountLayout";
import { useNavigate } from "react-router-dom";

function App() {
    const navigate = useNavigate();

    return (
        <Routes>
            <Route
                path="/"
                element={<Navigate to="/features?page=1&per_page=10" />}
            />
            <Route path="/features" element={<FeaturesScreen />} />
            {/* Agrega más rutas según tus necesidades */}
            <Route path="*" element={<NotFoundLayout />} />
        </Routes>
    );
}

export default App;
