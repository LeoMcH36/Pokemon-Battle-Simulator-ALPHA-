function getLetters(arr) {
    //must be inside function
    var letters = "";
    //console.log("getting letters")
    for (let i = 0; i < arr.length; i++) {
        //loop through all words in array
        for (let j = 0; j < arr[i].length; j++) {
            //loop trhough letters of each word
            letters += arr[i].charAt(j);
        }
        //add space between each word
    }
    //return array where each element is a letter or space
    return letters;
}

//get everything together into 1 variable called content
function getContent(arr) {
    var content = "";
    for (var l = 0; l < arr.length; l++) {
        content += getLetters(arr[l]);
    }

    return content;
}


//function to write content
async function writeText(content) {

    for (element = 0; element < content.length; element++) {
        if (element === 0) {
            document.getElementById('innerTextAreaDiv').innerHTML = "";
            document.getElementById('innerTextAreaDiv').innerHTML += content[element];
        }
        if (element > 0) {
            document.getElementById('innerTextAreaDiv').innerHTML += content[element];
        }
        if (content[element] === "!" || content[element] === "?") {
            break;
        }
        await sleep(15);
    }
    return "Done"
}