const typingText = document.querySelector('.typing-text p')
const input = document.querySelector('.wrapper .input-field')
const time = document.querySelector('.time span b')
const mistakes = document.querySelector('.mistake span')
const wpm = document.querySelector('.wpm span')
const cmp = document.querySelector('.cpm span')
const btn = document.querySelector('button');


let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;


function loadParagraph() {
    const paragraph = [" Avoid daydreaming about the years to come.", " You are enough you just have to believe in yourself.", "Its never too late to start never too late to make things better.", "People will always want you to do something they couldn't do.", "Taking advice is good but just keep in mind what you want to do.", "Work hard your god will keep track of it.", "Do good and something good will happen to you.", "Loving someone is your choice but loving you back is their choice.", "You can't have everyone aprriciate you so instead appreciate yourself for every little thing that you do.", "If you won't sacrifice for what you want, what you want will become the sacrifice."];

    const randomIndex = Math.floor(Math.random() * paragraph.length);
    typingText.innerHTML = '';
    for (const char of paragraph[randomIndex]) {
        console.log(char);
        typingText.innerHTML += `<span>${char}</span>`;
    }
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown', () => input.focus());
}

function initTyping() {
    const char = typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);
    if (charIndex < char.length && timeLeft > 0) {

        if (!isTyping) {
            timer = setInterval(initTime, 1000);
            isTyping = true;
        }


        if (char[charIndex].innerHTML === typedChar) {
            char[charIndex].classList.add('correct');
            console.log("correct");
        }
        else {
            mistake++;
            char[charIndex].classList.add('incorrect');
            console.log("incorrect");
        }
        charIndex++;
        char[charIndex].classList.add('active');

        mistakes.innerText = mistake;
        cmp.innerText = charIndex - mistake;
    }
    else {
        clearInterval(timer);
        input.value = '';
    }


    }

function initTime() {
    if (timeLeft > 0) {
        timeLeft--;
        time.innerText = timeLeft;
        let wpmVal = Math.round(((charIndex - mistake)/5) /(maxTime - timeLeft)*60);
        wpm.innerText = wpmVal;

    } else {
        clearInterval(timer);
    }
}

function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText = timeLeft;
    input.value= '';
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    wpm.innerText = 0;
    cmp.innerText = 0;
    mistake.innerText= 0;
}



input.addEventListener("input", initTyping);
btn.addEventListener("click",reset);
loadParagraph();
