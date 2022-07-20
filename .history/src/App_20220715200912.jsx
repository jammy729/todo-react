import React, { useState, useEffect } from 'react'
import {
  Container,
  Input,
  Button,
  SimpleGrid,
  Flex,
  Divider,
  Spacer,
  Box
} from '@chakra-ui/react'
import { db } from './firebase'
import { set, ref, onValue, remove, update } from 'firebase/database'
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
    setEdit(true)
    setTempUuid(todo.uuid)
    setTodo(todo.todo)
  }

  const handleSubmitChange = () => {
    update(ref(db, `/${tempUuid}`), {
      todo,
      uuid: tempUuid
    })
    setTodo('')
    setEdit(false)
  }

  // delete
  const handleDelete = todo => {
    remove(ref(db, `/${todo.uuid}`))
  }

  return (
    <Container maxW='400px'>
      <Flex m={3}>
        <Input value={todo} onChange={handleChange} mr={4} />
        {edit ? (
          <>
            <Button onClick={handleSubmitChange}>Submit Change</Button>
            <Button
              onClick={() => {
                setEdit(false)
                setTodos('')
              }}
            >
              X
            </Button>
          </>
        ) : (
          <Button onClick={writeToDatabase}>Submit</Button>
        )}
      </Flex>

      {todos.map(todo => (
        <>
          <Flex mb={3}>
            <Box>
              <h1>{todo.todo}</h1>
            </Box>
            <Spacer />
            <Box>
              <Button onClick={() => handleUpdate(todo)} mx={3}>
                update
              </Button>
              <Button onClick={() => handleDelete(todo)}>delete</Button>
            </Box>
          </Flex>
          <Divider />
        </>
      ))}
    </Container>
  )
}
export default App
