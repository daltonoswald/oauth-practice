import { useState, useEffect } from 'react'
import { loginEndpoint } from './Spotify'
import axios from 'axios'
import Playback from './components/Playback';
import TopSongs from './components/TopSongs'
import TopArtists from './components/TopArtists';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

// const getTokenFromUrl = () => {
//   return window.location.hash.substring(1).split("&").reduce((initial, item) => {
//     let parts = item.split('=');
//     initial[parts[0]] = decodeURIComponent(parts[1]);
//     console.log('intial: ', initial[parts[0]])
//     return initial;
//   }, {});
// }

function App() {
  const [spotifyToken, setSpotifyToken] = useState('');
  const [nowPlaying, setNowPlaying] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const queryParamaters = new URLSearchParams(window.location.search)
    const access_token = queryParamaters.get('access_token')
    const spotifyToken = access_token
    console.log(queryParamaters);
    // window.location.search = '';
    // queryParamaters.delete('access_token');

    if (spotifyToken) {
      setSpotifyToken(spotifyToken);
      spotifyApi.setAccessToken(spotifyToken)
      spotifyApi.getMe().then((user) => {
        console.log(user);
        setProfile(user)
      })
      setLoggedIn(true);
    }
  },[])

  const getNowPlaying = () => {
    spotifyApi.getMyCurrentPlaybackState().then((response) => {
      console.log(response);
      setNowPlaying({
        name: response.item.name,
        albumArt: response.item.album.images[0].url
      })
    })
  }
  
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
      {!loggedIn && (
        <a href={loginEndpoint}>Log In</a>
      )}
      {loggedIn && (
        <>
          <div className='profile'>
            <img src={profile.images[0].url} style={{height: 150}} />
            <div>{profile.display_name}</div>
          </div>
          <div>Now Playing: {nowPlaying.name}</div>
          <div>
            <img src={nowPlaying.albumArt} style={{height: 150}} />
          </div>
        </>
      )}
      {loggedIn && (
        <button onClick={() => getNowPlaying()}>Check Now Playing</button>
      )}
      <button onClick={handleGetSavedAlbums}>Saved Albums</button>
      <TopArtists />
      <TopSongs />
      <Playback />
    </>
  )
}

export default App
