import axios from "axios";

const url = "http://127.0.0.1:5000";

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
