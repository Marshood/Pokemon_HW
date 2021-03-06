
let data;
// fetch data from pokeApi 
function fetchPokemonData() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then(response => response.json())
        .then(data => {
            renderPokemon(data)
        });

}
// to show the pokemons on the hoome page
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

// to show clicked pokemon details on modal popup 
async function PokemonBtnClicked(id) {
    // alert(id);
    let results = await getPokeData(id);

    modal.style.display = "block";
    var divModel = document.createElement("div");
    divModel.classList.add('modal-content');
    // divModel.classList.add('grid-container');

    let modal_content = document.createElement("div");
    modal_content.classList.add("modal-content");
    modal_content.classList.add('grid-container')
    modal_content.setAttribute("id", "modal-content");
    let span = document.createElement("span");
    span.classList.add("close");
    span.classList.add("ClickBtnExit");
    span.onclick = function () { closeSpan(); };
    span.innerText = "x";

    var favoritesBtn = document.createElement('span');
    favoritesBtn.setAttribute("id", "AddRemoveFavorites");
    if (localStorage.getItem(`Pokemon${id}`) == null) {
        favoritesBtn.innerHTML = `<button id="but" onclick="addToFavorite(${id});" >Add To Favorite</button>`;
    }
    else if (localStorage.getItem(`Pokemon${id}`) != null) {
        favoritesBtn.innerHTML = `<button id="but" onclick="RemoveFromFavorite(${id});" >Remove From Favorite</button>`;

    }
    modal_content.appendChild(favoritesBtn)

    modal_content.appendChild(span)
    // <p id="name">Name: </p>

    let paragraphName = document.createElement("div");
    let paragraphSpecies = document.createElement("div");
    let img = document.createElement("img");
    let paragraphFamily = document.createElement("div");
    let FamilyimgPoke = document.createElement("img");
    let paragraphFamilyTitle = document.createElement("div");
    paragraphFamilyTitle.classList.add('FamilyTitle_container')
    modal_content.appendChild(paragraphName);
    modal_content.appendChild(paragraphSpecies);
    modal_content.appendChild(img);
    modal_content.appendChild(paragraphFamilyTitle);
    modal_content.appendChild(paragraphFamily);
    modal_content.appendChild(FamilyimgPoke);


    var ProResolveGetEcolvesPokemon = Promise.resolve(results.GetEcolvesPokemon)
    ProResolveGetEcolvesPokemon.then(function (v) {
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
            FamilyPokemonID = FamilyPokemonID.slice(0, -1);
            FamilyimgPoke.classList.add('FamilyImg');
            FamilyimgPoke.src = `https://pokeres.bastionbot.org/images/pokemon/${FamilyPokemonID}.png`
        }
    });

    var ProResolveGetStatsAbilityPokemon = Promise.resolve(results.GetStatsAbilityPokemon)
    ProResolveGetStatsAbilityPokemon.then(function (v) {
        let abilitiesDiv = document.createElement("div");
        abilitiesDiv.classList.add('Poke_Ability');
        modal_content.appendChild(abilitiesDiv);
        abilitiesDiv.innerHTML = "Abilities<br>"
        v.abilities.map(function (abilities) {
            abilitiesDiv.innerHTML += `${abilities.ability.name} , `
        });

        let weightDiv = document.createElement("div");
        weightDiv.classList.add('Poke_weight');
        weightDiv.innerHTML = `Weight ${v.weight}`
        let heightDiv = document.createElement("div");
        heightDiv.classList.add('Poke_height');
        heightDiv.innerHTML = `Height ${v.height}  `
        modal_content.appendChild(weightDiv);
        modal_content.appendChild(heightDiv);
        let stats = document.createElement("div");
        modal_content.appendChild(stats);

        stats.classList.add('Poke_stats');
        stats.innerHTML = `HP ${v.stats.hp}   Attack ${v.stats.hp} 
          Defense ${v.stats.defense} <br> Special Attack ${v.stats.special_attack} Special Defense ${v.stats.special_defense} 
        Speed ${v.stats.speed}`
    })



    myModal = document.getElementById('myModal');
    myModal.appendChild(modal_content);

}
// to get pokemon evolve and flavor text by pokemon id
// to get pokemon special attack hp defense ... by pokemon id
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
var FavoriteModal = document.getElementById("FavoriteModal");
// onClick function to close the modal popUP
function closeSpan() {
    modal.style.display = "none";
    // let myNode = document.getElementById('modal-content');
    // myNode.remove();
    let myNode = document.getElementById('modal-content');
    while (myNode != null) {
        myNode.remove();
        myNode = document.getElementById('modal-content');
    }
}
//to close the popUP
window.onclick = function (event) {
    if (event.target == modal) {
        alert("yes")
        modal.style.display = "none";
        let myNode = document.getElementById('modal-content');
        myNode.remove();
    }
}


// initialize the  sound
let mySound = new GameSound("./Sounds/101-opening.mp3");
// play the sound after 5s 
setTimeout(function () { PlaySoundPokemon() }, 5000);
//play sound
function PlaySoundPokemon() {
    mySound.play();
}
//mute sound
function Mute() {
    // mySound.stop();
    var ButText = document.getElementById("MuteBtn").value;
    if (ButText === "Mute") {
        mySound.MuteSound();
        document.getElementById("MuteBtn").innerHTML = '<i class="fas fa-volume-up"></i>';
        document.getElementById("MuteBtn").value = 'UnMute';
    }
    else {
        document.getElementById("MuteBtn").innerHTML = '<i class="fas fa-volume-mute"></i>';;
        document.getElementById("MuteBtn").value = 'Mute';
        mySound.play();
    }
}
// onClick function to  add to favorites
function addToFavorite(id) {
    localStorage.setItem(`Pokemon${id}`, id);
    alert("added to favorites!");
    let Fav=document.getElementById('but');
    Fav.innerHTML ="Remove From Favorite";
    // Fav.onclick=`"RemoveFromFavorite(${id})"`;
    // Fav.onclick = function() { RemoveFromFavorite(id) }
    document.getElementById("but").onclick = function () { RemoveFromFavorite(id); };
}

// onClick function to  remove from favorites
function RemoveFromFavorite(id) {
    localStorage.removeItem(`Pokemon${id}`);
    alert("Remove from favorites!");
     let Fav=document.getElementById('but');
    Fav.innerHTML ="Add To Favorite";
     document.getElementById("but").onclick = function () { addToFavorite(id); };


} 