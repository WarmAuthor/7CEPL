const fs = require("fs");
const path = require("path");

/**
 * Simple JSON file-based data store.
 * Reads, writes, and appends data to JSON files in the /data directory.
 */

const DATA_DIR = path.join(__dirname, "..", "data");

function ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
}

function resolvePath(filename) {
    return path.join(DATA_DIR, filename);
}

/**
 * Read and parse a JSON data file.
 * Returns an empty array if the file doesn't exist.
 */
function readData(filename) {
    const filePath = resolvePath(filename);
    try {
        if (!fs.existsSync(filePath)) return [];
        const raw = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(raw);
    } catch (err) {
        console.error(`[fileStore] Error reading ${filename}:`, err.message);
        return [];
    }
}

/**
 * Write data (array or object) to a JSON file.
 */
function writeData(filename, data) {
    ensureDataDir();
    const filePath = resolvePath(filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4), "utf-8");
}

/**
 * Append a single item to a JSON array file.
 */
function appendData(filename, item) {
    const data = readData(filename);
    data.push(item);
    writeData(filename, data);
    return data;
}

/**
 * Find an item by a key-value pair in a JSON array file.
 */
function findByKey(filename, key, value) {
    const data = readData(filename);
    return data.find((item) => item[key] === value) || null;
}

/**
 * Update an item in a JSON array file by key match.
 * Returns the updated item or null if not found.
 */
function updateByKey(filename, key, value, updates) {
    const data = readData(filename);
    const index = data.findIndex((item) => item[key] === value);
    if (index === -1) return null;
    data[index] = { ...data[index], ...updates };
    writeData(filename, data);
    return data[index];
}

/**
 * Delete an item from a JSON array file by key match.
 * Returns true if deleted, false if not found.
 */
function deleteByKey(filename, key, value) {
    const data = readData(filename);
    const index = data.findIndex((item) => item[key] === value);
    if (index === -1) return false;
    data.splice(index, 1);
    writeData(filename, data);
    return true;
}

module.exports = {
    readData,
    writeData,
    appendData,
    findByKey,
    updateByKey,
    deleteByKey,
};
