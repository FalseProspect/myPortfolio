//Typing Audio Cue
let keyboardQue = document.getElementById('typeCue');
//Enter Key Audio Cue
let keyEnterQue = document.getElementById('enterCue');
//Light Mode Status
let hasFocus = false;
//Prospect Text
let prospect = 'PROSPECT';
let textChar = 0;

//Focused object
let targetObj;

//Display Section
let display = document.getElementById('display');
let mediaControls = document.getElementById('mediaControls');
let mediaSlide = 0;

class Display {
  
  open(height){
    height = height ? `${height}px` : '500vh';
    display.style.visibility = 'visible';
    display.style.opacity = '1';
    display.style.maxHeight = height;
  }

  close(){
    display.style.visibility = 'hidden';
    display.style.opacity = '0';
    display.style.maxHeight = '0px';
  }

  render(proj){
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
      img.setAttribute('src', proj.media[0]);

      document.getElementById('mediaControls').style.visibility = proj.media[1] ? 'visible' : 'hidden';
      //Update the Media Contols with Project Color Accent
      document.documentElement.style.setProperty('--projectColor', proj.color);
      //Display is open
      this.open();
    },700);
  }

  renderImg(){
    let img = display.children.item(1).children.item(0);
    img.setAttribute('src', targetObj.media[mediaSlide]);
  }

}

let infoDisplay = new Display;

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
  document.getElementById('container').style.opacity = "1";
}

//Typing Sequence Start Delay


function loadInto(){
  setTimeout(()=>{
    typingSequence();
    keyboardQue.play();
  }, 1000);
}


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
    let iframe = makeElement ('div');

    image.setAttribute('src',proj.media[0]);
    item.appendChild(overlay);
    item.appendChild(image);
    container.appendChild(item);
    item.addEventListener('click',()=>{
      targetObj = proj;
      // history.pushState({proj}, `Project: ${projectName}`,`./${projectName}`);
      infoDisplay.render(proj);
    });
  });
}

//Display Image Controls
mediaControls.addEventListener('click', (c)=>{
  if(c.target.id === 'controlRight'){
    mediaSlide = (mediaSlide + 1 < targetObj.media.length ? mediaSlide + 1 : 0);
  } 
  if(c.target.id === 'controlLeft'){
    mediaSlide = (mediaSlide - 1 >= 0 ? mediaSlide - 1 : targetObj.media.length - 1);
  }
  infoDisplay.renderImg();
  return 0;
})

document.getElementById('about').addEventListener('click',()=>{
  targetObj = about;
  infoDisplay.render(targetObj);
})

document.getElementById('projects').addEventListener('click',()=>{
  targetObj = undefined;
  infoDisplay.close();
})



//Not sure how to use PopState with github pages because of routing
history.scrollRestoration = 'manual';

// window.addEventListener('popstate', e=> {
//   if(e.state === null) return; infoDisplay.close();
//   render(e.state.proj);
//   window.scrollTo({top:30,behavior: "smooth"});
// })

//Create Items
createItems();

loadInto();