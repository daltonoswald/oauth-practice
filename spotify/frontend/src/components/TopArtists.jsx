import { useState } from 'react'
import axios from 'axios'

export default function TopArtists() {
    const [topArtists, setTopArtists] = useState(null);

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
      
    const handlePlayArtist = (e) => {
        const queryParamaters = new URLSearchParams(window.location.search)
        const access_token = queryParamaters.get('access_token')
        axios(`https://api.spotify.com/v1/me/player/play`, {
            method: 'PUT',
            headers: {
            'Authorization' : `Bearer ${access_token}`,
            'Content-Type' : 'application/json'
            },
            data: {
            'context_uri': `spotify:artist:${e.target.id}`
            }
        })
    }

    // This is Deprecated
    // const handleGetRecommendedArtists = () => {
    //     const queryParamaters = new URLSearchParams(window.location.search)
    //     const access_token = queryParamaters.get('access_token')

    //     const idArray = [];
    //     Object.values(topArtists).forEach((artist) => {
    //         idArray.push(artist.id)
    //     })
    //     console.log(idArray);

    //     axios(`https://api.spotify.com/v1/recommendations?seed_artists=${idArray}`, {
    //       method: 'GET',
    //       headers: {'Authorization' : 'Bearer ' + access_token}
    //     })
    //     .then (res => {
    //       console.log(res)
    //     })
    //   }


    return (
        <div className='top-artists'>
            <button onClick={handleGetTopArtists}>Top Artists</button>
            {/* <button onClick={handleGetRecommendedArtists}>Recommendations</button> */}
            {topArtists && (
                topArtists.map((artist) => (
                <div className='artist' key={artist.name}>
                    <img src={artist.images[2].url} href={artist.external_urls.spotify}/>
                    <p>{artist.name}</p>
                    <button id={artist.id} onClick={handlePlayArtist}>Play Artist</button>
                </div>
                ))
            )}
        </div>
    )
}