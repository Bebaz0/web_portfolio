# Portfolio Website

Personal portfolio website showcasing my projects, skills, and professional profile.

---

## Overview

Short description of the purpose of this website:
- Present my work and experience
- Act as a professional landing page
- Serve as a reference when contacting clients or companies

---

## Features

- Project showcase
- About / profile section
- Contact information
- Responsive design

---

## Tech Stack

-
-
-

---

## Hosting

The site is live at [afonsolima.dev](https://afonsolima.dev), self-hosted on my homelab.

- **Image:** a multi-stage Docker build. Node 22 builds the Vite bundle and nginx 1.30 serves the static files.
- **Registry:** pushing a `v*.*.*` tag runs a GitHub Actions workflow that publishes `ghcr.io/bebaz0/web_portfolio` tagged with that version.
- **Server:** the container runs with Docker on my homelab.
- **Access:** a Cloudflare Tunnel connects the domain to the container. TLS ends at Cloudflare and no inbound ports are exposed to the internet.

To run the same image locally:

```bash
docker build -t web_portfolio .
docker run -p 8080:80 web_portfolio
```

---

## Installation

```bash
# Clone repository
git clone <git@github.com:Bebaz0/web_portfolio.git>

# Install dependencies
npm install
```

## Running the project
```bash
npm run dev
```

## Project Structure


```txt
/
 ├── public/
 ├── README.md
 ├── package.json
 ├── package-lock.json
 ├── vite.config.js 
 ├── .gitignore
 ├── index.html
 └──src/
     ├── components/
     │   ├── AboutMe/
     │   │   ├── AboutMe.jsx
     │   │   └── AboutMe.css
     │   ├── Carousel/
     │   │   ├── Carousel.jsx
     │   │   └── Carousel.css
     │   ├── languageSwitch/
     │   │   ├── languageSwitch.jsx
     │   │   └── languageSwitch.css
     │   ├── ProjectCard/
     │   │   ├── ProjectCard.jsx
     │   │   └── ProjectCard.css
     │   ├── TechStack/
     │   │   ├── TechStack.jsx
     │   │   └── TechStack.css
     │   └── ToDo/
     │       ├── Todo.jsx
     │       └── Todo.css
     │
     ├── locales/
     │   ├── en/
     │   │   └── translation.json
     │   └── pt/
     │       └── translation.json
     │
     ├── App.jsx
     ├── App.css
     ├── i18n.js
     ├── index.css
     └── main.jsx
```

## Planned Features


## Author
Bebaz0