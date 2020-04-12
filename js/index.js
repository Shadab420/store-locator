window.onload = () => {
  
}

let storeLocator = document.getElementById('store-locator');
let showStoreLocatorBtn = document.getElementById('showStoreLocatorBtn');
let hideStoreLocatorBtn = document.getElementById('hideStoreLocatorBtn');

showStoreLocatorBtn.addEventListener("click", () => {
  storeLocator.style.visibility = 'visible';
  storeLocator.style.opacity = 1;
  showStoreLocatorBtn.style.visibility = 'hidden';
  
})

hideStoreLocatorBtn.addEventListener("click", () => {
  storeLocator.style.visibility = 'hidden';
  storeLocator.style.opacity = 0;
  showStoreLocatorBtn.style.visibility = 'visible';
})




var map;
      var markers = [];
      var infoWindow;
      var locationSelect;


function initMap() {
    var losAngeles = {
        lat: 34.063380, 
        lng: -118.358080
    };
    map = new google.maps.Map(document.getElementById('map'), {
        center: losAngeles,
        zoom: 11,
        mapTypeId: 'roadmap',
        styles: [
          {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
              {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
              {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
              {
                featureType: 'administrative',
                elementType: 'geometry.stroke',
                stylers: [{color: '#c9b2a6'}]
              },
              {
                featureType: 'administrative.land_parcel',
                elementType: 'geometry.stroke',
                stylers: [{color: '#dcd2be'}]
              },
              {
                featureType: 'administrative.land_parcel',
                elementType: 'labels.text.fill',
                stylers: [{color: '#ae9e90'}]
              },
              {
                featureType: 'landscape.natural',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#93817c'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'geometry.fill',
                stylers: [{color: '#a5b076'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#447530'}]
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#f5f1e6'}]
              },
              {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [{color: '#fdfcf8'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#f8c967'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#e9bc62'}]
              },
              {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry',
                stylers: [{color: '#e98d58'}]
              },
              {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry.stroke',
                stylers: [{color: '#db8555'}]
              },
              {
                featureType: 'road.local',
                elementType: 'labels.text.fill',
                stylers: [{color: '#806b63'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'labels.text.fill',
                stylers: [{color: '#8f7d77'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#ebe3cd'}]
              },
              {
                featureType: 'transit.station',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [{color: '#b9d3c2'}]
              },
              {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#92998d'}]
              }
        ]
    });

    // map.addListener('mouseover', function() {
    //   storeLocator.style.display = 'block';
    //   storeLocator.style.transition = '1s all ease-in-out';
    // });

    // map.addListener('click', function() {
    //   storeLocator.style.display = 'none';
    //   storeLocator.style.transition = '1s all ease-in-out';
    // });

    infoWindow = new google.maps.InfoWindow();
    searchStores()

}

function createMarker(latlng, name, address, openStatusText, phoneNumber, index) {

    let html = `
      <div class="store-info-window">
        
      <div class="store-info-name">
            ${name}
        </div>
        
        <div class="store-info-status">
          ${openStatusText}
        </div>
        
        <div class="store-info-address">
          <div class="circle">
            <i class="fas fa-location-arrow"></i>
          </div>
            ${address}
        </div>

        <div class="store-info-phone">
          <div class="circle">
            <i class="fas fa-phone-alt"></i>
          </div>
          ${phoneNumber}
        </div>
        
      </div>
    `;
    
    var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      label: index.toString()
    });
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(html);
      infoWindow.open(map, marker);
    });
    markers.push(marker);
}


function showStoresMarkers(stores){
  let bounds = new google.maps.LatLngBounds();

  stores.map((store, index) => {
    let name = store.name;
    let address = store.addressLines[0];
    let openStatusText = store.openStatusText;
    let phoneNumber = store.phoneNumber;

    let latLng = new google.maps.LatLng(
      parseFloat(store.coordinates.latitude),
      parseFloat(store.coordinates.longitude)
    )
    
    createMarker(latLng, name, address, openStatusText, phoneNumber, index+1)

    bounds.extend(latLng);
    
  })
  map.fitBounds(bounds);
}


function displayStores(stores){

  let storeHtml = '';

  stores.map((store, index) => {

    let address = store.addressLines;
    let phone = store.phoneNumber;
    let storeNumber = store.storeNumber;


    storeHtml += `
        <div class="store-container">
          <div class="store-container-background">
            <div class="store-info-container">

            <div class="store-address">
              <span> ${address[0]}</span>
                <span>${address[1]}</span>
            </div>
            <div class="store-phone-number">
                ${phone}
            </div>
            </div>
            <div class="store-number-container">
                <div class="store-number">
                    ${index+1}
                </div>
            </div>
          </div>
    </div> 
    
    `

    document.querySelector('.stores-list').innerHTML = storeHtml;
  })
  
}

function setOnClickListener(){
  let storeElements = document.querySelectorAll('.store-container')

  for(let i=0; i<storeElements.length; i++){
    storeElements[i].addEventListener('click', () => {
      google.maps.event.trigger(markers[i], 'click');
    })
  }
}

function searchStores(){
  let zip = document.getElementById('zip-code-input').value;
  let foundStores = [];
  
  if(zip){
    
    stores.forEach((store, index) => {
      let postal = store.address.postalCode.substr(0,5);
      
      if(postal == zip) foundStores.push(store);
    })
  }
  else foundStores = stores;
  
  clearLocations();
    displayStores(foundStores);
    showStoresMarkers(foundStores);
    setOnClickListener()
}

function clearLocations(){
  infoWindow.close();

  for(let i = 0; i < markers.length; i++){
    markers[i].setMap(null);
  }
  markers = [];
}

function showStoreLocator(){
  alert('store locator!')
}
