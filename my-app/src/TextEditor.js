import React, { useState } from 'react';


function TextEditor() { 

    const [text, setText] = useState('');

    function handleChange(event) { 
        setText(event.target.value);
    }

    return (
        <div>
            <h2>Text Editor Area</h2>
            <textarea
                value={text}
                onChange={handleChange}
                rows="10"
                cols="50"
            />
            <p>Current Text: </p>
            <div>
                {text}
            </div>
        </div>
    )



}

export default TextEditor;