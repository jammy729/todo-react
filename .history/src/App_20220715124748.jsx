import React from 'react'
import { Container } from '@chakra-ui/react'
import { db } from './firebase'
import { uid } from 'uid'
const App = () => {
  // create
  const createDatabase = () => {
    const uuid = uid()
    set(ref(db, `/${uuid}`), {
      todo: todo,
      uuid
    })
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
