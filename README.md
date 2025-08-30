# 🩸 Blood Bank Management System (BBMS)

A comprehensive **full-stack Blood Bank Management System** designed to streamline blood donation operations, inventory management, and user coordination across donors, hospitals, and administrators.

---

## 🌟 Project Overview

The **Blood Bank Management System (BBMS)** is a modern, secure, and efficient digital platform that revolutionizes how blood banks operate. Built with cutting-edge technologies, BBMS connects donors, hospitals, and administrators in a unified ecosystem to ensure optimal blood supply management and transparent donation processes.

### 🎯 Mission
To make blood donations more accessible, organized, and transparent while ensuring efficient blood inventory management across healthcare facilities.

---

## 🏗️ System Architecture

```
┌─────────────────┐    HTTP/REST API    ┌──────────────────┐
│                 │◄───────────────────►│                  │
│  React Frontend │                     │ Ballerina Backend│
│  (Port: 5173)   │                     │  (Port: 9191)    │
│                 │                     │                  │
└─────────────────┘                     └──────────────────┘
        │                                        │
        │ User Interface                         │ Data Processing
        │                                        │
        ▼                                        ▼
┌─────────────────┐                     ┌──────────────────┐
│  User Roles:    │                     │   MySQL Database │
│  • Donors       │                     │   • User Data    │
│  • Hospitals    │                     │   • Campaigns    │
│  • Admins       │                     │   • Blood Stock  │
└─────────────────┘                     └──────────────────┘
```

---

## 🚀 Key Features

### 👥 **Multi-Role User Management**
- **Donors**: Register, participate in campaigns, track donation history
- **Hospitals**: Manage campaigns, monitor blood stock, request blood units
- **Administrators**: Oversee entire system, manage users and campaigns


### 🏥 **Campaign Management**
- Create and manage blood donation campaigns
- Real-time campaign tracking and participation
- Automated email notifications
- Past campaign data and analytics

### 🩸 **Blood Inventory System**
- Real-time blood stock monitoring (A+, A-, B+, B-, AB+, AB-, O+, O-)
- Hospital-wise and district-wise inventory tracking
- Automated stock updates
- Campaign-linked blood collection tracking

### 🔐 **Security & Authentication**
- JWT-based secure authentication
- Role-based access control
- SHA-256 password encryption with salt
- CORS-enabled API security

### 📱 **Modern User Experience**
- Responsive design for all devices
- Dark/light theme support
- Real-time notifications and feedback
- Intuitive and accessible interface

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18+ with Vite
- **Styling**: Tailwind CSS + Bootstrap + Regular CSS
- **Routing**: React Router
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Icons**: React Icons + Lucide Icons

### Backend
- **Framework**: Ballerina Swan Lake
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: SMTP Integration
- **Architecture**: RESTful API

### Development Tools
- **Version Control**: Git & GitHub
- **Package Management**: npm/yarn
- **Build Tools**: Vite (Frontend), Ballerina (Backend)
- **Code Quality**: ESLint, Prettier

---

## 📁 Project Structure

```
BBMS/
├── BBMS/                    # React Frontend Application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── context/           # Global state management
│   │   ├── Pages/             # Main application pages
│   │   └── SharedData/        # Constants and utilities
│   ├── package.json
│   └── README.md
│
├── BBMS_backend/                     # Ballerina Backend API
│   ├── main.bal               # Main service endpoints
│   ├── database.bal           # Database configuration
│   ├── types.bal              # Type definitions
│   ├── utils.bal              # Utility functions
│   ├── *_service.bal          # Service modules
│   ├── Config.toml            # Configuration file
│   └── README.md
│
└── README.md                    # This file
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16+) for frontend
- **Ballerina Swan Lake** for backend
- **MySQL Server** for database
- **SMTP Account** for email notifications

### 1. Clone the Repository
```bash
git clone https://github.com/nadilHesara/iwb25-203-code-drift.git
cd iwb25-203-code-drift
```

### 2. Setup Backend
```bash
cd BBMS_backend
# Create Config.toml with your database credentials
# Setup MySQL database and tables
bal build
bal run
```
Backend will run on `http://localhost:9191`

### 3. Setup Frontend
```bash
cd bbms
npm install
npm run dev
```
Frontend will run on `http://localhost:5173`

### 4. Access the Application
Open your browser and navigate to `http://localhost:5173`

---

## 🎯 Use Cases

### For Donors
- Register and maintain profile
- Browse available donation campaigns
- Track personal donation history
- Complete eligibility assessments

### For Hospitals
- Manage blood donation campaigns
- Monitor blood inventory levels
- Request blood units from other facilities
- Track campaign performance

### For Administrators
- Oversee entire system operations
- Manage user accounts and permissions
- Monitor system-wide blood inventory
- Maintain system security

---

## 🔜 Future Enhancements

- 🌍 **Multi-language Support** (English, Sinhala, Tamil)
- 📱 **Mobile Application** (React Native)
- 🤖 **AI-Powered Demand Prediction**
- 📊 **Advanced Analytics Dashboard**
- 🔔 **SMS/Push Notifications**
- 📱 **QR Code Integration**
- 🌐 **PWA Support** for offline functionality

---

## 🤝 Contributing

We welcome contributions from the community! Please see our individual component READMEs for specific contribution guidelines:

- [Frontend Contributing Guide](./BBMS/README.md#-contribution-guidelines)
- [Backend Contributing Guide](./BBMS_backend/README.md#-contributing)

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📩 Support & Contact

**Development Team:**
- Thilokya Angeesa - thilokyaangeesa@gmail.com
- Nadil Hesara - nadilheasara@gmail.com
- Sandenie Withana - pisandeniwith@gmail.com
- Hesandi Siwmini - hesandism@gmail.com

For technical support, bug reports, or feature requests, please:
- Create an issue on GitHub
- Contact the development team
- Check the component-specific READMEs for detailed documentation

---

## 📄 License

This project is licensed under the **MIT License**. 

---

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special appreciation to the healthcare community for their valuable feedback
- Built with ❤️ for the greater good of society

---

**🩸 BBMS - Making Blood Donation Accessible, Organized, and Transparent**
