require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const path = require("path");

const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");

// ─── Route modules ───
const trackingRoutes = require("./routes/tracking");
const contactRoutes = require("./routes/contact");
const quoteRoutes = require("./routes/quote");
const adminRoutes = require("./routes/admin");

// ─── App Setup ───
const app = express();
const PORT = process.env.PORT || 3000;

// ─── Security Middleware ───
app.use(
    helmet({
        contentSecurityPolicy: false, // Allow inline scripts in HTML
        crossOriginEmbedderPolicy: false,
    })
);

// ─── CORS ───
app.use(cors());

// ─── Request Logging ───
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// ─── Body Parsing ───
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// ─── Rate Limiting (API routes only) ───
const apiLimiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
    message: {
        success: false,
        message: "Too many requests. Please try again later.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use("/api/", apiLimiter);

// ─── Static Files ───
app.use(express.static(path.join(__dirname, "public")));

// ─── API Routes ───
app.use("/api/track", trackingRoutes);
app.use("/api/shipments", trackingRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/quote", quoteRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/admin", adminRoutes);

// ─── 404 & Error Handling ───
app.use(notFoundHandler);
app.use(errorHandler);

// ─── Start Server ───
app.listen(PORT, () => {
    console.log(`\n🚀 7CEPL Server running on http://localhost:${PORT}`);
    console.log(`   Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`   API Base:    http://localhost:${PORT}/api\n`);
    console.log("   Available endpoints:");
    console.log("   ├─ GET    /api/track/:id       — Track a shipment");
    console.log("   ├─ GET    /api/shipments        — List all shipments");
    console.log("   ├─ POST   /api/contact          — Submit contact form");
    console.log("   ├─ GET    /api/contacts          — List contact submissions");
    console.log("   ├─ POST   /api/quote            — Submit quote request");
    console.log("   ├─ GET    /api/quotes            — List quote requests");
    console.log("   ├─ POST   /api/admin/shipments  — Create shipment (admin)");
    console.log("   ├─ PUT    /api/admin/shipments/:id — Update shipment (admin)");
    console.log("   └─ DELETE /api/admin/shipments/:id — Delete shipment (admin)\n");
});

module.exports = app;