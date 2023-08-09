const pizzas = [
    {
        id: 1,
        nombre: "Pizza de Muzzarella",
        precio: 500,
        ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
        imagen: "./img/muzzarella.png",
    },
    {
        id: 2,
        nombre: "Pizza de Cebolla",
        precio: 1500,
        ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
        imagen: "./img/cebolla.png",
    },
    {
        id: 3,
        nombre: "Pizza 4 Quesos",
        precio: 1380,
        ingredientes: ["Muzzarella", "Tomate", "Queso Azul", "Parmesano", "Roquefort"],
        imagen: "./img/4quesos.png",
    },
    {
        id: 4,
        nombre: "Pizza Especial",
        precio: 1000,
        ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
        imagen: "./img/especial.png",
    },
    {
        id: 5,
        nombre: "Pizza con Anana",
        precio: 600,
        ingredientes: ["Muzzarella", "Tomate", "Anana"],
        imagen: "./img/anana.png",
    },
];

const searchForm = document.querySelector(`#search-form`);

const numberInput = document.querySelector(`#search-number`);

const resultContainer = document.querySelector(`#result-container`);

// buscar ultimo resultado en localStorage

const lastItem = JSON.parse(localStorage.getItem(`lastItem`)) || [];

// guardar ultimo resultado en localStorage

const saveToLocalStorage = (pizza) => {
    localStorage.setItem(`lastItem`, JSON.stringify(pizza));
};

// funcion checkear input vacio

const isEmpty = (input) => {
    return input.value == ``;
};

// funcion checkear si pizza existe

const isExisting = (input, min, max) => {
    return input.value >= min && input.value <= max;
};

// funcion mostrar error if no existe

const showNotFoundError = () => {
    return `<div class="card"><p class="error">No existe una pizza con ese ID.<br/>Ingrese un ID entre 1 y 5.</p></div>`;
};

// funcion mostrar error if vacio

const showEmptyError = () => {
    return `<div class="card"><p class="error">Por favor, ingrese un número.</p></div>`;
};

// funcion buscar pizza

const findPizza = () => {
    return pizzas.find((pizza) => pizza.id == numberInput.value);
};

// funcion renderizar pizza

const renderPizza = (pizza) => {
    resultContainer.innerHTML = `<div class="card">
        <h3 class="result-title">${pizza.nombre}</h3>
        <img src=${pizza.imagen} alt="Pizza" class="result-img">
        <p class="result-price">${pizza.precio}$</p>
        </div>`;
};

// funcion renderizar pizza guardada if existe

const renderLastItem = () => {
    if (localStorage.getItem(`lastItem`) !== null) {
        resultContainer.innerHTML = `<div class="card">
        <h3 class="result-title">${lastItem.nombre}</h3>
        <img src=${lastItem.imagen} alt="Pizza" class="result-img">
        <p class="result-price">${lastItem.precio}$</p>
        </div>`;
    } else {
        resultContainer.innerHTML = ``;
    }
};

// tambien funciona con (lastItem.id != undefined)

// funcion validar input

const checkNumInput = (input) => {
    let valid = false;
    if (isEmpty(input)) {
        resultContainer.innerHTML = showEmptyError();
        return;
    }

    if (!isExisting(input, 1, 5)) {
        resultContainer.innerHTML = showNotFoundError();
        return;
    }

    valid = true;
    return valid;
};

const validateForm = (e) => {
    e.preventDefault();

    let isNumValid = checkNumInput(numberInput);

    if (isNumValid) {
        renderPizza(findPizza());
        saveToLocalStorage(findPizza());
    }
    searchForm.reset();
};

const init = () => {
    document.addEventListener(`DOMContentLoaded`, renderLastItem);
    searchForm.addEventListener(`submit`, validateForm);
};

init();
