import Header from './Header/Header';
import Nav from './Navbar/Nav';
import Body from './Body/Body';
import { useState } from 'react';

function App() {

  const [auth, setAuth] = useState(false)

  return (
    <>
      <Header />
      <Nav />
      <Body />
    </>
  )
}

export default App
