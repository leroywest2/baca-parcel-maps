/* Parcel Map Plats Baca 111726: recorded plat sheets drawn under the parcel lines, with an on/off switch. */
window.PLATS1={meta:{stamp:"111726",note:"1971 Baca Grande plat sheets, fitted to the map by lot position. Sheets listed below only."},
dir:"Parcel Map Plats Baca 111726/",
sheets:[{"id": "CH-05", "png": "CH-05.png", "bounds": [[37.98179978924551, -105.67892154333786], [37.9890774761721, -105.66609049019496]]}, {"id": "CH-07", "png": "CH-07.png", "bounds": [[37.97842974625665, -105.67000613567944], [37.985161970215984, -105.65761246271013]]}]};
(function(){
 var tries=0;
 function go(){
  var m=window.map;
  if(!m||!window.L||!m.getPane){ if(tries++<200)return setTimeout(go,300); return; }
  try{
   var P=window.PLATS1; if(!P||!P.sheets||!P.sheets.length)return;
   if(!m.getPane('platpane')){var pn=m.createPane('platpane');pn.style.zIndex=350;pn.style.pointerEvents='none';}
   var group=L.layerGroup(), op=0.6, on=false, ov=[];
   P.sheets.forEach(function(s){ var o=L.imageOverlay(P.dir+s.png,s.bounds,{pane:'platpane',opacity:op,interactive:false,className:'platimg'}); o._sid=s.id; ov.push(o); });
   var C=L.control({position:'bottomleft'});
   C.onAdd=function(){
    var d=L.DomUtil.create('div','leaflet-control platctl');
    d.style.cssText='background:#fff;border:1px solid #888;border-radius:6px;padding:6px 10px;font:14px Arial,sans-serif;box-shadow:0 1px 5px #0004;max-width:240px';
    d.innerHTML='<label style="display:flex;gap:8px;align-items:center;cursor:pointer"><input type="checkbox" id="platchk" style="width:20px;height:20px"> <span><b>1971 plat sheets</b><br><span style="font-size:12px;color:#555">'+P.sheets.length+' sheets so far. Zoom in to see them.</span></span></label>'+
     '<div id="platop" style="display:none;margin-top:6px"><span style="font-size:12px">See-through</span><input id="platrng" type="range" min="10" max="100" value="60" style="width:100%"></div>';
    L.DomEvent.disableClickPropagation(d); L.DomEvent.disableScrollPropagation(d);
    return d;};
   C.addTo(m);
   var chk=document.getElementById('platchk'),rng=document.getElementById('platrng'),box=document.getElementById('platop');
   chk.onchange=function(){ on=chk.checked; box.style.display=on?'block':'none'; ov.forEach(function(o){ if(on)o.addTo(m); else m.removeLayer(o); }); };
   rng.oninput=function(){ op=rng.value/100; ov.forEach(function(o){o.setOpacity(op);}); };
  }catch(e){ try{console.log('plats layer',e)}catch(x){} }
 }
 if(document.readyState==='complete')go(); else window.addEventListener('load',go);
})();
