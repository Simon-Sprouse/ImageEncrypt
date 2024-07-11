import React, { useState, useEffect } from 'react';
import { stringToBinary, createEncryption } from './logic';

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

252 is now the max to be considered elligible. 

Because modifications to the color channels can happen indepenently, there are now 6 bits encoded in each pixel. 

Ok so now we need to convert the text file into a bitstring of ascii characters. 

Then we can hide the bitstring with an encryption function and retrieve it with a decryption function. 






Ok this function loops through the pixel array until the binary chars are finished. So maybe a while loop is appropriate here.

The loop will first check if the channel is alpha, if so move to the next pixel. 

Next we check and see how many remaining chars there are. 

If 2 or more remain, we can take two, hide them in the channel, and move to the next channel. 

If only one, we can hide it in the channel, end function. 

If 0, end the function. 

While loop needs to terminate if:
    - the pixel array runs out of available pixels. 
    - the binary string is totally encoded.


Oh also I need to sign the ending right? 

I will do this by adding in a rare - 1




Example: 

? -- 0111111
[100, 120, 90, 255, 30, 120, 80, 255]


channelIndex: 0
binaryIndex: 0

remainingChannels: 8
remainingBinary: 7

first pass: 

currentChannel = pixelArray.at(channelIndex) // 100
currentBinary = binaryText.substring(binaryIndex, binaryIndex + 2); // 01

currentChannel += 01; // 101
// push currentChannel to new array

channelIndex += 1; // 1
binaryIndex += 2; // 2
remainingChannels -= 1; // 7
remainingBinary -= 2; // 5

second pass: 

currentChannel = pixelArray.at(channelIndex) // 120
currentBinary = binaryText.substring(binaryIndex, binaryIndex + 2); // 11

currentChannel += 11; // 123
// push currentChannel to new array

channelIndex += 1; // 2
binaryIndex += 2; // 4
remainingChannels -= 1; // 6
remainingBinary -= 2; // 3










*/

function ImageUploader() { 

    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [pixelArray, setPixelArray] = useState([]);

    const [cryptPixelArray, setCryptPixelArray] = useState([]);

    function handleButtonClick() { 

        const textArea = document.getElementById("textEditor");
        const text = textArea.value;
        const binaryText = stringToBinary(text);

        // if (pixelArray.length > 0) { 

        //     console.log("You now have pixel Array");
        //     createEncryption([100, 120, 90, 255, 30, 120, 80, 255], "0111111");

        // }

        console.log("You now have pixel Array");
        createEncryption([100, 120, 90, 255, 30, 120, 80, 255], "0111111");


    }


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

                // console.log("data: ", data);

                setPixelArray(data);
            }
            img.src = preview;
        }
    }, [preview]);

    return (
        <div>
            <button onClick={handleButtonClick}>Apply encryption</button>
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