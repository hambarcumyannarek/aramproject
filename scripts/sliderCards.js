"use strict";

function recursia(parentName, element) {
    if(element.className.search(parentName) !== -1) {
        return element;
    }
    return recursia(parentName, element.parentElement)
}

const bodyWidth =  document.body.offsetWidth;

window.addEventListener('resize', (evn) => {
    console.log(evn.target.innerWidth);
    let width = evn.target.innerWidth;
    switch(width) {
        case width < 1350 && width > 1150 :  restart(); break;
        case width < 1150 && width > 750 :  restart(); break;
        case width < 750 && width > 550 :  restart(); break;
        case width < 1350 && width > 1150 :  restart(); break;
        case width < 550: restart(); break;
        default: restart();
    }
})

function restart() {
        setTimeout(() => {
            sliderContAll.forEach(cont => cont.setAttribute('data-value', 0))
            update();
        }, 1000)
}


const imagesCont = document.querySelectorAll('.cards');

const leftRightBtn = document.querySelectorAll('.lRBtn');

imagesCont.forEach((imgCont) => {
    imgCont.querySelectorAll('img').forEach((img) => {
        img.addEventListener('mousedown', function(evn) {
            evn.preventDefault()
        })})
})

function starterDrow(elm) {
    let thisCont = recursia(elm);
    let circle = thisCont.querySelector('.circle');
    circle.innerHTML = '';
    let cards = thisCont.querySelectorAll('.cards .card')
    let circuleArr = [];
    console.log(Math.floor((thisCont.offsetWidth / thisCont.querySelector('.card').offsetWidth)))
    for(let i = 0; i < cards.length-Math.floor((thisCont.offsetWidth / thisCont.querySelector('.card').offsetWidth)); i++) {
        if(i === 0) {  
            circuleArr.push(`<div class="bold circleBtn"></div>`)
        }
        circuleArr.push(`<div class="empty circleBtn"></div>`)
    }

    circle.innerHTML = circuleArr.join('');
}  


leftRightBtn.forEach((btn) => {
    btn.addEventListener('click', function(elm) {
        clcikBtn(btn);
        curcleChange(btn);
        ditablishLR(btn);
    })
})

function recursia(elm) {
    if(elm.className.search('sliderContainer') !== -1) {
        return elm;
    }
    return recursia(elm.parentElement)
}

function clcikBtn(elm) {
    const thisCont = recursia(elm);
    let thisIndex = +recursia(elm).getAttribute('data-value');
    
    if(elm.className.search('left') !== -1) {
        thisIndex--;
        thisCont.setAttribute('data-value', thisIndex);
    } else {
        thisIndex++;
        thisCont.setAttribute('data-value', thisIndex);
    }
    
    thisCont.querySelector('.cards').style.transform = `translateX(${(-thisIndex * thisCont.querySelector('.card').offsetWidth) - thisIndex * 15}px)`
}


let sliderContAll = document.querySelectorAll('.sliderContainer');


function update() {
    sliderContAll.forEach(cont => {
        cont.querySelector('.cards').style.transform = `translateX(0px)`;
        starterDrow(cont);
        ditablishLR(cont);
        const circleBtn = cont.querySelectorAll('.circle .circleBtn');
    
        circleBtn.forEach((val, i) => {
            val.addEventListener('click', function(evn) {
                const thisCont = recursia(val);
                thisCont.setAttribute('data-value', i);
                // let imgIndex = +thisCont.getAttribute('data-value');
                thisCont.querySelector('.cards').style.transform = `translateX(${(-i * thisCont.querySelector('.card').offsetWidth) - i * 15}px)`;
                curcleChange(thisCont);
                ditablishLR(thisCont);
            })
        })
    })
}

update();
function curcleChange(elm) {
    const thisCont = recursia(elm);
    let thisIndex = +recursia(elm).getAttribute('data-value');
    thisCont.querySelectorAll('.circleBtn').forEach((val, i) => {
        if(thisIndex !== i) {
            val.classList.remove('bold');
            val.classList.add('empty');
        } else {
            val.classList.add('bold');
            val.classList.remove('empty'); 
        }
    })
}


function ditablishLR(getCont) {
    const cont = recursia(getCont);
    const thisContIndex = +cont.getAttribute('data-value');
    const leftRightBtn = cont.querySelectorAll('.lRBtn');


    if(thisContIndex === 0) {
        cont.querySelector('.left').setAttribute('disabled', '');
        cont.querySelector('.right').removeAttribute('disabled');

    } else if(thisContIndex === cont.querySelectorAll('.circle .circleBtn').length-1) {
        cont.querySelector('.right').setAttribute('disabled', '');
        cont.querySelector('.left').removeAttribute('disabled');

    } else {
        leftRightBtn.forEach((btnn) => {
            btnn.removeAttribute('disabled');
        });
    }
}



// let trueScroll;
// let myFunc = undefined;
// sliderContAll.forEach(cont => {
//     cont.addEventListener('mousedown', function(evn) {
//         cont.querySelector('.bigImg').style.cursor = 'grabbing';
//         let scrollNum = evn.clientX;
//         let lastNum = scrollNum;
//         let lastX = scrollNum;
//         let fr = 1;
//         const imagesCont = cont.querySelector('.bigImg');
//         myFunc = function(evn) {
//             if((imgIndex !== 0 || fr > 1) && evn.clientX > lastNum) {
//                 fr += lastX-evn.clientX;
//                 imagesCont.style.transform = `translateX(calc(${(-imgIndex * 100)}% + ${(-fr)}px))`;   
//             } else if((imgIndex !== cont.querySelectorAll('.bigImg img').length-1 || fr < 0) && evn.clientX < lastNum) {
//                 fr += lastX-evn.clientX;
//                 imagesCont.style.transform = `translateX(calc(${(-imgIndex * 100)}% + ${-fr}px))`; 
//             }
        
//             lastX = evn.clientX;
        
//             if(fr > imagesCont.offsetWidth/2+imagesCont.offsetWidth || fr < -(imagesCont.offsetWidth/2+imagesCont.offsetWidth)) {
//                 cont.parentElement.removeEventListener('mousemove', myFunc)
//             }
        
//             if(fr > imagesCont.offsetWidth/5) {
//                 trueScroll = 'goRight';
//             } else if(fr < -imagesCont.offsetWidth/5){
//                 trueScroll = 'goLeft';
//             } else {
//                 trueScroll = 'stop';
//             }
//         };
//         let imgIndex = +recursia(cont).getAttribute('data-value');
//         function GetParentName(elm) {
//             if(elm.className.search('sliderrrr') !== -1) {
//                 return elm;
//             }
//             return GetParentName(elm.parentElement)
//         }
//         GetParentName(cont).addEventListener('mousemove', myFunc) // this is a .slider 

//     })

// })


// document.querySelectorAll('.slider').forEach(slider => {
//     slider.addEventListener('mouseup', function(evn) {    
//         slider.querySelector('.bigImg').style.cursor = 'grab';
//         let cont = slider.querySelector('.sliderContainer');
//         let thisIndex = cont.getAttribute('data-value');
//         slider.removeEventListener('mousemove', myFunc);

//         if(trueScroll === 'goRight') {
//             trueScroll = "stop"
//             thisIndex++;
//             cont.setAttribute('data-value', thisIndex);
//             drowCircule(cont);
//             ditablishLR(cont);
//         } else if(trueScroll === 'goLeft') {
//             trueScroll = "stop"
//             thisIndex--;
//             cont.setAttribute('data-value', thisIndex);
//             drowCircule(cont);
//             ditablishLR(cont);
//         } else {
//             thisIndex = thisIndex;
//         }
        
//         cont.querySelector('.bigImg').style.transform = `translateX(${-thisIndex * 100}%)`;
        
//     })
    
// })
