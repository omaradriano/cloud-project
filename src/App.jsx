import Header from './Header/Header';
import Nav from './Navbar/Nav';
import Body from './Body/Body';
import { useEffect, useState } from 'react';
import { WidthContext } from './Context/Context';

function App() {


  const [auth, setAuth] = useState(false)
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
    handleResize()
  }, [])

  return (
    <>
      <WidthContext.Provider value={width}>
        <Header />
        <Nav />
        <Body />
      </WidthContext.Provider>
    </>
  )
}

export default App
