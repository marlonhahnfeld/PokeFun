export const addPokemonNameAndSpriteToMongo = async (sprite, name) => {
  console.log("test x");
  fetch("http://localhost:5000/insert_one", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Include the cookies

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

export const saveScoreHigherLower = async (score) => {
  // const token = localStorage.getItem("token");

  return fetch("http://localhost:5000/saveHighscoreForHigherLower", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: token,
    },
    credentials: "include", // Include the cookies

    body: JSON.stringify({
      score: score,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data; // return the data so it can be used by the function that calls registerUserAndPasswordToMongo
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error; // re-throw the error so it can be caught by the function that calls registerUserAndPasswordToMongo
    });
};
