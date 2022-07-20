import React, { useState, useEffect } from 'react'
import { Container, Input, Button } from '@chakra-ui/react'
import { db } from './firebase'
import { set, ref, onValue, remove } from 'firebase/database'
import { uid } from 'uid'
const App = () => {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [edit, setEdit] = useState(false)
  const [tempUuid, setTempUuid] = useState('')
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
      setTodos([])
      const data = snapshot.val()
      if (data !== null) {
        Object.values(data).map(todo => {
          setTodos(oldArray => [...oldArray, todo])
        })
      }
    })
  }, [])

  // update
  const handleUpdate = () => {
    setIsEdit(true)
    setTempUuid(todo.uuid)
  }

  // delete
  const handleDelete = todo => {
    remove(ref(db, `/${todo.uuid}`))
  }

  return (
    <Container>
      <Input value={todo} onChange={handleChange} />
      {isEdit ? (
        <>
          <Button onClick={writeToDatabase}>Submit Change</Button>
          <Button onClick=P></Button>
        </>
      ) : (
        <Button onClick={writeToDatabase}>Submit</Button>
      )}
      <Button onClick={writeToDatabase}>submit</Button>
      {todos.map(todo => (
        <>
          <h1>{todo.todo}</h1>
          <Button onClick={() => handleUpdate(todo)}>update</Button>
          <Button onClick={() => handleDelete(todo)}>delete</Button>
        </>
      ))}
    </Container>
  )
}
export default App
