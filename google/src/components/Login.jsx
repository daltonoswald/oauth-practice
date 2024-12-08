import GoogleLogin from '@leecheuk/react-google-login';

const clientId = '31063382318-7ebh20b0b9mdnchkk2or11m8ojo7k4em.apps.googleusercontent.com'

function Login({ userData, setUserData }) {

    const onSuccess = (res) => {
        console.log("LOGIN SUCCESS! CURRENT USER: ", res.profileObj)
        setUserData(res.profileObj);
    }

    const onFailure = (res) => {
        console.log('LOGIN FAILED! res: ', res);
    }

    return (
        <div id='signInButton'>
            <GoogleLogin
                clientId={clientId}
                buttonText='Login'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

export default Login