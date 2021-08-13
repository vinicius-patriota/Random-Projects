const fetch = require("node-fetch");

function promessa(arg) {
  return new Promise((resolve, reject) => {
    if (arg === true) resolve("true");
    if (arg === false) reject("false");
  })
}

async function doPromessa() {
  try {
    const result = await promessa(false);
    console.log(result);
  } catch (err) {
    console.log(err);
  };
};

const ess = async () => {
  const response = await fetch('https://reqres.in/api/users');
  const data = await response.json();
  console.log(data);
}

fetch('https://reqres.in/api/users')
  .then((response) => {
    if (response.ok) {
      console.log('ok')
    } else {
      console.log('not ok')
    }
    return response.json()
  })
  .then((data) => console.log(data))

