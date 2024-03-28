async function getDict() {
  let accessToken = localStorage.getItem("accessToken");
  const accessTokenExpTime = getTokenExpiration(accessToken);


  if (accessTokenExpTime) {
    const currentTime = new Date();
    if (currentTime < accessTokenExpTime) {
      console.log("Access token faol");
    } else {
      console.log("Access tokenni vaqti chiqib ketti");
      accessToken = await refreshTokenFunc();
      console.log("NewAccessToken:", accessToken);
    }
  } else {
    console.log("Invalid access token format.");
  }

  fetch("http://localhost:3000/api/dict", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    mode: "cors",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Request failed with status: " + response.status);
      }
    })
    .then((dict) => {
      displayAuthors(dict.getTerm);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function getTokenExpiration(token) {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  if (decodedToken) {
    return new Date(decodedToken.exp * 1000);
  }
  return null;
}

async function refreshTokenFunc() {
  const loginUri = "/login";

  try {
    const response = await fetch("http://localhost:3000/api/author/refresh", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (data.error && data.error === "jwt expired") {
      console.log("Refresh token vaqti chiqib ketti");
      return window.location.replace(loginUri);
    }
    console.log("Tokenlar Refresh token orqali mufaqiyatli yangilandi");
    localStorage.setItem("accessToken", data.accessToken);
    return data.accessToken;
  } catch (error) {
    console.log(error);
    return window.location.replace(log);
  }
}

function displayDict(dicts) {
  const listContainer = document.getElementById("dict-list");

  listContainer.innerHTML = "";

  dicts.forEach((d) => {
    const listItem = document.createElement("li");
    listItem.textContent = `Term - ${d.term}\nLetter - ${d.letter}`;
    listContainer.appendChild(listItem);
  });
}
