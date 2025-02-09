function generateQRCode() {
    const coordinates = "35.170476190861166, -6.1425228817234965";
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${coordinates}`;
    
    const qrcode = new QRCode(document.getElementById("qrcode"), {
        text: mapsUrl,
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.L // Changed from H to L for faster generation
    });
}

document.addEventListener('DOMContentLoaded', generateQRCode);