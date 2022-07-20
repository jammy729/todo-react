import React, { useState, useEffect } from 'react'
import { Container } from '@chakra-ui/react'
import { db } from './firebase'
import { set, ref } from 'firebase/database.js'
import { uid } from 'uid'
const App = () => {
  const [tastk, setTask] = useState('')
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

    setTask('')
  }

  // read

  // update

  // delete
  return (
    <div>
      <input type='text' value={todo} onChange={handleChange} />
      <button onClick={createDatabase}>submit</button>
    </div>
  )
}
export default App
