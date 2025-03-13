import { useState } from 'react'
import './App.css'
import FractalBackground from './fractal_background'

 function App() {
  const [count, setCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bodyContainer">
      <div className="introPageCard">
        <FractalBackground />
        <div className="introHomeContainer">
          <text className="homePageLogo">Princeton Quantatative Traders</text>
          <text className="homePageDes">Princeton's premier quantitative trading club  </text>
        </div>
      </div>
      <div className="introPageBody">
        <text>heloo adsjkasjdflasjkdflkjsd </text>
      </div>
    </div>
  )
}

export default App
