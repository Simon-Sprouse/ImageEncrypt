// Lets go


export function stringToBinary(str) {

    // TODO: at some point we must check for non-acii characters

    let binaryString = "";
    for (let i = 0; i < str.length; i++) {
        let asciiValue = str.charCodeAt(i);
        let binaryValue = asciiValue.toString(2);
        let paddedBinaryValue = binaryValue.padStart(7, "0");
        binaryString += paddedBinaryValue;
    }
    return binaryString.trim();
}

export function binaryToString(bin) { 

    let result = "";

    for (let i = 0; i < bin.length; i += 7) { 
        let binaryChunk = bin.substring(i, i + 7);

        if (binaryChunk.length != 7) { 
            break;
        }

        let asciiValue = parseInt(binaryChunk, 2);

        if (asciiValue < 32 || asciiValue > 126) { 
            continue; // TODO make this break
        }
        


        let char = String.fromCharCode(asciiValue);
        result += char;


    }

    return result;


}

export function createEncryption(pixelArray, binaryText) { 

    console.log("Pixel array at begining: ", pixelArray);

    const newChannelArray = [];

    let channelIndex = 0;
    let binaryIndex = 0;

    let remainingChannels = pixelArray.length;
    let remainingBinary = binaryText.length;

    while(true) { 

        let currentChannel;
        let currentBinary;

        // skip over alpha channel, we don't want any transparency
        if (channelIndex % 4 == 3) { 
            newChannelArray.push(pixelArray.at(channelIndex));
            channelIndex += 1;
            remainingChannels -= 1; 
            continue;
        }

        if (remainingChannels <= 0) { 
            break;
        }
        if (remainingBinary <= 0) { 
            break;
        }

        if (pixelArray.at(channelIndex) > 252) { 
            newChannelArray.push(pixelArray.at(channelIndex));
            channelIndex += 1;
            remainingChannels -= 1;
            continue;
        }

        currentChannel = pixelArray.at(channelIndex);
        channelIndex += 1;
        remainingChannels -= 1; 

        if (remainingBinary == 1) { 
            currentBinary = binaryText.at(binaryIndex) + "0";
            binaryIndex += 1;
            remainingBinary -= 1;
        }
        else { 
            currentBinary = binaryText.substring(binaryIndex, binaryIndex + 2);
            binaryIndex += 2;
            remainingBinary -= 2; 
        }

        if (currentBinary == "00") { 
            // nothing
        }
        else if (currentBinary == "01") { 
            currentChannel += 1;
        }
        else if (currentBinary == "10") { 
            currentChannel += 2;
        }
        else { 
            currentChannel += 3;
        }

        newChannelArray.push(currentChannel);
        
        
    }

    // TODO: Mark the end of the text somehow. Maybe not necessary idk 


    for (let i = channelIndex; i < pixelArray.length; i ++) { 
        newChannelArray.push(pixelArray.at(i));

    }


    console.log("Channel Array at end: ", newChannelArray);

    return newChannelArray;
}



export function createDecryption(plainArray, cryptArray) {
    console.log("Plain array: ", plainArray);
    console.log("Crypt array: ", cryptArray);


    /*
    
    Ok so loop through the orignal image array and follow the same rules

    If a pixel in the orignal image is 252 or greater or alpha, then skip
    If we reach the end of the image then break


    
    */


    // TODO: at some point we will need input validation to make sure both images are the same size

    let binaryText = "";
    let difference; 

    let continuousZeroes = 0;
    
    for (let i = 0; i < plainArray.length; i++) { 

        if (i % 4 == 3) { 
            continue;
        }

        if (plainArray.at(i) > 252) { 
            continue;
        }

        difference = cryptArray.at(i) - plainArray.at(i);

        if (difference == 0) { 
            binaryText += "00";
            continuousZeroes += 1;
        }
        else { 
            continuousZeroes = 0;
        }
        
        if (difference == 1) { 
            binaryText += "01";
        }
        else if (difference == 2) { 
            binaryText += "10";
        }
        else { 
            binaryText += "11";
        }


        if (continuousZeroes > 14) { 
            break;
        }


    }




    return binaryText;
}


export function testDecryption(plainArray, cypherArray) {

    const differenceArray = [];
    let difference;

    for (let i = 0; i < plainArray.length; i++) { 
        difference = cypherArray.at(i) - plainArray.at(i);
        differenceArray.push(difference);
    }

    console.log(differenceArray);

    let outputString = "";
    let diff;


    for (let i = 0; i < differenceArray.length; i++) { 
        if (i % 4 == 3 || plainArray.at(i) > 252) { 
            continue;
        }

        diff = differenceArray.at(i);

        if (diff == 0) { 
            outputString += "00";
        }
        else if (diff == 1) { 
            outputString += "01";
        }
        else if (diff == 2) { 
            outputString += "10";
        }
        else if (diff == 3) { 
            outputString += "11";
        }
        
    }

    console.log("Output String: ", outputString);

    const plainText = binaryToString(outputString);

    console.log("Plain Text: ", plainText);

    return outputString;

}