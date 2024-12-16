document.addEventListener("DOMContentLoaded", function () {
    // Initialize the map with LeafletJS
    const map = L.map("map").setView([21.1938, 81.3509], 10); // Bhilai location
  
    // Load tiles from OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);
  
    let userMarker, destinationMarker, routeLayer;
  
    // Get user location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = [position.coords.latitude, position.coords.longitude];
        userMarker = L.marker(userLocation).addTo(map).bindPopup("You are here").openPopup();
        map.setView(userLocation, 13);
      },
      () => {
        alert("Location access denied. Defaulting to Bhilai.");
        const defaultLocation = [21.1938, 81.3509];
        map.setView(defaultLocation, 13);
      }
    );
  
    // Add event listener for setting route
    map.on("click", function (e) {
      if (!userMarker) {
        alert("User location not detected yet.");
        return;
      }
  
      if (!destinationMarker) {
        destinationMarker = L.marker(e.latlng).addTo(map).bindPopup("Destination").openPopup();
        plotRoute(userMarker.getLatLng(), e.latlng);  // Call function to plot route
      } else {
        alert("Route already plotted! Clear the map to select a new destination.");
      }
    });
  
    // Function to plot the route using OSRM API
    function plotRoute(start, end) {
      const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`;
  
      fetch(osrmUrl)
        .then((response) => response.json())
        .then((data) => {
          if (routeLayer) map.removeLayer(routeLayer);
  
          const route = data.routes[0].geometry;
          routeLayer = L.geoJSON(route, {
            style: { color: "blue", weight: 4 },
          }).addTo(map);
  
          map.fitBounds(L.geoJSON(route).getBounds());
        })
        .catch((err) => {
          console.error("Error fetching route:", err);
          alert("Could not fetch route. Please try again.");
        });
    }
  
    // Fetch nearby resources (Medical, Food, Shelter) using OpenRouteService API
    function fetchNearbyResources(type) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const orsUrl = `https://api.openrouteservice.org/v2/pois?api_key=5b3ce3597851110001cf624846907415e7a44dbc86da2d993db0eca3&request=pois&filter_category_ids=${type}&geojson={"type":"Point","coordinates":[${longitude},${latitude}]}`;
  
        fetch(orsUrl)
          .then((response) => response.json())
          .then((data) => {
            data.features.forEach((feature) => {
              const [lng, lat] = feature.geometry.coordinates;
              L.marker([lat, lng]).addTo(map)
                .bindPopup(feature.properties.name || "Resource")
                .openPopup();
            });
          })
          // .catch((err) => {
          //   console.error("Error fetching resources:", err);
          // });
      });
    }
  
    // Blockage detection and handling
    function addBlockage(lat, lng) {
      const blockageIcon = L.icon({
        iconUrl: "owl_icon.png",
        iconSize: [30, 30],
      });
  
      L.marker([lat, lng], { icon: blockageIcon }).addTo(map).bindPopup("Blockage here! Avoid this area.").openPopup();
    }
  
    // Button event listeners for blockages
    document.getElementById("check_rain").addEventListener("click", () => {
      alert("Checking for heavy rain blockages...");
      checkWeatherConditions();
    });
  
    document.getElementById("check_snow").addEventListener("click", () => {
      alert("Checking for heavy snow blockages...");
      checkWeatherConditions();
    });
  
    document.getElementById("check_landslide").addEventListener("click", () => {
      alert("Checking for landslide blockages...");
      addBlockage(21.2500, 81.6300); // Example blockage coordinates
    });
  
    // Function to check weather conditions using OpenWeatherMap API
    function checkWeatherConditions() {
      const apiKey = "e7ac0d706cb885364b3fb9b53468bce6";
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=21.1938&lon=81.3509&appid=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.weather[0].main === "Rain") {
            alert("Heavy rain detected! Consider optimizing your route.");
          }
        })
        .catch((err) => {
          console.error("Error checking weather:", err);
        });
    }
  
    // Button event listeners for finding nearby resources
    document.getElementById("find_medical").addEventListener("click", () => {
      fetchNearbyResources(1901); // Medical
    });
  
    document.getElementById("find_food").addEventListener("click", () => {
      fetchNearbyResources(1301); // Food
    });
  
    document.getElementById("find_shelter").addEventListener("click", () => {
      fetchNearbyResources(1110); // Shelter
    });
  });
  