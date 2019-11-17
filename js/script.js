var map = L.map('map').setView([69.95, -61.52], 3);

function getColor(Pole) {
	if(Pole === 'ZFI') {
		return 'deepskyblue';
	} else if(Pole === 'Greenland') {
		return 'blue';
	} else if(Pole === 'Iceland') {
		return 'aqua';
	} else if(Pole === 'Baffinov land') {
		return 'dodgerblue';
	}
};

function style(feature) {
	console.log(getColor(feature.properties.Pole), feature.properties.Pole);
	return {
		fillColor: getColor(feature.properties.Pole),
		weight: 2,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.85
	};
}
var data_layer = L.geoJSON(data, {
	style: style
}).addTo(map);
data_layer.bindPopup(function(layer) {
	return L.Util.template('<p>This is <strong>{Pole}</strong>.</p>', layer.feature.properties);
});
const apiLink = 'https://api.mapbox.com/styles/v1/ekaterina2019/ck2op43ic0bz51cqu9ajv0wba/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZWthdGVyaW5hMjAxOSIsImEiOiJjazJvbXM4MWMweTR3M2xuemk2YTZlYmpxIn0.puBr8i6MeMTvDavmoYGq4w';
var layer = L.tileLayer(apiLink).addTo(map);
var layerLabels;

function setBasemap(basemap) {
	if(layer) {
		map.removeLayer(layer);
	}
	if(basemap === 'DerkachMap') {
		layer = L.tileLayer(apiLink);
	} else {
		layer = L.esri.basemapLayer(basemap);
	}
	map.addLayer(layer);
	layer = L.tileLayer(basemap);
	map.addLayer(layer);
	if(layerLabels) {
		map.removeLayer(layerLabels);
	}
	if(basemap === 'ShadedRelief' || basemap === 'Oceans' || basemap === 'Gray' || basemap === 'DarkGray' || basemap === 'Terrain') {
		layerLabels = L.esri.basemapLayer(basemap + 'Labels');
		map.addLayer(layerLabels);
	} else if(basemap.includes('Imagery')) {
		layerLabels = L.esri.basemapLayer('ImageryLabels');
		map.addLayer(layerLabels);
	}
}
document.querySelector('#basemaps').addEventListener('change', function(e) {
	var basemap = e.target.value;
	setBasemap(basemap);
});