(function() {
    const lat = document.querySelector('#lat').value || 37.982436; //logical OR porque el value del documento si no se ha asignado es '' y no null
    const lng = document.querySelector('#lng').value || -1.128787;
    const mapa = L.map('mapa').setView([lat, lng ], 16);
    let marker;
    
    //utilizar provider y geocoder
    const geocodeService = L.esri.Geocoding.geocodeService()

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    //El pin

    marker = new L.marker([lat,lng],{
        draggable: true, //puede moverse
        autoPan: true //se centra el mapa al mover el pin
    }).addTo(mapa)

    //detectar movimiento
    marker.on('moveend', function(e){
        marker = e.target
        //obtener lat y lng del pin
        const posicion = marker.getLatLng()       
        mapa.panTo(new L.LatLng(posicion.lat, posicion.lng))

        //obtener info de calles 
        geocodeService.reverse().latlng(posicion,12).run(function(error, resultado){
            marker.bindPopup(resultado.address.LongLabel)

            document.querySelector('.calle').textContent = resultado?.address?.Address ?? ""
            document.querySelector('#calle').value = resultado?.address?.Address ?? ""
            document.querySelector('#lat').value = resultado?.latlng?.lat ?? ""
            document.querySelector('#lng').value = resultado?.latlng?.lng ?? ""
        })

    })

})()