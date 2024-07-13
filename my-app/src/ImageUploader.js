import React, { useState, useEffect, useRef } from 'react';
import { stringToBinary, createEncryption } from './logic';



function ImageUploader() { 

    const canvasRef = useRef(null); // used to manipulate images

    const [preview, setPreview] = useState(null);               // stores dataURL to original
    const [cryptPreview, setCryptPreview] = useState(null);     // stores dataURL to crypt

    const [pixelArray, setPixelArray] = useState([]);           // stores Uint8ClampedArray orignal
    const [cryptPixelArray, setCryptPixelArray] = useState([]); // stores Uint8ClampedArray crypt


    // handle image upload 
    function handleImageUpload(event) { 

        setCryptPixelArray([]); // wipe out old crypt just in case

        const file = event.target.files[0];
        if (file) { 

            const reader = new FileReader();

            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    // when clicked generates encrypted image
    function handleButtonClick() { 

        const textArea = document.getElementById("textEditor");
        const text = textArea.value;
        const binaryText = stringToBinary(text);

        if (pixelArray.length > 0) { 

            const newCryptPixelArray = createEncryption(pixelArray, binaryText);
            setCryptPixelArray(newCryptPixelArray);

        }

    }

    // to save crypted images
    function saveCrypt() {
        const link = document.createElement('a');
        link.href = cryptPreview;
        link.download = "crypt_image";
        link.click();
    }

    // after image preview is loaded, extract pixel data into state
    useEffect(() => { 

        if (preview) {
            const img = new Image();
            img.onload = () => { 

                const canvas = canvasRef.current;
                const ctx = canvas.getContext("2d");

                const width = img.naturalWidth;
                const height = img.naturalHeight;

                canvas.width = width;
                canvas.height = height;

                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, width, height);
                const data = imageData.data;

                setPixelArray(data);
            }
            img.src = preview;
        }
    }, [preview]);


    // after image is encrypted, display the encrypted image
    useEffect(() => { 

        if (cryptPixelArray.length > 0) { 
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            const imageData = new ImageData(new Uint8ClampedArray(cryptPixelArray), canvas.width, canvas.height);

            ctx.putImageData(imageData, 0, 0);
            const dataURL = canvas.toDataURL();
            setCryptPreview(dataURL);
        }

    }, [cryptPixelArray]);

    return (
        <div>
            <canvas ref={canvasRef} style={{display: "none"}}></canvas>

            <div>
                <button onClick={handleButtonClick}>Apply Encryption</button>
            </div>
            

            <textarea
                id="textEditor"
                rows="10"
                cols="50"
                placeholder="Enter text here for encryption."
                style={{textAlign: "left"}}
            />
            
            <h2>Upload Image</h2>
            <input 
                type="file"
                accept="image/png"
                onChange={handleImageUpload}
            />

            <div className="SideBySide">
                {preview && (
                    <div>
                        <p>Image Preview:</p>
                        <img 
                            src={preview}
                            alt="Image Preview"
                        />
                    </div>
                )}
                
                {cryptPreview && (
                    <div>
                        <div>
                            <p>Crypt Image Preview:</p>
                            <img
                                src={cryptPreview}
                                alt="Crypt Image Preview"
                            />
                            
                        </div>
                        
                    </div>
                )}
            </div>

            {cryptPreview && <button onClick={saveCrypt}>Click to Save</button>}
            
        </div>
    )
}

export default ImageUploader;