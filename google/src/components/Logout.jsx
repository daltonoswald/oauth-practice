import { GoogleLogout } from '@leecheuk/react-google-login';

const clientId = '31063382318-7ebh20b0b9mdnchkk2or11m8ojo7k4em.apps.googleusercontent.com'

function Logout({ userData, setUserData }) {

    const onSuccess = () => {
        console.log('Logout successful!')
        setUserData(null)
    }


    return (
        <div id='signInButton'>
            <GoogleLogout
                clientId={clientId}
                buttonText={'Logout'}
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default Logout