import axios from "axios";

export const url = "http://127.0.0.1:5000";

// ---------------------------------------------------
// CHARACTER
// ---------------------------------------------------
export async function removeCharacter(id) {
  return axios.post(`${url}/remove-character`, { id });
}

export async function createCharacter(data) {
  await getRace(data.race).then(response =>{
    console.log(data.race);
    data.race = response[0];
    
    return axios.post(`${url}/add-character`, data);
  });
  
}

export function getCharacters() {
  return axios
    .get(`${url}/get-characters`)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
}

// ---------------------------------------------------
// RACE
// ---------------------------------------------------
export async function removeRace(id) {
  return await axios.post(`${url}/remove-race`, { id });
}

export async function createRace(name) {
  return await axios.post(`${url}/add-race`, name);
}

export function getRaces() {
  return axios
    .get(`${url}/get-races`)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
}
export function getRaceNames() {
  return axios
    .get(`${url}/get-race-names`)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
}
export function getRace(name) {
  console.log("GET RACE OF NAME: " + name)
  return axios
    .post(`${url}/get-race-by-name`, {name})
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
}


// ---------------------------------------------------
// Class
// ---------------------------------------------------
export async function removeClass(id) {
  await axios.post(`${url}/remove-class`, { id });
  this.init();
}

export async function createClass(name) {
  await axios.post(`${url}/add-class`, name);
  this.init();
}

export function getClasses() {
  axios
    .get(`${url}/get-classes`)
    .then(response => {
      this.setState({ classes: response.data, hasData: true });
    })
    .catch(error => console.log(error));
}