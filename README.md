Spotify Autocomplete

Description: This app uses the Spotify to search and retrieve suggestions of artists, albums, and tracks.

## Initial build
Once you have the project in a local directory, run
### `npm install`
This will install all required dependencies

## Available Scripts
In the project directory, you can run:
### `npm start`

Runs the app in the development mode.\


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.


CURRENT PROJECT STRUCTURE

## src -> components -> assets
Folder for any multimedia assets

## src ->  components -> context -> alert
Setup and functionality using Context to provide alerts throughout the ap

## src ->  components -> context -> spotify
Setup and functionality using Context to provide calls to the spotify API and set results throughout the app
All API calls are done here

## src -> components -> layout
Contains layout components such as the navbar and footer

## src -> components -> search
Contains all functional components related to searching and calling the API functions in spotify context fodler

## src -> components -> searchItemss
Contains functional components for individual result items (artist, album, track)

## src -> pages
Contains basic pages that url routes lead to, they contain further functional components
