import React from "react";
import "./index.css";

const Navbar = () => {
    return (
        <>
            <nav className="nav">
                <ul className="nav-menu">
                    <div className="nav-item">
                        <a href="/home" className="nav-link" activeStyle>
                            Home
                        </a>
                    </div>
                    <div className="nav-item">
                        <a href="/about" className="nav-link" activeStyle>
                            About
                        </a>
                    </div>
                    <div className="nav-item">
                        <a href="/findTheDog" className="nav-link" activeStyle>
                            Find the Dog
                        </a>
                    </div>
                </ul>
            </nav>
        </>
    );
};

export default Navbar;