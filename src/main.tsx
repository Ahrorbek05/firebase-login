import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Login from './Login.tsx';
import App from './App.tsx';
import SignUp from './SignUp.tsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDd2tLrCW5hrrbzevYErhrwgSUD4PtAiTM",
  authDomain: "authentication-7f920.firebaseapp.com",
  projectId: "authentication-7f920",
  storageBucket: "authentication-7f920.firebasestorage.app",
  messagingSenderId: "790995888161",
  appId: "1:790995888161:web:23aeabdd56909e4b34db60"
};
initializeApp(firebaseConfig);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
