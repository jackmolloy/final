// Jack js


var mapKey = config.MAP_KEY;
var data;
var name = [];
var address = [];
var result = [];
var map;
var infoWindow;
var service;
var shopLocations = [];

// A $( document ).ready() block.
$( document ).ready(function() {
    // loadPlaces();
    initMap();

});


// TWITTER STUFF
function pageComplete(){
       $('.tweet').tweetLinkify();
   }


// function loadPlaces(){
//
//   $.ajax({
//           type:"GET",
//           url:"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=35.8941264,-78.9133741&radius=500&type=restaurant&key=AIzaSyBdg1bcYkhdNsId5_5IoBoNX-vkZHs41KM",
//           dataType:"json",
//           success: parseData
// });
//
//
// }
//
// function parseData(data){
//     console.log(data);
//
//
//     // for (var i = 0, len = places.results.length; i < len; ++i) {
//     //   // name[i] = places.results[i].name;
//     //   name.push(places[i]["name"]);
//     //
//     // }
//
//     for (i = 0; i < data.length; i++) {
//       // address[i] = myJSONResult.results[i].formatted_address;
//       result.push(data[i]["result"]);
//     }
//
//     console.log(result);
//
//
// }



function initMap() {
        var triangle = {lat: 35.899168, lng: -78.863640};
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 11,
          center: triangle,
          styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{ "visibility": "off" }]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{ "visibility": "off" }]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{ "visibility": "off" }]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{ "visibility": "off" }]
            },
            {
              featureType: 'road',
              elementType: 'labels.icon',
              stylers: [{ "visibility": "off" }]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{ "visibility": "off" }]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.icon',
              stylers: [{ "visibility": "off" }]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{ "visibility": "off" }]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{ "visibility": "off" }]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{ "visibility": "off" }]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
        });

        // var marker = new google.maps.Marker({
        //   position: triangle,
        //   map: map
        // });

        var request = {
          location: triangle,
          radius: 30,
          types: ['restaurant']
        }



        infoWindow = new google.maps.InfoWindow();
        service = new google.maps.places.PlacesService(map);

        map.addListener('idle', performSearch);


        // polyline found at: https://developers.google.com/maps/documentation/javascript/examples/polyline-simple
        var triangleCoordinates = [
          {lat: 35.779590, lng: -78.638179},
          {lat: 35.913200, lng: -79.055845},
          {lat: 35.994033, lng: -78.898619},
          {lat: 35.779590, lng: -78.638179},
        ];

        var trianglePath = new google.maps.Polyline({
          path: triangleCoordinates,
          geodesic: true,
          strokeColor: '#FFF',
          strokeOpacity: 0.65,
          strokeWeight: 1
        });

        trianglePath.setMap(map);

      }

      function performSearch() {
        var request = {
          bounds: map.getBounds(),
          keyword: 'coffee shop'
        };
        service.nearbySearch(request, callback);
      }

      // google.maps.event.addDomListener(window, 'load', initMap);


      function callback(results, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          console.error(status);
          return;
        }
        for (var i = 0; i < results.length; i++){
          var result = [];
          result = results[i];
          createMarker(result);
          // geoData(result);
          }
        }

        // function geoData(results) {
        //   for (var i = 0; i < results.length; i++){
        //     var shopLocations = [];
        //     result = results[i];
        //     shopLocations = results[i];
        //     }
        // }
        //
        // console.log(shopLocations);


        function createMarker(place) {
          var marker2 = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            icon: {
              url: 'https://developers.google.com/maps/documentation/javascript/images/circle.png',
              anchor: new google.maps.Point(10, 10),
              scaledSize: new google.maps.Size(10, 17)
            }
          })

          google.maps.event.addListener(marker2, 'click', function() {
            service.getDetails(place, function(result, status) {
              if (status !== google.maps.places.PlacesServiceStatus.OK) {
                console.error(status);
                return;
              }
              infoWindow.setContent(result.name);
              infoWindow.open(map, marker2);
            });
          });

        }


      // function createMarker(place) {
      //   var placeLoc = place.geometry.location;
      //   var marker2 = new google.maps.Marker({
      //     position: place.geometry.location,
      //     map:map
      //   });
      //
      //   google.maps.event.addListener(marker2, 'click', function(){
      //     infowindow.setContent(place.name);
      //     infowindow.open(map, this);
      //   });
      //
      // }



// var map;
//       function initMap() {
//         map = new google.maps.Map(document.getElementById('map'), {
//           zoom: 11,
//           center: new google.maps.LatLng(35.8941264,-78.9133741),
//           mapTypeId: 'terrain'
//         });
//
//         // Create a <script> tag and set the USGS URL as the source.
//         var script = document.createElement('script');
//         // This example uses a local copy of the GeoJSON stored at
//         // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
//         script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
//         document.getElementsByTagName('head')[0].appendChild(script);
//       }
//
//       // Loop through the results array and place a marker for each
//       // set of coordinates.
//       window.eqfeed_callback = function(results) {
//         for (var i = 0; i < results.features.length; i++) {
//           var coords = results.features[i].geometry.coordinates;
//           var latLng = new google.maps.LatLng(coords[1],coords[0]);
//           var marker = new google.maps.Marker({
//             position: latLng,
//             map: map
//           });
//         }
//       }


// <script type="text/javascript" src="https://twitter.com/search?vertical=default&q=coffee%20shop%20coffee%20OR%20cafe&geocode=35.8941264,-78.9133741,30mi&src=typd" type="text/javascript"></script>
