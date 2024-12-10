import { useState } from 'react'
import { loginEndpoint } from './Spotify'
import axios from 'axios'
import Playback from './assets/components/Playback';

function App() {
  const [topTracks, setTopTracks] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  // const [playState, setPlayState] = useState(null);
  // const [isPlaying, setIsPlaying] = useState(null);
  
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

  const handleGetTopTracks = () => {
    const queryParamaters = new URLSearchParams(window.location.search)
    const access_token = queryParamaters.get('access_token')
    console.log(access_token)
    axios(`https://api.spotify.com/v1/me/top/tracks?time_range=medium_term`, {
      method: 'GET',
      headers: {'Authorization' : `Bearer ${access_token}`}
    })
    .then (res => {
      console.log(res)
      setTopTracks(res.data.items);
    })
  }

  const handleGetTopArtists = () => {
    const queryParamaters = new URLSearchParams(window.location.search)
    const access_token = queryParamaters.get('access_token')
    console.log(access_token)
    axios(`https://api.spotify.com/v1/me/top/artists?time_range=medium_term`, {
      method: 'GET',
      headers: {'Authorization' : `Bearer ${access_token}`}
    })
    .then (res => {
      console.log(res)
      setTopArtists(res.data.items);
    })
  }

  // const handleGetPlayState = () => {
  //   const queryParamaters = new URLSearchParams(window.location.search)
  //   const access_token = queryParamaters.get('access_token')
  //   console.log(access_token)
  //   axios(`https://api.spotify.com/v1/me/player`, {
  //     method: 'GET',
  //     headers: {'Authorization' : `Bearer ${access_token}`}
  //   })
  //   .then (res => {
  //     console.log(res)
  //     setPlayState(res.data);
  //   })
  // }

  // const handlePlayback = () => {
  //   const queryParamaters = new URLSearchParams(window.location.search)
  //   const access_token = queryParamaters.get('access_token')
  //   console.log(access_token)
  //   axios(`https://api.spotify.com/v1/me/player/play`, {
  //     method: 'PUT',
  //     headers: {
  //       'Authorization' : `Bearer ${access_token}`,
  //       'Content-Type' : 'application/json'
  //       },
  //   })
  //   .then (res => {
  //     setIsPlaying(true)
  //     console.log(res.data)
  //   })
  // }

  // const handlePlaybackPause = () => {
  //   const queryParamaters = new URLSearchParams(window.location.search)
  //   const access_token = queryParamaters.get('access_token')
  //   console.log(access_token)
  //   axios(`https://api.spotify.com/v1/me/player/pause`, {
  //     method: 'PUT',
  //     headers: {
  //       'Authorization' : `Bearer ${access_token}`,
  //       'Content-Type' : 'application/json'
  //       },
  //   })
  //   .then (res => {
  //     setIsPlaying(false)
  //     console.log(res.data)
  //   })
  // }


  return (
    <>
      <a href={loginEndpoint}>Log In</a>
      <button onClick={handleGetTopTracks}>Top Tracks</button>
      <button onClick={handleGetTopArtists}>Top Artists</button>
      <button onClick={handleGetSavedAlbums}>Saved Albums</button>

      {topTracks && (
        topTracks.map((track) => (
          <div className='track' key={track.name}>
            <img src={track.album.images[2].url} />
            <p>{track.name}</p>
          </div>
        ))
      )}

      {topArtists && (
        topArtists.map((artist) => (
          <div className='artist' key={artist.name}>
            <img src={artist.images[2].url} />
            <p>{artist.name}</p>
          </div>
        ))
      )}

      <Playback />
      {/* {playState && (
          <div className='play-state' key={playState.timestamp}>
            <img src={playState.item.album.images[2].url} />
            <div className='play-state-song-info'>
              <p style={{fontWeight: 700}}>{playState.item.name}</p>
              <p>{playState.item.artists[0].name}</p>
            </div>
            {!isPlaying && (
              <button onClick={handlePlayback}>Play</button>
            )}
            {isPlaying && (
              <button onClick={handlePlaybackPause}>Pause</button>
            )}
          </div>
      )} */}
    </>
  )
}

export default App
