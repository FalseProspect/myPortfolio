//Typing Audio Cue
let keyboardQue = document.getElementById('typeCue');
//Enter Key Audio Cue
let keyEnterQue = document.getElementById('enterCue');
//Light Mode Status
let lightMode = false;
//Prospect Text
let prospect = 'PROSPECT';
let textChar = 0;

//Display Section
let display = document.getElementById('display');
let mediaControls = document.getElementById('mediaControls');
let mediaSlide = 0;

class Display {
  
  open(height){
    height = height ? `${height}px` : '500vh';
    console.log(height);
    display.style.visibility = 'visible';
    display.style.opacity = '1';
    display.style.maxHeight = height;
  }

  close(){
    display.style.visibility = 'hidden';
    display.style.opacity = '0';
    display.style.maxHeight = '0px';
  }
}

let projectDisplay = new Display;


let projectMedia = ['Resources/Media/IntruderTitle1-1.png'];

//Projects
let projects = [
  {
    name:'myDay: Day Planner App',
    id: 'myDay',
    image:'Resources/Media/myDayMockup_T.png',
    color: '#4F54FF',
    infoShort: `The myDay: Day Planner App is a service designed allow yourself a way plan and structure to your day and sync across web connected devices.`,
    info: 
    `Use the myDay:Day Planner app to easily structure and time out your planned tasks of the day. <br>
    Enjoy a clean and easy to use interface that can be styled to your appeal. <br>
    Utilitze a native Light and Dark theme. <br>
    Synchronize your task across all your web accessable devices so you'll never lose productivity. <br><br>
    
    <b>Share</b>`
  },
  {
    name:'myTask: Tasklist App',
    id: 'myTask',
    image:'Resources/Media/myTaskMockup_T.png',
    color: '#F3A712',
    infoShort: `The myTask: Tasklist App is a todo list designed to sync across web connected devices.`,
    info:
    `Use myTask to quickly take note of tasks that need to be done.<br>
    Enjoy a clean and ease of use interface that can be personalized.<br>
    Utilitze a native Light and Dark theme<br>
    Synchronize your task across all your web accessable devices.<br><br>
    
    <b>Share</b>`
  },
  {
    name:'Bleep-Space (Android)',
    id: 'Bleep-Space',
    image:'Resources/Media/BleepSpaceMockup_T.png',
    color: '#ffe900',
    infoShort: `Bleep-Space is a retro themed arcade game.
    Captain, customize, and arm your ship.`,
    info: 
    `<b>DESCRIPTION:</b><br>
    Be the captain in command of your own ship!<br>
    Navigate the asteroid field of hazards!<br>
    Earn currency to customize and upgrade your ship!<br>
    Defeat the anomalies and bosses of the galaxy!<br>
    CAPTAIN YOUR GALACTIC SHIP TO SAFETY<br><br>
    
    <b>FEATURES:</b><br>
    - Practice Mode<br><br>
    
    - Ship customization<br><br>
    
    - Global Leaderboard<br><br>
    
    - Control settings<br><br>
    
    - Portrait mode<br><br>
    
    <b>Share</b>`
  },
  {
    name:'Intruder (Windows PC)',
    id: 'Intruder',
    image:'Resources/Media/IntruderTitle1-1.png',
    color: '#0AB1FF',
    infoShort: `Intuder is a sealth game about infiltrating and stealing data from a data security office`,
    info:
    `DESCRIPTION:<br>
    "Look at you, Hacker."<br>
    
    When you, the player, are blackmailed,<br>
    
    you're tasked with entering a data security office to steal information.<br>
    
    However you face one adversary. A surreal blue man that guards the office space.<br>
    
    Hack all the relevant data and get out alive.<br><br>
    
    <b>Share</b>`
  },
  {
    name:'Bad Battle (Windows PC)',
    id: 'Bad-Battle',
    image:'Resources/Media/BadBattleTitle1-1.png',
    color: '#3FFF2B',
    infoShort: `Bad-Battle is a challenging First-Person gladiator shooter`,
    info:
    `<b>DESCRIPTION:</b><br>
    Bad Battle is a challenging, fast-paced, high chaos, first person shooter that has mixes of old school arcade style and 90's PC shooters on a modern game engine that has the player compete against waves of robotic figures who's sole purpose is to destroy and stop the player from winning.
    
    You (The Player) must complete all waves of intense opposition to escape the BadBattle arena.<br>
    
    Armed with the powerful weapons provided, your agile abilities, and skill, only you determine how your fate goes in the arena.<br><br>
    
    <b>FEATURES:</b><br>
    - High Energy Arena Atmosphere<br><br>
    
    - Fast Pace, High Chaos, Intense gameplay<br><br>
    
    - Shifting and Dynamic arena environment<br><br>
    
    - 8 Unique and intresting enemies along with unique environmental settings, spawns, and hazards<br><br>
    
    - 8 Unique and Powerful weapons for the player's defense<br><br>
    
    - 10 waves of challenging clashes<br><br>
    
    - Global Leaderboard<br><br>
    
    - Future arenas and expansion to come<br><br>
    
    <b>Share</b>`
  }
]

// Type Sequnce Start
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

//Typing Sequence Start Delay
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

//Create and Render Project Items
function createItems(){
  let container = document.getElementById('container');

  projects.forEach((proj)=>{
    let projectName = proj.id;
    let item = makeElement('div','item');
    item.id = projectName;

    let overlay = makeElement('div','itemOverlay')
    overlay.style.background = proj.color;

    let name = makeElement('h1','itemName');
    name.innerText = proj.name;
    let description = makeElement('h2','itemDescription');
    description.innerText = proj.infoShort;
    overlay.appendChild(name);
    overlay.appendChild(description);
    
    let image = makeElement('img')

    image.setAttribute('src',proj.image);
    item.appendChild(overlay);
    item.appendChild(image);
    container.appendChild(item);
    item.addEventListener('click',()=>{
      // history.pushState({proj}, `Project: ${projectName}`,`./${projectName}`);
      renderDisplay(proj);
    });
  });
}

//Project Display Render
function renderDisplay(proj){
  let title = display.children.item(0).children.item(0);
  let info = display.children.item(0).children.item(1);
  let img = display.children.item(1).children.item(0);
  //Reset image slide
  mediaSlide = 0;

  //Scroll to Display
  window.scrollTo({top:30,behavior: "smooth"});

  //Fade-Out, Update Content, and Fade-In Content
  display.classList.remove('fadein');
  display.style.opacity='0';
  setTimeout(()=>{
    display.classList.add('fadein');
    display.style.opacity='1';
    
    //Update Inner Text
    title.innerHTML = proj.name;
    info.innerHTML = proj.info;
    img.setAttribute('src', proj.image);

    //Update the Media Contols with Project Color Accent
    document.documentElement.style.setProperty('--projectColor', proj.color);

    //Display is open
    projectDisplay.open();

  },700);

}

//Display Image Controls
mediaControls.addEventListener('click', (c)=>{
  c.target.id === 'controlRight' ? mediaSlide++ : mediaSlide-- ;

})

history.scrollRestoration = 'manual';

document.addEventListener('keydown', (k)=>{
  if(k.key === 'o') projectDisplay.open(1000);
  else if(k.key === 'c') projectDisplay.close();
})

//Not sure how to use PopState with github pages because of routing

// window.addEventListener('popstate', e=> {
//   if(e.state === null) return; projectDisplay.close();
//   renderDisplay(e.state.proj);
//   window.scrollTo({top:30,behavior: "smooth"});
// })

//Create Items
createItems()