import { useState } from 'react'
import { loginEndpoint } from './Spotify'
import axios from 'axios'
import Playback from './components/Playback';
import TopSongs from './components/TopSongs'
import TopArtists from './components/TopArtists';

function App() {
  
  const handleGetSavedAlbums = () => {
    const queryParamaters = new URLSearchParams(window.location.search)
    const access_token = queryParamaters.get('access_token')
    console.log(access_token)
    axios(`https://api.spotify.com/v1/me/albums`, {
      method: 'GET',
      headers: {'Authorization' : 'Bearer ' + access_token}
    })
    .then (res => {
      console.log(res)
    })
  }


  return (
    <>
      <a href={loginEndpoint}>Log In</a>
      <button onClick={handleGetSavedAlbums}>Saved Albums</button>
      <TopArtists />
      <TopSongs />
      <Playback />
    </>
  )
}

export default App
