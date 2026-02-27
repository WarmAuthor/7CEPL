# 7CEPL — Global Logistics Solutions

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

> **7 Continents Express Pvt Ltd** — A premium, modern website for a global logistics and freight forwarding company, built with Node.js, Express, and vanilla HTML/CSS/JS.

---

## 🌍 Overview

7CEPL is a full-service logistics company offering air freight, ocean freight, ground shipping, warehousing, and customs brokerage services across all seven continents. This repository contains the complete source code for the company's official website, featuring a sleek modern design with smooth animations and a fully functional shipment tracking system.

---

## ✨ Features

- **🏠 Home Page** — Hero section with animated elements, service highlights, statistics, testimonials, and call-to-action sections
- **📦 Shipment Tracking** — Real-time shipment tracking via unique tracking IDs (e.g., `7CEPL12345`)
- **🛠️ Services Page** — Detailed overview of logistics services offered
- **📖 About Page** — Company story, mission, team information
- **📬 Contact Page** — Contact form with server-side message handling
- **🎨 Premium UI** — Modern glassmorphism design, smooth scroll animations, responsive layout
- **⚡ REST API** — Backend API for shipment tracking and contact form submissions

---

## 🗂️ Project Structure

```
7CEPL/
├── server.js              # Express server (entry point)
├── package.json           # Node.js dependencies & scripts
├── data/
│   └── shipments.json     # Shipment tracking data
├── public/
│   ├── index.html         # Home page
│   ├── about.html         # About page
│   ├── services.html      # Services page
│   ├── tracking.html      # Shipment tracking page
│   ├── contact.html       # Contact page
│   ├── css/
│   │   └── style.css      # Global stylesheet
│   ├── js/
│   │   ├── script.js      # Main scripts
│   │   └── animations.js  # Scroll & UI animations
│   └── images/            # Website images & assets
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/7CEPL.git
   cd 7CEPL
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 🔌 API Endpoints

| Method | Endpoint            | Description                          |
|--------|---------------------|--------------------------------------|
| `GET`  | `/api/track/:id`    | Track a shipment by its tracking ID  |
| `POST` | `/api/contact`      | Submit a contact form message        |

### Example: Track a Shipment

```bash
curl http://localhost:3000/api/track/7CEPL12345
```

**Response:**
```json
{
    "id": "7CEPL12345",
    "status": "In Transit",
    "origin": "Ahmedabad, India",
    "destination": "London, UK",
    "estimatedDelivery": "2026-03-05"
}
```

---

## 🛠️ Tech Stack

| Layer      | Technology                |
|------------|---------------------------|
| Backend    | Node.js, Express.js       |
| Frontend   | HTML5, CSS3, JavaScript   |
| Middleware | body-parser, cors         |
| Data       | JSON (file-based storage) |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) for details on how to get started.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📧 Contact

**7 Continents Express Pvt Ltd**  
📍 Ahmedabad, India  
🌐 [www.7cepl.com](https://www.7cepl.com)

---

<p align="center">Made with ❤️ by 7CEPL Team</p>
