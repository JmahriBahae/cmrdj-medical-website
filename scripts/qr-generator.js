function generateQRCode() {
    const mapsUrl = "https://www.google.com/maps/search/?api=1&query=n+248+rue+noisette+lotissement+Larache+92000+Maroc+Centre+de+Dialyse+Jmahri";
    
    const qrcode = new QRCode(document.getElementById("qrcode"), {
        text: mapsUrl,
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.L
    });
}

document.addEventListener('DOMContentLoaded', generateQRCode);