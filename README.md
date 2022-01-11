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

    a.  Get an API Key
    b.  Create Maps API
    c.  Set Google Sheets API

2.  Put the API Key in `index.html`.

3.  Put folowing data in `gsmap.js`:

    a.  Google Sheets ID
    b.  Google Sheets sheet name
    c.  API Key
    d.  Maps ID

4.  Arrange map data in Google Sheets as follows:

    a.  Column A: Info window title / ID.
    b.  Column B & C: Latitude & longitude respectively.
    c.  Column D: Info window image.
    d.  Other columns: Info lines, as many as you want.

5.  Get a web server to test.

    The custom cluster images must be served from a web server to load.
