import { useState } from 'react';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton } from 'react-social-login-buttons'

function App() {
  const [profile, setProfile] = useState(null);

  return (
    <>
        {!profile && (
        <LoginSocialFacebook
          appId='1106733960835643'
          onResolve={(response) => {
            console.log(response)
            setProfile(response.data)
          }}
          onReject={(error) => {
            console.log(error)
          }}>
            <FacebookLoginButton />
        </LoginSocialFacebook>
      )}

      {profile && (
        <div className='profile-data'>
          <h1>{profile.name}</h1>
          <img src={profile.picture.data.url} />
        </div>
      )}
    </>
  )
}

export default App
