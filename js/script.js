    const API_URL = 'https://raw.githubusercontent.com/dan-collins-dev/dummy-data-fetching-repo/main/data/users.json';

    const fetchAllBtn   = document.getElementById('fetch-all');
    const fetchRecentBtn = document.getElementById('fetch-recent');
    const clearBtn      = document.getElementById('clear-cards');
    const container     = document.getElementById('cards-container');


    fetchAllBtn.addEventListener('click', () => handleFetch(false));
    fetchRecentBtn.addEventListener('click', () => handleFetch(true));
    clearBtn.addEventListener('click', clearCards);


    function handleFetch(filterOld) {
        clearCards();
        fetch(API_URL)
        .then(response => {
            if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
            return response.json();
        })
        .then(users => {

            if (filterOld) {
            users = users.filter(u => u.yearsEmployed < 10);
            }
            users.forEach(createCard);
        })
        .catch(err => console.error('Fetch error:', err));
    }


    function createCard(user) {
        const card = document.createElement('div');
        card.className = 'user-card';
        card.innerHTML = `
        <h2>${user.firstName} ${user.lastName}</h2>
        <p><strong>ID:</strong> ${user.id}</p>
        <p><strong>First Name:</strong> ${user.firstName}</p>
        <p><strong>Last Name:</strong> ${user.lastName}</p>
        <p><strong>Email:</strong> <a href="mailto:${user.email}">${user.email}</a></p>
        <p><strong>Company:</strong> ${user.companyName}</p>
        <p><strong>Years Employed:</strong> ${user.yearsEmployed}</p>
        `;
        container.appendChild(card);
    }


    function clearCards() {
        container.innerHTML = '';
    }