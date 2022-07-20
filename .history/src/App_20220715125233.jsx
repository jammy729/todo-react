import React, { useState, useEffect } from 'react'
import { Container, Input } from '@chakra-ui/react'
import { db } from './firebase'
import { set, ref } from 'firebase/database'
import { uid } from 'uid'
const App = () => {
  const [todo, setTodo] = useState('')
  const handleChange = e => {
    setTask(e.target.value)
  }
  // create
  const createDatabase = () => {
    const uuid = uid()
    set(ref(db, `/${uuid}`), {
      todo,
      uuid
    })

    setTodo('')
  }

  // read

  // update

  // delete
  return (
    <Container>
      <input type='text' value={todo} onChange={handleChange} />
      <button onClick={createDatabase}>submit</button>
    </Container>
  )
}
export default App
