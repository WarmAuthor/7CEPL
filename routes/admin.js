const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { readData, writeData, findByKey, deleteByKey } = require("../utils/fileStore");
const { adminAuth } = require("../middleware/auth");
const { validate, shipmentSchema } = require("../middleware/validate");

const SHIPMENTS_FILE = "shipments.json";

// All admin routes require API key authentication
router.use(adminAuth);

/**
 * POST /api/admin/shipments
 * Create a new shipment.
 */
router.post("/shipments", validate(shipmentSchema), (req, res) => {
    const {
        origin,
        destination,
        status,
        estimatedDelivery,
        serviceType,
        cargoType,
        weight,
        customerName,
        customerEmail,
    } = req.body;

    const shipments = readData(SHIPMENTS_FILE);

    // Generate tracking ID: 7CEPL + 5 random uppercase alphanumeric chars
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let trackId = "7CEPL";
    for (let i = 0; i < 5; i++) trackId += chars.charAt(Math.floor(Math.random() * chars.length));

    const now = new Date().toISOString();

    const shipment = {
        id: trackId,
        status,
        origin: origin.trim(),
        destination: destination.trim(),
        estimatedDelivery,
        serviceType: serviceType || "Standard",
        cargoType: cargoType || "General Cargo",
        weight: weight || null,
        currentLocation: origin.trim(),
        customerName: customerName || "",
        customerEmail: customerEmail || "",
        createdAt: now,
        updatedAt: now,
        timeline: [
            {
                status,
                location: origin.trim(),
                timestamp: now,
                description: `Shipment created — ${status}`,
            },
        ],
    };

    shipments.push(shipment);
    writeData(SHIPMENTS_FILE, shipments);

    console.log(`[admin] Created shipment ${trackId}`);

    res.status(201).json({
        success: true,
        message: `Shipment ${trackId} created successfully.`,
        shipment,
    });
});

/**
 * PUT /api/admin/shipments/:id
 * Update a shipment's status. Automatically adds a timeline entry.
 */
router.put("/shipments/:id", (req, res) => {
    const trackingId = req.params.id.trim().toUpperCase();
    const { status, location, description, estimatedDelivery } = req.body;

    if (!status) {
        return res.status(400).json({ success: false, message: "Status is required." });
    }

    const shipments = readData(SHIPMENTS_FILE);
    const index = shipments.findIndex((s) => s.id === trackingId);

    if (index === -1) {
        return res.status(404).json({ success: false, message: "Shipment not found." });
    }

    const now = new Date().toISOString();
    const shipment = shipments[index];

    // Update fields
    shipment.status = status;
    shipment.updatedAt = now;
    if (location) shipment.currentLocation = location;
    if (estimatedDelivery) shipment.estimatedDelivery = estimatedDelivery;

    // Add timeline entry
    shipment.timeline = shipment.timeline || [];
    shipment.timeline.push({
        status,
        location: location || shipment.currentLocation,
        timestamp: now,
        description: description || `Status updated to "${status}"`,
    });

    shipments[index] = shipment;
    writeData(SHIPMENTS_FILE, shipments);

    console.log(`[admin] Updated shipment ${trackingId} → ${status}`);

    res.json({
        success: true,
        message: `Shipment ${trackingId} updated to "${status}".`,
        shipment,
    });
});

/**
 * DELETE /api/admin/shipments/:id
 * Remove a shipment.
 */
router.delete("/shipments/:id", (req, res) => {
    const trackingId = req.params.id.trim().toUpperCase();
    const deleted = deleteByKey(SHIPMENTS_FILE, "id", trackingId);

    if (!deleted) {
        return res.status(404).json({ success: false, message: "Shipment not found." });
    }

    console.log(`[admin] Deleted shipment ${trackingId}`);

    res.json({
        success: true,
        message: `Shipment ${trackingId} deleted.`,
    });
});

module.exports = router;
