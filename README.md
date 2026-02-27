# 7CEPL — Global Logistics Solutions

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

> **7 Continents Express Pvt Ltd** — A premium, modern website with a production-grade backend for a global logistics and freight forwarding company, built with Node.js, Express, and vanilla HTML/CSS/JS.

---

## 🌍 Overview

7CEPL is a full-service logistics company offering air freight, ocean freight, ground shipping, warehousing, customs clearance, and express delivery services across all seven continents. This repository contains the complete source code for the company's official website with a modular backend API, featuring shipment tracking with timeline history, a contact form with data persistence, a quote request system, and a protected admin API.

---

## ✨ Features

### Frontend
- **🏠 Home Page** — Hero section with animated elements, service highlights, statistics, testimonials, and call-to-action sections
- **📦 Shipment Tracking** — Real-time tracking with visual progress stepper and detailed timeline history
- **🛠️ Services Page** — Detailed overview of 6 logistics services
- **📖 About Page** — Company story, mission, team, and timeline
- **📬 Contact Page** — Contact form with server-side validation and error display
- **🎨 Premium UI** — Modern glassmorphism design, smooth scroll animations, responsive layout

### Backend
- **📡 Tracking API** — Enriched shipment data with full location timeline
- **📨 Contact API** — Validated form submissions persisted to JSON storage
- **💰 Quote API** — Quote request submissions with validation
- **🔐 Admin API** — CRUD operations for shipments with API key authentication
- **🛡️ Security** — Helmet headers, CORS, rate limiting, input validation
- **📝 Logging** — HTTP request logging with Morgan

---

## 🗂️ Project Structure

```
7CEPL/
├── server.js                # Express server entry point
├── package.json             # Dependencies & scripts
├── .env                     # Environment config (not committed)
├── routes/
│   ├── tracking.js          # GET /api/track/:id, GET /api/shipments
│   ├── contact.js           # POST /api/contact, GET /api/contacts
│   ├── quote.js             # POST /api/quote, GET /api/quotes
│   └── admin.js             # Admin CRUD (API key protected)
├── middleware/
│   ├── validate.js          # Schema-based input validation
│   ├── auth.js              # API key authentication
│   └── errorHandler.js      # Global error handling & 404
├── utils/
│   └── fileStore.js         # JSON file CRUD utility
├── data/
│   ├── shipments.json       # Shipment records with timelines
│   ├── contacts.json        # Contact form submissions
│   └── quotes.json          # Quote requests
├── public/
│   ├── index.html           # Home page
│   ├── about.html           # About page
│   ├── services.html        # Services page
│   ├── tracking.html        # Shipment tracking page
│   ├── contact.html         # Contact page
│   ├── css/style.css        # Global stylesheet
│   ├── js/
│   │   ├── script.js        # Main scripts
│   │   └── animations.js    # Scroll & UI animations
│   └── images/              # Website images & assets
├── README.md
├── CONTRIBUTING.md
└── LICENSE
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/WarmAuthor/7CEPL.git
   cd 7CEPL
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment** — Create a `.env` file in the root:
   ```env
   PORT=3000
   NODE_ENV=development
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX=100
   ADMIN_API_KEY=your-secret-api-key
   ```

4. **Start the server**
   ```bash
   # Development (auto-restart on changes)
   npm run dev

   # Production
   npm start
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 🔌 API Endpoints

| Method   | Endpoint                     | Auth    | Description                         |
|----------|------------------------------|---------|-------------------------------------|
| `GET`    | `/api/track/:id`             | —       | Track a shipment by tracking ID     |
| `GET`    | `/api/shipments`             | —       | List all shipments (filterable)     |
| `POST`   | `/api/contact`               | —       | Submit a contact form message       |
| `GET`    | `/api/contacts`              | —       | List all contact submissions        |
| `POST`   | `/api/quote`                 | —       | Submit a quote request              |
| `GET`    | `/api/quotes`                | —       | List all quote requests             |
| `POST`   | `/api/admin/shipments`       | API Key | Create a new shipment               |
| `PUT`    | `/api/admin/shipments/:id`   | API Key | Update shipment status & timeline   |
| `DELETE` | `/api/admin/shipments/:id`   | API Key | Delete a shipment                   |

### Example: Track a Shipment

```bash
curl http://localhost:3000/api/track/7CEPL12345
```

**Response:**
```json
{
    "success": true,
    "shipment": {
        "id": "7CEPL12345",
        "status": "In Transit",
        "origin": "Ahmedabad, India",
        "destination": "London, UK",
        "estimatedDelivery": "2026-03-05",
        "serviceType": "Air Freight",
        "cargoType": "Electronics",
        "weight": 850,
        "currentLocation": "Dubai International Airport, UAE",
        "timeline": [
            {
                "status": "Picked Up",
                "location": "Ahmedabad, India",
                "timestamp": "2026-02-20T09:00:00.000Z",
                "description": "Shipment picked up from warehouse."
            }
        ]
    }
}
```

### Example: Submit a Contact Form

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","message":"I need a quote for shipping to London."}'
```

### Example: Admin — Update Shipment Status

```bash
curl -X PUT http://localhost:3000/api/admin/shipments/7CEPL12345 \
  -H "x-api-key: your-secret-api-key" \
  -H "Content-Type: application/json" \
  -d '{"status":"At Customs","location":"London Heathrow","description":"Customs inspection in progress"}'
```

---

## 🛠️ Tech Stack

| Layer       | Technology                                      |
|-------------|--------------------------------------------------|
| Runtime     | Node.js v18+                                    |
| Framework   | Express.js 4.x                                  |
| Security    | Helmet, express-rate-limit, CORS                |
| Validation  | Custom schema-based middleware                   |
| Auth        | API key authentication (admin routes)           |
| Logging     | Morgan                                          |
| Data        | JSON file-based storage                          |
| IDs         | UUID v4                                         |
| Frontend    | HTML5, CSS3, Vanilla JavaScript                  |
| Config      | dotenv                                          |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📧 Contact

**7 Continents Express Pvt Ltd**  
📍 Ahmedabad, Gujarat, India  
🌐 [www.7cepl.com](https://www.7cepl.com)

---

<p align="center">Made with ❤️ by 7CEPL Team</p>
