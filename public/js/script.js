async function trackShipment() {
    const id = document.getElementById("trackingId").value;
    const resultDiv = document.getElementById("result");

    try {
        const response = await fetch(`/api/track/${id}`);
        const data = await response.json();

        if (response.ok) {
            resultDiv.innerHTML = `
        <p>Status: ${data.status}</p>
        <p>From: ${data.origin}</p>
        <p>To: ${data.destination}</p>
        <p>Estimated Delivery: ${data.estimatedDelivery}</p>
      `;
        } else {
            resultDiv.innerHTML = `<p>${data.message}</p>`;
        }
    } catch (error) {
        resultDiv.innerHTML = "<p>Error tracking shipment</p>";
    }
}