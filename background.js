chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'optimizeRoute') {
    if (message.start && message.end && message.blockages) {
      optimizeRoute(message.start, message.end, message.blockages, sendResponse);
    } else {
      sendResponse({ error: "Invalid message: Missing start, end, or blockage data" });
    }
  }
  return true; // Keeps the message channel open for async sendResponse
});


// Route optimization function with PathfindingJS
function optimizeRoute(start, end, blockages, sendResponse) {
  const gridSize = 50;
  const grid = new PF.Grid(gridSize, gridSize);
  const finder = new PF.AStarFinder({
    allowDiagonal: true,
    dontCrossCorners: true
  });
  

  // Block points based on blockage locations
  blockages.forEach(blockage => {
    if (blockage.lat && blockage.lng) {
      const blockagePoint = mapLatLngToGrid(blockage.lat, blockage.lng, gridSize);
      if (blockagePoint.x >= 0 && blockagePoint.x < gridSize && blockagePoint.y >= 0 && blockagePoint.y < gridSize) {
        grid.setWalkableAt(blockagePoint.x, blockagePoint.y, false);
      } else {
        console.warn(`Blockage at (${blockage.lat}, ${blockage.lng}) is out of grid bounds.`);
      }
    }
  });
  

  // Map the start and end locations to grid points
  const startGridPoint = mapLatLngToGrid(start.lat, start.lng, gridSize);
  const endGridPoint = mapLatLngToGrid(end.lat, end.lng, gridSize);

  // Find optimized path
  const path = finder.findPath(startGridPoint.x, startGridPoint.y, endGridPoint.x, endGridPoint.y, grid);

  if (path.length > 0) {
    const latLngPath = path.map(point => gridToLatLng(point, gridSize));
    console.log("Optimized Path:", latLngPath);
    sendResponse({ path: latLngPath });
  } else {
    console.error("No path found between the points.");
    sendResponse({ error: "No possible path found!" });
  }
}

// Helper function to map latitude and longitude to grid coordinates
function mapLatLngToGrid(lat, lng, gridSize) {
  const mapBounds = { latMin: 20, latMax: 30, lngMin: 80, lngMax: 90 };  // Define based on your map
  const x = Math.floor(((lat - mapBounds.latMin) / (mapBounds.latMax - mapBounds.latMin)) * gridSize);
  const y = Math.floor(((lng - mapBounds.lngMin) / (mapBounds.lngMax - mapBounds.lngMin)) * gridSize);
  return { x, y };
}

// Helper function to convert grid coordinates back to latitude and longitude
function gridToLatLng(point, gridSize) {
  const mapBounds = { latMin: 20, latMax: 30, lngMin: 80, lngMax: 90 }; // Same as above
  const lat = point[0] / gridSize * (mapBounds.latMax - mapBounds.latMin) + mapBounds.latMin;
  const lng = point[1] / gridSize * (mapBounds.lngMax - mapBounds.lngMin) + mapBounds.lngMin;
  return [lat, lng];
}




