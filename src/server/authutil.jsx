export const registerUser = async (username, password) => {
  return fetch("https://poke-fun-blush.vercel.app/registerUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Include the cookies

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

export const loginUser = async (username, password) => {
  return fetch("https://poke-fun-blush.vercel.app/loginUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Include the cookies

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
