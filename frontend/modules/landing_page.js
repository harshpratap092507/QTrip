import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const respons = await fetch(config.backendEndpoint + "/cities");
    const json = await respons.json();
    // console.log(json);
    return json;
  } catch(error) {
    return null;
  }
};

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const cityElement = document.createElement("div");
  // console.log(cityElement);
  cityElement.className = "col-6 col-lg-3 mb-4";
  cityElement.innerHTML = `
    <a href="pages/adventures/?city=${id}" id="${id}">
      <div class="tile">
        <div class="tile-text text-center">
          <h5>${city}</h5>
          <p>${description}</p>
        </div>
        <img class="img-responsive" src="${image}" />
      </div>
    </a>
  `;



//   cityElement.innerHTML = `<div class="tile col-sm-12 col-md-6 col-lg-3 my-3">
//   <a href="pages/adventures/index.html">
//     <img src=${image} alt=${id}>
//     <div class="content text-white text-center">
//       <h5>${city}</h5>
//       <p>${description}</p>
//     </div>
//   </a>  
// </div>`;
  
  const cityContainer = document.getElementById("data");
  cityContainer.appendChild(cityElement);
};

export { init, fetchCities, addCityToDOM };
