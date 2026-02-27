const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { appendData, readData } = require("../utils/fileStore");
const { validate, contactSchema } = require("../middleware/validate");

const CONTACTS_FILE = "contacts.json";

/**
 * POST /api/contact
 * Submit a contact form. Validates input and persists to contacts.json.
 */
router.post("/", validate(contactSchema), (req, res) => {
    const { firstName, lastName, email, phone, service, message } = req.body;

    const contact = {
        id: uuidv4(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : "",
        service: service || "",
        message: message.trim(),
        submittedAt: new Date().toISOString(),
        read: false,
    };

    appendData(CONTACTS_FILE, contact);

    console.log(`[contact] New message from ${contact.firstName} ${contact.lastName} <${contact.email}>`);

    res.status(201).json({
        success: true,
        message: "Message received successfully! We'll get back to you within 24 hours.",
        contactId: contact.id,
    });
});

/**
 * GET /api/contacts
 * List all contact submissions (admin use).
 */
router.get("/", (req, res) => {
    const contacts = readData(CONTACTS_FILE);

    res.json({
        success: true,
        count: contacts.length,
        contacts: contacts.reverse(), // newest first
    });
});

module.exports = router;
