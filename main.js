const userInput = document.querySelector(".search-bar");
const matchList = document.querySelector(".match-list");
const button = document.querySelector("#button");
const backGndImg = document.querySelector("#bckGndImg");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const img = document.querySelector(".icon");
const description = document.querySelector(".description");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const body = document.querySelector("body");
let backgroundImage;
let inputSearch;


const main = () => {
    addUserInputEvent();
    addClickEventOnTheListItems();
    addFetchEventOnItem();
    cleanTheInitPage();
}


function cleanTheInitPage() {
    window.addEventListener(
        "load",
        () => (document.querySelector(".weather-cont").style.display = "none")
    );
}

function addFetchEventOnItem() {
    userInput.addEventListener("input", () => searchCities(userInput.value));
    button.addEventListener("click", fetchData);
    button.addEventListener("click", hideWeather);
}

function hideWeather() {
    document.querySelector(".weather-cont").style.display = "block";
    matchList.innerHTML = "";

}

function addClickEventOnTheListItems() {
    matchList.addEventListener("click", (e) => {
        userInput.value = e.target.innerText;
        fetchData(e.target.innerText);
        userInput.value = "";
        hideWeather()

    });
}

function addUserInputEvent() {
    userInput.addEventListener("input", (e) => {
        inputSearch = e.target.value;
        fetch("https://source.unsplash.com/1600x900/?" + inputSearch + "").then(
            (data) => {
                backgroundImage = data.url;
            }
        );
        document.querySelector(".weather-cont").style.display = "none";
    });
}

function fetchData() {
    fetch(
        "https://api.weatherapi.com/v1/current.json?key=dde68e1ec993474f9a791107222009&q=" +
        inputSearch +
        "&aqi=no"
    )
        .then((response) => response.json())
        .then((data) => {
            city.textContent = `Weather in ${data.location.name}`;
            temp.textContent = `${data.current.temp_c}°C`;
            img.src = `https:` + data.current.condition.icon;
            description.textContent = `${data.current.condition.text}`;

            humidity.textContent = `Humidity ${data.current.humidity} %`;
            wind.textContent = `Wind speed ${data.current.wind_kph}km/h`;
            backGndImg.src = backgroundImage;
        });
}

const searchCities = async (searchText) => {
    const res = await fetch("cities.json");
    const cities = await res.json();
    let matches = cities.filter((city) => {
        const regex = new RegExp(`^${searchText}`, "gi");
        return city.name.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = "";
    }
    outputHtml(matches);
};

const outputHtml = (matches) => {
    if (matches.length > 0) {
        const html = matches
            .map(
                (match) => `
      <div class ="card card-body">
      <h4>${match.name} <span >${match.country}</span></h4>
      
      </div>`
            )
            .join("");
        matchList.innerHTML = html;
    }
};

main();