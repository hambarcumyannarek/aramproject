
const buyBtn = document.querySelector('.buyBtn');
const shopping = document.getElementById('shopping');
const closeShoppingMenu = shopping.querySelector('.closeShoppingMenu');
const shoppingCardsContainer = document.querySelector('#shopping .cards')
const totalCount = document.querySelector('#shopping .allCount');
const totalPrice = document.querySelector('#shopping .allGin');

buyBtn.addEventListener('click', () => {
    shopping.classList.add('active');
    fetch('/buy').then(info => info.json()).then(product => {
        shoppingCardsContainer.innerHTML = '';
        let sum = 0;
        let sum2 = 0;
        product.forEach(card => {
            sum += card.buyCount;
            sum2 += +card.price * card.buyCount;
            shoppingCardsContainer.innerHTML += `
            <div class="card" id="${card.id}">
                <div class="imgBox">
                    <div class="img">
                        <img src="${card.images[0]}" alt="pr">
                    </div>
                </div>
                <div class="content">
                    <div class="cardTitle">
                        <h3>${card.name}</h3>
                        <p>${card.type}</p>
                    </div>
                    <div class="calculation">
                        <div class="pluseMinuseBtns">
                            <button class="minuse"><i class="fa-solid fa-minus"></i></button>
                            <button class="count">${card.buyCount}</button>
                            <button class="pluse"><i class="fa-solid fa-plus"></i></button>
                        </div>
                        <p class="price">$<span class="gin" data-gin="${card.price}">${+card.price * card.buyCount}</span></p>
                    </div>
                    <div class="buttons">
                        <button class="deleteProductBtn"><i class="fa-solid fa-trash"></i></button>
                        <button>Show</button>
                    </div>
                </div>
            </div>`
        })
        update();
        totalCount.innerText = sum;
        totalPrice.innerText = sum2;
        shoppingCardsContainer.querySelectorAll('.card').forEach(card => {
            card.style.display = 'grid'
        })
    })

    document.body.style.overflowY = 'hidden';
})

closeShoppingMenu.addEventListener('click', () => {
    shopping.classList.remove('active');
    shoppingCardsContainer.innerHTML = '';
    document.body.style.overflowY = 'auto';
})

shopping.addEventListener('click', (evn) => {
    if(evn.target.getAttribute('id') === 'shopping') {
        shopping.classList.remove('active');
        document.body.style.overflowY = 'auto';
        shoppingCardsContainer.innerHTML = '';
    }
})

const sliderCards = document.querySelectorAll('.slider .card');
sliderCards.forEach(card => {
    const buyBtn = card.querySelector('.buyBtn');
    buyBtn.addEventListener('click', () => {
        buyBtn.style.pointerEvents = 'none';
        fetch(`/buy/${card.getAttribute('id')}`, {
            method: "POST"
        }).then(() => {
            buyBtn.style.pointerEvents = 'painted';
        })
    })
})

function update() {
    const shoppingCards = document.querySelectorAll('#shopping .cards .card');
    
    shoppingCards.forEach(card => {
        const pluse = card.querySelector('.pluse');
        const count = card.querySelector('.count');
        const minuse = card.querySelector('.minuse');
        const price = card.querySelector('.gin');
        const deleteProductBtn = card.querySelector('.deleteProductBtn');
        let limit = 9;
    
        deleteProductBtn.addEventListener('click', () => {
            card.style.display = 'none';
            totalCount.innerText = +totalCount.innerText - (+count.innerText);
            totalPrice.innerText = +totalPrice.innerText - (+count.innerText * (+price.getAttribute('data-gin')));
            fetch(`/buy/${card.getAttribute('id')}`, {
                method: 'delete'
           })
        })
        pluse.addEventListener('click', () => {
            let countNum = +count.innerText;
            if(countNum < limit) {
               count.innerText = countNum + 1;
               price.innerText = +count.innerText * (+price.getAttribute('data-gin'));
               totalCount.innerText = +totalCount.innerText + 1;
               totalPrice.innerText = +totalPrice.innerText + (+price.getAttribute('data-gin')); 
               fetch(`/buy/${card.getAttribute('id')}`, {
                    method: 'put',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({newCount: +count.innerText})
               })
               return;
            } 
            alert(`pahestum arka e ${limit}`)
        })
    
        minuse.addEventListener('click', () => {
            if(+count.innerText > 1) {
                count.innerText = (+count.innerText) - 1;
                price.innerText = (+count.innerText) * (+price.getAttribute('data-gin'));
                totalCount.innerText = +totalCount.innerText - 1;
                totalPrice.innerText = +totalPrice.innerText - (+price.getAttribute('data-gin'))
                fetch(`/buy/${card.getAttribute('id')}`, {
                    method: 'put',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({newCount: +count.innerText})
               })
                return;
              } 
              alert(`Menq Chenq Karox Araqel 0 apranq`)
        })
    })
}
update();