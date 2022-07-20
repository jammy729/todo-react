import React, { useState, useEffect } from 'react'
import { Container } from '@chakra-ui/react'
import { db } from './firebase'
import { set, ref } from 'firebase/database.js'
import { uid } from 'uid'
const App = () => {

  const [ ]
  // create
  const createDatabase = () => {
    const uuid = uid()
    set(ref(db, `/${uuid}`), {
      todo,
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
