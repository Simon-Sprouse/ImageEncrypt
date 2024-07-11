// Les go


export function stringToBinary(str) {
    let binaryString = "";
    for (let i = 0; i < str.length; i++) {
        let asciiValue = str.charCodeAt(i);
        let binaryValue = asciiValue.toString(2);
        let paddedBinaryValue = binaryValue.padStart(7, "0");
        binaryString += paddedBinaryValue;
    }
    return binaryString.trim();
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
            currentBinary = "0" + binaryText.at(binaryIndex);
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

        // push current Channel
        newChannelArray.push(currentChannel);
        


        
    }


    for (let i = channelIndex; i < pixelArray.length; i ++) { 
        newChannelArray.push(pixelArray.at(i));

    }


    console.log("Channel Array at end: ", newChannelArray);

    return newChannelArray;
}