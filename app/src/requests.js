import axios from "axios";

export const url = "http://127.0.0.1:5000";

// ---------------------------------------------------
// CHARACTER
// ---------------------------------------------------
export async function removeCharacter(id) {
  return axios.post(`${url}/remove-character`, { id });
}

export function createCharacter(data) {
  return axios.post(`${url}/add-character`, data);
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
  await axios.post(`${url}/remove-race`, { id });
  this.init();
}

export async function createRace(name) {
  await axios.post(`${url}/add-race`, name);
  this.init();
}

export function getRaces() {
  axios
    .get(`${url}/get-races`)
    .then(response => {
      this.setState({ races: response.data, hasData: true });
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