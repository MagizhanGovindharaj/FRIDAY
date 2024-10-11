import { useEffect, useState } from 'react'
import './App.css'
import FridayResponse from './components/Response/FridayResponse'
import SpeechRecog from './components/SpeechRecog'
import {useSelector } from 'react-redux'
import Menubar from './components/Menubar/Menubar'

function App() {
  const allData = useSelector((state) => state.questionData);
  const [day, setDay] = useState(null);
  useEffect(() => {
    const currentHour = Number(new Date().getHours());
    if (currentHour >= 6 && currentHour < 18) {
      setDay(true);
      document.body.style.backgroundColor = "white"; 
    } else {
      setDay(false);
      document.body.style.backgroundColor = "#212121";
    }
  }, [allData]);
  return (
    <div className='parent'>
      <section className='bodysection'>
        <Menubar day={day}/>
        <FridayResponse className="friday"/>
      </section>
    </div>
  )
}

export default App
