import React, { useState } from 'react';
import { UserAgentApplication } from 'msal';
import axios from 'axios';

const msalConfig = {
  auth: {
    clientId: "059ca97a-c66b-4aa8-8043-a058de698016",
    authority: "https://login.microsoftonline.com/chihuahua2.tecnm.mx",
    redirectUri: "http://localhost:5173/",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  }
};

const msalInstance = new UserAgentApplication(msalConfig);

const SignIn = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [jobTitle, setJobTitle] = useState(null);

  function getAdditionalUserInfo(accessToken) {
    axios.get('https://graph.microsoft.com/v1.0/me/photo/$value', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      responseType: 'blob'
    })
    .then(response => {
      const url = URL.createObjectURL(response.data);
      setProfilePicture(url);
    })
    .catch(err => {
      console.log(err);
    });
  }

  function getUserInfo() {
    const loginRequest = {
      scopes: ['openid', 'profile', 'User.Read']
    };
  
    msalInstance.acquireTokenSilent(loginRequest)
      .then(response => {
        const userInfo = response.idTokenClaims;
        setUserInfo(userInfo);
        getAdditionalUserInfo(response.accessToken);
        
        // Get job title from Microsoft Graph
        axios.get('https://graph.microsoft.com/v1.0/me', {
          headers: {
            Authorization: `Bearer ${response.accessToken}`
          }
        })
        .then(response => {
          setJobTitle(response.data.jobTitle);
        })
        .catch(err => {
          console.log(err);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  function login() {
    const loginRequest = {
      scopes: ['openid', 'profile', 'User.Read']
    };

    msalInstance.loginPopup(loginRequest)
      .then(() => {
        getUserInfo();
      })
      .catch(err => {
        console.log(err);
      });
  }

  function logout() {
    msalInstance.logout();
    setUserInfo(null);
    setProfilePicture(null);
  }

  return (
    <>
      <h1>Inicio de sesion</h1>
      <button onClick={login} className='btn'>Iniciar sesion con Outlook</button>
      
      {userInfo && (


<div>
<h2>Perfil de Usuario</h2>
<table className='tblPerfil'>
  <tbody>
    <tr>
      <td><strong>Nombre:</strong></td>
      <td>{userInfo.name}</td>
    </tr>
    <tr>
      <td><strong>Correo electrónico:</strong></td>
      <td>{userInfo.preferred_username}</td>
    </tr>
    <tr>
      <td><strong>Carrera:</strong></td>
      <td>{jobTitle}</td>
    </tr>
    <tr>
      <td><strong>Foto de perfil:</strong></td>
      <td>
        {profilePicture && <img src={profilePicture} alt="Profile" />}
      </td>
    </tr>
    
  </tbody>
</table>
<button onClick={logout} className='btn'>Cerrar sesion</button>
</div>
      )}
    </>
  );
}

export default SignIn;