//pokemon objects
const raichu = {
    name: "RAICHU",
    type: "Electric",
    hp: 132,//132
    Atk: 118,
    Def: 74,
    SAtk: 108,
    SDef: 88,
    Spd: 127,
    lvl: 49

};

const ambipom = {
    name: "AMBIPOM",
    type: "Normal",
    hp: 139,//139
    Atk: 111,
    Def: 79,
    SAtk: 66,
    SDef: 86,
    Spd: 125,
    lvl: 46

};

//move objects
const thunder = {
    name: "Thunder",
    type: "Electric",
    category: "Special",
    Power: 120,
    Accuracy: 0.7,
    priorty: 0,
    statusChance: 0,
    status: ""
}
const quickAttack = {
    name: "Quick Attack",
    type: "Normal",
    category: "Physical",
    Power: 120,
    Accuracy: 1,
    priorty: 1,
    statusChance: 0,
    status: ""
}
const headbutt = {
    name: "Headbutt",
    type: "Normal",
    category: "Physical",
    Power: 70,
    Accuracy: 1,
    priorty: 0,
    statusChance: 0,
    status: ""
}
const thunderShock = {
    name: "Thunder Shock",
    type: "Electric",
    category: "Special",
    Power: 40,
    Accuracy: 1,
    priorty: 0,
    statusChance: 0.1,
    status: "paralyse"
}
const ironTail = {
    name: "IronTail",
    type: "Steel",
    category: "Physical",
    Power: 100,
    Accuracy: 0.75,
    priorty: 0,
    statusChance: 0,
    status: ""
}
const shadowBall = {
    name: "ShadowBall",
    type: "Ghost",
    category: "Special",
    Power: 80,
    Accuracy: 1,
    priorty: 0,
    statusChance: 0,
    status: ""
}
const hyperBeam = {
    name: "HyperBeam",
    type: "Normal",
    category: "Special",
    Power: 150,
    Accuracy: 0.9,
    priorty: 0,
    statusChance: 0,
    status: ""
}
const swift = {
    name: "Swift",
    type: "Normal",
    category: "Special",
    Power: 60,
    Accuracy: 1,
    priorty: 0,
    statusChance: 0,
    status: ""
}

//arrays holding them
movesArr = [thunder, thunderShock, quickAttack, headbutt]
movesArrEnemy = [swift, hyperBeam, shadowBall, ironTail]
pokemon = [ambipom, raichu]