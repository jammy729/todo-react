import React from 'react'
import { Container } from '@chakra-ui/react'
import { db } from './firebase'
import { uid } from 'uid'
const App = () => {
  return (
    <Container>
      <input type='text' />
      <button>submit</button>
    </Container>
  )
}
export default App
