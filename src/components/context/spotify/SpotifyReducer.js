/*
    Basic Context reducer setup 
*/
const spotifyReducer = (state, action) => {
    switch(action.type){
        case 'SET_TOKEN':
            return {
                ...state,
                spotifyToken: action.payload
            }
        case 'SET_RESULTS':
            return{
                ...state,
                results: action.payload
            }
        case 'SET_ARTIST_ALBUMS':
            return{
                ...state,
                currentArtistAlbums: action.payload
            }
        case 'SET_ALBUM_TRACKS':
            return{
                ...state,
                currentAlbumTracks: action.payload
            }
        default:
            return state

    }

}

export default spotifyReducer