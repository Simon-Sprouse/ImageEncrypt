import './App.css';
import ImageUploader from './ImageUploader';
import Decrypt from './Decrypt';

import React, { useState } from 'react';

function App() {


    const [page, setPage] = useState("Encrypt");

    function encryptPage() { 
        setPage("Encrypt");
    }
    
    function decryptPage() {
        setPage("Decrypt");
    }

    return (
        <div className="App">
            <header className="Header">
                <h1>Image Encrypt Algorithm</h1>
                <div className="pageToggle">
                    <button onClick={encryptPage}>Encrypt</button>
                    <button onClick={decryptPage}>Decrypt</button>
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
