const USERS_ENDPOINT = 'https://jsonplaceholder.typicode.com/users';

// Function to fetch and display users
async function fetchAndRenderUsers() {
  try {
    // Fetch data from the API
    const response = await fetch(USERS_ENDPOINT);
    const users = await response.json();

    // Group users by TLD
    const usersByTLD = groupUsersByTLD(users);

    // Render each TLD group in a column
    Object.keys(usersByTLD).forEach((tld) => {
      renderColumn(tld, usersByTLD[tld]);
    });
  } catch (error) {
    console.log('Error fetching users:', error);
  }
}

// Group users by their website's top-level domain (TLD)
function groupUsersByTLD(users) {
  const usersByTLD = {};

  users.forEach((user) => {
    // Get TLD from website (e.g., .com, .org)
    const tld = user.website.split('.').pop();

    // Group users by TLD
    if (!usersByTLD[tld]) {
      usersByTLD[tld] = [];
    }
    usersByTLD[tld].push(user);
  });

  return usersByTLD;
}

// Function to render columns for each TLD
function renderColumn(title, users) {
  const columnDiv = document.createElement('div');
  columnDiv.classList.add('column');

  const h3 = document.createElement('h3');
  h3.textContent = `TLD: .${title}`;
  columnDiv.appendChild(h3);

  users.forEach((user) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    const nameP = document.createElement('p');
    nameP.textContent = `Name: ${user.name}`;
    cardDiv.appendChild(nameP);

    const websiteP = document.createElement('p');
    websiteP.textContent = `Website: ${user.website}`;
    cardDiv.appendChild(websiteP);

    columnDiv.appendChild(cardDiv);
  });

  document.getElementById('wrapper').appendChild(columnDiv);
}

// Call the function to fetch and display users
fetchAndRenderUsers();
