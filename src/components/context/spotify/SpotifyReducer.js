const spotifyReducer = (state, action) => {
    switch(action.type){
        case 'SET_TOKEN':
            return {
                ...state,
                spotifyToken: action.payload,
                isLoading: false
            }
        case 'SET_RESULTS':
            return{
                ...state,
                results: action.payload,
                isLoading: false
            }
        case 'SET_ARTIST_ALBUMS':
            return{
                ...state,
                currentArtistAlbums: action.payload,
                isLoading: false
            }
        case 'SET_ALBUM_TRACKS':
            return{
                ...state,
                currentAlbumTracks: action.payload,
                isLoading: false
            }
        case 'SET_LOADING':
            return{
                ...state,
                isLoading: true
            }
        default:
            return state

    }

}

export default spotifyReducer