// Array para almacenar los productos (ahora con objetos)
const listaDeCompras = [];

// Elementos del DOM
const productoInput = document.getElementById('productoInput');
const agregarBtn = document.getElementById('agregarBtn');
const ordenarBtn = document.getElementById('ordenarBtn');
const limpiarBtn = document.getElementById('limpiarBtn');
const listaProductos = document.getElementById('listaProductos');
const totalProductos = document.getElementById('totalProductos');
const totalComprados = document.getElementById('totalComprados');

// Función flecha para agregar producto
const agregarProducto = () => {
  const nombre = productoInput.value.trim();
  
  if (!nombre) {
    alert('Por favor ingresa un producto');
    return;
  }
  
  // Verificar si el producto ya existe (case insensitive)
  const existe = listaDeCompras.some(
    item => item.nombre.toLowerCase() === nombre.toLowerCase()
  );
  
  if (existe) {
    alert('Este producto ya está en la lista');
    return;
  }
  
  listaDeCompras.push({
    nombre,
    comprado: false,
    id: Date.now() // ID único
  });
  
  actualizarLista();
  productoInput.value = '';
  productoInput.focus();
};

// Función flecha para eliminar producto
const eliminarProducto = (id) => {
  const index = listaDeCompras.findIndex(item => item.id === id);
  if (index !== -1) {
    listaDeCompras.splice(index, 1);
    actualizarLista();
  }
};

// Función flecha para marcar como comprado
const toggleComprado = (id) => {
  const producto = listaDeCompras.find(item => item.id === id);
  if (producto) {
    producto.comprado = !producto.comprado;
    actualizarLista();
  }
};

// Función flecha para ordenar alfabéticamente
const ordenarLista = () => {
  listaDeCompras.sort((a, b) => a.nombre.localeCompare(b.nombre));
  actualizarLista();
};

// Función flecha para limpiar comprados
const limpiarComprados = () => {
  for (let i = listaDeCompras.length - 1; i >= 0; i--) {
    if (listaDeCompras[i].comprado) {
      listaDeCompras.splice(i, 1);
    }
  }
  actualizarLista();
};

// Función flecha para mostrar la lista
const actualizarLista = () => {
  listaProductos.innerHTML = '';
  
  listaDeCompras.forEach(producto => {
    const li = document.createElement('li');
    li.className = producto.comprado ? 'comprado' : '';
    li.innerHTML = `
      <span>${producto.nombre}</span>
      <div>
        <button class="toggle-btn" onclick="toggleComprado(${producto.id})">
          ${producto.comprado ? '✓' : 'Marcar'}
        </button>
        <button class="delete-btn" onclick="eliminarProducto(${producto.id})">
          Eliminar
        </button>
      </div>
    `;
    listaProductos.appendChild(li);
  });
  
  totalProductos.textContent = listaDeCompras.length;
  totalComprados.textContent = listaDeCompras.filter(item => item.comprado).length;
};

// Event Listeners
agregarBtn.addEventListener('click', agregarProducto);
productoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') agregarProducto();
});
ordenarBtn.addEventListener('click', ordenarLista);
limpiarBtn.addEventListener('click', limpiarComprados);

// Hacer funciones accesibles globalmente
window.eliminarProducto = eliminarProducto;
window.toggleComprado = toggleComprado;

// Ejemplo inicial
listaDeCompras.push(
  { nombre: 'Manzanas', comprado: false, id: 1 },
  { nombre: 'Pan', comprado: true, id: 2 },
  { nombre: 'Leche', comprado: false, id: 3 }
);
actualizarLista();