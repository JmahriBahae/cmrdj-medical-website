function generateQRCode() {
    const address = "Centre de Dialyse Jmahri, n 248 rue noisette lotissement, Larache 92000, Morocco";
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
    
    const qrcode = new QRCode(document.getElementById("qrcode"), {
        text: mapsUrl,
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

document.addEventListener('DOMContentLoaded', generateQRCode);