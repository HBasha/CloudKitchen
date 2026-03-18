let fullData=null; let selectedCategory='All';
fetch('menu.json').then(r=>r.json()).then(data=>{
 fullData=data;
 document.getElementById('kitchenName').innerText=data.kitchenName;
 document.getElementById('headerMessage').innerText=data.headerMessage;
 const isOpenNow=data.isOpen && isWithinTime(data.openTime,data.closeTime);
 if(!isOpenNow) document.getElementById('closedBanner').classList.remove('hidden');
 renderCategories(data.categories); renderMenu();
});
function renderCategories(categories){
 const tabs=document.getElementById('categoryTabs');
 tabs.innerHTML=`<button class='px-4 py-2 bg-blue-600 text-white rounded-xl' onclick="changeCategory('All')">All</button>`;
 categories.forEach(c=>{ tabs.innerHTML+=`<button class='px-4 py-2 bg-gray-200 rounded-xl' onclick="changeCategory('${c.name}')">${c.name}</button>`; });
}
function changeCategory(c){ selectedCategory=c; renderMenu(); }
function renderMenu(){
 const container=document.getElementById('menuContainer');
 const query=document.getElementById('searchBox').value.toLowerCase();
 const isOpen=fullData.isOpen && isWithinTime(fullData.openTime,fullData.closeTime);
 container.innerHTML='';
 fullData.categories.forEach(cat=>{
  if(selectedCategory!=='All' && selectedCategory!==cat.name) return;
  cat.items.filter(i=>i.name.toLowerCase().includes(query)).forEach(item=>{
    const card=document.createElement('div');
    card.className=`bg-white p-4 rounded-xl shadow ${!item.available||!isOpen?'unavailable':''}`;
    card.innerHTML=`
      ${item.image}
      <h2 class='mt-3 text-xl font-semibold'>${item.name}</h2>
      <p class='text-gray-600 text-sm'>${item.description}</p>
      <p class='mt-2 font-bold text-lg'>₹${item.price}</p>
      <p class='text-sm text-orange-600'>${item.preOrderNote||''}</p>
      ${ isOpen && item.available ? `<a href='${createWhatsAppLink(fullData.whatsappNumber,item.name)}' target='_blank'><button class='mt-3 px-4 py-2 bg-green-600 text-white rounded-xl'>Order on WhatsApp</button></a>` : `<p class='mt-4 text-red-600 font-semibold'>Unavailable</p>`}
    `;
    container.appendChild(card);
  });
 });
}
document.getElementById('searchBox').addEventListener('input', renderMenu);
