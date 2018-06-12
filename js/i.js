var highlightLayer;
        function highlightFeature(e) {
            highlightLayer = e.target;

            if (e.target.feature.geometry.type === 'LineString') {
              highlightLayer.setStyle({
                color: '#ffff00',
              });
            } else {
              highlightLayer.setStyle({
                fillColor: '#ffff00',
                fillOpacity: 1
              });
            }
            highlightLayer.openPopup();
        }
        var map = L.map('map', {
            zoomControl:true, maxZoom:21, minZoom:1
        }).fitBounds([[14.0471419861,76.1843008714],[14.0475410523,76.185065252]]);
        var hash = new L.Hash(map);
        map.attributionControl.addAttribution('<a href="" target="_blank">WEB</a>');
        L.control.locate().addTo(map);
        var measureControl = new L.Control.Measure({
            primaryLengthUnit: 'meters',
            secondaryLengthUnit: 'kilometers',
            primaryAreaUnit: 'sqmeters',
            secondaryAreaUnit: 'hectares'
        });
        measureControl.addTo(map);
        var bounds_group = new L.featureGroup([]);
        var GoogleStreet =
          L.tileLayer('http://www.google.com/maps/vt?lyrs=m@189&gl=com&x={x}&y={y}&z={z}', {
            attribution: 'Imagery © <a href="http://maps.google.com">Google</a>',
            maxZoom: 21
          })
        var GoogleSatellite =
          L.tileLayer('http://www.google.com/maps/vt?lyrs=s@189&gl=com&x={x}&y={y}&z={z}', {
            attribution: 'Imagery © <a href="http://maps.google.com">Google</a>',
            maxZoom: 21
          })
        var GoogleHybrid =
          L.tileLayer('http://www.google.com/maps/vt?lyrs=s,h@189&gl=com&x={x}&y={y}&z={z}', {
            attribution: 'Imagery © <a href="http://maps.google.com">Google</a>',
            maxZoom: 21
          })
        map.addLayer(GoogleStreet);
        var Bengaluru =
          L.tileLayer('data/BASE MAP Nayakanahatti/{z}/{x}/{y}.png', {
            opacity: 0.30,
            transparent: true,
	    tms: false,
            attribution: 'Imagery © <a href=" ">A</a>',
            maxZoom: 16
          }).addTo(map)
        function popUp(feature, layer) {
    	layer.bindPopup(feature.properties.name);
  	}

  	var geojsonLayer = new L.GeoJSON.AJAX("data/SriBayaluGanaptiTemple.geojson", {onEachFeature:popUp});
        geojsonLayer.addTo(map);
        var osmGeocoder = new L.Control.OSMGeocoder({
            collapsed: true,
            position: 'topright',
            text: 'Search',
        });
        osmGeocoder.addTo(map);
	var c = new L.Control.Coordinates();
	c.addTo(map);

	function onMapClick(e) {
		c.setCoordinates(e);
	}
	map.on('click', onMapClick);
        var baseMaps = {'GoogleStreet': GoogleStreet,
            'GoogleSatellite': GoogleSatellite,
            'GoogleHybrid': GoogleHybrid
        };
        var overlayLayers = {
	        'Bengaluru': Bengaluru,
	        '<img src="legend/SribayaluGanaptiTemple_0.png" /> Sri bayalu Ganapti Temple': geojsonLayer
        }
        L.control.layers(baseMaps, overlayLayers,{collapsed:false}).addTo(map);
