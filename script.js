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
    totalClicks += clickValue; 
    localStorage.setItem('totalClicks', totalClicks); 

    document.getElementById('clicks').innerText = totalClicks; 

    if (totalClicks >= 1000000 && !localStorage.getItem('millionMessageShown')) {
        alert("Зачем ты нажал на пнг картинки 1 миллион раз?");
        localStorage.setItem('millionMessageShown', true);
    }
}

// Функция обмена кликов на деньги
function exchangeClicks() {
    if (totalClicks >= 10) {
        let exchangedMoney = Math.floor(totalClicks / 10); 
        money += exchangedMoney; 
        totalClicks -= exchangedMoney * 10; 

        localStorage.setItem('totalClicks', totalClicks);
        localStorage.setItem('money', money);

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
        // Увеличиваем значение клика на 1
        clickValue = clickValue + 1; 
        localStorage.setItem('clickValue', clickValue);

        money -= avatarCost; 
        localStorage.setItem('money', money); 

        avatarCost += 1000;
        localStorage.setItem('avatarCost', avatarCost);

        console.log(`Куплен новый аватар! clickValue: ${clickValue}, avatarCost: ${avatarCost}, money: ${money}`);

        alert(`Улучшение куплено! Теперь за каждый клик вы получаете ${clickValue} кликов.`);

        const avatarImage = document.querySelector('.avatar');
        avatarImage.src = `sprites/avatar${clickValue}.png`;
    } else {
        alert('Недостаточно денег');
    }
}

// Инициализация клика на аватар
document.querySelector('.avatar').addEventListener('click', handleClick);

// Запрет скачивания изображений
document.querySelectorAll('img').forEach(img => {
    img.setAttribute('draggable', 'false');
    img.addEventListener('contextmenu', (e) => e.preventDefault());
});
