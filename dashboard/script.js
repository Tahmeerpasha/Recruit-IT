var searchButton = document.getElementById("searchButton");
var locationInput = document.getElementById("locationInput");
var jobRoleInput = document.getElementById("jobRoleInput");
var candidateList = document.getElementById("candidateList");
var favoritesList = document.getElementById("favoritesList");

var candidates = [];
var favorites = [];
searchButton.addEventListener("click", function () {
    searchCandidates();
});

function searchCandidates() {
    var location = locationInput.value.toLowerCase();
    var jobRole = jobRoleInput.value.toLowerCase();

    fetch("https://randomuser.me/api/?results=20")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            candidates = data.results.map(function (candidate) {
                return {
                    name: candidate.name.first + " " + candidate.name.last,
                    email: candidate.email,
                    location: candidate.location.city + ", " + candidate.location.country,
                    jobRole: "Software Engineer",
                    picture: candidate.picture.large
                };
            });

            var filteredCandidates = candidates.filter(function (candidate) {
                return candidate.location.toLowerCase().includes(location) &&
                    candidate.jobRole.toLowerCase().includes(jobRole);
            });

            displayCandidates(filteredCandidates);
        })
        .catch(function (error) {
            console.log("Error fetching candidates:", error);
        });
}

function displayCandidates(candidates) {
    candidateList.innerHTML = "";

    if (candidates.length > 0) {
        candidates.forEach(function (candidate) {
            var candidateCard = createCandidateCard(candidate);

            var addToFavoritesButton = document.createElement("button");
            addToFavoritesButton.textContent = "Add to Favorites";
            addToFavoritesButton.addEventListener("click", function () {
                addToFavorites(candidate);
            });
            candidateCard.appendChild(addToFavoritesButton);

            candidateList.appendChild(candidateCard);
        });
    } else {
        var noResultsMessage = document.createElement("p");
        noResultsMessage.textContent = "No candidates found.";
        candidateList.appendChild(noResultsMessage);
    }
}

function createCandidateCard(candidate) {
    var candidateCard = document.createElement("div");
    candidateCard.className = "candidateCard";

    var image = document.createElement("img");
    image.src = candidate.picture;
    image.alt = "Candidate Picture";
    candidateCard.appendChild(image);

    var name = document.createElement("p");
    name.textContent = "Name: " + candidate.name;
    candidateCard.appendChild(name);

    var email = document.createElement("p");
    email.textContent = "Email: " + candidate.email;
    candidateCard.appendChild(email);

    var location = document.createElement("p");
    location.textContent = "Location: " + candidate.location;
    candidateCard.appendChild(location);

    var jobRole = document.createElement("p");
    jobRole.textContent = "Job Role: " + candidate.jobRole;
    candidateCard.appendChild(jobRole);

    return candidateCard;
}

function addToFavorites(candidate) {
    if (!favorites.includes(candidate)) {
        favorites.push(candidate);
        var favoriteCard = createCandidateCard(candidate);
        favoritesList.appendChild(favoriteCard);
    }
}
