const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { appendData, readData } = require("../utils/fileStore");
const { validate, quoteSchema } = require("../middleware/validate");

const QUOTES_FILE = "quotes.json";

/**
 * POST /api/quote
 * Submit a quote request. Validates input and persists to quotes.json.
 */
router.post("/", validate(quoteSchema), (req, res) => {
    const { name, email, phone, origin, destination, cargoType, weight, serviceType, notes } = req.body;

    const quote = {
        id: uuidv4(),
        quoteRef: `QR-${Date.now().toString(36).toUpperCase()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : "",
        origin: origin.trim(),
        destination: destination.trim(),
        cargoType: cargoType.trim(),
        weight: weight || null,
        serviceType: serviceType.trim(),
        notes: notes ? notes.trim() : "",
        status: "Pending",
        submittedAt: new Date().toISOString(),
    };

    appendData(QUOTES_FILE, quote);

    console.log(`[quote] New quote request ${quote.quoteRef} from ${quote.name} <${quote.email}>`);

    res.status(201).json({
        success: true,
        message: "Quote request received! Our team will contact you shortly with a detailed quote.",
        quoteRef: quote.quoteRef,
    });
});

/**
 * GET /api/quotes
 * List all quote requests (admin use).
 */
router.get("/", (req, res) => {
    let quotes = readData(QUOTES_FILE);

    // Optional status filter
    if (req.query.status) {
        const status = req.query.status.toLowerCase();
        quotes = quotes.filter((q) => q.status.toLowerCase() === status);
    }

    res.json({
        success: true,
        count: quotes.length,
        quotes: quotes.reverse(), // newest first
    });
});

module.exports = router;
