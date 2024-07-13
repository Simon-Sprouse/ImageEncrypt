import React, { useState, useRef, useEffect } from 'react';
import { binaryToString, testDecryption } from './logic';

function Decrypt() { 

    const canvasRef1 = useRef(null);
    const canvasRef2 = useRef(null);

    const [plainPreview, setPlainPreview] = useState(null);
    const [cryptPreview, setCryptPreview] = useState(null);

    const [plainArray, setPlainArray] = useState([]); // stores Uint8ClampedArray orignal
    const [cryptArray, setCryptArray] = useState([]); // stores Uint8ClampedArray crypt

    function handlePlainUpload(event) { 
        const file = event.target.files[0];
        if (file) { 
            const reader = new FileReader();
            reader.onloadend = () => { 
                setPlainPreview(reader.result);
            }
            reader.readAsDataURL(file);
        }
    }

    function handleCryptUpload(event) { 
        const file = event.target.files[0];
        if (file) { 
            const reader = new FileReader();
            reader.onloadend = () => {
                setCryptPreview(reader.result);
            }
            reader.readAsDataURL(file);
        }
    }


    function handleDecrypt() { 
        if (plainArray.length > 0 && cryptArray.length > 0) { 

            const binaryText = testDecryption(plainArray, cryptArray);
            const plainText = binaryToString(binaryText);

            const textEditor = document.getElementById("cryptTextEditor");
            textEditor.value = plainText;


        }
    }

    // after plain image is loaded, take the pixel array. 
    useEffect(() => { 
        if (plainPreview) {
            const img = new Image();
            img.onload = () => { 

                const canvas = canvasRef1.current;

                const ctx = canvas.getContext("2d");
                const width = img.naturalWidth;
                const height = img.naturalHeight;
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, width, height);
                const data = imageData.data;

                setPlainArray(data);

            }
            img.src = plainPreview;
        }
    }, [plainPreview]);

    // after the crypt image is loaded, take the pixel array. 
    useEffect(() => { 
        if (cryptPreview) {
            const img = new Image();
            img.onload = () => { 

                const canvas = canvasRef2.current;
                
                const ctx = canvas.getContext("2d");
                const width = img.naturalWidth;
                const height = img.naturalHeight;
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, width, height);
                const data = imageData.data;

                setCryptArray(data);

            }
            img.src = cryptPreview;
        }
    }, [cryptPreview]);



    return (
        <div>

            <canvas ref={canvasRef1} style={{display: "none"}}></canvas>
            <canvas ref={canvasRef2} style={{display: "none"}}></canvas>

            <button onClick={handleDecrypt}>Apply Decryption</button>

            <div>
                <textarea
                    id="cryptTextEditor"
                    rows="10"
                    cols="50"
                    placeholder="The decrypted text will appear here."
                    style={{textAlign: "left"}}
                ></textarea>
            </div>

            <div className="SideBySide">

                <div className="Decrypt-Upload">
                    <h2>Upload Plain Image</h2>
                    <input 
                        type="file"
                        accept="image/png"
                        onChange={handlePlainUpload}
                    />
                    {plainPreview && (
                        <div>
                            <p>Plain Image Preview:</p>
                            <img 
                                src={plainPreview}
                                alt="Plain Image Preview"
                            />
                        </div>
                    )}
                </div>
                
                <div className="Decrypt-Upload">
                    <h2>Upload Cypher Image</h2>
                    <input 
                        type="file"
                        accept="image/png"
                        onChange={handleCryptUpload}
                    />
                    {cryptPreview && (
                        <div>
                            <p>Cypher Image Preview:</p>
                            <img 
                                src={cryptPreview}
                                alt="Crypt Image Preview"
                            />
                        </div>
                    )}
                </div>

                
            </div>

            

            
           

            
        </div>
    )

}

export default Decrypt;