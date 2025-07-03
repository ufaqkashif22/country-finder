import React, { useEffect, useRef } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const audioRef = useRef(null);
useEffect(() => {
  const audio = audioRef.current;

  if (!audio) return;

  // Allow autoplay with muted
  audio.volume = 0.3;
  audio.muted = true;
  audio.play().catch(() => {}); // Safe ignore autoplay error

  const unmuteOnInteraction = () => {
    audio.muted = false;
    audio.currentTime = 0;
    audio.play().catch(() => {});
    window.removeEventListener("click", unmuteOnInteraction);
    window.removeEventListener("keydown", unmuteOnInteraction);
  };

  // Wait for user interaction
  window.addEventListener("click", unmuteOnInteraction);
  window.addEventListener("keydown", unmuteOnInteraction);

  return () => {
    audio.pause();
    audio.currentTime = 0;
    window.removeEventListener("click", unmuteOnInteraction);
    window.removeEventListener("keydown", unmuteOnInteraction);
  };
}, []);

  const handleLogin = async () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Logged in user:", result.user);
      navigate("/app");
    } catch (error) {
      console.error("Login error:", error);
    alert(`Google Sign-in failed:\n${error.code}\n${error.message}`);  
    }
  };

  const fireflies = Array.from({ length: 40 });

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/*  Ambient Music */}
      <audio ref={audioRef} src="/sounds/moving.mp3" loop preload="auto" />

      {/* Fireflies Background */}
      <div className="absolute inset-0 z-0">
        {fireflies.map((_, index) => (
          <div
            key={index}
            className="firefly"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Login Card */}
      <div className="z-10 bg-white rounded-2xl shadow-2xl p-10 max-w-sm w-full text-center border border-gray-300">
        <h1 className="text-2xl font-bold text-blue-600 mb-2">🌍 Country Finder</h1>
        <p className="mb-6 text-gray-600">Sign in to explore countries around the world</p>
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
