/**
 * Validation middleware factory.
 * Takes a schema object and returns Express middleware.
 *
 * Schema format:
 *   { fieldName: { required: true, type: 'string', label: 'Field Name', pattern: /regex/ } }
 */

function validate(schema) {
    return (req, res, next) => {
        const errors = [];

        for (const [field, rules] of Object.entries(schema)) {
            const value = req.body[field];

            // Required check
            if (rules.required && (value === undefined || value === null || String(value).trim() === "")) {
                errors.push(`${rules.label || field} is required.`);
                continue;
            }

            // Skip further checks if field is optional and empty
            if (value === undefined || value === null || String(value).trim() === "") continue;

            // Type check
            if (rules.type && typeof value !== rules.type) {
                errors.push(`${rules.label || field} must be a ${rules.type}.`);
            }

            // Pattern check (e.g. email)
            if (rules.pattern && !rules.pattern.test(String(value))) {
                errors.push(`${rules.label || field} is invalid.`);
            }

            // Min length
            if (rules.minLength && String(value).length < rules.minLength) {
                errors.push(`${rules.label || field} must be at least ${rules.minLength} characters.`);
            }

            // Max length
            if (rules.maxLength && String(value).length > rules.maxLength) {
                errors.push(`${rules.label || field} must be at most ${rules.maxLength} characters.`);
            }

            // Min value (for numbers)
            if (rules.min !== undefined && Number(value) < rules.min) {
                errors.push(`${rules.label || field} must be at least ${rules.min}.`);
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({ success: false, errors });
        }

        next();
    };
}

// ─── Pre-built schemas ───

const contactSchema = {
    firstName: { required: true, type: "string", label: "First name", minLength: 1, maxLength: 100 },
    lastName: { required: true, type: "string", label: "Last name", minLength: 1, maxLength: 100 },
    email: { required: true, type: "string", label: "Email", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    phone: { required: false, type: "string", label: "Phone" },
    service: { required: false, type: "string", label: "Service" },
    message: { required: true, type: "string", label: "Message", minLength: 5, maxLength: 5000 },
};

const quoteSchema = {
    name: { required: true, type: "string", label: "Name", minLength: 2, maxLength: 200 },
    email: { required: true, type: "string", label: "Email", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    phone: { required: false, type: "string", label: "Phone" },
    origin: { required: true, type: "string", label: "Origin" },
    destination: { required: true, type: "string", label: "Destination" },
    cargoType: { required: true, type: "string", label: "Cargo type" },
    weight: { required: false, label: "Weight (kg)" },
    serviceType: { required: true, type: "string", label: "Service type" },
    notes: { required: false, type: "string", label: "Notes", maxLength: 5000 },
};

const shipmentSchema = {
    origin: { required: true, type: "string", label: "Origin" },
    destination: { required: true, type: "string", label: "Destination" },
    status: { required: true, type: "string", label: "Status" },
    estimatedDelivery: { required: true, type: "string", label: "Estimated delivery" },
    serviceType: { required: false, type: "string", label: "Service type" },
    cargoType: { required: false, type: "string", label: "Cargo type" },
    weight: { required: false, label: "Weight (kg)" },
    customerName: { required: false, type: "string", label: "Customer name" },
    customerEmail: { required: false, type: "string", label: "Customer email" },
};

module.exports = {
    validate,
    contactSchema,
    quoteSchema,
    shipmentSchema,
};
