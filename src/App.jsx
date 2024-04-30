import Header from './Header/Header';
import Nav from './Navbar/Nav';
import Body from './Body/Body';
import { useEffect, useState } from 'react';
import { WidthContext } from './Context/Context';

import { AuthContext } from './Context/Context.jsx'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseAuth.js';

function App() {


  const [authentication, setAuthentication] = useState(false)

  const [width, setWidth] = useState(null)

  // Esto maneja el mostrar un burguer button o las opciones en base al width de la pantalla
  function handleResize() {
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerWidth]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthentication(user)
        console.log('user logged in');
      } else {
        setAuthentication(null)
        console.log("user is logged out")
      }
    });
    handleResize()
  }, [])

  useEffect(()=>{
    console.log('Datos del state',authentication);
  },[authentication])

  return (
    <>
      <AuthContext.Provider value={{ authentication }}>
        <WidthContext.Provider value={width}>
          <Header />
          <Nav />
          <Body />
        </WidthContext.Provider>
      </AuthContext.Provider>
    </>
  )
}

export default App
