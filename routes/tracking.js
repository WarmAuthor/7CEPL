const express = require("express");
const router = express.Router();
const { readData, findByKey } = require("../utils/fileStore");

const SHIPMENTS_FILE = "shipments.json";

/**
 * GET /api/track/:id
 * Look up a shipment by tracking ID. Returns full shipment details with timeline.
 */
router.get("/:id", (req, res) => {
    const trackingId = req.params.id.trim().toUpperCase();

    if (!trackingId) {
        return res.status(400).json({ success: false, message: "Tracking ID is required." });
    }

    const shipment = findByKey(SHIPMENTS_FILE, "id", trackingId);

    if (!shipment) {
        return res.status(404).json({ success: false, message: "Tracking ID not found." });
    }

    res.json({
        success: true,
        shipment,
    });
});

/**
 * GET /api/shipments
 * List all shipments (admin use). Supports optional ?status= filter.
 */
router.get("/", (req, res) => {
    let shipments = readData(SHIPMENTS_FILE);

    // Optional status filter
    if (req.query.status) {
        const status = req.query.status.toLowerCase();
        shipments = shipments.filter((s) => s.status.toLowerCase() === status);
    }

    // Optional service type filter
    if (req.query.serviceType) {
        const serviceType = req.query.serviceType.toLowerCase();
        shipments = shipments.filter((s) => (s.serviceType || "").toLowerCase() === serviceType);
    }

    res.json({
        success: true,
        count: shipments.length,
        shipments,
    });
});

module.exports = router;
