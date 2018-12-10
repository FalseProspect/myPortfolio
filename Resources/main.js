//Typing Audio Cue
let keyboardQue = document.getElementById('typeCue');
//Enter Key Audio Cue
let keyEnterQue = document.getElementById('enterCue');
//Light Mode Status
let lightMode = false;
//Prospect Text
let prospect = 'PROSPECT';
let textChar = 0;
//Projects
let projects = [
  {name:'myDay', image:'Resources/Media/myDayTitleLogo1080.png', color: '#4F54FF'},
  {name:'myTask', image:'Resources/Media/myTaskTitleLogo1080.png', color: '#F3A712'},
  {name:'Bleep-Space', image:'Resources/Media/BSTitle1to1.png', color: 'var(--accentColor)'},
  {name:'Intruder', image:'Resources/Media/IntruderTitle1-1.png', color: 'var(--accentColor)'},
  {name:'Bad Battle', image:'Resources/Media/BadBattleTitle1-1.png', color: 'var(--accentColor)'}
]
//Display Section
let display = document.getElementById('display');

document.body.focus();

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
setTimeout(()=>{
  typingSequence();
  keyboardQue.play();
}, 1000);

window.addEventListener('resize', ()=>{
  resizeItems();
})



function makeElement(elemTag, classname, id){
  let elem = document.createElement(elemTag);
  classname ? elem.setAttribute('class',classname) : 0;
  id ? elem.id = id : 0; 
  return elem;
}

function createItems(){
  let container = document.getElementById('container')


  projects.forEach((proj)=>{
    let item = makeElement('div','item');

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
  })

  
}

createItems()

window.onload = resizeItems()

function resizeItems(){
  let items = document.getElementsByClassName("item");
  sw = screen.width / 500;
  for (elem in items){
    items.item(elem).style.maxWidth = `${100/Math.floor(sw)}%`;
    items.item(elem).style.height = (items.item(elem).offsetWidth);
  }
}

function sizeDisplay(size){
  display.style.height = size;
}

document.body.addEventListener('keydown',(k)=>{
  if (k.key === 'o') sizeDisplay('100vh');
  else if (k.key === 'c') sizeDisplay('0');
})