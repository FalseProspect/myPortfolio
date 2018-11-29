//Typing Audio Cue
let keyboardQue = document.getElementById('typeCue')
//Enter Key Audio Cue
let keyEnterQue = document.getElementById('enterCue')
//Light Mode Status
let lightMode = false
//Text
let text = 'PROSPECT'
let textChar = 0

document.body.focus();

function typingSequence(){
    if(textChar === text.length) return setTimeout(()=>{textAppear()},270)
    setTimeout(()=>{
    document.getElementById('prospectText').innerText += text[textChar]
    textChar++
    typingSequence();
    }, 150)
}

//Enter Sequence
function textAppear(){
    keyEnterQue.play()
    document.getElementById('falseText').style.visibility = "visible"
    document.getElementById('quill').style.visibility = "visible"
}

//Typing Sequence
setTimeout(()=>{
    typingSequence();
    keyboardQue.play()
}, 1000)

let check = document.getElementById('themeSlider')

check.addEventListener('click',()=>{
    toggleLightMode()
})

//Light mode toggle
function toggleLightMode(){
    lightMode = !lightMode
    check.checked = lightMode ? true : false;
    document.documentElement.style.setProperty('--backColor', lightMode ? '#eee' : '#0a0a0a')
    document.documentElement.style.setProperty('--textColor', lightMode ? '#222' : '#eee')
    document.body.style.setProperty('background', lightMode ? '#eee' : 'linear-gradient(132deg, #000, #121212)')
    let cue = document.createElement('audio')
    cue.setAttribute('src','Resources/Media/EnterKey.WAV');
    document.body.appendChild(cue);
    cue.play()
    cue.onended = ()=>{cue.parentNode.removeChild(cue)}
}

const theme = function(mainColor){
    this.mainColor = mainColor;
};

let themeIndex = 0;

const themes = [
    new theme('#eee'),
    new theme('#FEC601'),
    new theme('#E84855'),
    new theme('#FFFD82'),
    new theme('#1B2CC1')
]

document.getElementById('accentColorPicker').addEventListener('click',()=>{
    themeIndex !== themes.length - 1 ? themeIndex ++ : themeIndex = 0
    document.documentElement.style.setProperty('--accentColor', themes[themeIndex].mainColor)
})


let mainLink = document.getElementById('mainLink')
let resumeLink = document.getElementById('resumeLink')
let contactLink = document.getElementById('contactLink')

mainLink.addEventListener('mouseover',()=>{mainLink.innerHTML = mainLink.innerHTML + '<span class="blinking-cursor">_</span>'})
mainLink.addEventListener('mouseout',()=>{mainLink.innerHTML = 'Main'})

resumeLink.addEventListener('mouseover',()=>{resumeLink.innerHTML = resumeLink.innerHTML + '<span class="blinking-cursor">_</span>'})
resumeLink.addEventListener('mouseout',()=>{resumeLink.innerHTML = 'Resume'})

contactLink.addEventListener('mouseover',()=>{contactLink.innerHTML = contactLink.innerHTML + '<span class="blinking-cursor">_</span>'})
contactLink.addEventListener('mouseout',()=>{contactLink.innerHTML = 'Contact'})



document.body.addEventListener('keydown',(e)=>{
    // console.log(e.key)
    if(e.key === "l")toggleLightMode()
})

function addArrowHandlers(elem){
    elem.addEventListener('click',(e)=>{
        sliderDirection(e.target.parentNode,elem.getAttribute('data-direction'))
})}

function setArrowOpacity(arrow){
    let index = parseInt(arrow.parentNode.getAttribute('data-slideNum'))
    let direction = arrow.getAttribute('data-direction')

    switch (direction){
        case 'next':
            arrow.style.setProperty('opacity', index !== 2 ? '1' : '0');
            arrow.style.opacity;
            break;
        case 'back':
            arrow.style.setProperty('opacity', index !== 0 ? '1' : '0');
            break;
    }
}


function updateArrowVisibility(){[].forEach.call(arrows, setArrowOpacity);}

let arrows = document.getElementsByClassName('arrow');
[].forEach.call(arrows, addArrowHandlers);
updateArrowVisibility();

Math.clamp = function(num, min, max) {return num <= min ? min : num >= max ? max : num;}

function sliderDirection(elem,direction){
    if(!direction){return}
    direction = direction === "next" ? 1 : -1
    let slideArr = [...elem.getElementsByClassName('slide')]
    let lastIndex = parseInt(elem.getAttribute('data-slideNum'))
    let newIndex = Math.clamp((lastIndex + direction),0,2)
    elem.setAttribute('data-slideNum',newIndex)
    
    function changeSlide(last,next){
        slideArr[last].style.setProperty('transition', 'ease 1s transform, ease .3s opacity')
        slideArr[last].style.setProperty('transform', direction === 1 ? 'translateX(-110%)' : 'translateX(110%)')
        slideArr[last].style.setProperty('opacity', '0')
        
        slideArr[next].style.setProperty('transition', 'ease 1s transform, ease .3s opacity')
        slideArr[next].style.setProperty('transform', 'translateX(0)')
        slideArr[next].style.setProperty('opacity', '1')
    }

    changeSlide(lastIndex,newIndex)
    updateArrowVisibility();
}

let contactsOpen = false;
document.getElementById('contactLink').addEventListener('click', ()=>{
    showContacts()
});

function showContacts(){
    contactsOpen = !contactsOpen
    console.log(contactsOpen)
    let contacts = document.getElementById('contacts')
    contacts.style.setProperty('transform', contactsOpen ? 'translateX(0px)' : 'translateX(110px)')
}
 