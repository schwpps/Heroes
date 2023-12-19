window.onload = function() {
    displayHeroes();
    deleteHero();
};


let storedHeroes = JSON.parse(localStorage.getItem("heroes"));
let heroes = [['Axe', 'Tank', 'Dota 2'], ['Crystal Maiden', 'Support', 'Dota 2']];
const heroesContainer = document.querySelector('.heroes__list');
const addHeroButton = document.querySelector('.heroes__add');


function displayHeroes()  {
    heroesContainer.innerHTML = '';

    if (storedHeroes != null) {
        heroes = storedHeroes;
    }

    heroes.forEach(hero => {
        let heroesBlock = document.createElement("li");
        heroesBlock.className = 'heroes__list-item grid';

        heroesBlock.innerHTML = `
            <h3 class="heroes__name">${hero[0]}</h3>
            <p class="heroes__info flex">
                <span>Класс:</span>
                ${hero[1]}
            </p>
            <p class="heroes__info flex">
                <span>Категория:</span>
                ${hero[2]}
            </p>
            <button type="button" class="heroes__delete hover">Удалить</button>
        `;
        heroesContainer.appendChild(heroesBlock);
    });

    deleteHero();
}


function deleteHero() {
    const deleteHeroButton = document.querySelectorAll('.heroes__delete');

    deleteHeroButton.forEach(button => {
        button.onclick = () => {
            console.log('1')
            let heroName = button.parentElement.querySelector('.heroes__name').innerHTML;
            let indexHero = heroes.findIndex(el => el[0] == heroName);

            heroes.splice(indexHero, 1);
            localStorage.clear();
            localStorage.setItem('heroes', JSON.stringify(heroes));
            displayHeroes();
        }
    });
}


function createNotification(reason) {
    let notification = document.createElement("div");
    notification.className = 'notifications__notification';

    notification.innerHTML = reason;
    document.querySelector('.notifications').appendChild(notification);

    setTimeout(() => notification.classList.add('active'), 100);
    setTimeout(() => notification.classList.remove('active'), 4000);
    setTimeout(() => notification.remove(), 4300);
}


function addHero() {
    const nameInput = document.getElementById("heroName");
    const classInput = document.getElementById("heroClass");
    const categoryLabelDota = document.getElementById("label-dota");
    const categoryLabelAnime = document.getElementById("label-anime");

    if (nameInput.value == '' || classInput.value == '' ||
        !categoryLabelDota.querySelector('input').checked && !categoryLabelAnime.querySelector('input').checked
    ) {
        createNotification('Введите данные о герое');
    } else {
        let category = '';

        if (categoryLabelDota.querySelector('input').checked) {
            categoryLabelDota.querySelector('input').checked = false;
            category = 'Dota 2';
        } else if (categoryLabelAnime.querySelector('input').checked) {
            categoryLabelAnime.querySelector('input').checked = false;
            category = 'Аниме';
        }

        let newHero = [nameInput.value, classInput.value, category];
        nameInput.value = '';
        classInput.value = '';
        heroes.push(newHero);
        localStorage.setItem('heroes', JSON.stringify(heroes));
    }
}


addHeroButton.onclick = () => {
    addHero();
    displayHeroes();
}


document.querySelector('.heroes__select-action').onclick = () => {
    document.querySelector('.heroes__select').classList.toggle('active');
}