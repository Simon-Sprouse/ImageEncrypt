import React, { useState } from 'react';


function TextEditor() { 

    const [text, setText] = useState('');

    function handleChange(event) { 
        setText(event.target.value);
    }


    function stringToBinary(str) {
        let binaryString = "";
        for (let i = 0; i < str.length; i++) {
            let asciiValue = str.charCodeAt(i);
            let binaryValue = asciiValue.toString(2);
            let paddedBinaryValue = binaryValue.padStart(7, "0");
            binaryString += paddedBinaryValue + " "
        }
        return binaryString.trim();
    }

    return (
        <div>
            <h2>Text Editor Area</h2>
            <textarea

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