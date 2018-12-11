//Typing Audio Cue
let keyboardQue = document.getElementById('typeCue');
//Enter Key Audio Cue
let keyEnterQue = document.getElementById('enterCue');
//Light Mode Status
let lightMode = false;
//Prospect Text
let prospect = 'PROSPECT';
let textChar = 0;

let mediaSlide = 0;

let projectMedia = ['Resources/Media/IntruderTitle1-1.png'];

//Projects
let projects = [
  {
    name:'myDay',
    image:'Resources/Media/myDayTitleLogo1080.png',
    color: '#4F54FF',
    info: 
    `Use the myDay:Day Planner app to easily structure and time out your planned tasks of the day. <br>
    Enjoy a clean and easy to use interface that can be styled to your appeal. <br>
    Utilitze a native Light and Dark theme. <br>
    Synchronize your task across all your web accessable devices so you'll never lose productivity. <br><br>
    
    <b>Share<b>`
  },
  {
    name:'myTask',
    image:'Resources/Media/myTaskTitleLogo1080.png',
    color: '#F3A712',
    info: 'This is the description for myTask'
  },
  {
    name:'Bleep-Space',
    image:'Resources/Media/BSTitle1to1.png',
    color: 'var(--accentColor)',
    info: 'This is the description for Bleep-Space'
  },
  {
    name:'Intruder',
    image:'Resources/Media/IntruderTitle1-1.png',
    color: 'var(--accentColor)',
    info: 'This is the description for Intruder'
  },
  {
    name:'Bad Battle',
    image:'Resources/Media/BadBattleTitle1-1.png',
    color: 'var(--accentColor)',
    info: 'This is the description for Bad Battle'
  }
]

//Display Section
let display = document.getElementById('display');

// window.focus();

function typingSequence(){
  if(textChar === prospect.length) return setTimeout(()=>{textAppear()},270);
  setTimeout(()=>{
    document.getElementById('prospectText').innerText += prospect[textChar];
    textChar++;
    typingSequence();
  }, 150);
}

//Enter Sequence
function textAppear(){
  keyEnterQue.play();
  document.getElementById('falseText').style.visibility = "visible";
  document.getElementById('quill').style.visibility = "visible";
  document.getElementById('headerLinks').style.opacity = "1";
}

//Typing Sequence
document.onfocus = setTimeout(()=>{
  typingSequence();
  keyboardQue.play();
}, 1000);


//Make element helper
function makeElement(elemTag, classname, id){
  let elem = document.createElement(elemTag);
  classname ? elem.setAttribute('class',classname) : 0;
  id ? elem.id = id : 0; 
  return elem;
}

//Project Items Render
function createItems(){
  let container = document.getElementById('container');

  projects.forEach((proj)=>{
    let item = makeElement('div','item');
    item.id = proj.name;

    let overlay = makeElement('div','itemOverlay')
    overlay.style.background = proj.color;

    let name = makeElement('h1','itemName');
    name.innerText = "This is name";
    let description = makeElement('h2','itemDescription');
    description.innerText = "This is description";
    overlay.appendChild(name);
    overlay.appendChild(description);
    
    let image = makeElement('img')

    image.setAttribute('src',proj.image);
    item.appendChild(overlay);
    item.appendChild(image);
    container.appendChild(item);
    item.addEventListener('click',()=>{
      console.log('clicked', item.id);
      sizeDisplay();
      updateDisplay(proj);
    });
  })

  
}

createItems()

function sizeDisplay(){
  display.style.opacity = '1';
  display.style.height = 'auto';
}

function updateDisplay(proj){
  let title = display.children.item(0).children.item(0);
  let info = display.children.item(0).children.item(1);
  let img = display.children.item(1).children.item(0);
  //Reset image slide
  mediaSlide = 0;

  window.scrollTo(0,30);

  display.classList.remove('fadein');
  display.style.opacity='0';
  setTimeout(()=>{
    display.classList.add('fadein');
    display.style.opacity='1';
    
    //Update Inner Text
    title.innerHTML = proj.name;
    info.innerHTML = proj.info;
    img.setAttribute('src', proj.image);
  },700);
}

document.getElementById('mediaControls').addEventListener('click', (c)=>{
  c.target.id === 'controlRight' ? mediaSlide++ : mediaSlide-- ;
  
  console.log(c);
  // console.log(mediaSlide);
})

document.body.addEventListener('keydown',(k)=>{
  if (k.key === 'o') sizeDisplay('100vh');
  else if (k.key === 'c') sizeDisplay('0');
})