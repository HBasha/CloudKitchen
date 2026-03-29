
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
  const allClass = selectedCategory === 'All' ? 'bg-blue-600 text-white' : 'bg-gray-200';
  tabs.innerHTML = `<button class='category-btn px-3 py-2 md:px-5 md:py-2 ${allClass} rounded-full' onclick="changeCategory('All')">All</button>`;

  categories.forEach(cat => {
    const catClass = selectedCategory === cat.name ? 'bg-blue-600 text-white' : 'bg-gray-200';
    tabs.innerHTML += `<button class='category-btn px-3 py-2 md:px-5 md:py-2 ${catClass} rounded-full' onclick="changeCategory('${cat.name}')">${cat.name}</button>`;
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

      card.className = `menu-card bg-white rounded-xl shadow-md ${!available ? 'opacity-50' : ''} flex flex-col`;

      card.innerHTML = `
        <img src='${item.image}' alt='${item.name}' class='w-full object-cover rounded-lg'>
        <h2 class='mt-3 font-semibold tracking-wide'>${item.name}</h2>
        <p class='text-gray-600 leading-relaxed mt-1 flex-grow'>${item.description}</p>
        <p class='mt-2 font-bold price'>₹${item.price}</p>
        ${available ? `<a href='${createWhatsAppLink(fullData.whatsappNumber, item.name)}' target='_blank' class='block mt-3'><button class='order-btn w-full bg-green-600 text-white rounded-lg font-medium'>Order on WhatsApp</button></a>` : `<p class='text-red-600 font-semibold mt-3'>Unavailable</p>`}
      `;

      container.appendChild(card);
    });
  });
}

document.getElementById('searchBox').addEventListener('input', renderMenu);
