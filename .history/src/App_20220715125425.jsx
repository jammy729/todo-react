import React, { useState, useEffect } from 'react'
import { Container, Input, Button } from '@chakra-ui/react'
import { db } from './firebase'
import { set, ref } from 'firebase/database'
import { uid } from 'uid'
const App = () => {
  const [todo, setTodo] = useState('')

  const handleChange = e => {
    setTask(e.target.value)
  }

  // create
  const writeToDatabase = () => {
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
      <Input type='text' value={todo} onChange={handleChange} />
      <Button onClick={writeToDatabase}>submit</Button>
    </Container>
  )
}
export default App
