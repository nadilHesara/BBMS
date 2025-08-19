# Blood Bank Management System (BBMS) Backend

A comprehensive Blood Bank Management System backend built with Ballerina, providing secure and efficient management of blood donations, inventory, and user operations.

## 🩸 Project Overview

The BBMS Backend is a robust REST API service that manages the complete lifecycle of blood bank operations including donor registration, hospital management, blood donation campaigns, inventory tracking, and secure user authentication. The system is designed to streamline blood bank operations and ensure efficient blood supply management.

## ✨ Key Features

### 🔐 Authentication & Security
- **JWT-based Authentication**: Secure token-based authentication system
- **Password Encryption**: SHA-256 with salt for secure password storage
- **Role-based Access Control**: Different access levels for Donors, Hospitals, and Admins
- **Cookie & Header Token Support**: Flexible authentication methods

### 👥 User Management
- **Donor Registration**: Complete donor profile management with medical history
- **Hospital Registration**: Hospital account creation and management
- **Profile Updates**: Secure profile modification capabilities
- **Password Management**: Reset and change password functionality with email notifications

### 🏥 Campaign Management
- **Campaign Creation**: Create and manage blood donation campaigns
- **Campaign History**: Track past and ongoing campaigns
- **Event Scheduling**: Date and time management for donation events
- **Location Management**: Address and venue tracking

### 🩸 Blood Stock Management
- **Inventory Tracking**: Real-time blood stock monitoring across all blood types (A+, A-, B+, B-, AB+, AB-, O+, O-)
- **Hospital-wise Stock**: Track blood inventory by hospital and district
- **Campaign-based Stock**: Link blood collection to specific campaigns
- **Stock Updates**: Add and update blood units with detailed notes

### 💉 Donation Process
- **Eligibility Assessment**: Comprehensive donor eligibility checking
- **Medical History**: Detailed medical background recording
- **Risk Assessment**: Medical risk evaluation and documentation
- **Consent Management**: Digital consent collection and storage
- **Donation Recording**: Complete donation transaction logging

### 📧 Communication
- **Email Notifications**: Automated email system for account creation, password resets
- **Campaign Requests**: Email-based campaign request system
- **HTML Email Templates**: Professional email formatting

## 🛠️ Technology Stack

- **Framework**: Ballerina Swan Lake
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: SMTP integration
- **Security**: SHA-256 password hashing with salt
- **Architecture**: RESTful API with CORS support

## 📁 Project Structure

```
BBMS_backend/
├── main.bal                 # Main service endpoints and HTTP listeners
├── database.bal            # Database configuration and connection
├── types.bal               # Type definitions and data models
├── utils.bal               # Utility functions (JWT, encryption, email)
├── donor_service.bal       # Donor management operations
├── hospital_service.bal    # Hospital management operations
├── campaign_service.bal    # Campaign management operations
├── bloodStock_service.bal  # Blood inventory management
├── donation_service.bal    # Donation transaction handling
├── donationform.bal        # Donation eligibility and consent forms
├── password_service.bal    # Authentication and password management
└── Config.toml            # Configuration file (not included in repo)
```

## 🚀 Getting Started

### Prerequisites
- Ballerina Swan Lake (latest version)
- MySQL Server
- SMTP email account for notifications

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BBMS_backend
   ```

2. **Configure the database**
   Create a `Config.toml` file in the root directory:
   ```toml
   HOST = "localhost"
   PORT = 3306
   USER = "your_db_user"
   PASSWORD = "your_db_password"
   DATABASE = "bbms_database"
   JWT_SECRET = "your_super_secret_jwt_key_here"
   ```

3. **Set up the database**
   - Create a MySQL database named `bbms_database`
   - Run the SQL scripts to create necessary tables (tables: doner, hospital, campaign, bloodstocks, donates, login, eligibility, donationhistory, medicalrisk, consent)

4. **Install dependencies**
   ```bash
   bal build
   ```

5. **Run the application**
   ```bash
   bal run
   ```

The server will start on `http://localhost:9191`

## 📚 API Endpoints

### Authentication
- `POST /login` - User authentication
- `POST /forgotpassword` - Password reset request

### User Management
- `POST /donorReg` - Register new donor
- `POST /hospitalReg` - Register new hospital (Admin only)
- `GET /dashboard?user_id={id}&user_type={type}` - Get user profile
- `PUT /dashboard?user_id={id}&user_type={type}` - Update user profile

### Campaign Management
- `POST /dashboard/campReg` - Create new campaign
- `GET /dashboard/campaigns?date={date}&district={district}` - Get campaigns
- `GET /dashboard/CampaignHistory?user_id={id}` - Get campaign history
- `GET /dashboard/addBloodCampaigns?hospital={id}` - Get hospital campaigns

### Blood Stock Management
- `GET /dashboard/bloodStock?district={district}&hospital={hospital}` - Get blood stock
- `POST /dashboard/addBlood` - Add blood stock

### Donation Process
- `POST /donates` - Search donor for donation
- `POST /donations` - Record donation
- `POST /eligibility` - Submit eligibility form
- `POST /donationHis` - Submit donation history
- `POST /medicalRisk` - Submit medical risk assessment
- `POST /consent` - Submit consent form

### Utility
- `POST /campaignRequest` - Submit campaign request
- `GET /dashboard/donations?user_id={id}` - Get donation history
- `GET /dashboard/donor?donor_id={id}` - Get donor details

## 🔒 Security Features

- **JWT Authentication**: All protected endpoints require valid JWT tokens
- **Password Hashing**: SHA-256 with random salt for secure password storage
- **CORS Configuration**: Properly configured for frontend integration
- **Role-based Access**: Different permissions for Donors, Hospitals, and Admins
- **Input Validation**: Comprehensive data validation and sanitization

## 📧 Email Configuration

The system uses SMTP for email notifications. Configure your email settings in the `utils.bal` file:

```ballerina
email:SmtpClient smtpClient = check new (
    host = "smtp.gmail.com",
    port = 465,
    username = "your_email@gmail.com",
    password = "your_app_password"
);
```

## 🗄️ Database Schema

The system uses the following main tables:
- `doner` - Donor information
- `hospital` - Hospital details
- `campaign` - Blood donation campaigns
- `bloodstocks` - Blood inventory
- `donates` - Donation transactions
- `login` - Authentication credentials
- `eligibility` - Donor eligibility records
- `donationhistory` - Medical history
- `medicalrisk` - Risk assessments
- `consent` - Consent records

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

## 🔄 Version History

- **v1.0.0** - Initial release with core functionality
  - User management (Donors & Hospitals)
  - Campaign management
  - Blood stock tracking
  - Donation process workflow
  - JWT authentication
  - Email notifications

---

**Built with ❤️ using Ballerina Swan Lake**
