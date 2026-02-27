/**
 * Simple API key authentication middleware for admin routes.
 * Checks the x-api-key header against the ADMIN_API_KEY env variable.
 */

function adminAuth(req, res, next) {
    const apiKey = req.headers["x-api-key"];
    const validKey = process.env.ADMIN_API_KEY;

    if (!validKey) {
        console.error("[auth] ADMIN_API_KEY is not configured in .env");
        return res.status(500).json({ success: false, message: "Server authentication not configured." });
    }

    if (!apiKey) {
        return res.status(401).json({ success: false, message: "Missing API key. Provide x-api-key header." });
    }

    if (apiKey !== validKey) {
        return res.status(403).json({ success: false, message: "Invalid API key." });
    }

    next();
}

module.exports = { adminAuth };
