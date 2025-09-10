import { useState } from 'react'
import './App.css'
import { GAME_TITLE } from './const/title'
import Controller from './components/Controller'
import Form from './components/Form'
import Canvas from './components/Canvas'

function App() {

  const [title, setTitle] = useState(GAME_TITLE.ONPIECE)
  const [deckList, setDeckList] = useState('')

  return (
    <>
      <Controller title={title} setTitle={setTitle} />
      <Form setDeckList={setDeckList} />
      <Canvas deckList={deckList} />
    </>
  )
}

export default App
