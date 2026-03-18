
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
  tabs.innerHTML = `<button class='px-4 py-2 text-lg bg-blue-600 text-white rounded-full' onclick="changeCategory('All')">All</button>`;

  categories.forEach(cat => {
    tabs.innerHTML += `<button class='px-4 py-2 text-lg bg-gray-200 rounded-full' onclick="changeCategory('${cat.name}')">${cat.name}</button>`;
  });
}

function changeCategory(cat) {
  selectedCategory = cat;
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

      card.className = `bg-white p-6 rounded-2xl shadow-lg ${!available ? 'opacity-40' : ''}`;

      card.innerHTML = `
        <img src='${item.image}' class='w-full h-48 object-cover rounded-xl'>
        <h2 class='mt-4 text-2xl font-semibold'>${item.name}</h2>
        <p class='text-gray-700 text-base leading-relaxed mt-1'>${item.description}</p>
        <p class='mt-3 font-bold text-xl'>₹${item.price}</p>
        ${available ? `<a href='${createWhatsAppLink(fullData.whatsappNumber, item.name)}' target='_blank'><button class='mt-3 w-full py-3 bg-green-600 text-white rounded-xl text-lg'>Order on WhatsApp</button></a>` : `<p class='text-red-600 text-lg mt-3'>Unavailable</p>`}
      `;

      container.appendChild(card);
    });
  });
}

document.getElementById('searchBox').addEventListener('input', renderMenu);
