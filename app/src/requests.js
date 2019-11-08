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

export function updateCharacter(data) {
  return axios.post(`${url}/update-character`, data);
}

export function getCharacter(id) {
  return axios
    .post(`${url}/get-character`, { id })
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
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

export function updateRace(data) {
  return axios.post(`${url}/update-race`, data);
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
export function updateClass(data) {
  return axios.post(`${url}/update-class`, data);
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
// ---------------------------------------------------
// TRAIT
// ---------------------------------------------------
export async function removeTrait(id) {
  return await axios.post(`${url}/remove-trait`, { id });
}
export function updateTrait(data) {
  return axios.post(`${url}/update-trait`, data);
}

export async function createTrait(description) {
  return await axios.post(`${url}/add-trait`, {description});
}

export function getRandomTrait() {
  return axios
    .get(`${url}/get-random-trait`)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
}


export function getTraits() {
  return axios
    .get(`${url}/get-traits`)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
}
// ---------------------------------------------------
// IDEAL
// ---------------------------------------------------
export async function removeIdeal(id) {
  return await axios.post(`${url}/remove-ideal`, { id });
}
export function updateIdeal(data) {
  return axios.post(`${url}/update-ideal`, data);
}

export async function createIdeal(description) {
  return await axios.post(`${url}/add-ideal`, {description});
}

export function getRandomIdeal() {
  return axios
    .get(`${url}/get-random-ideal`)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
}

export function getIdeals() {
  return axios
    .get(`${url}/get-ideals`)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
}
// ---------------------------------------------------
// BOND
// ---------------------------------------------------
export async function removeBond(id) {
  return await axios.post(`${url}/remove-bond`, { id });
}
export function updateBond(data) {
  return axios.post(`${url}/update-bond`, data);
}

export async function createBond(description) {
  return await axios.post(`${url}/add-bond`, {description});
}

export function getRandomBond() {
  return axios
    .get(`${url}/get-random-bond`)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
}


export function getBonds() {
  return axios
    .get(`${url}/get-bonds`)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
}
// ---------------------------------------------------
// FLAW
// ---------------------------------------------------
export async function removeFlaw(id) {
  return await axios.post(`${url}/remove-flaw`, { id });
}
export function updateFlaw(data) {
  return axios.post(`${url}/update-flaw`, data);
}

export async function createFlaw(description) {
  return await axios.post(`${url}/add-flaw`, {description});
}

export function getRandomFlaw() {
  return axios
    .get(`${url}/get-random-flaw`)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
}


export function getFlaws() {
  return axios
    .get(`${url}/get-flaws`)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
}

// ---------------------------------------------------
// Alignment
// ---------------------------------------------------
export function getAlignments() {
  return axios
    .get(`${url}/get-alignments`)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
}