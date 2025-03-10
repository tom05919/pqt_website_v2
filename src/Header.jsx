import { useState } from 'react'
import { Menu, X } from "lucide-react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(0)

    return (
        <div classname="headerWrapper">
            <button classname="menuIcon" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            <nav className="headerLinks">
                <a href="#" className="hover:underline">Home</a>
                <a href="#" className="hover:underline">About</a>
                <a href="#" className="hover:underline">Services</a>
                <a href="#" className="hover:underline">Contact</a>
            </nav>
        </div>
    )
}