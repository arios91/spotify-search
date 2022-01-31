import { createContext, useReducer } from "react";
import axios from "axios";
import spotifyReducer from "./SpotifyReducer";

/*
    Basic Context setup for making all API calls
*/

const SpotifyContext = createContext();

const spotify = axios.create({
    baseURL: 'https://api.spotify.com/v1'
})

//Hardcoding this for demo purposes
const CLIENT_ID = 'ba90e253be0c4a7395fa2490fb5b9bbd';
const CLIENT_SECRET = 'f4a80a3234f44890a0408f22e82c2f0c';

export const SpotifyReducer = ({children}) => {
    const initialState = {
        spotifyToken: '',
        results: {},
        currentArtistAlbums: {},
        currentAlbumTracks: {},
        pastResults: {},
        isLoading: false
    }

    const [state, dispatch] = useReducer(spotifyReducer, initialState);

    /*
        The following actions will make all of the API calls and set them to state
    */


    /*
        All of the API calls require a token which is set with this initial function
    */
    const getToken = async() => {
        let tokenRes = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {headers:{
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
        }});

        dispatch({
            type: 'SET_TOKEN',
            payload: tokenRes.data.access_token
        })
    }


    /*
        Function to clear search results from state
    */
    const clearResults = () => {
        dispatch({
            type: 'SET_RESULTS',
            payload: {}
        })
    }


    /*
        Main function that searches spotify for Tracks, Artists, and Albums
        Uses live user input from search bar
        Will use a map to save previous search terms to avoid unnecessary API calls
    */
    const searchSpotify = async (searchTerm) => {
        const params = new URLSearchParams({
            q: searchTerm,
            type: ["artist", "album", "track"],
            limit: 10
        })

        const res = await spotify.get(`/search?${params}`, {headers:{
            'Content-type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Bearer ' + state.spotifyToken
        }});

        let results = res.data;

        dispatch({
            type: 'SET_RESULTS',
            payload: results
        })

        // TO-DO - save results to map to save on calls
        /*

        */
    }


    /*
        Function to grab artist albums using album ID
        This is called when a user click on an artist name
    */
    const getArtistAlbums = async (artistId) => {
        const params = new URLSearchParams({
            limit: 5
        })

        const res = await spotify.get(`/artists/${artistId}/albums?${params}`, {headers:{
            'Content-type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Bearer ' + state.spotifyToken
        }});

        dispatch({
            type: 'SET_ARTIST_ALBUMS',
            payload: res.data
        })
    }


    /*
        Function to grab album tracks using album id
        This is called when a user click on an album name
    */
    const getAlbumTracks = async (albumId) => {
        const params = new URLSearchParams({
            limit: 7
        })

        const res = await spotify.get(`/albums/${albumId}/tracks?${params}`, {headers:{
            'Content-type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Bearer ' + state.spotifyToken
        }});

        dispatch({
            type: 'SET_ALBUM_TRACKS',
            payload: res.data
        })

    }


    /*
        Function to grab next set of results when a user clicks on previous/next page buttons
        Results are limited to a specified number in main search function
        Copies over current results to a new object and then overrides either artists, albums, or tracks with new results
    */
    const pageChange = async (nextUrl, param) => {
        let {results} = state;
        let newArtists = results.artists;
        let newAlbums = results.albums;
        let newTracks = results.tracks;

        const res = await axios.get(nextUrl, {headers:{
            'Content-type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Bearer ' + state.spotifyToken
        }});


        if(param === 'Artists'){
            newArtists = res.data.artists;
        }else if(param === 'Albums'){
            newAlbums = res.data.albums;
        }else if(param === 'Tracks'){
            newTracks = res.data.tracks;
        }

        dispatch({
            type: 'SET_RESULTS',
            payload: {
                artists: newArtists,
                albums: newAlbums,
                tracks: newTracks
            }
        })
    }


    /*
        Function to grab next set of albums in the artist modal
    */
    const albumChange = async (nextUrl) => {
        const res = await axios.get(nextUrl, {headers:{
            'Content-type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Bearer ' + state.spotifyToken
        }});

        dispatch({
            type: 'SET_ARTIST_ALBUMS',
            payload: res.data
        })
    }


    /*
        Function to grab next set of tracks in the album modal
    */
    const tracksChange = async (nextUrl) => {
        const res = await axios.get(nextUrl, {headers:{
            'Content-type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Bearer ' + state.spotifyToken
        }});

        dispatch({
            type: 'SET_ALBUM_TRACKS',
            payload: res.data
        })
    }

    

    

    return <SpotifyContext.Provider value={{
        ...state,
        getToken,
        searchSpotify,
        clearResults,
        pageChange,
        getArtistAlbums,
        albumChange,
        getAlbumTracks,
        tracksChange
    }}>
        {children}
    </SpotifyContext.Provider>
}


export default SpotifyContext