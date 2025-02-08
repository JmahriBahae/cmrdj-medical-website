function openGoogleMaps() {
    const address = "Centre de Dialyse Jmahri, n 248 rue noisette lotissement, Larache 92000, Morocco";
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
}

function initMap() {
    const location = { lat: 35.1931, lng: -6.1558 }; // Larache coordinates
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: location,
    });

    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'CMRD JMAHRI'
    });
}

function generateContactQR() {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:CMRD JMAHRI
ORG:Centre de maladies rénales et dialyse jmahri
TEL:+212539914376
EMAIL:cmrd.jmahri@gmail.com
ADR:n 248 rue noisette lotissement, Larache 92000, Morocco
END:VCARD`;

    const qr = qrcode(0, 'M');
    qr.addData(vcard);
    qr.make();
    document.getElementById('qrcode').innerHTML = qr.createImgTag(4);
}

document.addEventListener('DOMContentLoaded', () => {
    initMap();
    generateContactQR();
});