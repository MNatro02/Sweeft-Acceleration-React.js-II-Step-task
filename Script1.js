// Define global variables for keeping track of the user list and the current page
let userList = [];
let currentPage = 1;

// Function to fetch the next page of user data
async function getNextPage() {
    const response = await fetch(http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/api/users?page=${currentPage});
  const data = await response.json();
    userList.push(...data.users);
    currentPage++;
}

// Function to create a user card HTML element
function createUserCard(user) {
    const userCard = document.createElement('div');
    userCard.classList.add('user-card');
    userCard.innerHTML = `
    <img src="${user.picture}" alt="${user.firstName} ${user.lastName}">
    <h2>${user.firstName} ${user.lastName}</h2>
    <p>${user.email}</p>
  `;
    return userCard;
}

// Function to render the user list on the page
function renderUserList() {
    const userContainer = document.getElementById('user-list');
    userList.forEach(user => {
        const userCard = createUserCard(user);
        userContainer.appendChild(userCard);
    });
}

// Function to handle infinite scrolling
function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        getNextPage().then(() => {
            renderUserList();
        });
    }
}

// Add an event listener for scrolling
window.addEventListener('scroll', handleScroll);

// Load the initial page of data and render the user list
getNextPage().then(() => {
    renderUserList();
});