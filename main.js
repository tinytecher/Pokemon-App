
// returning our pokeData as a console.log using a random generator
let button = document.querySelector(".give-new")

window.addEventListener("load", randomPokedexNumber)
button.addEventListener("click", randomPokedexNumber)

let ranNum;
let pokeData;

async function randomPokedexNumber() {
    ranNum = Math.floor((Math.random()*151)+1); 
    console.log(ranNum)   
    pokeData = await fetchData(ranNum)
    nameElement.innerHTML = pokeData.forms[0].name
    healthPoints.innerHTML = "HP = " + pokeData.stats[0].base_stat;
    attack.innerHTML = "Attack = " + pokeData.stats[1].base_stat;
    defense.innerHTML = "Defense = " + pokeData.stats[2].base_stat;
    specialAttack.innerHTML = "Special Attack = " + pokeData.stats[3].base_stat;
    specialDefense.innerHTML = "Special Defense = " + pokeData.stats[4].base_stat;
    speed.innerHTML = "Speed = " + pokeData.stats[5].base_stat;
    weight.innerHTML = "Weight = " + pokeData.weight;
    image.src = pokeData.sprites.other.home.front_default;
    document.querySelector("p").innerHTML = "Pokeballs left: " + pokeballs
    return console.log(pokeData)
}

let testResponse;
async function fetchData(ranNum) {
    let testFetch = await fetch("https://pokeapi.co/api/v2/pokemon/" + ranNum + "/")
    testResponse = await testFetch.json() 
    console.log(testResponse)
    return await testResponse
}

let nameElement = document.querySelector(".name-header")
let healthPoints = document.querySelector(".HP")
let image = document.querySelector(".image")
let attack = document.querySelector(".stat1")
let defense = document.querySelector(".stat2")
let specialAttack = document.querySelector(".stat3")
let specialDefense = document.querySelector(".stat4")
let speed = document.querySelector(".stat5")
let weight = document.querySelector(".stat6")

let throwButton = document.querySelector(".throw-ball")

let storeList = [];
function makeList() {
    let list = document.querySelector(".inventoryList")
    let listItem = document.createElement("li");
    listItem.innerHTML = pokeData.forms[0].name
    list.appendChild(listItem)
    storeList += localStorage.setItem("quote", JSON.stringify(listItem))
}

function probOfBallBreak() {
    let chanceOfBreak = [1, 0, 0, 0];
    let randomChance = Math.floor(Math.random()*4)
    if (chanceOfBreak[randomChance] === 1) {
        alert("You caught " + pokeData.forms[0].name + "! They are now in your inventory." )
        makeList()
        return randomPokedexNumber()
    } else {
        alert( pokeData.forms[0].name + " got away, try again next time!")
        return randomPokedexNumber()
    }
}

throwButton.addEventListener("click", reducePokeballs)

let pokeballs = 12;

function reducePokeballs() {
    if (pokeballs > 0) {
        console.log(pokeballs)
        probOfBallBreak()
        return pokeballs-- 
    } else {
        return alert("You're all out of pokeballs")
    }
}