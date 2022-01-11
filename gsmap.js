/*
 * gsmap.js
 *
 * Create map from Google Sheets with Google Maps JavaScript API
 *
 *
 * Copyright 2021 Wardhana <ellam.bydefault@gmail.com>
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

'use strict';

const gSheetID  = 'Your_Google_Sheets_ID';
const sheetName = 'Your_Google_Sheets_sheet_name';
const APIKey    = 'Your_Google_Cloud_API_Key';
const mapID     = 'Your_Map_ID';

// Cluster images location and prefix, image file names are m1.png through 5.png.
const clustersrc = '/cluster/m';
//const clustersrc = 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';

// Get map parameters from URL, otherwise use default.
const defval = {
  zoom: 5,
  center: [
    0,  // Equator.
    118 // 95 + (141-95)/2, best for mobile device.
  ],
};

const queryString = window.location.search;
const urlParams   = new URLSearchParams(queryString);
const mapParams   = {
  zoom: ( urlParams.get('zoom') ? parseInt(urlParams.get('zoom')) : defval.zoom ),
  center:  [
    ( urlParams.get('lat') ? parseFloat(urlParams.get('lat')) : defval.center[0] ),
    ( urlParams.get('long') ? parseFloat(urlParams.get('long')) : defval.center[1] )
  ],
}

function getMapData() {
  const gSheetURL = 'https://sheets.googleapis.com/v4/spreadsheets/' + gSheetID + '/values/' + sheetName + '?key=' + APIKey;

  async function loadNames() {
    const response = await fetch(gSheetURL);
    const names = await response.json();
  
    initMap(names.values);
  }
  
  loadNames();
}

// Create map.
function initMap(mapdata) {
  const map         = new google.maps.Map(document.getElementById('map'), {
                        mapId:              mapID,
                        zoom:               mapParams.zoom,
                        center: {
                          lat:              mapParams.center[0],
                          lng:              mapParams.center[1]
                        },
                        streetViewControl:  false,
                      });
  const infoWindow  = new google.maps.InfoWindow(); // info window to share between markers
  const cluster     = [];         

  // Comments from Google example:
  //
  // Set LatLng and title text for the markers. The first marker
  // receives the initial focus when tab is pressed. Use arrow keys to
  // move between markers; press tab again to cycle through the map controls.
  // Latitutude and longitude must be number, not string.

  // Create markers, mapdata[0] holds info label.
  for (let i = 1; i <= mapdata.length - 1; i++) {
    let infotitle = mapdata[i][0];
    let image     = mapdata[i][3];
    let infolines = '';

    for (let j = 4; j <= mapdata[0].length - 1; j++) {
      let label   = mapdata[0][j];
      let content = mapdata[i][j];

      infolines = infolines + `
    <tr>
        <td>${label}</td><td>:</td><td>${content}</td>
    </tr>`;
    }

    const marker = new google.maps.Marker({
      position: {lat: parseFloat(mapdata[i][1]), lng: parseFloat(mapdata[i][2])},
      map,
      animation: google.maps.Animation.DROP,
      title: infotitle,
      info: `
<div class="marker-info">
  <h1>${infotitle}</h1>
  <img src="${image}">
  <table>
    <tbody>${infolines}
    </tbody>
  </table>
</div>
`,
      optimized: false,
    });

    // Add a click listener for each marker, and set up the info window.
    marker.addListener("click", () => {
      infoWindow.close();
      //infoWindow.setContent(marker.getTitle());
      infoWindow.setContent(marker.info);
      infoWindow.open(marker.getMap(), marker);
    });

    // Populate cluster array.
    cluster.push(marker);
  }

  // Make cluster.
  new MarkerClusterer(map, cluster, {
    imagePath: clustersrc,
  });
}
