/* Cámara ortográfica 3D, sin bibliotecas externas. La geometría es esquemática. */
(function(){
"use strict";
const W=1200,H=824,CX=W/2,CY=H/2;
const states=new Map();
const argRoads=[
 ...[["Uruguay",97.5],["Talcahuano",292.5],["Libertad",487.5],["Cerrito",682.5],["Av. 9 de Julio",787.5]].map(([name,y])=>({name,x1:53.3,x2:1173.3,y1:y,y2:y})),
 ...[["Av. Corrientes",173.3],["Lavalle",400],["Tucumán",626.7],["Viamonte",853.3],["Av. Córdoba",1080]].map(([name,x])=>({name,x1:x,x2:x,y1:16.5,y2:883.5}))
];
const argLabelZones=[...argRoads.filter(r=>r.y1===r.y2).map(r=>({x:286.7,y:r.y1-23,w:80,h:18})),...argRoads.filter(r=>r.x1===r.x2).map(r=>({x:r.x1,y:190,w:80,h:18}))];
const landmarks={cl:[{x:1087,y:224,w:60,h:60},{x:289,y:440,w:85,h:85},{x:290,y:646,w:75,h:68}],arg:[{x:773.3,y:390,w:82,h:68},{x:760,y:585,w:70,h:65},{x:520,y:198.8,w:72,h:60},{x:260,y:791.3,w:65,h:65}]};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const roadList=city=>city==="arg"?argRoads:STREETS;
function svgNode(tag,attrs={}){const e=svgEl(tag);for(const [k,v] of Object.entries(attrs))e.setAttribute(k,v);return e;}
function blockVolumes(city){
 const roads=roadList(city),hs=[...new Set(roads.filter(r=>r.y1===r.y2).map(r=>r.y1))].sort((a,b)=>a-b);
 const zones=[...(city==="arg"?argLabelZones:LABEL_ZONES),...landmarks[city]];
 const pts=city==="arg"?ARG_EMOTIONS:EMOTIONS,volumes=[];
 let id=0;
 for(let j=0;j<hs.length-1;j++){
   const ya=hs[j],yb=hs[j+1];
   const xs=[...new Set(roads.filter(r=>r.x1===r.x2&&Math.min(r.y1,r.y2)<=ya+.1&&Math.max(r.y1,r.y2)>=yb-.1).map(r=>r.x1))].sort((a,b)=>a-b);
   for(let i=0;i<xs.length-1;i++){
     const xa=xs[i],xb=xs[i+1];
     // Only blocks bounded by the existing streets; no new street axes.
     if(![ya,yb].every(y=>{const segments=roads.filter(r=>r.y1===y&&r.y2===y).sort((a,b)=>a.x1-b.x1);let end=xa;for(const r of segments){if(r.x1<=end+.1&&r.x2>=end)end=Math.max(end,r.x2);}return end>=xb-.1;}))continue;
     const setback=24,ww=xb-xa-2*setback,hh=yb-ya-2*setback;
     if(ww<26||hh<26)continue;
     const nx=ww>128?2:1,ny=hh>128?2:1;
     for(let a=0;a<nx;a++)for(let b=0;b<ny;b++){
       const cellW=ww/nx,cellH=hh/ny;
       const x=xa+setback+a*cellW+7,y=ya+setback+b*cellH+7;
       const width=cellW-14,height=cellH-14;
       if(width<22||height<22)continue;
       if(zones.some(z=>x<z.x+z.w+8&&x+width>z.x-z.w-8&&y<z.y+z.h+8&&y+height>z.y-z.h-8))continue;
       if(pts.some(p=>p.x>x-17&&p.x<x+width+17&&p.y>y-17&&p.y<y+height+17))continue;
       volumes.push({x,y:mapDisplayY(y),w:width,h:height*MAP_Y_SCALE,z:28+(id++*17%43)});
     }
   }
 }
 return volumes;
}
const volumesByCity={cl:blockVolumes("cl"),arg:blockVolumes("arg")};
function camera(s){
 const a=s.mode==="3d"?s.angle*Math.PI/180:0,t=s.mode==="3d"?s.tilt*Math.PI/180:0;
 const c=Math.cos(a),q=Math.sin(a),ct=Math.cos(t),st=Math.sin(t);
 const fit=s.mode==="3d"?Math.min(1150/(W*Math.abs(c)+H*Math.abs(q)),760/((W*Math.abs(q)+H*Math.abs(c))*ct+76*st)):1;
 const k=fit*s.zoom,A=k*c,B=k*q*ct,C=-k*q,D=k*c*ct;
 const e=CX+s.panX-A*CX-C*CY,f=CY+s.panY-B*CX-D*CY;
 return {A,B,C,D,e,f,k,st,project:(x,y,z=0)=>[A*x+C*y+e,B*x+D*y+f-k*st*z],depth:(x,y)=>q*(x-CX)+c*(y-CY)};
}
function drawVolumes(s,m){
 s.volumes.replaceChildren();
 if(s.mode!=="3d")return;
 const faces=[];
 const push=(v,points,fill,priority=0)=>{
   const depth=points.reduce((n,p)=>n+m.depth(p[0],p[1]),0)/points.length;
   faces.push({points,fill,depth,priority});
 };
 for(const v of volumesByCity[s.city]){
   const {x,y,w,h,z}=v;
   const g=[[x,y,0],[x+w,y,0],[x+w,y+h,0],[x,y+h,0]],r=g.map(p=>[p[0],p[1],z]);
   // Orthographic box faces; choose the two camera-facing walls.
   const sides=[[0,1],[1,2],[2,3],[3,0]];
   for(const [a,b] of sides){
     const normalDepth=m.depth((g[a][0]+g[b][0])/2,(g[a][1]+g[b][1])/2)-m.depth(x+w/2,y+h/2);
     if(normalDepth>=-.001)push(v,[g[a],g[b],r[b],r[a]],a%2===0?"#55585d":"#3d4045");
   }
   push(v,r,"#9da0a4",1);
 }
 faces.sort((a,b)=>a.depth-b.depth||a.priority-b.priority);
 const frag=document.createDocumentFragment();
 for(const face of faces){
   frag.append(svgNode("polygon",{points:face.points.map(p=>m.project(...p).map(x=>x.toFixed(2)).join(",")).join(" "),fill:face.fill,stroke:"#24272b","stroke-width":"1","stroke-linejoin":"round"}));
 }
 s.volumes.append(frag);
}
function paint(s){
 if(!s.ground||!s.data||!s.volumes)return;
 const m=camera(s),matrix="matrix("+[m.A,m.B,m.C,m.D,m.e,m.f].join(" ")+")";
 s.ground.setAttribute("transform",matrix);
 s.data.setAttribute("transform",matrix);
 s.svg.classList.toggle("map-3d-active",s.mode==="3d");
 drawVolumes(s,m);
 s.modeBtn?.setAttribute("aria-pressed",String(s.mode==="3d"));
 if(s.modeBtn)s.modeBtn.textContent=s.mode==="3d"?"3D":"2D";
 if(s.zoomReadout)s.zoomReadout.textContent=Math.round(s.zoom*100)+"%";
}
function hideTips(s){s.svg.parentElement.querySelectorAll(".map-tooltip,.emotion-tooltip").forEach(t=>t.classList.remove("is-visible"));}
function change(s,fn){hideTips(s);fn();s.panX=clamp(s.panX,-W*2,W*2);s.panY=clamp(s.panY,-H*2,H*2);paint(s);}
function zoom(s,d){change(s,()=>{s.zoom=clamp(s.zoom*d,.75,3.5);});}
function reset(s){change(s,()=>{s.angle=-12;s.tilt=38;s.zoom=1;s.panX=0;s.panY=0;});if(s.select)s.select.value="";}
function focusRoad(s,name){
 const rr=roadList(s.city).filter(r=>r.name===name);if(!rr.length)return;
 change(s,()=>{
   s.zoom=1.75;s.panX=0;s.panY=0;
   const x=(Math.min(...rr.flatMap(r=>[r.x1,r.x2]))+Math.max(...rr.flatMap(r=>[r.x1,r.x2])))/2;
   const y=mapDisplayY((Math.min(...rr.flatMap(r=>[r.y1,r.y2]))+Math.max(...rr.flatMap(r=>[r.y1,r.y2])))/2);
   const p=camera(s).project(x,y);s.panX=CX-p[0];s.panY=CY-p[1];
 });
}
function toolbar(s){
 const bar=document.createElement("div");bar.className="map-camera-controls";bar.setAttribute("role","group");bar.setAttribute("aria-label","Controles de vista del mapa");
 const btn=(label,title,action)=>{const b=document.createElement("button");b.type="button";b.textContent=label;b.title=title;b.setAttribute("aria-label",title);b.addEventListener("click",action);bar.append(b);return b;};
 s.modeBtn=btn("3D","Cambiar entre vista 3D y 2D",()=>{s.mode=s.mode==="3d"?"2d":"3d";reset(s);});s.modeBtn.className="map-camera-mode";
 btn("−","Alejar mapa",()=>zoom(s,1/1.22));
 s.zoomReadout=document.createElement("span");s.zoomReadout.className="map-zoom-readout";bar.append(s.zoomReadout);
 btn("+","Acercar mapa",()=>zoom(s,1.22));
 btn("↶","Girar a la izquierda",()=>change(s,()=>{if(s.mode==="2d")s.mode="3d";s.angle-=15;}));
 btn("↷","Girar a la derecha",()=>change(s,()=>{if(s.mode==="2d")s.mode="3d";s.angle+=15;}));
 btn("⌂","Restablecer vista",()=>reset(s));
 const select=document.createElement("select");select.setAttribute("aria-label","Acercar a una calle");
 const option=(v,label)=>{const o=document.createElement("option");o.value=v;o.textContent=label;select.append(o);};
 option("","Ir a una calle");
 [...new Set(roadList(s.city).map(r=>r.name))].forEach(name=>option(name,name));
 select.addEventListener("change",()=>{if(select.value)focusRoad(s,select.value);});
 bar.append(select);s.select=select;
 s.svg.parentElement.before(bar);
}
function attachInput(s){
 const svg=s.svg;svg.setAttribute("tabindex","0");svg.setAttribute("aria-keyshortcuts","ArrowLeft ArrowRight ArrowUp ArrowDown + -");
 let drag=null;
 svg.addEventListener("pointerdown",e=>{
   if(e.button!==0&&e.button!==1)return;
   if(e.target.closest?.(".emotion-point,.difficulty-stack")&&!e.shiftKey&&e.button!==1)return;
   e.preventDefault();hideTips(s);
   drag={id:e.pointerId,x:e.clientX,y:e.clientY,rotate:e.shiftKey||e.button===1};
   svg.setPointerCapture(e.pointerId);svg.classList.add("map-camera-dragging");svg.focus({preventScroll:true});
 });
 svg.addEventListener("pointermove",e=>{
   if(!drag||drag.id!==e.pointerId)return;
   const dx=e.clientX-drag.x,dy=e.clientY-drag.y;drag.x=e.clientX;drag.y=e.clientY;
   const scale=W/Math.max(1,svg.getBoundingClientRect().width);
   change(s,()=>{if(drag.rotate){s.mode="3d";s.angle+=dx*.32;s.tilt=clamp(s.tilt+dy*.20,12,67);}else{s.panX+=dx*scale;s.panY+=dy*scale;}});
 });
 const stop=e=>{if(drag&&e.pointerId===drag.id){drag=null;svg.classList.remove("map-camera-dragging");}};
 svg.addEventListener("pointerup",stop);svg.addEventListener("pointercancel",stop);svg.addEventListener("lostpointercapture",stop);
 svg.addEventListener("wheel",e=>{if(!e.ctrlKey&&!e.metaKey&&!e.altKey)return;e.preventDefault();zoom(s,Math.exp(-clamp(e.deltaY,-100,100)*.004));},{passive:false});
 svg.addEventListener("keydown",e=>{
   if(e.target!==svg)return;
   const k=e.key;if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","+","=","-","0"].includes(k))return;e.preventDefault();
   if(k==="+"||k==="=")zoom(s,1.22);else if(k==="-")zoom(s,1/1.22);else if(k==="0")reset(s);else change(s,()=>{
     if(e.shiftKey){s.mode="3d";if(k==="ArrowLeft")s.angle-=15;if(k==="ArrowRight")s.angle+=15;if(k==="ArrowUp")s.tilt=clamp(s.tilt+5,12,67);if(k==="ArrowDown")s.tilt=clamp(s.tilt-5,12,67);}
     else{if(k==="ArrowLeft")s.panX+=45;if(k==="ArrowRight")s.panX-=45;if(k==="ArrowUp")s.panY+=45;if(k==="ArrowDown")s.panY-=45;}
   });
 });
}
function refreshMap3D(svg,city){
 if(!svg)return;
 let s=states.get(svg.id);
 if(!s){s={svg,city,mode:"3d",angle:-12,tilt:38,zoom:1,panX:0,panY:0};states.set(svg.id,s);toolbar(s);attachInput(s);}
 const image=svg.querySelector(".night-map-base");
 if(!image)return;
 if(!s.ground||!svg.contains(s.ground)){
   s.ground=svgNode("g",{class:"map-3d-ground","pointer-events":"none"});
   s.volumes=svgNode("g",{class:"map-3d-volumes","pointer-events":"none","aria-hidden":"true"});
   s.data=svgNode("g",{class:"map-3d-data"});
   s.ground.append(image);
   const layers=[...svg.children].filter(e=>e.classList.contains("difficulty-layer")||e.classList.contains("emotion-layer"));
   for(const layer of layers)s.data.append(layer);
   svg.append(s.ground,s.volumes,s.data);
 }else{
   for(const layer of [...svg.children].filter(e=>e.classList.contains("difficulty-layer")||e.classList.contains("emotion-layer")))s.data.append(layer);
 }
 paint(s);
}
window.refreshMap3D=refreshMap3D;
for(const [id,city] of [["emotionMap","cl"],["difficultyMap","cl"],["argEmotionMap","arg"],["argDifficultyMap","arg"]])refreshMap3D(document.getElementById(id),city);
})();