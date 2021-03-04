
let data;
function fetchPokemonData() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            renderPokemon(data)
        });

}

function renderPokemon(PokemonData) {
    data = PokemonData.results;
    let allPokemonContainer = document.getElementById('poke-container');
    let pokeContainer = document.createElement("div")
    let pokeName = document.createElement('h4')
    PokemonData.results.map(Pokemon => {
        let UrlLength = Pokemon.url.length;
        let size = 0;
        // 36,37 38 
        if (UrlLength >= 36 && UrlLength < 37) {
            size = 2
        }
        else if (UrlLength >= 37 && UrlLength < 38) {
            size = 3
        }
        else if (UrlLength >= 38) {
            size = 4
        }
        var PokemonID = Pokemon.url.substr(UrlLength - size);
        //  console.log("PokemonID ", PokemonID)
        PokemonID = PokemonID.slice(0, -1)
        var button = document.createElement("button");
        //  div.innerHTML = Pokemon.name;
        button.classList.add('box');
        button.classList.add('center');
        button.addEventListener("click", function () {
            PokemonBtnClicked(PokemonID)
        });
        var p = document.createElement("p");
        p.innerHTML = `<h1 class='center'>${Pokemon.name}</h1>`;
        button.appendChild(p);
        let img = document.createElement("img");
        img.classList = 'img-circle'
        img.src = `https://pokeres.bastionbot.org/images/pokemon/${PokemonID}.png`
        button.appendChild(img);
        pokemon_container = document.getElementById('pokemon_container');
        pokemon_container.appendChild(button);
    })

    function ShowHide(id) {
        var x = document.getElementById(id);
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }
}
fetchPokemonData();

function Mute() {
    alert("Mute");
}
async function PokemonBtnClicked(id) {
    // alert(id);
    let results = await getPokeData(id);
    console.log("results ", results);
    modal.style.display = "block";
    var divModel = document.createElement("div");
    divModel.classList.add('modal-content');
    // divModel.classList.add('grid-container');

    let modal_content = document.createElement("div");
    modal_content.classList.add("modal-content");
    modal_content.classList.add('grid-container')
    let span = document.createElement("span");
    span.classList.add("close");
    span.classList.add("ClickBtn");
    span.onclick = function () { closeSpan(); };
    span.innerText = "x";
    modal_content.appendChild(span)
    // <p id="name">Name: </p>

    let paragraphName = document.createElement("p");
    let paragraphSpecies = document.createElement("p");
    let img = document.createElement("img");
    let paragraphFamily = document.createElement("p");
    let FamilyimgPoke = document.createElement("img");
    let paragraphFamilyTitle = document.createElement("p");
    paragraphFamilyTitle.classList.add('FamilyTitle_container')
    modal_content.appendChild(paragraphName);
    modal_content.appendChild(paragraphSpecies);
    modal_content.appendChild(img);
    modal_content.appendChild(paragraphFamilyTitle);
    modal_content.appendChild(paragraphFamily);
    modal_content.appendChild(FamilyimgPoke);


    var ProResolve = Promise.resolve(results.GetEcolvesPokemon)
    ProResolve.then(function (v) {
        console.log(v); // 1
        paragraphName.classList.add('Poke_Name1');
        paragraphName.innerHTML = `${v.Poke_Name}`
        paragraphSpecies.classList.add('Poke_flavor_text');
        paragraphSpecies.innerHTML = `${v.flavor_text_entries}`
        // img.classList.add('img-circle');
        img.classList.add('img-circle-small-size');
        img.classList.add('Poke_img');  
        img.src = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`
        if (v.evolves_from_species != null) {
            paragraphFamilyTitle.innerHTML = "Family: "
            paragraphFamily.classList.add('FamilyName')
            paragraphFamily.innerHTML = `${v.evolves_from_species.name}`
            FamilyimgPoke.classList.add('img-circle-small-size');
            let size = 0;
            // 42,37 38 
            if (v.evolves_from_species.url.length >= 42 && v.evolves_from_species.url.length < 44) {
                size = 2
            }
            else if (v.evolves_from_species.url.length >= 44 && v.evolves_from_species.url.length < 45) {
                size = 3
            }
            else if (v.evolves_from_species.url.length >= 45) {
                size = 4
            }
            let FamilyPokemonID = v.evolves_from_species.url.substr(v.evolves_from_species.url.length - size);
            //  console.log("PokemonID ", PokemonID)
            FamilyPokemonID = FamilyPokemonID.slice(0, -1);
            FamilyimgPoke.classList.add('FamilyImg');
            FamilyimgPoke.src = `https://pokeres.bastionbot.org/images/pokemon/${FamilyPokemonID}.png`
        }
    });
    myModal = document.getElementById('myModal');
    myModal.appendChild(modal_content);

}
const getPokeData = (PokeId) => {
    const GetEcolvesPokemon = new Promise((resolve, reject) => {
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${PokeId}`)
            .then(response => response.json())
            .then(data => {
                let Poke_Name = data.name;
                let evolves_from_species = data.evolves_from_species;
                let flavor_text_entries = data.flavor_text_entries[0].flavor_text;
                resolve({ Poke_Name, evolves_from_species, flavor_text_entries })
            });
    });
    const GetStatsAbilityPokemon = new Promise((resolve, reject) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${PokeId}`)
            .then(response => response.json())
            .then(data => {
                // console.log("1111 ", data.abilities);
                let abilities = data.abilities;
                let stats = {
                    hp: data.stats[0].base_stat,
                    attack: data.stats[1].base_stat,
                    defense: data.stats[2].base_stat,
                    special_attack: data.stats[3].base_stat,
                    special_defense: data.stats[4].base_stat,
                    speed: data.stats[5].base_stat,
                };
                let weight = data.weight;
                let height = data.height;
                resolve({ abilities, stats, weight, height })
            });
    })

    return { GetEcolvesPokemon, GetStatsAbilityPokemon };
}

// Get the modal
var modal = document.getElementById("myModal");
function closeSpan() {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// sound effect
//  mySound = new PokemonSound("Sounds/101-opening.mp3");
// mySound = new GameSound("Sounds/GameSound.wav");

let mySound = new GameSound("./Sounds/GameSound.wav");

function PlaySoundPokemon() {
    mySound.play();

}

