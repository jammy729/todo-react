import React, { useState, useEffect } from 'react'
import { Container, Input, Button } from '@chakra-ui/react'
import { db } from './firebase'
import { set, ref, onValue } from 'firebase/database'
import { uid } from 'uid'
const App = () => {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const handleChange = e => {
    setTodo(e.target.value)
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
  useEffect(() => {
    onValue(ref(db), snapshot => {
      const data = snapshot.val()
      if (data !== null) {
        Object.values(data).map((todo) => {
          setTodos(oldArray => [...oldArray, todo])
        })
      }
    })
  }, [])

  // update

  // delete
  return (
    <Container>
      <Input value={todo} onChange={handleChange} />
      <Button onClick={writeToDatabase}>submit</Button>
      {todos.map(todo => (
        <>
          <h1>{todo.todo}</h1>
          <Button>update</Button>
          <Button>delete</Button>
        </>
      ))}
    </Container>
  )
}
export default App
