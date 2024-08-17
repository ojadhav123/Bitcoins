const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';


function fetchData() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            renderTable(data);
            setupSearch(data);
            setupSort(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function renderTable(data) {
    const tableBody = document.querySelector('#crypto-table tbody');
    tableBody.innerHTML = ''; 

    data.forEach(coin => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${coin.name}</td>
            <td><img src="${coin.image}" alt="${coin.name}" width="50"></td>
            <td>${coin.symbol.toUpperCase()}</td>
            <td>$${coin.current_price.toFixed(2)}</td>
            <td>$${coin.total_volume.toLocaleString()}</td>
        `;
        tableBody.appendChild(row);
    });
}


function setupSearch(data) {
    const searchInput = document.querySelector('#search');
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredData = data.filter(coin => 
            coin.name.toLowerCase().includes(searchTerm) ||
            coin.symbol.toLowerCase().includes(searchTerm)
        );
        renderTable(filteredData);
    });
}


function setupSort(data) {
    document.querySelector('#sort-market-cap').addEventListener('click', () => {
        const sortedData = [...data].sort((a, b) => b.market_cap - a.market_cap);
        renderTable(sortedData);
    });

    document.querySelector('#sort-change').addEventListener('click', () => {
        
        const sortedData = [...data].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
        renderTable(sortedData);
    });
}


fetchData();