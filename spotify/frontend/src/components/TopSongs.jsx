import { useState } from 'react'
import axios from 'axios'

export default function TopSongs() {
    const [topTracks, setTopTracks] = useState(null);

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
      const handlePlayTrack = (e) => {
        const queryParamaters = new URLSearchParams(window.location.search)
        const access_token = queryParamaters.get('access_token')
        axios(`https://api.spotify.com/v1/me/player/play`, {
          method: 'PUT',
          headers: {
            'Authorization' : `Bearer ${access_token}`,
            'Content-Type' : 'application/json'
          },
          data: {
            'uris': [`spotify:track:${e.target.id}`],
          }
        })
      }

      const handlePlayAlbum = (e) => {
        const queryParamaters = new URLSearchParams(window.location.search)
        const access_token = queryParamaters.get('access_token')
        axios(`https://api.spotify.com/v1/me/player/play`, {
          method: 'PUT',
          headers: {
            'Authorization' : `Bearer ${access_token}`,
            'Content-Type' : 'application/json'
          },
          data: {
            'context_uri': `spotify:album:${e.target.id}`
          }
        })
      }

    return (
        <div className='top-tracks'>
            <button onClick={handleGetTopTracks}>Top Tracks</button>
            {topTracks && (
                topTracks.map((track) => (
                <div className='track' key={track.name}>
                    <img src={track.album.images[2].url} href={track.external_urls.spotify}/>
                    <p>{track.name}</p>
                    <button id={track.id} onClick={handlePlayTrack}>Play Song</button>
                    <button id={track.album.id} onClick={handlePlayAlbum}>Play Album</button>
                    <button id={track.album.id} href={track.external_urls.spotify}>Open in Spotify</button>
                </div>
                ))
            )}
        </div>
    )
}