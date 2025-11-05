# MERN Blog Platform – Full-Stack Blogging Application ✍️

A feature-rich, user-friendly blog platform where multiple users can **create, read, update, and delete** their posts. Built with **MERN stack** and deployed on **Render**, this platform provides a smooth blogging experience for writers, developers, and readers.

---

## Live Demo

> (https://blog-site-6od5.onrender.com)
⚠️ Note: Backend may take a few seconds to start on Render. Please wait a moment if the site seems loading slowly.
---
---

## About

This **MERN Blog Platform** is designed for multi-user blogging with secure authentication and responsive UI. Each user can manage their own posts, comment on blogs, and interact with the platform. The system uses **Node.js + Express** for backend APIs, **MongoDB** for data storage, and **React** for the frontend.  

The frontend is served from the backend folder in production (`dist`), making deployment on Render simple. Users and admins can manage content efficiently, with full CRUD functionality, real-time updates, and a clean interface.

---

## Key Features

- **User Authentication:** Secure sign-up and login using JWT-based authentication.  
- **Rich Blog Editor:** Create posts with images and styled content.  
- **Category & Tag Support:** Organize posts for better discovery.  
- **CRUD Functionality:** Users can create, read, edit, and delete their own posts.  
- **Multi-user Support:** Personal dashboard for each user.  
- **Comment System:** Supports comments and nested replies.  
- **Image Upload:** Upload images (use Cloudinary or backend storage).  
- **Search & Filter:** Quickly find posts by title, tags, or author.  
- **Responsive Design:** Works seamlessly on desktop, tablet, and mobile.  
- **User-Specific Blog Control:** Only authors can edit or delete their own posts.  
- **Timestamps:** Shows creation and last updated times.  
- **Toast Notifications:** Alerts for post creation, updates, and deletion.  
- **Dark Mode (optional):** Comfortable reading/writing experience.  

---

## Technologies Used

- **Frontend:** React, Tailwind CSS, npm packages  
- **Backend:** Node.js, Express.js, MongoDB, Mongoose  
- **Other:** JWT Authentication, RESTful APIs, Responsive UI  

---

## Images

> Replace these placeholders with actual screenshots from your project.

- ![Homepage](./images/homepage.png)  
- ![Dashboard](./images/dashboard.png)  
- ![Blog Editor](./images/blog-editor.png)  

---

## Installation

### Backend & Frontend (development)

```bash
# Clone repo
git clone <repo-url>
cd <repo-folder>

# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install

# Start frontend (dev)
npm start

# Start backend (dev)
cd ..
npm run dev
```
---

## Production (Render)

Frontend is built into dist inside backend.

Run backend, and frontend will be served automatically.

Make sure to configure MongoDB URI in .env.

---

## Usage

Visit the deployed site.

Sign up / log in to create a user account.

Create, edit, or delete blog posts.

Comment on other users’ posts.

Use search and filters to find posts.

---
##  Author

**Muhammad Subhan Akhtar**  
📧 [muhammadsubhan192128@gmail.com](mailto:muhammadsubhan192128@gmail.com)  
🌐 [Portfolio Website](https://m-subhan-portfolio.web.app)  
💬 Open for collaborations & freelance web projects.
