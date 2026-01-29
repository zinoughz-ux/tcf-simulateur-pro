/******** TIMER ********/
let time = 3600;
setInterval(() => {
  const m = String(Math.floor(time/60)).padStart(2,"0");
  const s = String(time%60).padStart(2,"0");
  const t = document.getElementById("timer");
  if(t) t.innerText = `${m}:${s}`;
  if(time>0) time--;
},1000);

/******** AUTO SAVE ********/
["task1","task2","task3"].forEach(id=>{
  const el=document.getElementById(id);
  if(el){
    el.value=localStorage.getItem(id)||"";
    el.addEventListener("input",()=>localStorage.setItem(id,el.value));
  }
});

/******** WORD COUNT ********/
function countWords(el,counterId,min,max){
  const n=el.value.trim().split(/\s+/).filter(Boolean).length;
  const c=document.getElementById(counterId);
  c.textContent=n+" mots";
  c.className="counter "+(n>=min&&n<=max?"green":"red");
}

/******** INSERT CHAR ********/
function insertChar(char){
  const t=document.activeElement;
  if(t&&t.tagName==="TEXTAREA"){
    const start=t.selectionStart;
    const end=t.selectionEnd;
    t.value=t.value.slice(0,start)+char+t.value.slice(end);
    t.selectionStart=t.selectionEnd=start+1;
    t.dispatchEvent(new Event("input"));
  }
}

/******** CHATGPT ********/
function corrigerAvecChatGPT(){
  const s1=document.getElementById("subject1")?.value||"❌ Sujet non renseigné";
  const s2=document.getElementById("subject2")?.value||"❌ Sujet non renseigné";
  const s3=document.getElementById("subject3")?.value||"❌ Sujet non renseigné";

  const t1=localStorage.getItem("task1")||"❌ Tâche 1 vide";
  const t2=localStorage.getItem("task2")||"❌ Tâche 2 vide";
  const t3=localStorage.getItem("task3")||"❌ Tâche 3 vide";

const prompt=`
Tu es examinateur officiel du TCF Canada.
Corrige selon les critères officiels :
- respect de la consigne
- cohérence et organisation
- richesse lexicale
- grammaire et syntaxe

Pour chaque tâche :
- donne une note sur 20
- donne un niveau estimé (A2 / B1 / B2 / C1 / C2)
- donne 3 conseils précis

À la fin :
- donne une note globale sur 60
- donne le niveau global TCF Canada

====================
TÂCHE 1
====================
Sujet :
${s1}

Texte :
${t1}

====================
TÂCHE 2
====================
Sujet :
${s2}

Texte :
${t2}

====================
TÂCHE 3
====================
Sujet :
${s3}

Texte :
${t3}
`;

navigator.clipboard.writeText(prompt).then(()=>{
  chrome.runtime.sendMessage({action:"OPEN_CHATGPT"});
});
}

