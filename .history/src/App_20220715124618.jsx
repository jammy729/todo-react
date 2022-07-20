import React from 'react'
import { Container } from '@chakra-ui/react'
import { db } from './firebase'
import { uid } from 'uid'
const App = () => {
  // create
  const createDatabase = () => {
    set(ref(db, ''))
  }

  // read

  // update

  // delete
  return (
    <div>
      <input type='text' />
      <button>submit</button>
    </div>
  )
}
export default App
