const locations =JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken = 'pk.eyJ1IjoiaGFzc2FuamFya28iLCJhIjoiY2p0NjNiYmp6MDZucDQ5cGhyYXY5Mzd3ZSJ9.ICz8qk27sMXcQRrpDd0AgQ';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/hassanjarko/ck6awdoi90yih1io0sgzlrja9',
    // center:[55.506671,25.413729],
    // zoom:12,
    
});

const bounds = new mapboxgl.LngLatBounds();

    locations.forEach(loc =>{
    //create Marker
    const el = document.createElement('div')
    el.className = 'marker';
    //add Marker
    new mapboxgl.Marker({
        element:el,
        anchor:'bottom'
    }).setLngLat(loc.coordinates).addTo(map);
    //add pop up message
    // new mapboxgl.Popup()
    // .setLngLat(loc.coordinates)
    // .setHTML(`<p>${loc.coordinates}</p>`)
    // .addTo(map);

    //extend map bounds to include current location
    bounds.extend(loc.coordinates);
});

map.fitBounds(bounds,{zoom:15},{
    padding:{
        top:200,
        bottom:200,
        left:100,
        right:100
    }
});