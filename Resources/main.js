//Typing Audio Cue
let keyboardQue = document.getElementById('typeCue');
//Enter Key Audio Cue
let keyEnterQue = document.getElementById('enterCue');
//Light Mode Status
let lightMode = false;
//Prospect Text
let prospect = 'PROSPECT';
let textChar = 0;

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

window.onload = resizeItems()

function resizeItems(){
  let items = document.getElementsByClassName("item");
  sw = screen.width / 500;
  for (elem in items){
    items.item(elem).style.maxWidth = `${100/Math.floor(sw)}%`;
    items.item(elem).style.height = (items.item(elem).offsetWidth);
  }
}
