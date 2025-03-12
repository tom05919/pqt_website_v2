import { useState } from 'react'
import './Header.css'

export default function Header() {

    return (
        <div className="headerWrapper">
            <div className="logoWrapper">
                <h1>logo</h1>
            </div>

            <nav className="linkWrapper">
                <a href="#" className="headerLinks">Home</a>
                <a href="#" className="headerLinks">About</a>
                <a href="#" className="headerLinks">Services</a>
                <a href="#" className="headerLinks">Contact</a>
            </nav>
        </div>
    )
}