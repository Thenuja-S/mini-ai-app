import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav__brand">Mini AI App</div>
      <div className="nav__links">
        <Link className="nav__link" to="/requirement">
          Requirement
        </Link>
      </div>
      <div className="nav__spacer" />
      <span className="badge">Public mode</span>
    </nav>
  );
}
