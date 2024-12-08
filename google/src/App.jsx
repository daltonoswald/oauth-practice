import { useState } from 'react'
import Login from './components/Login'
import Logout from './components/Logout'
import { useEffect } from 'react'
import { gapi } from 'gapi-script'

const clientId = '31063382318-7ebh20b0b9mdnchkk2or11m8ojo7k4em.apps.googleusercontent.com' 

function App() {

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };

    gapi.load('client:auth2', start);
  })

  return (
    <div className='App'>
      <Login userData={userData} setUserData={setUserData} />
      <Logout userData={userData} setUserData={setUserData} />
      {userData && (
        <div className='user-data'>
          <p>{userData.name}</p>
          <p>{userData.email}</p>
          <img src={userData.imageUrl} referrerPolicy='no-referrer' />
        </div>
      )}
    </div>
  )
}

export default App
