export const datenbank_add = async (sprite, name) => {
  console.log("test x");
  fetch("https://poke-fun-backend.vercel.app/insert_one", {
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
