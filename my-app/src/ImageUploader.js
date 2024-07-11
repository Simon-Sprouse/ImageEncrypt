import React, { useState, useEffect } from 'react';

/*

Ok so here's what the fuck I'm doing here

So I have an array that represents the pixels all in a sequence so heres psuedocode of how to hide text. 

First we turn the text into binary. I think ASCII is good, so that means every letter is 7 bits. 

Now I iterate through the pixels array, taking groups of four elements, a group of four represents one pixel. 

So now lets start by encoding one bit as a +1 to any color channel that isn't already at the boundary, boundaries get skipped.

We can encode 2 bits by adding 3 to the color channel:
    - 00 no change (assuming it's not an ineligible pixel)
    - 01 + 1
    - 10 + 2
    - 11 + 3

Because modifications to the color channels can happen indepenently, there are now 6 bits encoded in each pixel. 

Ok so now we need to convert the text file into a bitstring of ascii characters. 

Then we can hide the bitstring with an encryption function and retrieve it with a decryption function. 





*/

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

                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                const width = img.naturalWidth;
                const height = img.naturalHeight;

                canvas.width = width;
                canvas.height = height;

                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, width, height);
                const data = imageData.data;

                console.log("data: ", data);

                setPixelArray(data);
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