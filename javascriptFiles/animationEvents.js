
//reset everything when starting a new game
function resetGame()
{  //important stops is being overwritten when the other pages load
    console.log("reset bar")
    document.getElementById("enemyHpInsideBar").style.backgroundColor = "#2eb837";  //green
    document.getElementById("hpInsideBar").style.backgroundColor = "#2eb837";
    document.getElementById("hpInsideBar").style.width = "100%";
    document.getElementById("enemyHpInsideBar").style.width = "100%"
    console.log(document.getElementById("enemyHpInsideBar").style.backgroundColor)
    oldhp = 0;
    oldhpRaichu = 0;
    document.getElementById("infoHealthPoints").innerHTML = "100/100";
}

//enter button to load menu
function enterGame() {
    console.log("second" + document.getElementById("InfoDivEnemy").style.display)
    document.getElementById("enterGameDiv").style.display = "none";
    document.getElementById("pageDiv").style.display = "flex";
    audioMenu.volume = 0.08;
    audioMenu.loop = true;
    audioMenu.play();
}

//load game
async function startGame() {
    resetGame()
    audioMenu.pause();
    document.getElementById("startDiv").style.display = "none";
    audioClickEvent.play();
    audioBattle.loop = true;
    //audio is originally too loud
    audioBattle.volume = 0.05;
    audioBattle.play();
    document.getElementById("canvasDiv").style.display = "flex";
    await sleep(3000)
    loadEvents();
}


//****************************************
//Opening Animation Sequence
//****************************************
//load entry dialogue
async function dialogueTimer() {
    audioClickEvent.play();
    await sleep(350);
    await writeText(getContent(dialogue));
    return "done"

}

//move trainer
async function trainerMove() {
    var imgStyle = document.getElementById("ambipom").classList;
    imgStyle.add("disappear");
    setTimeout(function () { imgStyle.remove("disappear"); }, 2100);
    await sleep(1800)
    pokemonEntry();
    return "done"
}

//load two previous functions
async function loadEvents() {
    await dialogueTimer();
    await sleep(2000)
    trainerMove();
}

//display pokeball
function pokeball() {
    document.getElementById('ambipom').src = "miscImages/pokeball.PNG";
}

//pokeball opening animations
async function pokeballOpening() {
    document.getElementById('ambipom').src = "imagesPokemon/ambipomOpening.png";
    var imgStyle = document.getElementById("ambipom").classList;
    imgStyle.add("grow");
    setTimeout(function () { imgStyle.remove("grow"); }, 570);
    audioOpen.volume = 0.35;
    audioOpen.play();
    return "done"
}

//display pokemon
async function pokemonAppearance() {
    document.getElementById('ambipom').src = "imagesPokemon/Ambipom.png";
    var imgStyle = document.getElementById("ambipom").classList;
    imgStyle.add("appear");
    setTimeout(function () { imgStyle.remove("appear"); }, 2000);
    audioCryAmbipom.play();
    return "done"
}

//display pokemon animation and choice dialogue
async function pokemonChange() {
    document.getElementById('ambipom').src = "imagesPokemon/AmbipomDiff.png";
    await sleep(150)
    document.getElementById('ambipom').src = "imagesPokemon/Ambipom.png";
    await sleep(150)
    document.getElementById('ambipom').src = "imagesPokemon/AmbipomDiff.png";
    await sleep(150)
    document.getElementById('ambipom').src = "imagesPokemon/Ambipom.png";
    document.getElementById("InfoDivEnemy").style.display = "flex";
    await writeText(getContent(choice));
    document.getElementById("innerTextAreaDiv").style.width = "50%";
    document.getElementById("movesDivLeft").style.display = "block";
    document.getElementById("movesDivRight").style.display = "block";
    return "done"
}

//when pokemon faints it vanishes
async function pokemonFaintedDisappear(pokemon) {
    console.log(pokemon)
    let imgStyletwo = document.getElementById(pokemon).classList;
    imgStyletwo.add("faint2");
    await sleep(1800)
    //so the trainer image is not also invisible after ambipom faints
    if (pokemon != "Raichu") {
        setTimeout(function () { imgStyletwo.remove("faint2"); }, 1800);
    }
}

//when trainer is defeated display trainer and lose dialogue
async function trainerDefeat() {
    var imgStyleDefeat = document.getElementById("ambipom").classList;
    imgStyleDefeat.add("appear2");
    document.getElementById('ambipom').src = "miscImages/eliteTrainerFb.png";
    await sleep(3000)
    audioClickEvent.play();
    writeText(getContent(enemyLose));
    await sleep(3000)
    returnToMenu()
    document.getElementById("innerTextAreaDiv").innerHTML = "";
}
//when trainer is defeated display trainer and victory dialogue
async function trainerVictory() {
    var imgStyleVictory = document.getElementById("ambipom").classList;
    imgStyleVictory.add("appear2");
    document.getElementById('ambipom').src = "miscImages/eliteTrainerFb.png";
    await sleep(3000)
    audioClickEvent.play();
    await sleep(300);
    writeText(getContent(enemyWin));
    await sleep(3000)
    returnToMenu()
    document.getElementById("innerTextAreaDiv").innerHTML = "";
}

//can be called for every pokemon
async function pokemonEntry() {
    pokeball();
    await sleep(1000)
    pokeballOpening();
    await sleep(570)
    pokemonAppearance();
    await sleep(1000)
    pokemonChange();
}

//show damage animation
async function pokemonImageDamaged(imageId) {
    await sleep(500);
    audioDamage.play();
    audioDamage.volume = 0.1;
    await sleep(500);
    document.getElementById(imageId).style.visibility = "hidden";
    await sleep(80);
    document.getElementById(imageId).style.visibility = "visible";
    await sleep(80);
    document.getElementById(imageId).style.visibility = "hidden";
    await sleep(80);
    document.getElementById(imageId).style.visibility = "visible";
    await sleep(150);
    return "done";
}

//code when game ends
async function returnToMenu()
{
    console.log("fade to black")
    let imgStyleReturnToMenu = document.getElementById("canvasDiv").classList;
    imgStyleReturnToMenu.add("cutToBlack");
    document.getElementById("canvasDiv").style.display = "flex";
    await sleep(4010)
    let imgStyleReturnToMenuFaint = document.getElementById("canvasDiv").classList;
    imgStyleReturnToMenuFaint.add("faint2");
    await sleep(4002)
    window.location.reload();
    setTimeout(function () { imgStyleReturnToMenuFaint.remove("faint2"); }, 1);
    setTimeout(function () { imgStyleReturnToMenu.remove("cutToBlack"); }, 1);
    document.getElementById("canvasDiv").style.display = "none";
    

    
}