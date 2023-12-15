import React from "react";
import "./CSS/Projects.css";

function Projects({ title, description, link }) {
  const handleClick = () => {
    window.open(link, "_blank");
  };

  return (
    <li className="home-card" onClick={handleClick}>
      <strong className="link" style={{ cursor: "pointer" }}>
        {title}:
      </strong>{" "}
      {description}
    </li>
  );
}

export default Projects;