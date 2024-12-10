import { useState } from 'react'
import axios from 'axios'

export default function Playback() {
    const [playState, setPlayState] = useState(null);
    const [isPlaying, setIsPlaying] = useState(null);

    const handleGetPlayState = () => {
        const queryParamaters = new URLSearchParams(window.location.search)
        const access_token = queryParamaters.get('access_token')
        console.log(access_token)
        axios(`https://api.spotify.com/v1/me/player`, {
          method: 'GET',
          headers: {'Authorization' : `Bearer ${access_token}`}
        })
        .then (res => {
          console.log(res)
          setPlayState(res.data);
          setIsPlaying(res.data.is_playing)
        })
      }
    
      const handlePlayback = () => {
        const queryParamaters = new URLSearchParams(window.location.search)
        const access_token = queryParamaters.get('access_token')
        console.log(access_token)
        axios(`https://api.spotify.com/v1/me/player/play`, {
          method: 'PUT',
          headers: {
            'Authorization' : `Bearer ${access_token}`,
            'Content-Type' : 'application/json'
            },
        })
        .then (res => {
          setIsPlaying(true)
          console.log(res.data)
        })
      }
    
      const handlePlaybackPause = () => {
        const queryParamaters = new URLSearchParams(window.location.search)
        const access_token = queryParamaters.get('access_token')
        console.log(access_token)
        axios(`https://api.spotify.com/v1/me/player/pause`, {
          method: 'PUT',
          headers: {
            'Authorization' : `Bearer ${access_token}`,
            'Content-Type' : 'application/json'
            },
        })
        .then (res => {
          setIsPlaying(false)
          console.log(res.data)
        })
      }

      const handleSkips = (e) => {
        const queryParamaters = new URLSearchParams(window.location.search)
        const access_token = queryParamaters.get('access_token')
        console.log(access_token)
        axios(`https://api.spotify.com/v1/me/player/${e.target.id}`, {
          method: 'POST',
          headers: {
            'Authorization' : `Bearer ${access_token}`,
            },
        })
        .then (res => {
            console.log(res.data)
        })
      }
    

    return (
        <>
        <button onClick={handleGetPlayState}>Currently Playing</button>
        {playState && (
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
              <button id='previous' onClick={handleSkips}>Previous</button>
              <button id='next' onClick={handleSkips}>Next</button>
            </div>
        )}
        {!playState && (
            <p>No data found. Please start playback on a device and try again.</p>
        )}
        </>
    )
}