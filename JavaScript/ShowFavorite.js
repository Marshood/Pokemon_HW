let archive = [];

function allStorage() {
    for (var i = 0; i < localStorage.length; i++) {
        archive[i] = localStorage.getItem(localStorage.key(i));
    }
    console.log("archive ", archive)
}
async function ShowFavoriteBtn1() {
    allStorage();
    modal.style.display = "block";
    archive.map(async function (id) {
        let results = await getPokeData(id);
        console.log("results ", results);

        var divModel = document.createElement("div");
        divModel.classList.add('modal-content_favorite');
        // divModel.classList.add('grid-container');

        let modal_content = document.createElement("div");
        modal_content.classList.add("modal-content");
        modal_content.classList.add('grid-container')
        modal_content.setAttribute("id", "modal-content_favorite");
        let span = document.createElement("span");
        span.classList.add("close");
        span.classList.add("ClickBtnExit");
        span.onclick = function () { closeSpanFavorite(); };
        span.innerText = "x";

        var favoritesBtn = document.createElement('span');
        favoritesBtn.innerHTML = `<button id="but' + inc + '" onclick="RemoveFromFavorite(${id});" " >Remove</button>`;
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



        myModal = document.getElementById('FavoriteModal');
        myModal.appendChild(modal_content);



    })


}

async function ShowFavoriteBtn() {
    console.log("ShowFavoriteBtn")
    archive=[];
    allStorage();
 
    archive.map(async function (id) {
        
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
        favoritesBtn.innerHTML = `<button id="but' + inc + '" onclick="RemoveFromFavorite(${id});" >Remove From Favorite</button>`;
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
                //  console.log("PokemonID ", PokemonID)
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


    });


}



// Get the modal
 function closeSpanFavorite() {
     let myNode = document.getElementById('modal-content');
    while (myNode != null) {
        myNode.remove();
        myNode = document.getElementById('modal-content');
    }
}

function RemoveFromFavorite(Pokeid) {
    alert(Pokeid)
    console.log("Pokid",Pokeid)
    localStorage.removeItem(`Pokemon${Pokeid}`);
     let RemovemyNode = document.getElementById('modal-content');
    while (RemovemyNode != null) {
        RemovemyNode.remove();
        RemovemyNode = document.getElementById('modal-content');
        console.log("tttt")
    }
    ShowFavoriteBtn();
    archive=[];
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        let myNode = document.getElementById('modal-content');
        while (myNode != null) {
            myNode.remove();
            myNode = document.getElementById('modal-content');
        }
        // let myNode = document.getElementById('modal-content');
        // myNode.remove();
    }
}

