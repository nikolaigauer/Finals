
// $.ajax({
  url: "/stops",
  context: document.body
}).done(function (stops) {
  for (let stop in stops) {
    // Renders the stop
    var pin = new google.maps.Marker({
      position: { lat: markers[stop].lat, lng: markers[stop].long },
      map: map,
      title: markers[stop].title
    });
  }

});


