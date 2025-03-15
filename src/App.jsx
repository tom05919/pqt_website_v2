import { useState } from 'react'
import './App.css'
import FractalBackground from './fractal_background'

 function App() {
  const [count, setCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    console.log("this thing works")
  }

  return (
    <div className="bodyContainer">
      <FractalBackground />
      <div className="introPageCard">
        <div className="introHomeContainer">
          <text className="homePageLogo">Princeton Quantatative Traders</text>
          <div className="description">
            <text className="homePageDes">Princeton's premier quantitative trading club  </text>
            <text className="subtext">Join our club to gain hands-on experience for quantitative trading interviews, conduct research, compete in trading competitions, and connect with like-minded peers in quantitative finance.</text>
          </div>
        </div>
      </div>
      <div className="introPageBody">
        <div className="aboutUs">
          <text className="medText">About Us</text>
          <text className="subtext">We are a student-driven community passionate about quantitative finance and applied mathematics. Our mission is to gain hands-on experience for quantitative trading interviews, conduct original research in quantitative analysis, and collaborate on trading competitions. By fostering a network of like-minded individuals, we create opportunities to learn, share insights, and tackle real-world financial challenges together.</text>
        </div>
        <button className="button" onClick={handleClick}>Join Now</button>
      </div>
    </div>
  )
}

export default App
