/**
 * Global error handling middleware.
 * Catches unhandled errors and returns consistent JSON responses.
 */

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
    console.error(`[ERROR] ${err.stack || err.message || err}`);

    const statusCode = err.statusCode || 500;
    const message =
        process.env.NODE_ENV === "production"
            ? "An internal server error occurred."
            : err.message || "An internal server error occurred.";

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
    });
}

/**
 * 404 handler for unmatched API routes.
 */
function notFoundHandler(req, res, next) {
    // Only handle /api/* routes as 404, let static files fall through
    if (req.path.startsWith("/api/")) {
        return res.status(404).json({
            success: false,
            message: `API endpoint not found: ${req.method} ${req.path}`,
        });
    }
    next();
}

module.exports = { errorHandler, notFoundHandler };
