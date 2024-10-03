import React, { useState, useEffect } from 'react';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

function Speak({ content }) {
    const [isSpeaking, setIsSpeaking] = useState(false);

    const speakContent = () => {
        if (isSpeaking) {
            window.speechSynthesis.cancel();  // Stop if already speaking
            setIsSpeaking(false);
        } else {
            const utterance = new SpeechSynthesisUtterance(content);
            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);  // When finished speaking, reset
            console.log(content);
        }
    };

    return (
        <div onClick={speakContent} style={{ cursor: 'pointer' }} role="button" aria-pressed={isSpeaking}>
            {isSpeaking ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </div>
    );
}

// Speak.defaultProps = {
//     content: "Hello, this is the default content!"
// };

export default Speak;
