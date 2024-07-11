import React, { useState } from 'react';
import { stringToBinary } from './logic';

function TextEditor() { 

    const [text, setText] = useState('');

    function handleChange(event) { 
        setText(event.target.value);
    }


    

    return (
        <div>
            <h2>Text Editor Area</h2>
            <textarea
                id="textEditor"
                onChange={handleChange}
                rows="10"
                cols="50"
            />
            <p>Current Text: </p>
            <p>{text}</p>
            <p id="binary">{stringToBinary(text)}</p>
        </div>
    )



}

export default TextEditor;