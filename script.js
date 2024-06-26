let counters = {
    'avatar1': localStorage.getItem('avatar1Counter') ? parseInt(localStorage.getItem('avatar1Counter')) : 0,
    'avatar2': localStorage.getItem('avatar2Counter') ? parseInt(localStorage.getItem('avatar2Counter')) : 0,
    'avatar3': localStorage.getItem('avatar3Counter') ? parseInt(localStorage.getItem('avatar3Counter')) : 0
};

let money = localStorage.getItem('money') ? parseInt(localStorage.getItem('money')) : 0;
let clickValue = localStorage.getItem('clickValue') ? parseInt(localStorage.getItem('clickValue')) : 1;
let totalClicks = localStorage.getItem('totalClicks') ? parseInt(localStorage.getItem('totalClicks')) : 0;

document.getElementById('counter-avatar1').innerText = counters['avatar1'];
document.getElementById('counter-avatar2').innerText = counters['avatar2'];
document.getElementById('counter-avatar3').innerText = counters['avatar3'];
document.getElementById('money').innerText = money;

function handleClick(avatar) {
    counters[avatar] += clickValue;
    totalClicks += clickValue;
    
    localStorage.setItem(`${avatar}Counter`, counters[avatar]);
    localStorage.setItem('totalClicks', totalClicks);

    document.getElementById(`counter-${avatar}`).innerText = counters[avatar];

    // Проверка достижения одного миллиона кликов
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
    let totalClicksForExchange = 0;
    for (let avatar in counters) {
        totalClicksForExchange += counters[avatar];
        counters[avatar] = 0;
        document.getElementById(`counter-${avatar}`).innerText = 0;
    }
    localStorage.setItem('avatar1Counter', 0);
    localStorage.setItem('avatar2Counter', 0);
    localStorage.setItem('avatar3Counter', 0);
    money += Math.floor(totalClicksForExchange / 10);
    localStorage.setItem('money', money);
    document.getElementById('money').innerText = money;
}

function toggleShop() {
    const shop = document.getElementById('shop');
    shop.style.display = shop.style.display === 'none' ? 'block' : 'none';
}

function buyNewAvatar() {
    if (money >= 1000) {
        money -= 1000;
        localStorage.setItem('money', money);
        document.getElementById('money').innerText = money;

        const newAvatar = document.createElement('img');
        newAvatar.src = 'sprites/avatar4.png';
        newAvatar.alt = 'avatar4';
        newAvatar.className = 'avatar';
        newAvatar.onclick = () => handleClick('avatar4');
        document.getElementById('avatars-container').appendChild(newAvatar);

        counters['avatar4'] = 0;
        const newCounter = document.createElement('p');
        newCounter.innerHTML = `Аватар 4: <span id="counter-avatar4">0</span>`;
        document.querySelector('.container').appendChild(newCounter);
        localStorage.setItem('avatar4Counter', 0);
    } else {
        alert('Недостаточно денег');
    }
}

function buyUpgrade() {
    const upgradeCost = (clickValue - 1) * 1000 + 1000;
    if (money >= upgradeCost) {
        money -= upgradeCost;
        localStorage.setItem('money', money);
        document.getElementById('money').innerText = money;
        clickValue++;
        localStorage.setItem('clickValue', clickValue);
        alert(`Улучшение куплено! Теперь за каждый клик вы получаете ${clickValue} кликов.`);
    } else {
        alert('Недостаточно денег');
    }
}
