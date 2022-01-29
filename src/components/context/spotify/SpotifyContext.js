import { createContext, useReducer } from "react";
import axios from "axios";
import spotifyReducer from "./SpotifyReducer";

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
        pastResults: {},
        isLoading: false
    }

    const [state, dispatch] = useReducer(spotifyReducer, initialState);

    /* The following actions will make all of the API calls and set them to state */

    // All of the API calls require a token which is set with this initial function
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

    const clearResults = () => {
        dispatch({
            type: 'SET_RESULTS',
            payload: {}
        })
    }

    // General search function
    const searchSpotify = async (searchTerm) => {
        console.log(`Searching: ${searchTerm}`)
        const params = new URLSearchParams({
            q: searchTerm,
            type: ["artist", "album", "track"],
            limit: 10
        })

        const res = await spotify.get(`/search?${params}`, {headers:{
            'Content-type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Bearer ' + state.spotifyToken
        }});

        let results = res.data
        console.log(results);
        dispatch({
            type: 'SET_RESULTS',
            payload: results
        })

        // TO-DO - save results to map to save on calls
        /*
        let pastResult = {
            searchTerm,
            results
        }

        dispatch({
            type:
        })
        */
    }

    const getArtistAlbums = async (artistId) => {
        const params = new URLSearchParams({
            limit: 5
        })

        const res = await spotify.get(`/artists/${artistId}/albums?${params}`, {headers:{
            'Content-type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Bearer ' + state.spotifyToken
        }});

        console.log(res.data);
        dispatch({
            type: 'SET_ARTIST_ALBUMS',
            payload: res.data
        })
    }

    const getAlbumTracks = async (albumId) => {
        const params = new URLSearchParams({
            limit: 5
        })

        const res = await spotify.get(`/albums/${albumId}/tracks?${params}`, {headers:{
            'Content-type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Bearer ' + state.spotifyToken
        }});
        console.log(res.data);

        dispatch({
            type: 'SET_ALBUM_TRACKS',
            payload: res.data
        })

    }

    const pageChange = async (nextUrl, param) => {
        console.log(param);
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

    const albumChange = async (nextUrl) => {
        const res = await axios.get(nextUrl, {headers:{
            'Content-type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Bearer ' + state.spotifyToken
        }});

        console.log(res.data);
        dispatch({
            type: 'SET_ARTIST_ALBUMS',
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
        getAlbumTracks
    }}>
        {children}
    </SpotifyContext.Provider>
}

export default SpotifyContext