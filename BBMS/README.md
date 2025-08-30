# 🩸 BBMS Frontend

The **Blood Bank Management System (BBMS) Frontend** is a modern, responsive web application built with **React** and **Tailwind CSS**. It provides a seamless interface for **donors, hospitals, and administrators** to manage blood donation campaigns, monitor blood stock, and maintain user profiles — making the blood donation process more efficient and transparent.

---

## 📖 Table of Contents

1. [Project Overview](#project-overview)  
2. [Key Features](#key-features)  
3. [Technology Stack](#technology-stack)  
4. [Folder Structure](#folder-structure)  
5. [How It Works](#how-it-works)  
6. [Setup & Installation](#setup--installation)  
7. [Available Scripts](#available-scripts)  
8. [Contribution Guidelines](#contribution-guidelines)  
9. [Future Enhancements](#future-enhancements)  
10. [License](#license)

---

## 🚀 Project Overview

The BBMS platform is designed to connect **donors, hospitals, and administrators** on a single digital ecosystem.  
The **frontend** plays a vital role in:

- Presenting real-time information in a clean UI.  
- Handling user authentication and authorization.  
- Managing interactions like **registration, campaigns, stock viewing, and history tracking**.  
- Communicating seamlessly with the backend API for data storage and retrieval.  

This ensures that **blood donation campaigns are well-organized, transparent, and accessible to all stakeholders**.

---

## 🛠️ Key Features

- **User Authentication & Authorization**  
  - Secure login and registration for donors, hospitals, and administrators.  
  - JWT token–based authentication.  
  - Role-based dashboards with tailored access.  

- **Donor Management**  
  - Easy registration and profile updates.  
  - Donation history tracking.  
  - Campaign participation management.  

- **Hospital Management**  
  - Hospital registration and profile management.  
  - Ability to request blood units.  
  - Organize and manage donation campaigns.  

- **Campaign Management**  
  - Create, update, and view donation campaigns.  
  - Donors can explore and register for upcoming campaigns.  
  - Past campaign data for hospitals and admins.  

- **Blood Stock Monitoring**  
  - Real-time display of blood stock availability.  
  - Filter by **blood type** and **location**.  

- **Responsive Design**  
  - Built using **Tailwind CSS + Bootstrap + Regular CSS** for maximum flexibility.  

- **Dark/Light Theme Support**  
  - Toggle between themes for a comfortable user experience.  

- **Notifications & Feedback**  
  - Toasts for important updates, errors, and confirmations.  
  - Emails for notifying the user on important updates.

---

## ⚙️ Technology Stack

- **Frontend Framework**: [React](https://react.dev/)  
- **Routing**: [React Router](https://reactrouter.com/)  
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Bootstrap](https://getbootstrap.com/)  
- **State Management**: React Context API  
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)  [Lucide Icons](https://lucide.dev/icons/)
- **HTTP Requests**: [Axios](https://axios-http.com/) or Fetch API  
- **Build Tool**: [Vite](https://vitejs.dev/)  

---

## 📂 Folder Structure

```
src/
├── components/        # Reusable UI components (Navbar, Sidebar, Modals, etc.)
├── Pages/             # Main pages (Home, Login, Dashboard, Campaigns, etc.)
├── context/           # Global state management (UserContext, ThemeContext)
├── SharedData/        # Constants, mock data, helper files
├── App.jsx            # Root component with routing
├── App.css            # Global styles
├── main.jsx           # React entry point
└── index.css          # Tailwind & base styles
```

---

## 🔄 How It Works

1. **Authentication**  
   - Users register/login as **Donor, Hospital, or Admin**.  
   - JWT tokens are stored in **cookies/session storage** for security.  

2. **Dashboard**  
   - Donors → View donation history, update profile, register for campaigns.  
   - Hospitals → Manage campaigns, request blood, track stock.  
   - Admins → Oversee all donors, hospitals, campaigns, and stocks.  

3. **Campaigns**  
   - Hospitals create/manage campaigns.  
   - Donors can explore and join campaigns.  
   - Campaign participation data is tracked.  

4. **Blood Stock Monitoring**  
   - Displays **real-time blood stock availability**.  
   - Helps hospitals to manage supply and donors to see urgent needs.  

5. **Profiles**  
   - Donors/Hospitals can update info, change passwords, and view activity history.  

6. **Logout**  
   - Clears session and logs the user out securely.  

---

## 🖥️ Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)  
- npm or yarn package manager  

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/bbms-frontend.git
   cd bbms-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open in browser:  
   👉 [http://localhost:5173](http://localhost:5173)

---

## 📜 Available Scripts

- `npm run dev` → Runs app in development mode.  
- `npm run build` → Builds for production.  
- `npm run preview` → Preview production build locally.  
- `npm run lint` → Runs ESLint for code quality.  

---

## 🤝 Contribution Guidelines

We welcome contributions to improve BBMS Frontend! 🚀  

### Steps to Contribute:
1. **Fork** the repository.  
2. Create a new **feature branch**:  
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:  
   ```bash
   git commit -m "Add new feature: your feature name"
   ```
4. **Push** to your fork:  
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a **Pull Request**.  

  > Please ensure your code is clean, well-documented, and follows project coding standards.

---

## 🌟 Future Enhancements

- ✅ Multi-language support (English, Sinhala, Tamil).  
- ✅ Integration with SMS/Email notifications for campaign reminders.  
- ✅ QR code scanning for donor check-in.  
- ✅ AI-based prediction for blood demand analysis.  
- ✅ Offline PWA support for hospitals in low-connectivity areas.  

---
## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.
   - Thilokya Angeesa  - thilokyaangeesa@gmail.com 
   - Nadil Hesara     -  nadilheasara@gmail.com  
   - Sandenie Withana  - pisandeniwith@gmail.com
   - Hesandi Siwmini   - hesandism@gmail.com

---

## 📄 License

This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute this project with attribution.

---

💖 **BBMS Frontend** makes blood donation simpler, smarter, and more accessible for everyone.
