# Flashcards App

Welcome to the Flashcards App! This application allows users to manage flashcards efficiently. It provides features like creating flashcards with a user-friendly interface, editing/updating existing flashcards, and deleting them. The app offers various statuses such as "Want to Learn," "Noted," and "Learned" that users can freely mark based on their preferences.

## Table of Contents

- [GitHub Page](#githubpage)
- [Recommendations](#recommendations)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## GitHub Page

Click on the link below to access the website through GitHub Pages:

<https://ey1az.github.io/flashcards_app/>

## Recommendations

- For the best experience, it is recommended to use the latest version of a modern browser such as Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, or Opera.
- Ensure that your browser is updated to the latest version for optimal performance and security.

## Features

1. **Home Page:**
   - Overview of projects with links to detailed information.
   
2. **Flashcards Page:**
   - Create, edit/update, and delete flashcards with ease.
   - View flashcard properties such as the question, answer, and options.
   - Assign different statuses like "Want to Learn," "Noted," and "Learned."
   - Search, filter, and sort flashcards for better organization.
   - Select multiple flashcards and share details via email.
   - Drag and drop flashcards to change their positions.

3. **Contact Me Page:**
   - Enter a subject, email address, and message content.
   - Messages are stored in a file on the JSON server.

## Installation

Clone the repository:

```bash
git clone https://github.com/ey1az/flashcards_app.git
```

Before you start, navigate to the project directory by running the following command:

```bash
cd flashcards_app
```

Make sure you have Node.js installed on your machine. To install the necessary dependencies, run:

```bash
npm install
```

The primary dependencies include:
- `concurrently`: For running multiple commands concurrently.
- `json-server`: For simulating a REST API with a JSON file.
- `react-router-dom`: For handling navigation within the React app.
- `react-dom`: Required for rendering React components.

## Usage

To launch the app, use the following command:

```bash
npm start
```

This will start both the React app and the JSON server concurrently, allowing you to explore and interact with the Flashcards App.

## ⚠️ Disclaimer ⚠️

This project is open for personal use, modification, and redistribution under the condition that **you do not claim it as your own work**. If you modify or distribute this project, you must provide proper attribution to the original creator (me) and clearly state any modifications made.

By using this project, you agree to follow these guidelines and give credit where it's due.

Thank you for respecting the effort that went into creating this project!
