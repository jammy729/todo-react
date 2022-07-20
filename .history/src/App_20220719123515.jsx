import React, { useState, useEffect } from 'react'
import {
  Container,
  Input,
  Button,
  Text,
  Flex,
  Divider,
  Spacer,
  Box,
  ButtonGroup,
  IconButton
} from '@chakra-ui/react'
import { db } from './firebase'
import { set, ref, onValue, remove, update } from 'firebase/database'
import { uid } from 'uid'
import { AddIcon } from '@chakra-ui/icons'

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
    <Container maxW='500px' pt={4}>
      <Box align='center'>
        <Text fontWeight='semibold' fontSize='xl'>
          Todo App
        </Text>
      </Box>
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
          <Button onClick={writeToDatabase} colorScheme='blue'>
            Submit
          </Button>
        )}
      </Flex>

      {todos.map(todo => (
        <>
          <Flex mb={3} m={3}>
            <Box>
              <h1>{todo.todo}</h1>
              {console.log(todo.todo)}
            </Box>
            <Spacer />
            <Box>
              <ButtonGroup>
                <Button
                  onClick={() => handleUpdate(todo)}
                  colorScheme='whatsapp'
                >
                  update
                </Button>
                <Button
                  onClick={() => handleDelete(todo)}
                  variant='outline'
                  colorScheme='red'
                >
                  delete
                </Button>
              </ButtonGroup>
            </Box>
          </Flex>
          <Divider />
        </>
      ))}
    </Container>
  )
}
export default App
