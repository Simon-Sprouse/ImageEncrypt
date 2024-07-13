import './App.css';
import ImageUploader from './ImageUploader';
import Decrypt from './Decrypt';

import React, { useState, useRef } from 'react';

function App() {



    const encryptButton = useRef(null);
    const decryptButton = useRef(null);

    const [page, setPage] = useState("Encrypt");

    function encryptPage() { 
        setPage("Encrypt");

        encryptButton.current.className = "active";
        decryptButton.current.className = "";

    }
    
    function decryptPage() {
        setPage("Decrypt");

        encryptButton.current.className = "";
        decryptButton.current.className = "active";
    }

    return (
        <div className="App">
            <header className="Header">
                <h1>Image Encrypt Algorithm</h1>
                <div className="pageToggle">
                    <button className="active" ref={encryptButton} onClick={encryptPage}>Encrypt an Image</button>
                    <button ref={decryptButton} onClick={decryptPage}>Decrypt an Image</button>
                </div>
            </header>
            <div>
                {page === "Encrypt" && <ImageUploader />}
                {page === "Decrypt" && <Decrypt />}
            </div>
        </div>
    );
}

export default App;
