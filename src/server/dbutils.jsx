export const addPokemonNameAndSpriteToMongo = async (sprite, name) => {
  console.log("test x");
  fetch("https://poke-fun-backend.vercel.app/insert_one", {
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
  // findet route in mongo.py @app.route('/saveHighscoreForMovesetGame', methods=['POST'])
  return fetch(
    "https://poke-fun-backend.vercel.app/saveHighscoreForHigherLower",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: token,
      },
      credentials: "include", // Include the cookies

      body: JSON.stringify({
        score: score,
      }),
    }
  )
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

export const saveScoreGuessThePokemon = async () => {
  // const token = localStorage.getItem("token");
  // findet route in mongo.py @app.route('/saveHighscoreForMovesetGame', methods=['POST'])
  return fetch("https://poke-fun-backend.vercel.app/saveScoreGuessThePokemon", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: token,
    },
    credentials: "include", // Include the cookies
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

export const getScoreGuessThePokemon = async () => {
  return fetch("https://poke-fun-backend.vercel.app/getScoreGuessThePokemon", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Include the cookies
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data.score; // Access the highscore from the data object
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};

export const getHighscoreForHigherLower = async () => {
  return fetch(
    "https://poke-fun-backend.vercel.app/getHighscoreForHigherLower",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include the cookies
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data.highscore; // Access the highscore from the data object
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};

export const saveScoreMovesetGame = async (score) => {
  // const token = localStorage.getItem("token");

  return fetch(
    "https://poke-fun-backend.vercel.app/saveHighscoreForMovesetGame",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: token,
      },
      credentials: "include", // Include the cookies

      body: JSON.stringify({
        score: score,
      }),
    }
  )
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

export const getHighscoreForMovesetGame = async () => {
  return fetch(
    "https://poke-fun-backend.vercel.app/getHighscoreForMovesetGame",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include the cookies
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data.highscore; // Access the highscore from the data object
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};

export const fetchHighScoreForGame = async (game) => {
  return fetch("https://poke-fun-backend.vercel.app/fetchHighScoreForGame", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      game: game,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data; // Access the highscore from the data object
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};
