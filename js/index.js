window.onload = () => {
  displayStores()
  showStoreInfo()
}

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
    });

    infoWindow = new google.maps.InfoWindow();
    showStoresMarkers();


}

function createMarker(latlng, name, address, index) {
    var html = "<b>" + name + "</b> <br/>" + address;
    
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


function showStoresMarkers(){
  let bounds = new google.maps.LatLngBounds();

  stores.map((store, index) => {
    let name = store.name;
    let address = store.addressLines[0];

    let latLng = new google.maps.LatLng(
      parseFloat(store.coordinates.latitude),
      parseFloat(store.coordinates.longitude)
    )
    
    createMarker(latLng, name, address, index+1)
    bounds.extend(latLng);
    
  })
  map.fitBounds(bounds);
}

function showStoreInfo(){
  let storeNumber = document.getElementsByClassName('store-container');
  
  for(let i=0; i<storeNumber.length; i++){
    storeNumber[i].addEventListener('click', ()=>{
      alert(i+1)
    })
  }

    // var marker = new google.maps.Marker({
    //   map: map,
    //   position: latlng,
    //   label: index.toString()
    // });
    // google.maps.event.addListener(marker, 'click', function() {
    //   infoWindow.setContent(html);
    //   infoWindow.open(map, marker);
    // });
}


function displayStores(){

  let storeHtml = '';

  stores.map((store, index) => {

    let address = store.addressLines;
    let phone = store.phoneNumber;
    let storeNumber = store.storeNumber;


    storeHtml += `
        <div class="store-container">
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
    
    `

    document.querySelector('.stores-list').innerHTML = storeHtml;
  })

  
}
