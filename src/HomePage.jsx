import React from "react";
import Project from "./Projects";
import "./CSS/HomePage.css";

const projects = [
    {
        title: "Personal Portfolio",
        description: "This is my personal portfolio. Click the box to know more about me!",
        link: "https://ey1az.github.io/ae_portfolio/public/per_web.html",
    },
    {
        title: "BookStore (Using JDBC)",
        description: "This Java application focuses on designing and interacting with databases (Book store). The functionalities include database connectivity, CRUD (Create, Read, Update, Delete) operations, transaction handling, and metadata access.",
        link: "https://github.com/ey1az/assignment2_dbs",
    },
    {
        title: "Product Catalog (DummyJSON API)",
        description: "This web application allows users to browse and view details of various products.",
        link: "https://ey1az.github.io/assignment2_wm1/",
    }
];

function HomePage() {
    return (
        <div className="home-cont">
            <h1>Welcome to the Web-Page!</h1>
            <p>
                I've had the opportunity to work on diverse and exciting projects. One notable endeavor includes the creation of a sophisticated Book Store Management system using JDBC, demonstrating my proficiency in database applications. Additionally, I've developed a dynamic product display application utilizing the DummyJSON API, showcasing my skills in integrating external APIs. Furthermore, my online portfolio serves as a reflection of my dedication to creating a compelling digital presence. These projects not only showcase my technical abilities but also reflect my passion for building innovative solutions. Explore the links below:
            </p>
            <ul className="list-of-projects">
                {projects.map((project, index) => (
                    <Project key={index} {...project} />
                ))}
            </ul>
        </div>
    );
}

export default HomePage;