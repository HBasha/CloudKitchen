
let fullData = null;
let selectedCategory = 'All';

fetch('menu.json').then(r => r.json()).then(data => {
  fullData = data;
  document.getElementById('kitchenName').innerText = data.kitchenName;
  document.getElementById('headerMessage').innerText = data.headerMessage;

  const isOpenNow = data.isOpen && isWithinTime(data.openTime, data.closeTime);
  if (!isOpenNow) document.getElementById('closedBanner').classList.remove('hidden');

  renderCategories(data.categories);
  renderMenu();
});

function renderCategories(categories) {
  const tabs = document.getElementById('categoryTabs');
  tabs.innerHTML = `<button class='category-btn px-3 py-2 md:px-5 md:py-2 ${selectedCategory === 'All' ? 'bg-blue-600 text-white' : 'bg-gray-200'} rounded-full' onclick="changeCategory('All')">All</button>`;

  categories.forEach(cat => {
    tabs.innerHTML += `<button class='category-btn px-3 py-2 md:px-5 md:py-2 ${selectedCategory === cat.name ? 'bg-blue-600 text-white' : 'bg-gray-200'} rounded-full' onclick="changeCategory('${cat.name}')">${cat.name}</button>`;
  });
}

function changeCategory(cat) {
  selectedCategory = cat;
  renderCategories(fullData.categories);
  renderMenu();
}

function renderMenu() {
  const container = document.getElementById('menuContainer');
  const query = document.getElementById('searchBox').value.toLowerCase();
  const isOpen = fullData.isOpen && isWithinTime(fullData.openTime, fullData.closeTime);

  container.innerHTML = '';

  fullData.categories.forEach(cat => {
    if (selectedCategory !== 'All' && selectedCategory !== cat.name) return;

    cat.items.filter(i => i.name.toLowerCase().includes(query)).forEach(item => {
      const card = document.createElement('div');
      const available = item.available && isOpen;

      card.className = `menu-card bg-white shadow-sm ${!available ? 'opacity-50' : ''}`;

      card.innerHTML = `
        <img src='${item.image}' alt='${item.name}' class='object-cover'>
        <div class='card-content'>
          <h2>${item.name}</h2>
          <p>${item.description}</p>
          <p class='price'>₹${item.price}</p>
          ${available ? `<a href='${createWhatsAppLink(fullData.whatsappNumber, item.name)}' target='_blank' class='block'><button class='order-btn bg-green-600 text-white'>Order</button></a>` : `<p class='text-red-600 text-xs font-semibold'>Unavailable</p>`}
        </div>
      `;

      container.appendChild(card);
    });
  });
}

document.getElementById('searchBox').addEventListener('input', renderMenu);
