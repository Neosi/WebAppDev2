import axios from "axios";

const url = "http://127.0.0.1:5000";

// ---------------------------------------------------
// CHARACTER
// ---------------------------------------------------
export async function removeCharacter(id) {
  await axios.post(`${url}/remove-character`, { id });
  this.init();
}

export async function createCharacter(name) {
  await axios.post(`${url}/add-character`, name);
  this.init();
}

export function getCharacters() {
  axios
    .get(`${url}/get-characters`)
    .then(response => {
      this.setState({ characters: response.data, hasData: true });
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
