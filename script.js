const API = "ce5ef3e0e91e40ecaf591618251605";
const diverror = document.querySelector("#error");
const main = document.querySelector("#meteo");


const render = (name, region, country, texticon, icon, temp) => {
    const p = document.createElement("p");
    p.innerHTML = `<span>Ville</span> : ${name}</br>
                   <span>Region</span> : ${region}</br>
                   <span>Pays</span> : ${country}`;
    main.innerHTML = "";
    const p2 = document.createElement("p");
    p2.textContent = texticon;
    const img = document.createElement("img");
    img.src = `https:` + icon;
    const span = document.createElement("span");
    span.textContent = temp + ` C`;
    const div = document.createElement("div");
    main.appendChild(p)
    main.appendChild(div);
    div.appendChild(img);
    div.appendChild(p2);
    div.appendChild(span);
}
const checkApiError = (data) => { 
    switch (data.error.code){
        case 1006:
            throw new Error("Aucune ville trouvée.");
        case 1003:
            throw new Error("Le paramètre de recherche est manquant.");
        case 2006:
          throw new Error("Clé API invalide.");
        case 2007:
          throw new Error("Quota d'appels API dépassé.");
        default:
          throw new Error(`Erreur Inconnu ${data.error.code}`);
    }
}
const search = async() => {
    try {
        const city = document.querySelector("#location").value.trim()
        if (city === ""){
            document.querySelector("#location").value = '';
            throw new Error (`Veuillez rentrer le nom d'une ville`);
        }

        const url = `http://api.weatherapi.com/v1/current.json?key=${API}&q=${city}&aqi=no`
        const response = await fetch(url);
        const data = await response.json(); 
        if(data.error){
            checkApiError(data);
        }
        diverror.classList.add("hidden");
        document.querySelector("#meteo").classList.remove("hidden");
        diverror.innerHTML = '';
        const name = data.location.name;
        const region = data.location.region;
        const country = data.location.country;
        const text_icon = data.current.condition.text;
        const url_icon = data.current.condition.icon;
        const temp = data.current.temp_c;
        render(name, region,country, text_icon, url_icon, temp);
        document.querySelector("#location").value = '';
    } catch(error){
        main.innerHTML = "";
        diverror.classList.remove("hidden");
        document.querySelector("#meteo").classList.add("hidden");
        document.querySelector("#location").value = '';
        diverror.innerHTML = error.message;
    }


}

document.querySelector("#btn-search").addEventListener("click", search);
document.querySelector("#location").addEventListener("keydown", (e) => {
    if(e.code === "Enter" || e.key === "Enter"){
        search();
    }
}
)