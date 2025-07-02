// src/App.js
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import CountryAppDemo from "./CountryAppDemo";
import Login from "./pages/Login"; // 👈 use the improved login screen
import { auth } from "./firebase"; // 👈 import your firebase config
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  if (checkingAuth) return <div className="text-center mt-10">Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            user ? <Navigate to="/app" replace /> : <Login />
          }
        />
        <Route
          path="/app"
          element={
            user ? <CountryAppDemo user={user} /> : <Navigate to="/login" replace />
          }
        />
        {/* Fallback */}
        <Route path="*" element={<Navigate to={user ? "/app" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;

