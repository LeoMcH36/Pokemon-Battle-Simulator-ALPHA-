//crit has 10% chance to occurr
function crit() {
    if (Math.random() >= 0.9) {
        return true;
    }
    return false;

}

//get random int for random variable
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//returns boolean based on if move hits or missed , taking from stack overflow
function hitOrMiss(accuracy) {

    return !!accuracy && Math.random() <= accuracy;
}

//same again
function statusPokemon(chance) {
    return !!chance && Math.random() <= chance;
}

//use move
 function useMove(pokemon, move, enemyPokemon) {
    hit = hitOrMiss(move.Accuracy)
    return calculateDamage(hit,pokemon, move, enemyPokemon)
}

//chooses a random move for enemy to use
function chooseMove() {
    let numbersMoves = [1, 2, 3, 4];
    let random = Math.floor(Math.random() * numbersMoves.length);
    return movesArrEnemy[random].name;
}


async function useMoveEnemy(pokemon, move, enemyPokemon) {
    hit = hitOrMiss(move.Accuracy)
    await sleep(1000)
    await sleep(10)
    writeText(getContent(window["ambipom" + `${move.name}`]))
    return calculateDamage(hit,pokemon, move, enemyPokemon)
}

//calculate damage
async function calculateDamage(hit,pokemon, move, enemyPokemon) {
    if (hit) {
        damage = 0;
        stab = 1;
        if (pokemon.type === move.type) {
            stab = 1.5;
        }
        random = (getRandomInt(85, 100) / 100);
        critMultiplyer = 1;
        if (crit()) {
            critMultiplyer = 1.5;
            document.getElementById("lblCrit").innerHTML = "true";
        }
        //for the meantime I have not added weather,badge,type,targets or burn multiplyers
        if (move.category === "Special") {
            damage = ((((2 * pokemon.lvl) / 5) * move.Power * (pokemon.SAtk / enemyPokemon.SDef) / 50) + 2) * critMultiplyer * stab * random;
        }
        else {
            damage = ((((2 * pokemon.lvl) / 5) * move.Power * (pokemon.Atk / enemyPokemon.Def) / 50) + 2) * critMultiplyer * stab * random;
        }
        return damage;
    }
    else {
        return 0;
    }
}

//will be used in conjunction with low health sound
function init() {
    init.called = true;
}

//display the damage caused by the enemy
async function displayDamageEnemy(damage, pokemon) {
    if (raichu.hp > oldhpRaichu) {
        oldhpRaichu = raichu.hp;
    }
    let currentHp = raichu.hp;
    let newHP = raichu.hp - damage;
    if (newHP < 0) {
        newHP = 0;
    }
    raichu.hp = newHP;
    let barWidth = (newHP / oldhpRaichu * 100).toFixed(0);
    document.getElementById("hpInsideBar").style.width = `${barWidth}%`;
    //sometimes it would round 0.x to 1
    if (document.getElementById("hpInsideBar").style.width <= "1%") {
        document.getElementById("hpInsideBar").style.width = "0%"
    }
    //change number displays
    if (barWidth >= 50) {
        document.getElementById("hpInsideBar").style.backgroundColor = "#2eb837"; //green
    }
    else if (barWidth >= 20) {
        document.getElementById("hpInsideBar").style.backgroundColor = "#e9a900"; //yellow
    }
    else {
        document.getElementById("hpInsideBar").style.backgroundColor = "#ff4210";//red
        if (!init.called) {
            audioLowHealth.play();
            audioLowHealth.loop = true;
            audioLowHealth.volume = 0.1;
            init();
        }
    }
    //to make health display number visibly decrease
    for (let index = currentHp; index >= newHP; index--) {
        await sleep(10);
        document.getElementById("infoHealthPoints").innerHTML = `${index.toFixed(0)}` + "/" + `${oldhpRaichu}`;
        //round down to 0
        if (index.toFixed(0) <= 1) {
            document.getElementById("infoHealthPoints").innerHTML = `${0}` + "/" + `${oldhpRaichu}`;
        }
    }
    await sleep(1000)
    //check if raichu fainted
    if (await pokemonFaintedEnemy()) {
        await FaintedEnemyTrue()
    }

}

//raichu caused enemy to faint
async function faintedTrue() {
    document.getElementById("movesDivLeft").style.display = "none";
    document.getElementById("movesDivRight").style.display = "none";
    document.getElementById("innerTextAreaDiv").style.width = "85.9%";
    await writeText(getContent(ambipomFaint));
    audioLowHealth.pause()
    audioCryAmbipom.play()
    await sleep(1000);
    pokemonFaintedDisappear("ambipom")
    var imgStyle = document.getElementById("InfoDivEnemy").classList;
    imgStyle.add("faint2");
    await sleep(2000)
    trainerDefeat();
    for (let iVolume = 0.05; iVolume >= 0; iVolume -= 0.001) {
        await sleep(10)
        audioBattle.volume = iVolume;
    }
    setTimeout(function () { imgStyle.remove("faint2"); }, 9500);
    document.getElementById("lblStatus").innerHTML = "false";
}

//if enemy cause raichu to faint
async function FaintedEnemyTrue() {
    document.getElementById("lblFainted").innerHTML = "true"
    document.getElementById("movesDivLeft").style.display = "none";
    document.getElementById("movesDivRight").style.display = "none";
    document.getElementById("innerTextAreaDiv").style.width = "85.9%";
    await writeText(getContent(raichuFaint));
    await sleep(1000)
    audioLowHealth.pause()
    audioCryRaichu.play()
    pokemonFaintedDisappear("Raichu")
    await sleep(3000)
    pokemonFaintedDisappear("ambipom")
    //music fades away
    for (let iVolume = 0.05; iVolume >= 0; iVolume -= 0.001) {
        await sleep(10)
        audioBattle.volume = iVolume;
    }
    var imgStyleFainted = document.getElementById("InfoDivEnemy").classList;
    imgStyleFainted.add("faint2");
    await sleep(2200)
    audioBattle.pause();
    trainerVictory();
    console.log("check 1" + document.getElementById("lblFainted").innerHTML)
}

//display damage dealt by raichu
function displayDamage(damage) {
    if (ambipom.hp > oldhp) {
        oldhp = ambipom.hp;
    }
    let newHP = ambipom.hp - damage;
    if (newHP < 1) {
        newHP = 0;
    }
    ambipom.hp = newHP;
    let barWidth = (newHP / oldhp * 100).toFixed(0);
    document.getElementById("enemyHpInsideBar").style.width = `${barWidth}%`;
    //stop it being rounded up to 1
    if (document.getElementById("enemyHpInsideBar").style.width === "1%") {
        document.getElementById("enemyHpInsideBar").style.width = "0%"
    }
    if (barWidth >= 50) {
        document.getElementById("enemyHpInsideBar").style.backgroundColor = "#2eb837"; //green
    }
    else if (barWidth >= 20) {
        document.getElementById("enemyHpInsideBar").style.backgroundColor = "#e9a900"; //yellow
    }
    else {
        document.getElementById("enemyHpInsideBar").style.backgroundColor = "#ff4210";//red
    }
}

//if status is true
//if haven not yet implemented priority or enemy being too paralysed to move
async function statusTrue() {
    document.getElementById("enemyStatusIcon").style.display = "flex";
    ambipom.Spd = ambipom.Spd / 2;
    document.getElementById("lblStatus").innerHTML = "true";
    await writeText(getContent(ambipomParalysed))

    return "done"
}

//check if its a crit
async function critCheck() {
    if (document.getElementById("lblCrit").innerHTML === "true") {
        await sleep(1000)
        await writeText(getContent(criticalHit))
        document.getElementById("lblCrit").innerHTML = "false"
    }
}

//display raichus move
async function displayMove(movesArr, value) {
    for (x in movesArr) {
        if (movesArr[x].name === value) {
            let damage = await useMove(raichu, movesArr[x], ambipom)
            if (damage > 0) {
                await pokemonImageDamaged("ambipom");
                displayDamage(damage);
                if (statusPokemon(movesArr[x].statusChance) && document.getElementById("lblStatus").innerHTML != "true") {
                    await statusTrue()
                    await sleep(1000)
                }
            }
            else {
                await sleep(1000)
                await writeText(getContent(raichuMiss));
            }

            await sleep(1000);
            break;
        }
    }
}

//display enemy's move
async function displayMoveEnemy(movesArrEnemy, value, pokemon) {
    for (x in movesArrEnemy) {
        if (movesArrEnemy[x].name === value) {
            let damage = await useMoveEnemy(ambipom, movesArrEnemy[x], raichu)
            if (damage > 0) {
                await pokemonImageDamaged("Raichu");
                displayDamageEnemy(damage, pokemon);
                console.log("check 2 " + document.getElementById("lblFainted").innerHTML)
            }
            else {
                await sleep(1000)
                await writeText(getContent(ambipomMiss));
            }
            break;
        }
    }
}

//raichu caused enemy to faint
async function pokemonFainted() {
    //pokemon does not faint without this sleep function , to do with delay
    await sleep(1000)
    if (document.getElementById("enemyHpInsideBar").style.width === "0%") {
        document.getElementById("lblFainted").innerHTML = "true";
        return true;
    }
    return false;
}

//enemy caused raichu to faint
async function pokemonFaintedEnemy() {
    await sleep(1000)
    if (document.getElementById("hpInsideBar").style.width === "0%") {
        document.getElementById("lblFainted").innerHTML = "true";
        return true;
    }
    return false
}




