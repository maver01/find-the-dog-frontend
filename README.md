# find-the-dog-frontend

Main user-facing website related to find-the-dog-project. This project is for my learning purposes only.

## Description

This repository contains the javascript code of the **Find the dog** website, which allows users to upload a picture from their desktops, and use the in-built API to automatically detect if their picture contains dogs. The system is deploying a pre-trained ML model, and does not store the image.

Directory tree of _src_ folder:

```
├── App.js
├── App.test.js
├── components
│   └── Navbar
│       ├── index.js
│       └── NavbarElements.js
├── index.css
├── index.js
├── pages
│   ├── about.css
│   ├── about.js
│   ├── findTheDog.css
│   ├── findTheDog.js
│   ├── home.css
│   └── home.js
├── reportWebVitals.js
└── setupTests.js

3 directories, 14 files

```

## Understand the code

The website contains 3 pages. The findTheDog page triggers a post request to send the uploaded image to the listening server. It then polls the server for incoming processed image. All server requests are made though _localhost_.

## Run the code

Assuming npm in installed, from the _main-website_ directory, run:

```
npm start
```
