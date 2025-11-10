const products = [
  {id:1,name:'Classic Black Snapback',style:'snapback',price:45,img:'',desc:'Gorra snapback con visera plana y logo bordado. Ideal para looks urbanos.'},
  {id:2,name:'Vintage Dad Cap - Beige',style:'dad',price:28,img:'',desc:'Estilo relajado y curvado. Tela suave y cómoda.'},
  {id:3,name:'Mesh Trucker Blue',style:'trucker',price:32,img:'',desc:'Malla trasera para mayor ventilación, perfecto para verano.'},
  {id:4,name:'Wool Beanie - Charcoal',style:'beanie',price:22,img:'',desc:'Suave y térmico. Mantén la cabeza caliente con estilo.'},
  {id:5,name:'Logo Embroidered - White',style:'snapback',price:50,img:'',desc:'Gorra premium con logo bordado en alta calidad.'},
  {id:6,name:'Sport Performance Cap',style:'dad',price:30,img:'',desc:'Tejido transpirable y secado rápido, para actividad física.'},
  {id:7,name:'Retro Trucker - Olive',style:'trucker',price:29,img:'',desc:'Toque retro con parche frontal y malla resistente.'},
  {id:8,name:'Minimal Beanie - Rust',style:'beanie',price:24,img:'',desc:'Diseño minimalista y colores cálidos.'}
];

const grid = document.getElementById('grid');
const count = document.getElementById('count');
const search = document.getElementById('search');
const filterType = document.getElementById('filterType');
const sort = document.getElementById('sort');
const clearFilters = document.getElementById('clearFilters');

function formatPrice(p){return '$' + p.toFixed(2);}

function render(items){
  grid.innerHTML = '';
  count.textContent = items.length;
  items.forEach(p=>{
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="thumb"><img src="${p.img}" alt="${p.name}" loading="lazy"></div>
      <div class="meta"><div class="title">${p.name}</div><div class="price">${formatPrice(p.price)}</div></div>
      <div class="tags"><span class="tag">${p.style}</span></div>
      <div class="card-footer"><div class="small">ID ${p.id}</div><button class="btn" data-id="${p.id}">Ver</button></div>
    `;
    grid.appendChild(card);
  });
  grid.querySelectorAll('button[data-id]').forEach(b=>b.addEventListener('click', ()=>openModal(b.getAttribute('data-id'))));
}

function applyFilters(){
  let q = search.value.trim().toLowerCase();
  let t = filterType.value;
  let s = sort.value;
  let result = products.filter(p=>{
    const matchQ = p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.style.toLowerCase().includes(q);
    const matchT = (t === 'all') ? true : (p.style === t);
    return matchQ && matchT;
  });
  if(s === 'price-asc') result.sort((a,b)=>a.price-b.price);
  else if(s === 'price-desc') result.sort((a,b)=>b.price-a.price);
  else result.sort((a,b)=>a.id-b.id);
  render(result);
}

// Modal
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalName = document.getElementById('modalName');
const modalStyle = document.getElementById('modalStyle');
const modalDesc = document.getElementById('modalDesc');
const modalPrice = document.getElementById('modalPrice');
const qtyEl = document.getElementById('qty');
let currentQty = 1;
let currentProduct = null;

function openModal(id){
  currentProduct = products.find(p=>p.id == id);
  if(!currentProduct) return;
  modalImg.innerHTML = `<img src="${currentProduct.img}" alt="${currentProduct.name}">`;
  modalName.textContent = currentProduct.name;
  modalStyle.textContent = currentProduct.style;
  modalDesc.textContent = currentProduct.desc;
  modalPrice.textContent = formatPrice(currentProduct.price);
  currentQty = 1; qtyEl.textContent = currentQty;
  modal.classList.add('open');
}
function closeModal(){ modal.classList.remove('open'); }

document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('closeModal2').addEventListener('click', closeModal);
modal.addEventListener('click',(e)=>{ if(e.target === modal) closeModal(); });
document.getElementById('inc').addEventListener('click', ()=>{ currentQty++; qtyEl.textContent = currentQty; });
document.getElementById('dec').addEventListener('click', ()=>{ if(currentQty>1) currentQty--; qtyEl.textContent = currentQty; });
document.getElementById('addCart').addEventListener('click', ()=>{
  alert(`${currentQty} × ${currentProduct.name} añadida(s) al carrito (simulado).`);
  closeModal();
});

// Eventos
[search,filterType,sort].forEach(el=>el.addEventListener('input', applyFilters));
clearFilters.addEventListener('click', ()=>{search.value='';filterType.value='all';sort.value='popular';applyFilters();});

// Inicial
render(products);
