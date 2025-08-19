# Smart Device Backend

Backend project for managing users, devices, and device data/analytics, built with **Node.js** and **Express**.

---

## Project Structure

smart-device-backend/
│
├── userManagement/ # User authentication & management
├── deviceManagement/ # Device registration & heartbeat
├── dataAnalytics/ # Device logs & usage analytics
├── app.js # Main server file
├── package.json
├── .gitignore
└── README.md


---

## Setup Instructions

1. Clone the repository:
git clone https://github.com/your-username/smart-device-backend.git
cd smart-device-backend

2. Install dependencies:
npm install

3. Create a .env file and add your environment variables:
PORT=8000
MONGO_URI=your_mongodb_connection_string

4. Start the server:
npm run dev
Server will run at: http://localhost:8000.

5. API Endpoints
User Management
POST /api/v1/users/register → Register a new user

POST /api/v1/users/login → Login user

Device Management
POST /api/v2/devices → Register new device

GET /api/v2/devices → List devices (filter by type, status)

PATCH /api/v2/devices/:id → Update device details

DELETE /api/v2/devices/:id → Remove device

POST /api/v2/devices/:id/heartbeat → Update last_active_at

Data & Analytics
POST /api/v3/devices/:id/logs → Create log entry

GET /api/v3/devices/:id/logs?limit=10 → Fetch last N logs

GET /api/v3/devices/:id/usage?range=24h → Get aggregated usage