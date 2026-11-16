import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import records from "@data/records.json";
import './App.css'

function App() {
  return(JSON.stringify(records));
}

export default App
