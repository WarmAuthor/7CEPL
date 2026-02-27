const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/api/track/:id", (req, res) => {
    const trackingId = req.params.id;
    const shipments = JSON.parse(fs.readFileSync("./data/shipments.json"));
    const shipment = shipments.find(s => s.id === trackingId);

    if (shipment) {
        res.json(shipment);
    } else {
        res.status(404).json({ message: "Tracking ID not found" });
    }
});

app.post("/api/contact", (req, res) => {
    console.log("New Contact Message:", req.body);
    res.json({ message: "Message received successfully!" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});