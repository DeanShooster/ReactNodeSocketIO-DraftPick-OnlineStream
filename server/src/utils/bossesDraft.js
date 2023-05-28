const { bossList } = require("../data/bossList");

function bossesDraft(){
    const bossDraft = [];
    let i = 0;
    while(bossDraft.length < 5){
        const randomBoss = bossList[Math.floor(Math.random() * bossList.length)];
        if(bossList.includes(randomBoss)) continue;
        bossList[i] = randomBoss.name;
        i = i + 1;
    }
    return bossDraft;
}

module.exports = { bossesDraft }