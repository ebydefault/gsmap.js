#   GSMap.js

Create map from Google Sheets with Google Maps Javascript API
([demo](https://map.solidaritas.com)).

##  Features

- Info window:

  - Title / ID
  - Picture
  - Info lines, as many as you want

- Custom marker cluster images

- URL options:

  - Center (latitude & longitude)
  - Zoom

##  How to use

1.  Set Google Cloud APIs.

    -  Get an API Key
    -  Create Maps API
    -  Set Google Sheets API

2.  Put the API Key in `index.html`.

3.  Put folowing data in `gsmap.js`:

    -  Google Sheets ID
    -  Google Sheets sheet name
    -  API Key
    -  Maps ID

4.  Arrange map data in Google Sheets as follows:

    -  First row: Column titles. Name them anything as you want.
    -  Column A: Info window title / ID.
    -  Column B & C: Latitude & longitude respectively.
    -  Column D: Info window image.
    -  Other columns: Info lines, as many as you want.

5.  Get a web server to test.

    The custom cluster images must be served from a web server to load.
