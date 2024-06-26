let counters = {
    'avatar': localStorage.getItem('avatarCounter') ? parseInt(localStorage.getItem('avatarCounter')) : 0
};

let money = localStorage.getItem('money') ? parseInt(localStorage.getItem('money')) : 0;
let clickValue = localStorage.getItem('clickValue') ? parseInt(localStorage.getItem('clickValue')) : 1;
let totalClicks = localStorage.getItem('totalClicks') ? parseInt(localStorage.getItem('totalClicks')) : 0;
let avatarCost = localStorage.getItem('avatarCost') ? parseInt(localStorage.getItem('avatarCost')) : 1000;

document.getElementById('clicks').innerText = totalClicks;
document.getElementById('money').innerText = money;

function handleClick(avatar) {
    counters[avatar] += clickValue;
    totalClicks += clickValue;
    
    localStorage.setItem(`${avatar}Counter`, counters[avatar]);
    localStorage.setItem('totalClicks', totalClicks);

    document.getElementById('clicks').innerText = totalClicks;

    if (totalClicks >= 1000000 && !localStorage.getItem('millionMessageShown')) {
        alert("Зачем ты нажал на пнг картинки 1 миллион раз?");
        localStorage.setItem('millionMessageShown', true);
    }

    const avatarImage = document.querySelector(`img[alt="${avatar}"]`);
    avatarImage.src = `sprites/${avatar}.gif`;

    setTimeout(() => {
        avatarImage.src = `sprites/${avatar}.png`;
    }, 1000);
}

function exchangeClicks() {
    let totalClicksForExchange = totalClicks;
    totalClicks = 0;
    document.getElementById('clicks').innerText = 0;
    counters['avatar'] = 0;
    localStorage.setItem('avatarCounter', 0);
    
    let earnedMoney = Math.floor(totalClicksForExchange / 10);
    money += earnedMoney;
    localStorage.setItem('money', money);
    document.getElementById('money').innerText = money;
}

function toggleShop() {
    const shop = document.getElementById('shop');
    shop.style.display = shop.style.display === 'none' ? 'block' : 'none';
}

function toggleExchange() {
    const exchange = document.getElementById('exchange');
    exchange.style.display = exchange.style.display === 'none' ? 'block' : 'none';
}

function buyNewAvatar() {
    if (money >= avatarCost) {
        money -= avatarCost;
        localStorage.setItem('money', money);
        document.getElementById('money').innerText = money;

        clickValue++;
        avatarCost += 1000;
        localStorage.setItem('clickValue', clickValue);
        localStorage.setItem('avatarCost', avatarCost);

        alert(`Улучшение куплено! Теперь за каждый клик вы получаете ${clickValue} кликов.`);
    } else {
        alert('Недостаточно денег');
    }
}
