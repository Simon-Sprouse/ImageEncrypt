import React, { useState, useEffect } from 'react';

function ImageUploader() { 

    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [pixelArray, setPixelArray] = useState([]);


    function handleImageUpload(event) { 

        const file = event.target.files[0];
        if (file) { 

            setImageFile(file);
            const reader = new FileReader();
            
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    // after image is loaded, create blank array to store pixel noise
    useEffect(() => { 

        if (preview) {
            const img = new Image();
            img.onload = () => { 
                const width = img.naturalWidth;
                const height = img.naturalHeight;
                const newPixelArray = Array.from({length: width * height}, () => [0, 0, 0]);
                setPixelArray(newPixelArray);
            }
            img.src = preview;
        }
    }, [preview]);

    return (
        <div>
            <h2>Upload Image</h2>
            <input 
                type="file"
                accept="image/png"
                onChange={handleImageUpload}
            />
            {preview && (
                <div>
                    <p>Image Preview:</p>
                    <img 
                        src={preview}
                        alt="Image Preview"
                    />
                    <p>Data URL: {preview}</p>
                </div>
            )}
            {pixelArray.length > 0 && (
                <div>
                    <p>Array with black pixels: </p>
                    <pre>{JSON.stringify(pixelArray, null, 2)}</pre>
                </div>
            )}
        </div>
    )
}

export default ImageUploader;