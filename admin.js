let menuData = null;

function loadSourceData() {
  const saved = localStorage.getItem('menuData');
  if (saved) {
    menuData = JSON.parse(saved);
    populateForm();
    renderCategories();
    return;
  }

  fetch('menu.json')
    .then(r => r.json())
    .then(data => {
      menuData = JSON.parse(JSON.stringify(data)); // deep copy
      populateForm();
      renderCategories();
    });
}

loadSourceData();

function populateForm() {
  document.getElementById('kitchenNameInput').value = menuData.kitchenName || '';
  document.getElementById('headerMessageInput').value = menuData.headerMessage || '';
  document.getElementById('openTimeInput').value = menuData.openTime || '';
  document.getElementById('closeTimeInput').value = menuData.closeTime || '';
  document.getElementById('isOpenCheckbox').checked = menuData.isOpen === true;
}

function renderCategories() {
  const container = document.getElementById('categoriesContainer');
  container.innerHTML = '';
  menuData.categories.forEach((cat, catIndex) => {
    const catDiv = document.createElement('div');
    catDiv.className = 'border rounded p-4 mb-4';
    catDiv.innerHTML = `
      <div class='flex justify-between items-center mb-2'>
        <input type='text' value='${cat.name}' onchange='updateCategoryName(${catIndex}, this.value)' class='font-semibold text-lg border-none bg-transparent'>
        <div>
          <button onclick='deleteCategory(${catIndex})' class='text-red-600 mr-2'>Delete</button>
          <button onclick='addItem(${catIndex})' class='text-blue-600'>Add Item</button>
        </div>
      </div>
      <div id='items-${catIndex}'></div>
    `;
    container.appendChild(catDiv);
    renderItems(catIndex);
  });
}

function renderItems(catIndex) {
  const container = document.getElementById(`items-${catIndex}`);
  container.innerHTML = '';
  menuData.categories[catIndex].items.forEach((item, itemIndex) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'border-l-4 border-gray-300 pl-4 mb-2';
    itemDiv.innerHTML = `
      <div class='grid grid-cols-1 md:grid-cols-2 gap-2 mb-2'>
        <input type='text' value='${item.name}' onchange='updateItem(${catIndex}, ${itemIndex}, "name", this.value)' placeholder='Name' class='p-1 border rounded'>
        <input type='text' value='${item.description}' onchange='updateItem(${catIndex}, ${itemIndex}, "description", this.value)' placeholder='Description' class='p-1 border rounded'>
        <input type='number' value='${item.price}' onchange='updateItem(${catIndex}, ${itemIndex}, "price", this.value)' placeholder='Price' class='p-1 border rounded'>
        <input type='text' value='${item.image}' onchange='updateItem(${catIndex}, ${itemIndex}, "image", this.value)' placeholder='Image URL' class='p-1 border rounded'>
        <label class='flex items-center'>
          <input type='checkbox' ${item.available ? 'checked' : ''} onchange='updateItem(${catIndex}, ${itemIndex}, "available", this.checked)'>
          <span class='ml-2'>Available</span>
        </label>
        <button onclick='deleteItem(${catIndex}, ${itemIndex})' class='text-red-600'>Delete Item</button>
      </div>
    `;
    container.appendChild(itemDiv);
  });
}

function updateCategoryName(index, name) {
  menuData.categories[index].name = name;
}

function deleteCategory(index) {
  if (confirm('Delete this category and all its items?')) {
    menuData.categories.splice(index, 1);
    renderCategories();
  }
}

function addCategory() {
  const name = prompt('Enter category name:');
  if (name) {
    menuData.categories.push({ id: Date.now(), name, items: [] });
    renderCategories();
  }
}

function addItem(catIndex) {
  const item = {
    id: Date.now(),
    name: '',
    description: '',
    price: 0,
    image: '',
    available: true
  };
  menuData.categories[catIndex].items.push(item);
  renderItems(catIndex);
}

function updateItem(catIndex, itemIndex, field, value) {
  menuData.categories[catIndex].items[itemIndex][field] = value;
}

function deleteItem(catIndex, itemIndex) {
  menuData.categories[catIndex].items.splice(itemIndex, 1);
  renderItems(catIndex);
}

function saveData() {
  // Update from form
  menuData.kitchenName = document.getElementById('kitchenNameInput').value;
  menuData.headerMessage = document.getElementById('headerMessageInput').value;
  menuData.openTime = document.getElementById('openTimeInput').value;
  menuData.closeTime = document.getElementById('closeTimeInput').value;
  menuData.isOpen = document.getElementById('isOpenCheckbox').checked;

  // Save to localStorage
  localStorage.setItem('menuData', JSON.stringify(menuData));

  alert('Data saved locally!');
}