document.getElementById("submit").addEventListener("click", function () {
    // Redirect to another HTML page

    window.location.href = "../login/index.html";
});
let username = document.getElementById('username')
username.addEventListener('click', function () {
    username.innerText = ""
})
let email = document.getElementById('email')
email.addEventListener('click', () => {
    email.innerText = ""
})