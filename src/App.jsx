import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FridayResponse from './components/Response/FridayResponse'
import SpeechRecog from './components/SpeechRecog'
import { Store } from './components/ReduxStore/Store'
import { Provider } from 'react-redux'

function App() {
  const [day_night, setday_night] = useState(false)

  return (
    <div className='parent'>
      <Provider store={Store}>
      <FridayResponse/>
      <SpeechRecog className="speechrecog"/>
      </Provider>
    </div>
  )
}

export default App
