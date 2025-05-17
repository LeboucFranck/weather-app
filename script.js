const API = "ce5ef3e0e91e40ecaf591618251605";

const render = (texticon, icon, temp) => {
    const main = document.querySelector("#meteo");
    main.innerHTML = "";
    const h2 = document.createElement("h2");
    h2.textContent = texticon;
    const img = document.createElement("img");
    img.src = `https:` + icon;
    const span = document.createElement("span");
    span.textContent = temp + ` C`;
    main.appendChild(h2);
    main.appendChild(img);
    main.appendChild(span);
}

const search = () => {
    const city = document.querySelector("#location").value.trim()
    if (city === ""){
        return
    }
    const url = `http://api.weatherapi.com/v1/current.json?key=${API}&q=${city}&aqi=no`
    fetch(url)
    .then(reponse => reponse.json())
    .then(data => {
        result = data;
        console.log(result)
    const text_icon = data.current.condition.text;
    const url_icon = data.current.condition.icon;
    const temp = data.current.temp_c;
    render(text_icon, url_icon, temp);
    })
}

document.querySelector("#btn-search").addEventListener("click", search)