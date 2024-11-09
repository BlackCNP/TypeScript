"use strict";
// Крок 1: Створення типів товарів
// Крок 2: Створення функцій для пошуку товарів
// Функція для пошуку товару за ID
const findProduct = (products, id) => {
    return products.find(product => product.id === id);
};
// Функція для фільтрації товарів за ціною
const filterByPrice = (products, maxPrice) => {
    return products.filter(product => product.price <= maxPrice);
};
// Функція для додавання товару в кошик
const addToCart = (cart, product, quantity) => {
    // Перевірка наявності товару в кошику
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
        existingItem.quantity += quantity;
    }
    else {
        cart.push({ product, quantity }); // Додавання нового товару 
    }
    return cart;
};
// Функція для підрахунку загальної вартості
const calculateTotal = (cart) => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
};
// Крок 4: Використання функцій
// Створення тестових даних
const electronics = [
    {
        id: 1,
        name: "Телефон",
        price: 10000,
        description: "Смарт телефон.",
        category: 'electronics',
        brand: 'OnePlus',
        warranty: '12 місяців'
    },
    {
        id: 2,
        name: "Ноутбук",
        price: 20000,
        description: "Потужний ноутбук.",
        category: 'electronics',
        brand: 'Dream Machine',
        warranty: '24 місяці'
    }
];
const clothing = [
    {
        id: 3,
        name: "Футболка",
        price: 500,
        description: "Комфортна футболка.",
        category: 'clothing',
        size: 'M',
        material: '100% бавовна'
    }
];
const books = [
    {
        id: 4,
        name: "Книга",
        price: 300,
        description: "Цікава книга.",
        category: 'book',
        author: 'Хтось',
        genre: 'Наукова фантастика'
    },
    {
        id: 5,
        name: "Книга",
        price: 600,
        description: "Ого, яка цікава книга.",
        category: 'book',
        author: 'Хтось відомий',
        genre: 'Пригоди'
    },
    {
        id: 6,
        name: "Тест",
        price: 6000,
        description: "Дорога.",
        category: 'book',
        author: 'Хтось заможній',
        genre: 'Гроші'
    }
];
// Тестування функцій
// Тестування пошуку товару
const phone = findProduct(electronics, 1);
console.log("Знайдений товар (Телефон):", phone);
// Тестування додавання кількох товарів у кошик
let cart = [];
if (phone) {
    cart = addToCart(cart, phone, 1); // телефон додати
}
const tshirt = findProduct(clothing, 3);
if (tshirt) {
    cart = addToCart(cart, tshirt, 2); // Додати дві футболки 
}
const book = findProduct(books, 4);
if (book) {
    cart = addToCart(cart, book, 1); // Додати одну книгу 
}
console.log("Кошик після додавання товарів:", cart);
// Перевірка підрахунку загальної вартості
const total = calculateTotal(cart);
console.log("Загальна вартість кошика:", total);
// Фільтрація товарів за ціною для різних типів
const affordableElectronics = filterByPrice(electronics, 15000);
console.log("Доступна електроніка до 15000:", affordableElectronics);
const affordableClothing = filterByPrice(clothing, 600);
console.log("Доступний одяг до 600:", affordableClothing);
const affordableBooks = filterByPrice(books, 650);
console.log("Доступні книги до 650:", affordableBooks);
