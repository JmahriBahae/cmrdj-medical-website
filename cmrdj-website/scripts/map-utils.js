function openGoogleMaps() {
    const address = "248 rue noisette lotissement, Larache 92000, Morocco";
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
}

// Generate QR Code when page loads
document.addEventListener('DOMContentLoaded', function() {
    try {
        const address = "248 rue noisette lotissement, Larache 92000, Morocco";
        const qr = qrcode(0, 'M');
        qr.addData(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`);
        qr.make();
        
        const qrcodeDiv = document.getElementById('qrcode');
        if (qrcodeDiv) {
            qrcodeDiv.innerHTML = qr.createImgTag(4);
        }
    } catch (error) {
        console.error('Error generating QR code:', error);
    }
});