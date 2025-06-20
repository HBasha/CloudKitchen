const menuItems = [
    {
        name: "Chicken Biryani",
        description: "Aromatic basmati rice with tender chicken and flavorful spices.",
        price: "₹220",
        image: "https://images.unsplash.com/photo-1603079842194-009b2c7e6b3a?auto=format&fit=crop&w=400&q=80"
    },
    {
        name: "Chicken Ghee Roast",
        description: "Juicy chicken roasted in ghee, coated with spicy masala.",
        price: "₹250",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
    },
    {
        name: "Wheat Paratha",
        description: "Soft, flaky whole wheat flatbread, perfect with any curry.",
        price: "₹40",
        image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80"
    },
    {
        name: "Dal Fry",
        description: "Yellow lentils cooked with spices, herbs, and a touch of ghee.",
        price: "₹90",
        image: "https://images.unsplash.com/photo-1506368083636-6defb67639d0?auto=format&fit=crop&w=400&q=80"
    }
];

const menuSection = document.querySelector('.menu');
menuSection.innerHTML = menuItems.map(item => `
    <div class="menu-item">
        <img src="${item.image}" alt="${item.name}" class="dish-img" />
        <h2>${item.name}</h2>
        <p>${item.description}</p>
        <span class="price">${item.price}</span>
    </div>
`).join('');
