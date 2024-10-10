import { useState } from 'react'
import './App.css'
import FridayResponse from './components/Response/FridayResponse'
import SpeechRecog from './components/SpeechRecog'
import { Store } from './components/ReduxStore/Store'
import { Provider } from 'react-redux'

function App() {
  return (
    <div className='parent'>
      <Provider store={Store}>
      <FridayResponse className="friday"/>
      </Provider>
    </div>
  )
}

export default App
