import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LevelList from './LevelList.tsx'
import LevelPage from './LevelPage.tsx'
import './index.css'
import "./App.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LevelList />} />
        <Route path="/level/:id" element={<LevelPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
