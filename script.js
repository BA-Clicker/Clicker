// Инициализация значений
let totalClicks = localStorage.getItem('totalClicks') ? parseInt(localStorage.getItem('totalClicks')) : 0;
let money = localStorage.getItem('money') ? parseInt(localStorage.getItem('money')) : 0;
let clickValue = localStorage.getItem('clickValue') ? parseInt(localStorage.getItem('clickValue')) : 1;
let avatarCost = localStorage.getItem('avatarCost') ? parseInt(localStorage.getItem('avatarCost')) : 1000;

// Обновление начальных значений на экране
document.getElementById('clicks').innerText = totalClicks;
document.getElementById('money').innerText = money;

// Функция обработки кликов на аватар
function handleClick() {
    totalClicks += clickValue; // Увеличиваем количество кликов на значение clickValue
    localStorage.setItem('totalClicks', totalClicks); // Сохраняем в localStorage

    document.getElementById('clicks').innerText = totalClicks; // Обновляем отображение кликов

    if (totalClicks >= 1000000 && !localStorage.getItem('millionMessageShown')) {
        alert("Зачем ты нажал на пнг картинки 1 миллион раз?");
        localStorage.setItem('millionMessageShown', true);
    }

    const avatarImage = document.querySelector('.avatar');
    avatarImage.src = `sprites/avatar.gif`;

    setTimeout(() => {
        avatarImage.src = `sprites/avatar.png`;
    }, 1000);
}

// Функция обмена кликов на деньги
function exchangeClicks() {
    if (totalClicks >= 10) {
        let exchangedMoney = Math.floor(totalClicks / 10); // Рассчитываем количество черр
        money += exchangedMoney; // Добавляем черр к общему количеству
        totalClicks -= exchangedMoney * 10; // Уменьшаем количество кликов

        // Обновляем значения в localStorage
        localStorage.setItem('totalClicks', totalClicks);
        localStorage.setItem('money', money);

        // Обновляем отображение на экране
        document.getElementById('clicks').innerText = totalClicks;
        document.getElementById('money').innerText = money;
    } else {
        alert('Недостаточно кликов для обмена!');
    }
}

// Функция отображения магазина
function toggleShop() {
    const shop = document.getElementById('shop');
    shop.style.display = shop.style.display === 'none' ? 'block' : 'none';
}

// Функция отображения обмена
function toggleExchange() {
    const exchange = document.getElementById('exchange');
    exchange.style.display = exchange.style.display === 'none' ? 'block' : 'none';
}

// Функция покупки нового аватара
function buyNewAvatar() {
    if (money >= avatarCost) {
        money -= avatarCost; // Вычитаем стоимость аватара из черр
        localStorage.setItem('money', money); // Сохраняем новое значение денег
        document.getElementById('money').innerText = money;

        clickValue++; // Увеличиваем значение клика
        avatarCost += 1000; // Увеличиваем стоимость следующего аватара
        localStorage.setItem('clickValue', clickValue);
        localStorage.setItem('avatarCost', avatarCost);

        alert(`Улучшение куплено! Теперь за каждый клик вы получаете ${clickValue} кликов.`);

        // Заменяем текущий аватар на новый
        const avatarImage = document.querySelector('.avatar');
        avatarImage.src = `sprites/avatar${clickValue}.png`;
    } else {
        alert('Недостаточно денег');
    }
}

// Инициализация клика на аватар
document.querySelector('.avatar').addEventListener('click', handleClick);
    
