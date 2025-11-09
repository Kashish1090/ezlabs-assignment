import React from "react";

export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <div className="logo">EZ Labs</div>

        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
