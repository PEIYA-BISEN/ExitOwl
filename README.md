# Exitowl - Adventure Calls? The Path Unknown! With Exitowl you're not alone.

## Overview
Exitowl is a browser extension designed to optimize routes with real-time detection of road blockages caused by events like heavy rain, landslides, or fallen trees. It also assists travelers by suggesting nearby resources such as medical centers, shelter homes, and food courts. With Exitowl, adventurers can explore confidently, knowing they are equipped with the tools for a safe and optimized journey.

## Key Features
- **Real-Time Route Optimization**: Utilizes OSRM (Open Source Routing Machine) to calculate the most efficient routes.
- **Blockage Detection**:
  - Alerts for road blockages due to weather or other disruptions.
  - Visual markers on the map for affected areas.
- **Nearby Resource Suggestions**:
  - Medical centers
  - Food courts
  - Shelter homes
  - Powered by OpenRouteService API.
- **Weather-Based Alerts**:
  - Integrated with OpenWeatherMap API to provide weather-based warnings and adapt routes accordingly.
- **Interactive Map**:
  - Built with LeafletJS for a user-friendly mapping experience.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript, LeafletJS
- **Backend APIs**:
  - Open Source Routing Machine (OSRM)
  - OpenRouteService API
  - OpenWeatherMap API
  - Nominatim (OpenStreetMap geocoding)
- **Browser Extension Framework**: Chrome Extension (Manifest v3)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/PEIYA-BISEN/ExitOwl
   ```
2. Navigate to the project directory:
   ```bash
   cd exit_owl
   ```
3. Load the extension into your browser:
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode" (toggle in the top right corner).
   - Click on "Load unpacked" and select the project folder.
4. The Exitowl extension is now installed and ready to use.

## Usage
1. Open the Exitowl extension by clicking its icon in the browser toolbar.
2. Use the interactive map to:
   - Click on your starting point and destination to plot a route.
   - View optimized routes and blockages directly on the map.
   - Access nearby resources by selecting options like medical centers or shelters.
3. Check for real-time weather alerts and road conditions using the integrated weather feature.

## APIs and Integrations
1. **Open Source Routing Machine (OSRM)**: For route optimization.
2. **OpenRouteService API**: To fetch nearby points of interest like medical centers, food courts, and shelters.
3. **OpenWeatherMap API**: To detect weather conditions and provide alerts for rain or snow.
4. **OpenStreetMap/Nominatim**: For map tiles and geocoding.

## Project Structure
```
exitowl/
├── icons/                 # Extension icons
├── lib/                   # External libraries (if any)
├── popup.html             # HTML structure for the popup
├── popup.js               # Main JavaScript logic
├── popup.css              # Styling for the popup
├── manifest.json          # Chrome extension configuration
├── README.md              # Project documentation
```

## Future Enhancements
- **User Authentication**: Allow users to save their preferences and frequently used routes.
- **Offline Mode**: Provide route suggestions and alerts even without internet connectivity.
- **Multilingual Support**: Extend support for additional languages.
- **Emergency Contact Feature**: Directly call emergency services or notify a trusted contact.

## Contributing
Contributions are welcome! Follow these steps to contribute:
1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push to your branch:
   ```bash
   git commit -m "Add your message"
   git push origin feature-name
   ```
4. Open a pull request and describe your changes.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact
For questions or feedback, please contact:
- **GitHub**: https://github.com/PEIYA-BISEN

---

Adventure calls? The path unknown! With Exitowl, you're not alone. Let Exitowl guide your journey safely and efficiently.

