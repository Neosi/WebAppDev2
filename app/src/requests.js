import axios from "axios";

export const url = "http://127.0.0.1:5000";

// ---------------------------------------------------
// CHARACTER
// ---------------------------------------------------
export async function removeCharacter(id) {
  return axios.post(`${url}/remove-character`, { id });
}

export async function createCharacter(data) {
  return await axios.post(`${url}/add-character`, data);
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

export async function createRace(data) {
  return await axios.post(`${url}/add-race`, data);
}

export function getRaces() {
  return axios
    .get(`${url}/get-races`)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
}

// ---------------------------------------------------
// Class
// ---------------------------------------------------
export async function removeClass(id) {
  return await axios.post(`${url}/remove-class`, { id });
}

export async function createClass(name) {
  return await axios.post(`${url}/add-class`, name);
}

export function getClasses() {
  return axios
    .get(`${url}/get-classes`)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
}
