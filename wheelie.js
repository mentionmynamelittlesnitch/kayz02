const canvas=document.getElementById('game'),ctx=canvas.getContext('2d');
const button=document.getElementById('wheelie'),restart=document.getElementById('restart'),scoreEl=document.getElementById('score'),statusEl=document.getElementById('status');
let angle=0,spin=0,distance=0,holding=false,crashed=false,last=0;
function reset(){angle=0;spin=0;distance=0;holding=false;crashed=false;last=0;statusEl.textContent='Press and hold the wheelie button or Space to start.';scoreEl.textContent='Distance: 0 m';draw();}
function draw(){
 const w=canvas.width,h=canvas.height;ctx.clearRect(0,0,w,h);
 const sky=ctx.createLinearGradient(0,0,0,h);sky.addColorStop(0,'#142c4b');sky.addColorStop(1,'#53616d');ctx.fillStyle=sky;ctx.fillRect(0,0,w,h);
 ctx.fillStyle='#f8c978';ctx.beginPath();ctx.arc(690,65,28,0,Math.PI*2);ctx.fill();
 ctx.fillStyle='#24394a';ctx.beginPath();ctx.moveTo(0,220);ctx.lineTo(120,140);ctx.lineTo(230,220);ctx.lineTo(350,125);ctx.lineTo(500,220);ctx.lineTo(640,150);ctx.lineTo(850,220);ctx.closePath();ctx.fill();
 ctx.fillStyle='#26313b';ctx.fillRect(0,245,w,85);ctx.fillStyle='#f5b94d';ctx.fillRect(0,245,w,4);
 for(let x=-(distance*5%90);x<w;x+=90){ctx.fillStyle='#d7e1e8';ctx.fillRect(x,282,42,4)}
 ctx.save();ctx.translate(380,235);ctx.rotate(crashed?0.55:-angle);
 // wheels
 ctx.lineWidth=7;ctx.strokeStyle='#101820';
 [[-65,0],[65,0]].forEach(([x,y])=>{ctx.beginPath();ctx.arc(x,y,27,0,Math.PI*2);ctx.stroke();ctx.lineWidth=3;ctx.strokeStyle='#a8bac7';ctx.beginPath();ctx.arc(x,y,17,0,Math.PI*2);ctx.stroke();ctx.lineWidth=7;ctx.strokeStyle='#101820'});
 // bike frame and body
 ctx.lineWidth=9;ctx.lineCap='round';ctx.strokeStyle='#ff8b24';ctx.beginPath();ctx.moveTo(-65,0);ctx.lineTo(-15,-38);ctx.lineTo(30,-3);ctx.lineTo(65,0);ctx.moveTo(-15,-38);ctx.lineTo(-2,-2);ctx.stroke();
 ctx.strokeStyle='#dce7ef';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(-28,-43);ctx.lineTo(2,-43);ctx.stroke();
 ctx.strokeStyle='#f4f7fa';ctx.lineWidth=11;ctx.beginPath();ctx.moveTo(-5,-48);ctx.lineTo(7,-82);ctx.lineTo(27,-55);ctx.stroke();
 ctx.fillStyle='#16c9f2';ctx.beginPath();ctx.arc(8,-92,13,0,Math.PI*2);ctx.fill();
 ctx.restore();
 if(crashed){ctx.fillStyle='#fff';ctx.font='bold 34px system-ui';ctx.textAlign='center';ctx.fillText('WIPEOUT!',w/2,80);ctx.font='16px system-ui';ctx.fillText('Press RESTART to try again',w/2,108)}
}
function frame(t){if(!last)last=t;let dt=Math.min((t-last)/1000,.04);last=t;
 if(!crashed){if(holding){angle+=dt*.9}else{angle-=dt*.6}angle=Math.max(-.12,Math.min(1.12,angle));distance+=dt*(holding?12:8);
 if(angle>1.02){crashed=true;statusEl.textContent='You tipped too far back — try again!'}else if(angle<-.11){angle=0}
 scoreEl.textContent='Distance: '+Math.floor(distance)+' m';if(holding)statusEl.textContent='Nice! Keep balancing. Release to lower the front wheel.'}
 draw();requestAnimationFrame(frame)}
function hold(e){e.preventDefault();if(!crashed){holding=true;statusEl.textContent='Keep the bike balanced!'}}
function release(){holding=false}
button.addEventListener('pointerdown',hold);button.addEventListener('pointerup',release);button.addEventListener('pointerleave',release);button.addEventListener('pointercancel',release);
window.addEventListener('keydown',e=>{if(e.code==='Space'){e.preventDefault();holding=true}});window.addEventListener('keyup',e=>{if(e.code==='Space')holding=false});
restart.addEventListener('click',reset);reset();requestAnimationFrame(frame);
