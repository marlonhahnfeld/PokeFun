export const addPokemonNameAndSpriteToMongo = async (sprite, name) => {
  console.log("test x");
  fetch("http://localhost:5000/insert_one", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      spriteurl: sprite,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => console.log(data))
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const registerUserAndPasswordToMongo = async (username, password) => {
  return fetch("http://localhost:5000/registerUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data; // return the data so it can be used by the function that calls registerUserAndPasswordToMongo
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error; // re-throw the error so it can be caught by the function that calls registerUserAndPasswordToMongo
    });
};
