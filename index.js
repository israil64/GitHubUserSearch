const search = document.getElementById("simple-search");
const name = document.getElementById("name");
const login = document.getElementById("login");
const following = document.getElementById("following");
const followers = document.getElementById("followers");
const repos = document.getElementById("repos");
const bio = document.getElementById("bio");
const submit = document.getElementById("submit");
const error = document.getElementById("error");
const form = document.getElementById("form");
const twitter = document.getElementById("twitter-link");
const userLocation = document.getElementById("location");
const company = document.getElementById("company");
const UserEmail = document.getElementById("email");

//API call
async function requestUser(username) {
  try {
    // Check internet connection before making API call
    if (!navigator.onLine) {
      console.log("you are ofline please connect to the inter first");
      return;
    }

    const response = await fetch(`https://api.github.com/users/${username}`);

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      // updateUserProfile
      updateUserProfile(data);
      document.getElementById("container").classList.add("show");
      // error.classList.add("hide");
      error.classList.remove("show");
    } else {
      document.getElementById("container").classList.remove("show"); // container hide
      error.classList.add("show");
      throw new Error(` User Not Found ${response.status}`);
    }
  } catch (error) {
    handleError(error);
  }
}

//* error hundling function
function handleError(error) {
  console.error(error);
  document.getElementById("error").textContent = error.message; // Display only the error message
}

//* updateUserProfile function

function updateUserProfile(data) {
  // data insert in html
  document.getElementById("img").src = data.avatar_url || "Not Found";
  login.href = `https://github.com/${data.login}`;
  login.textContent = `@${data.login}`;
  name.textContent = ` ${data.name || "xyz"}`;
  following.textContent = `${data.following}`;
  followers.textContent = `${data.followers}`;
  repos.textContent = `${data.public_repos}`;
  bio.textContent = data.bio || "Not Available";
  twitter.href = `https://twitter.com/${data.twitter_username}`;
  twitter.textContent = `${data.twitter_username || "Not available"}`;
  userLocation.textContent = data.location || "Not available";
  UserEmail.textContent = data.email || "Not availabe";
  company.textContent = data.company || "Not available";
}

//* search input with functionality
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (search.value) {
    requestUser(search.value);
    search.value = "";
  } else {
    console.log("something wrong");
  }
});

//* Add this code to handle the connection status
window.addEventListener("load", function () {
  let status = document.getElementById("connection-status");

  function updateOnlineStatus(event) {
    let condition = navigator.onLine ? "you're online" : "you're offline";

    status.className = condition;
    status.textContent = condition.toUpperCase();

    setTimeout(function () {
      status.className += " hide";
    }, 1500);
  }

  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);
});
