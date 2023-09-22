
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const urlParams = new URLSearchParams(search);
  const city = urlParams.get("city");
  return city;
}
// this is test

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    const result = await fetch(
      config.backendEndpoint + `/adventures/?city=${city}`
    );
    const data = await result.json();
    return data;
  }catch(e){
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  
  adventures.forEach(({id, category, image, name, costPerHead, duration}) => {
    let ele = document.createElement("div");
    ele.className = "col-6 col-lg-3 mb-4";
    ele.innerHTML = `
          <a href="detail/?adventure=${id}" id=${id}>
            <div class="activity-card">
              <div class="category-banner">${category}</div>
              <img class="img-responsive" src=${image}/>
              <div class="actvity-card-text text-md-center w-100 mt-3 px-2">
                <div class="d-flex justify-content-between">
                  <h5>${name}</h5>
                  <p> &#8377 ${costPerHead}</p>
                </div>
                <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
                  <h5 class="text-left">Duration</h5>
                  <p>${duration} Hours</p>
                </div>
              </div>
            </div>
          </a>
    `;
    document.getElementById("data").appendChild(ele);
  });
}
// this is just ofr test
//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  // console.log(list, low, high);

  let filteredList = [];
  list.filter((key) =>{
    if(key.duration >= low && key.duration <= high){
      filteredList.push(key);
    }
  })
  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList = []
  list.filter((cat)=>{
    // if(cat.category === categoryList){
    //   filteredList.push(cat);
    // }
    if(categoryList.includes(cat.category)){
      filteredList.push(cat);
    }
  })
  return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // console.log(filters+"test of filters");
  console.log(list+"test of list");

  let filteredList = [];
  // console.log(filters+"-------this is test of filterfuntion")..
  let choice = filters["duration"].split("-");

   // 3. Filter by duration and category together
   if(filters["duration"].length > 0 && filters["category"].length > 0){
    
    filteredList = filterByDuration(list, parseInt(choice[0]), parseInt(choice[1]));
    filteredList =  filterByCategory(filteredList, filters["category"]);
  }
  // 1. filter by duration only
  else if(filters["duration"].length >0){
    // let choice  = filters["duration"].split("-");
    filteredList = filterByDuration(list, parseInt(choice[0]), parseInt(choice[1]));
  }

  // 2. Filter by category only
  else if(filters["category"].length > 0){
    filteredList = filterByCategory(list, filters["category"]);
  }

 

  else{
    filteredList = list;
  }

  return filteredList;
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const filters = JSON.parse(localStorage.getItem("filters"));
  return filters;

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  // document.getElementById("duration-select").value = filters.duration;

  filters["category"].forEach((key)=>{
    let element = document.createElement("div");
    element.className = "category-filter";
    element.innerHTML = `<div>${key}</div>`
    document.getElementById("category-list").appendChild(element);

  })

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
