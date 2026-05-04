/* HARSHITA GUPTA — FINAL PORTFOLIO JS */

/* PARTICLES */
function initParticles(){
  const c=document.getElementById('bg-c');if(!c)return;
  const x=c.getContext('2d');let W,H,pts=[];
  function resize(){W=c.width=innerWidth;H=c.height=innerHeight;}
  resize();window.addEventListener('resize',resize);
  for(let i=0;i<65;i++)pts.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.2+.3,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,a:Math.random()*.4+.1});
  function draw(){
    x.clearRect(0,0,W,H);
    pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;x.beginPath();x.arc(p.x,p.y,p.r,0,Math.PI*2);x.fillStyle=`rgba(0,229,255,${p.a*.28})`;x.fill();});
    for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const d=Math.hypot(pts[i].x-pts[j].x,pts[i].y-pts[j].y);if(d<110){x.beginPath();x.moveTo(pts[i].x,pts[i].y);x.lineTo(pts[j].x,pts[j].y);x.strokeStyle=`rgba(0,229,255,${(1-d/110)*.055})`;x.lineWidth=.5;x.stroke();}}
    requestAnimationFrame(draw);
  }
  draw();
}

/* CURSOR */
function initCursor(){
  const cur=document.getElementById('cur'),ring=document.getElementById('cur-r');
  if(!cur||!ring)return;
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.cssText=`left:${mx-5}px;top:${my-5}px;`;});
  function animR(){rx+=(mx-rx)*.14;ry+=(my-ry)*.14;ring.style.cssText=`left:${rx-15}px;top:${ry-15}px;`;requestAnimationFrame(animR);}animR();
  document.querySelectorAll('a,button,.card,.pc,.bc2').forEach(el=>{el.addEventListener('mouseenter',()=>{ring.style.transform='scale(1.7)';});el.addEventListener('mouseleave',()=>{ring.style.transform='scale(1)';});});
}

/* NAV */
window.goPage=function(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('on'));
  document.querySelectorAll('.nl').forEach(l=>l.classList.remove('on'));
  const pg=document.getElementById(id);if(pg)pg.classList.add('on');
  const lnk=document.querySelector(`.nl[data-p="${id}"]`);if(lnk)lnk.classList.add('on');
  window.scrollTo(0,0);
  setTimeout(()=>{initReveal();if(id==='skills'||id==='resume')setTimeout(initBars,300);if(id==='home')initCounters();},80);
};

/* REVEAL */
function initReveal(){
  const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');});},{threshold:.1});
  document.querySelectorAll('.rv').forEach(el=>{el.classList.remove('in');obs.observe(el);});
}

/* TYPEWRITER */
function initTypewriter(){
  const el=document.getElementById('tw');if(!el)return;
  const roles=['Full Stack Web Developer','Java + Spring Boot Developer','BTech CSE @ DDU Gorakhpur','Android & MERN Stack Dev','LeetCode & HackerRank Solver'];
  let ri=0,ci=0,del=false;
  function type(){
    const t=roles[ri];
    el.innerHTML=t.slice(0,ci)+'<span style="border-right:2px solid var(--cyan);margin-left:1px;animation:blink .7s step-end infinite"></span>';
    if(!del){ci++;if(ci>t.length){del=true;setTimeout(type,2200);return;}}
    else{ci--;if(ci<0){del=false;ri=(ri+1)%roles.length;}}
    setTimeout(type,del?52:88);
  }
  type();
}

/* COUNTERS */
function initCounters(){
  document.querySelectorAll('[data-n]').forEach(el=>{
    if(el.dataset.done)return;el.dataset.done='1';
    const target=+el.dataset.n,suf=el.dataset.s||'';
    let cur=0,step=target/55;
    const t=setInterval(()=>{cur=Math.min(cur+step,target);el.textContent=Math.floor(cur)+suf;if(cur>=target)clearInterval(t);},20);
  });
}

/* SKILL BARS */
function initBars(){
  document.querySelectorAll('.sbf').forEach(el=>{el.style.width=el.dataset.w||'0%';el.classList.add('in');});
}

/* INIT */
document.addEventListener('DOMContentLoaded',()=>{
  initParticles();initCursor();
  document.querySelectorAll('.nl[data-p]').forEach(l=>l.addEventListener('click',()=>goPage(l.dataset.p)));
  initTypewriter();
  setTimeout(()=>{initReveal();initCounters();},100);
  window.addEventListener('scroll',()=>{const nav=document.querySelector('nav');if(nav)nav.style.background=scrollY>40?'rgba(3,7,18,.97)':'rgba(3,7,18,.9)';});
});