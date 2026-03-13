# CodeLeap Social Network

A **social network application** built as part of the **CodeLeap technical challenge**.  
The platform allows users to authenticate, create posts, and interact with the feed through full **CRUD operations**.

The project also implements **infinite scroll pagination** for efficient post loading and a **responsive interface**, ensuring a good user experience across different screen sizes.

---

# Demo Login

To make it easier to evaluate the project, you can use the following test account:

Email: codeleap@email.com  
Password: codeleap  

You can also **create new users directly in the application**, since authentication is handled by **Supabase**.

---

# Deployment

The application is deployed on **Vercel** and can be accessed at:

**Live URL:**  
<YOUR_VERCEL_DEPLOYMENT_URL>

This deployment contains the full production build of the project.

---

# Technologies Used

- React
- JavaScript
- Supabase (Authentication)
- REST API (CodeLeap Backend)
- CSS
- Responsive Design

---

# Features

## Authentication

User authentication is implemented using **Supabase Auth**.

The application supports:

- User login with email and password
- User registration (create new accounts)
- Session management

---

## CRUD Operations

Authenticated users can perform all basic **CRUD operations** on posts:

- **Create** – Create new posts  
- **Read** – View posts in the feed  
- **Update** – Edit their own posts  
- **Delete** – Remove their own posts  

---

## Infinite Scroll Pagination

The feed uses **scroll pagination (infinite scroll)** to improve performance and user experience.

Instead of loading all posts at once:

- Posts are loaded **progressively**
- When the user reaches the bottom of the page, new posts are fetched automatically
- This reduces unnecessary data loading and improves performance

---

## Responsive Design

The interface was designed to work properly on different devices:

- Desktop
- Tablets
- Mobile phones

The layout adapts to screen size to maintain **usability and readability**.

---

# Author
Heitor VAz