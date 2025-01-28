(function(){
    const lat =  37.982436; //logical OR porque el value del documento si no se ha asignado es '' y no null
    const lng =  -1.128787;
    const mapa = L.map('mapa-inicio').setView([lat, lng ], 9);

    let markers = new L.FeatureGroup().addTo(mapa);
    
    let propiedades = [];
    //Filtros

    const filtros = {
        categoria: '',
        precio: '',
    }

    const categoriasSelect = document.querySelector('#categorias');
    const preciosSelect = document.querySelector('#precios');

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    //Filtrado por precios y categorias
    categoriasSelect.addEventListener('change', e => {
        filtros.categoria = +e.target.value;
        filtrarPropiedades();
       
    })
    preciosSelect.addEventListener('change', e => {
        filtros.precio = +e.target.value;
        filtrarPropiedades();
    })


    const obtenerPropiedades = async () => {
        try {
            const url = '/api/propiedades';
            const respuesta = await fetch(url);
            propiedades = await respuesta.json();

            mostrarPropiedades(propiedades)  

        } catch (error) {

            console.log(error)
        }
    }
    obtenerPropiedades();

    const mostrarPropiedades = propiedades => {

        //limpiar los markers
        markers.clearLayers();
       // console.log(propiedades.propiedades)  
        propiedades.forEach(propiedad => {
            //agregar los pines
            
            const marker = new L.marker([propiedad.lat, propiedad.lng],{
                autoPan: true

            })
            .addTo(mapa)
            .bindPopup(`
                <p class="text-indigo-600 font-bold">${propiedad.categoria?.nombre}</p>
                <h1 class="text-xl font-extrabold uppercase my-2"> ${propiedad?.titulo}</h1>  
                <img src="/uploads/${propiedad?.img}" alt="imagen propiedad"> 
                <p class="text-gray-600 font-bold">${propiedad.precio?.precio}</p>               
                <a class="block bg-indigo-600 p-2 text-center font-bold text-white uppercase" href="/propiedad/${propiedad.id}">Ver más</a>
            `)

            markers.addLayer(marker);
        })
    }

    const filtrarPropiedades = () => {
        const resultado = propiedades.filter(filtrarCategoria).filter( filtrarPrecio )    
        console.log(resultado)
        //console.log(filtros.categoria)
        mostrarPropiedades(resultado)
    }
    const filtrarCategoria = propiedad => filtros.categoria ? propiedad.categoriaId === filtros.categoria : propiedad  
    const filtrarPrecio = propiedad => filtros.precio ? propiedad.precioId === filtros.precio : propiedad 
    


})()