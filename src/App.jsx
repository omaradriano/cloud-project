import Header from './components/Header';
import Nav from './components/Nav';
import Body from './components/Body';
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
