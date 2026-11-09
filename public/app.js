function num(v){return parseInt(String(v==null?'':v).replace(/\D/g,''))||0}
function rp(n){return String(n).replace(/\B(?=(\d{3})+(?!\d))/g,'.')}
function totalOf(s){var t=0,i;for(i=0;i<7;i++)t+=num(s['jb'+i]);for(i=0;i<5;i++)t+=num(s['p'+i+'h']);return t}
var BLN=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
function tglID(ts){var t=new Date(ts);return ('0'+t.getDate()).slice(-2)+' '+BLN[t.getMonth()]+' '+t.getFullYear()}
var SPAREPART=[[8000,'Busi'],[8000,'Oli Transmisi'],[24000,'Ban Depan'],[24000,'Ban Belakang'],[24000,'Rantai'],[24000,'Drive Belt'],[12000,'Coolant'],[24000,'Kampas Rem'],[16000,'Filter Udara'],[24000,'Aki'],[0,'Lampu Depan'],[0,'Lampu Belakang']];
var PAKET=[[8000,'Pembersihan CVT'],[10000,'Kuras Tangki'],[10000,'Kuras Radiator']];
function pdfLayout(d,x,IMG){
 var s=x.d||{},tw=x.tw||{},M=10,R=200,C=105,W=190,y=10,G=238,i;
 var T=function(t,a,b,o,sz,st){d.setFont('helvetica',st||'normal');d.setFontSize(sz||8);d.text(String(t==null?'':t),a,b,o||{})};
 var B=function(a,b,w,h,g){if(g){d.setFillColor(G);d.rect(a,b,w,h,'FD')}else d.rect(a,b,w,h,'S')};
 var L=function(a,b,w){d.setLineDashPattern([.4,.8],0);d.line(a,b,a+w,b);d.setLineDashPattern([],0)};
 var CK=function(a,b,on){d.rect(a,b-2.7,2.9,2.9,'S');if(on){d.setLineWidth(.55);d.line(a+.5,b-1.2,a+1.2,b-.2);d.line(a+1.2,b-.2,a+2.6,b-2.5);d.setLineWidth(.3)}};
 var fl=function(a,b,l,v,lw,w){T(l,a,b,{},7.5);T(':',a+lw-1.5,b,{},7.5);L(a+lw+.5,b+1,w-lw-.5);if(v)T(v,a+lw+1.5,b-.3,{},8.5,'bold')};
 var YT=function(a,b,l,v,cx){T(l,a,b,{},7.5);T(':',a+cx-4,b,{},7.5);CK(a+cx,b,v=='Ya');T('Ya',a+cx+4,b,{},7.5);CK(a+cx+8,b,v=='Tidak');T('Tidak',a+cx+12,b,{},7.5)};
 var wrap=function(t,w,n,a,b,p,sz){d.setFont('helvetica','normal');d.setFontSize(sz||8);d.splitTextToSize(String(t||''),w).slice(0,n).forEach(function(ln,k){T(ln,a,b+k*p,{},sz||8)})};
 d.setLineWidth(.3);
 // KOP
 B(M,y,W,28);
 d.addImage(IMG.ah,'JPEG',M+3,y+3,33,21.9);d.addImage(IMG.df,'JPEG',R-27,y+2,24,24);
 T('BUSINESS CENTER TBSM',C,y+8.5,{align:'center'},15,'bold');
 T('SMKS DARUL FATWA',C,y+14,{align:'center'},12,'bold');
 T('Kerjasama AHASS Daya Anugrah Mandiri Jatinangor',C,y+19.5,{align:'center'},9.5,'bold');
 T('Jl. Letda Lukito No.90, Jatiroke, Kec. Jatinangor, Kab. Sumedang, Jawa Barat 45363',C,y+24.5,{align:'center'},7);
 y+=28;B(M,y,W,7,1);T('FORM SERVICE ADVISOR',C,y+5,{align:'center'},12,'bold');y+=7;
 // DATA
 var h1=47;B(M,y,W,h1);d.line(M+64,y,M+64,y+h1);d.line(M+134,y,M+134,y+h1);
 T('Data Motor',M+2,y+4.5,{},8.5,'bold');
 [['No. Urut',x.no],['Tanggal Service',tglID(x.ts)],['No. Mesin',s.noMesin],['No. Rangka',s.noRangka],['No. Polisi',s.plat],['Type',s.tipe],['Tahun',s.tahun],['KM',s.km?rp(num(s.km)):''],['* Email',s.email],['* Sosmed',s.sosmed]].forEach(function(r,k){fl(M+2,y+8.5+k*3.95,r[0],r[1],24,60)});
 T('Data Pembawa',M+66,y+4.5,{},8.5,'bold');
 [['Nama',s.pb_nama],['Alamat',s.pb_alamat],['Kel / Kec',s.pb_kel],['No.Telp/HP',s.pb_hp]].forEach(function(r,k){fl(M+66,y+8.5+k*3.95,r[0],r[1],17,66)});
 T('Data Pemilik',M+66,y+26,{},8.5,'bold');
 [['Nama',s.pm_nama],['Alamat',s.pm_alamat],['Kel / Kec',s.pm_kel],['No.Telp/HP',s.pm_hp]].forEach(function(r,k){fl(M+66,y+30+k*3.95,r[0],r[1],17,66)});
 var rx=M+136;
 YT(rx,y+4.5,'Dari Dealer Sendiri',s.dealer,33);
 T('Hubungan Pembawa & Pemilik',rx,y+9.5,{},7.5);L(rx,y+14,54);T(s.hub,rx+1,y+13.5,{},8.5,'bold');
 YT(rx,y+19,'Always Honda',s.always,33);
 T('Alasan ke AHASS',rx,y+24.5,{},8,'bold');
 ['a. Inisiatif Sendiri','b. SMS Reminder','c. Telp Reminder','d. Sticker Reminder','e. Lainnya '+(s.alasan_e||'..................')].forEach(function(t,k){CK(rx,y+28.5+k*3.5,s.alasan==t.charAt(0));T(t,rx+4,y+28.5+k*3.5,{},7.5)});
 YT(rx,y+46.2,'PIT Express',s.pit,33);
 y+=h1;
 // BARIS 2
 var y0=y,hh=6;
 B(M,y,60,hh,1);B(M+60,y,50,hh,1);B(M+110,y,30,hh,1);B(M+140,y,50,hh,1);
 T('Kondisi Awal SMH',M+30,y+4.3,{align:'center'},8.5,'bold');T('Pekerjaan',M+85,y+4.3,{align:'center'},8.5,'bold');T('Estimasi Biaya',M+125,y+4.3,{align:'center'},8.5,'bold');T('Saran Ganti Sparepart',M+165,y+4.3,{align:'center'},8.5,'bold');
 y+=hh;var rh=38.4/7;B(M+60,y,50,rh*7);B(M+110,y,30,rh*7);
 var jb=['1. KPB '+(s.kpb?'ke-'+s.kpb:'1 / 2 / 3 / 4'),'2. Servis '+(s.svc||'Lengkap / Ringan'),'3. Ganti Oli '+(s.oli||'MPX / SPX'),'4. Ganti Part','5. Turun Mesin','6. Cuci Motor','7. '+(s.j5t||'.........................')];
 var ORD=[0,1,2,3,4,6,5];for(var oi=0;oi<7;oi++){i=ORD[oi];var yy=y+oi*rh+4.1;CK(M+61.5,yy,s['j'+i]||num(s['jb'+i])||(i==5&&s.j5t)||(i==6&&s.cuci));T(jb[oi],M+66,yy,{},8);T('Rp',M+112,yy,{},8);L(M+118,yy+1,20);if(num(s['jb'+i]))T(rp(num(s['jb'+i])),M+137.5,yy-.3,{align:'right'},9,'bold')}
 y+=rh*7;
 B(M+60,y,50,hh,1);B(M+110,y,30,hh,1);T('Suku Cadang',M+85,y+4.3,{align:'center'},8.5,'bold');T('Estimasi Harga',M+125,y+4.3,{align:'center'},8.5,'bold');y+=hh;
 B(M+60,y,50,30);B(M+110,y,30,30);
 for(i=0;i<5;i++){var y2=y+i*6+4.4;T((i+1)+'. '+(s['p'+i+'n']||'..................................'),M+62,y2,{},8,s['p'+i+'n']?'bold':'normal');T('Rp',M+112,y2,{},8);L(M+118,y2+1,20);if(num(s['p'+i+'h']))T(rp(num(s['p'+i+'h'])),M+137.5,y2-.3,{align:'right'},9,'bold')}
 y+=30;B(M+60,y,50,8,1);B(M+110,y,30,8,1);T('TOTAL HARGA',M+108,y+5.4,{align:'right'},10.5,'bold');T('Rp',M+112,y+5.4,{},8.5);T(rp(totalOf(s)),M+137.5,y+5.5,{align:'right'},12,'bold');y+=8;
 // kolom kiri
 B(M,y0+hh,60,y-y0-hh);
 T('BBM',M+3,y0+11,{},7.5,'bold');T('E',M+3,y0+17,{},8,'bold');var lv=parseInt(s.bbm)||0;
 for(i=0;i<4;i++){if(i<lv){d.setFillColor(90);d.rect(M+8+i*10,y0+13.5,9,4.5,'FD')}else d.rect(M+8+i*10,y0+13.5,9,4.5,'S')}
 T('F',M+50,y0+17,{},8,'bold');
 T('Catatan Lain :',M+3,y0+26,{},7.5,'bold');
 [['MB',s.cmb],['WO',s.cwo],['SOR',s.csor],['WOR',s.cwor]].forEach(function(r,k){var q=y0+34+k*9;T(r[0],M+3,q,{},8);T(':',M+13,q,{},8);L(M+15,q+1,43);if(r[1])T(r[1],M+16,q-.3,{},8.5,'bold')});
 T('Kondisi motor :',M+3,y0+72,{},7.5,'bold');wrap(s.kondisi,54,3,M+3,y0+76,3.5,7.5);
 // kolom kanan
 var yr=y0+hh;B(M+140,yr,50,4,1);T('Periode (KM)',M+152,yr+3,{align:'center'},6.5,'bold');T('Sparepart',M+176,yr+3,{align:'center'},6.5,'bold');yr+=4;
 B(M+140,yr,50,60);
 SPAREPART.forEach(function(p,k){var q=yr+k*5+3.7;CK(M+141.5,q,s['sp'+k]);T(p[0]?rp(p[0]):'',M+146,q,{},7.5);T(p[1],M+159,q,{},7.5)});yr+=60;
 B(M+140,yr,50,5,1);T('Paket Tambahan',M+165,yr+3.7,{align:'center'},7.5,'bold');yr+=5;
 var ph=y-yr;B(M+140,yr,50,ph);
 PAKET.forEach(function(p,k){var q=yr+k*(ph/3)+ph/6+1.2;CK(M+141.5,q,s['pk'+k]);T(rp(p[0]),M+146,q,{},7.5);T(p[1],M+159,q,{},7.5)});
 // keluhan, analisa
 [['Keluhan Konsumen',s.keluhan],['Analisa Service Advisor',s.analisa]].forEach(function(r){B(M,y,W,5,1);T(r[0],C,y+3.8,{align:'center'},8.5,'bold');y+=5;B(M,y,W,11);wrap(r[1],W-4,3,M+2,y+3.6,3.4,8);y+=11});
 y+=4.5;T('*Apabila ada tambahan PEKERJAAN / PENGGANTIAN PART di luar daftar diatas maka:',M,y,{},7.5);y+=4.5;
 CK(M,y,s.konf=='Konfirmasi dulu');T('Konfirmasi dulu / telp ke '+(s.konf_telp||'.....................'),M+4.5,y,{},7.5);
 CK(M+80,y,s.konf=='Langsung dikerjakan');T('Langsung dikerjakan',M+84.5,y,{},7.5);
 T('Part bekas dibawa konsumen :',M+120,y,{},7.5);CK(M+158,y,s.bekas=='Ya');T('Ya',M+162,y,{},7.5);CK(M+170,y,s.bekas=='Tidak');T('Tidak',M+174,y,{},7.5);y+=3;
 // tanda tangan
 var kn=s.pm_nama||s.pb_nama||'',bx=[[M,70,'Approval Pekerjaan + Biaya + Waktu'],[M+70,40,'Tambahan Pekerjaan'],[M+110,40,'Final Inspection'],[M+150,40,'Penyerahan Motor Oleh SA']];
 bx.forEach(function(b){B(b[0],y,b[1],20);T(b[2],b[0]+b[1]/2,y+4,{align:'center'},7,'bold')});
 d.line(M+35,y+5,M+35,y+20);
 T('Konsumen Ttd',M+17.5,y+8,{align:'center'},6.5);T('Service Advisor Ttd',M+52.5,y+8,{align:'center'},6.5);T('('+kn+')',M+17.5,y+18,{align:'center'},7);T('('+(s.sa||'..................')+')',M+52.5,y+18,{align:'center'},7);
 T('Konsumen Ttd',M+90,y+8,{align:'center'},6.5);T('('+kn+')',M+90,y+18,{align:'center'},7);
 T('OK',M+130,y+13,{align:'center'},12,'bold');T('Petugas: '+(s.mekanik||'.........'),M+130,y+18,{align:'center'},6.5);
 T('Konsumen Ttd',M+170,y+8,{align:'center'},6.5);T('('+kn+')',M+170,y+18,{align:'center'},7);y+=20;
 // saran mekanik, estimasi
 B(M,y,75,5,1);B(M+75,y,35,5,1);B(M+110,y,80,5,1);T('Saran Mekanik',M+37.5,y+3.8,{align:'center'},8.5,'bold');T('Nama Mekanik',M+92.5,y+3.8,{align:'center'},8,'bold');T('Estimasi',M+150,y+3.8,{align:'center'},8.5,'bold');y+=5;
 B(M,y,75,14);B(M+75,y,35,14);B(M+110,y,80,14);wrap(s.saran,71,3,M+2,y+3.6,3.4,8);
 T(s.mekanik,M+77,y+4.5,{},8,'bold');T('Pembimbing AHASS:',M+77,y+8.5,{},6.5);T(s.pembimbing,M+77,y+12,{},7.5,'bold');
 [['Waktu Pendaftaran',tw.daftar],['Waktu Dikerjakan',tw.kerja],['Waktu Selesai',tw.selesai]].forEach(function(r,k){fl(M+112,y+4+k*4,r[0],r[1],30,76)});y+=14;
 // syarat, garansi
 B(M,y,W,17);d.line(M+95,y,M+95,y+17);
 T('Syarat dan Ketentuan',M+2,y+3.8,{},7,'bold');
 ['1. Formulir ini adalah surat kuasa pekerjaan.','2. Bengkel tidak bertanggung jawab terhadap sepeda motor yang','    tidak diambil dalam 30 hari.','3. Bengkel tidak bertanggung jawab jika terjadi Force Majeure.'].forEach(function(t,k){T(t,M+2,y+7.2+k*2.9,{},6.5)});
 T('Garansi',M+97,y+3.8,{},7,'bold');
 ['- 500 Km / 1 minggu untuk Service Reguler','- 1.000 Km / 1 Bulan untuk Bongkar Mesin Reguler','- 1.000 Km / 1 Bulan untuk Service CBR 250 dan PCX 150','- 1.500 Km / 45 Hari untuk Bongkar Mesin CBR 250 dan PCX 150'].forEach(function(t,k){T(t,M+97,y+7.2+k*2.9,{},6.5)});
 y+=17;T('Dicetak '+tglID(Date.now())+'  |  Business Center TBSM SMKS Darul Fatwa - AHASS Daya Anugrah Mandiri Jatinangor',C,y+4,{align:'center'},6.5);
 return y+4;
}
if(typeof module!=='undefined')module.exports={pdfLayout:pdfLayout};

var IMG={df:"data:image/jpeg;base64,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",ah:"data:image/jpeg;base64,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"};
var KEY='servispoint_v2',tabs=[['dash','Dashboard'],['new','Pendaftaran'],['q','Antrian'],['rep','Laporan']],tab='dash',filt='Semua',srch='',editId=null,cur={};
var ST=['Menunggu','Dikerjakan','Selesai','Diambil'],db={jobs:[],n:0};
function $(i){return document.getElementById(i)}
function esc(t){return String(t==null?'':t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function jf(id){return db.jobs.filter(function(x){return x.id==id})[0]}
function hhmm(){var t=new Date();return ('0'+t.getHours()).slice(-2)+':'+('0'+t.getMinutes()).slice(-2)}
function sameDay(t){return new Date(t).toDateString()==new Date().toDateString()}
function R0(n){return 'Rp '+rp(n)}
function daftar(x){var d=x.d,o=[];['KPB','Servis','Ganti Oli','Ganti Part','Turun Mesin'].forEach(function(n,i){if(d['j'+i]||num(d['jb'+i]))o.push(i==1&&d.svc?'Servis '+d.svc:i==2&&d.oli?n+' '+d.oli:n)});if(d.j6||num(d.jb6)||d.cuci)o.push('Cuci Motor');if(d.j5||d.j5t||num(d.jb5))o.push(d.j5t||'Lainnya');return o.join(', ')||'-'}

function go(t){rwKey='';rwAuto={};rwN=0;tab=t;if(t=='new'&&!editId)cur={};if(t!='new')editId=null;render()}


function IC(k,l,a){return '<div><label>'+l+'</label><div class="fc"><input data-k="'+k+'" value="'+esc(cur[k])+'" '+(a||'')+'><button type="button" class="cam" data-for="'+k+'" onclick="scan(\''+k+'\')" aria-label="Baca dengan kamera" title="Baca dengan kamera">'+ic('camera')+'</button></div><small class="camh" id="ch_'+k+'"></small><img class="camp" id="cp_'+k+'" alt="Potongan foto yang dibaca"></div>'}
function I(k,l,a){return '<div><label>'+l+'</label><input data-k="'+k+'" value="'+esc(cur[k])+'" '+(a||'')+'></div>'}
function S(k,l,o){return '<div><label>'+l+'</label><select data-k="'+k+'">'+o.map(function(v){var val=Array.isArray(v)?v[0]:v,tx=Array.isArray(v)?v[1]:v;return '<option value="'+val+'"'+(cur[k]==val?' selected':'')+'>'+(tx||'-')+'</option>'}).join('')+'</select></div>'}
function K(k,l){return '<label class="ck"><input type="checkbox" data-k="'+k+'"'+(cur[k]?' checked':'')+'> '+l+'</label>'}
function TA(k,l,r){return '<label>'+l+'</label><textarea data-k="'+k+'" rows="'+(r||2)+'">'+esc(cur[k])+'</textarea>'}
var YN=['','Ya','Tidak'];
function vNew(){
 var no=editId?jf(editId).no:'(otomatis)';
 var job=[['j0','KPB','kpb',['','1','2','3','4']],['j1','Servis','svc',['','Lengkap','Ringan']],['j2','Ganti Oli','oli',['','MPX','SPX']],['j3','Ganti Part'],['j4','Turun Mesin'],['j6','Cuci Motor'],['j5','Lainnya','j5t']];
 var h='<div id="rwy"></div><form id="fm" oninput="autoPrice(event);upd();chkPlat(event)" onsubmit="return false">';
 h+='<div class="card"><h3>Data Motor — No. Urut: '+no+'</h3><div class="f">'+IC('plat','No. Polisi *','style="text-transform:uppercase"')+I('tipe','Type')+I('tahun','Tahun','inputmode="numeric"')+I('km','KM','inputmode="numeric"')+IC('noMesin','No. Mesin')+IC('noRangka','No. Rangka')+I('email','Email')+I('sosmed','Sosmed')+'</div></div>';
 h+='<div class="card"><h3>Data Pembawa</h3><div class="f">'+I('pb_nama','Nama')+I('pb_hp','No. Telp/HP','inputmode="tel"')+I('pb_alamat','Alamat')+I('pb_kel','Kel / Kec')+'</div></div>';
 h+='<div class="card"><h3>Data Pemilik</h3><div class="f">'+I('pm_nama','Nama *')+I('pm_hp','No. Telp/HP','inputmode="tel"')+I('pm_alamat','Alamat')+I('pm_kel','Kel / Kec')+'</div></div>';
 h+='<div class="card"><h3>Informasi Kunjungan</h3><div class="f">'+S('dealer','Dari Dealer Sendiri',YN)+I('hub','Hubungan Pembawa & Pemilik')+S('always','Always Honda',YN)+S('alasan','Alasan ke AHASS',[['','-'],['a','a. Inisiatif Sendiri'],['b','b. SMS Reminder'],['c','c. Telp Reminder'],['d','d. Sticker Reminder'],['e','e. Lainnya']])+I('alasan_e','Alasan lainnya')+S('pit','PIT Express',YN)+'</div></div>';
 h+='<div class="card"><h3>Kondisi Awal SMH</h3><div class="f">'+S('bbm','Posisi BBM',[['0','E (kosong)'],['1','1/4'],['2','1/2'],['3','3/4'],['4','F (penuh)']])+I('cmb','MB')+I('cwo','WO')+I('csor','SOR')+I('cwor','WOR')+'</div>'+TA('kondisi','Kondisi motor / catatan lain')+'</div>';
 h+='<div class="card"><h3>Pekerjaan & Estimasi Biaya</h3>';
 job.forEach(function(j,i){var ex='';if(j[2]=='kpb'||j[2]=='oli'||j[2]=='svc')ex='<select data-k="'+j[2]+'">'+j[3].map(function(v){return '<option value="'+v+'"'+(cur[j[2]]==v?' selected':'')+'>'+(v||(j[2]=='kpb'?'KPB ke-':j[2]=='svc'?'Lengkap/Ringan':'MPX/SPX'))+'</option>'}).join('')+'</select>';else if(j[2])ex='<input data-k="j5t" placeholder="Nama pekerjaan" value="'+esc(cur.j5t)+'">';else ex='<span></span>';
  h+='<div class="jr"><label class="ck" style="margin:0"><input type="checkbox" data-k="'+j[0]+'"'+((cur[j[0]]||(j[0]=='j6'&&cur.cuci))?' checked':'')+'> '+(i+1)+'. '+j[1]+'</label>'+ex+'<input data-k="jb'+j[0].slice(1)+'" inputmode="numeric" placeholder="Rp" value="'+esc(cur['jb'+j[0].slice(1)])+'"></div>'});
 h+='</div><div class="card"><h3>Suku Cadang & Estimasi Harga</h3>';
 for(var i=0;i<5;i++)h+='<div class="jr p"><input data-k="p'+i+'n" placeholder="'+(i+1)+'. Nama suku cadang" value="'+esc(cur['p'+i+'n'])+'"><input data-k="p'+i+'h" inputmode="numeric" placeholder="Rp" value="'+esc(cur['p'+i+'h'])+'"></div>';
 h+='</div><div class="card"><h3>Saran Ganti Sparepart (periode KM)</h3><div class="cols">'+SPAREPART.map(function(p,k){return K('sp'+k,(p[0]?rp(p[0])+' — ':'')+p[1])}).join('')+'</div><h3 style="margin-top:10px">Paket Tambahan</h3><div class="cols">'+PAKET.map(function(p,k){return K('pk'+k,rp(p[0])+' — '+p[1])}).join('')+'</div></div>';
 h+='<div class="card"><h3>Keluhan & Analisa</h3>'+TA('keluhan','Keluhan konsumen',3)+TA('analisa','Analisa Service Advisor',3)+'<div class="f">'+S('konf','Jika ada tambahan pekerjaan / part',[['','-'],['Konfirmasi dulu','Konfirmasi dulu / telp'],['Langsung dikerjakan','Langsung dikerjakan']])+I('konf_telp','Telp ke')+S('bekas','Part bekas dibawa konsumen',YN)+'</div></div>';
 h+='<div class="card"><h3>Petugas</h3><div class="f">'+I('sa','Service Advisor')+I('mekanik','Nama mekanik / siswa praktik')+I('pembimbing','Pembimbing AHASS')+'</div>'+TA('saran','Saran mekanik')+'</div>';
 h+=fotoCard();
 h+='</form><div class="tot"><div class="tl"><small>Total</small><b id="tot">Rp 0</b></div><div class="tb"><button class="btn s" onclick="go(\'q\')">Batal</button><button class="btn" onclick="simpan()">'+(editId?'Simpan':'Daftarkan')+'</button></div></div>';
 setTimeout(function(){upd();foldInit();fotoThumbs()},0);return h;
}
var FOLD={},OPEN0=['Data Motor','Data Pemilik','Pekerjaan'];
function foldInit(){document.querySelectorAll('#fm>.card').forEach(function(c){var h=c.firstElementChild;if(!h||h.tagName!='H3')return;var key=h.textContent.trim().split(' \u2014 ')[0],cl=key in FOLD?FOLD[key]:!OPEN0.some(function(o){return key.indexOf(o)==0});if(cl)c.classList.add('cl');h.setAttribute('role','button');h.setAttribute('aria-expanded',cl?'false':'true');h.onclick=function(){var x=c.classList.toggle('cl');h.setAttribute('aria-expanded',x?'false':'true');FOLD[key]=x}})}
function collect(){var o={};document.querySelectorAll('#fm [data-k]').forEach(function(e){o[e.dataset.k]=e.type=='checkbox'?e.checked:e.value.trim()});if(o.plat)o.plat=o.plat.toUpperCase();return o}
var RWF=['tipe','tahun','noMesin','noRangka','email','sosmed','pb_nama','pb_hp','pb_alamat','pb_kel','pm_nama','pm_hp','pm_alamat','pm_kel','hub'],rwAuto={},rwKey='',rwN=0;
function np(t){return String(t||'').toUpperCase().replace(/[^A-Z0-9]/g,'')}
function riwayat(pl){var k=np(pl);if(k.length<4)return [];return db.jobs.filter(function(x){return np(x.d.plat)==k}).sort(function(a,b){return b.ts-a.ts})}
function rwHtml(l,n){return '<div class="card rw"><h3>Riwayat servis · '+l.length+' kali</h3>'+(n?'<p class="rwn">'+n+' kolom terisi otomatis dari data sebelumnya. Periksa kembali sebelum disimpan.</p>':'')+
 l.slice(0,3).map(function(x){return '<div class="rwi"><b>'+tglID(x.ts)+(x.d.km?' · KM '+esc(x.d.km):'')+'</b><span>'+esc(daftar(x))+(x.d.keluhan?' — '+esc(x.d.keluhan):'')+'</span></div>'}).join('')+
 (l.length>3?'<small class="mut">+'+(l.length-3)+' riwayat lainnya ada di Antrian dan Laporan.</small>':'')+'</div>'}
function fe(f){return document.querySelector('#fm [data-k="'+f+'"]')}
function chkPlat(ev){
 var e=ev&&ev.target;if(!e||!e.dataset||e.dataset.k!='plat'||editId)return;
 var box=$('rwy');if(!box)return;var k=np(e.value),l=riwayat(e.value),km=fe('km');
 if(!l.length){
  RWF.forEach(function(f){var el=fe(f);if(el&&rwAuto[f]!=null&&el.value==rwAuto[f])el.value=''});
  rwAuto={};rwKey='';rwN=0;if(km)km.placeholder='';
  box.innerHTML=k.length>=4?'<div class="card rw rw0"><small>Belum ada riwayat servis untuk plat ini (unit baru).</small></div>':'';return}
 if(rwKey!=k){
  rwKey=k;rwN=0;var na={};
  RWF.forEach(function(f){var el=fe(f);if(!el)return;var v='';for(var i=0;i<l.length;i++){if(l[i].d[f]){v=l[i].d[f];break}}
   if(!el.value.trim()||(rwAuto[f]!=null&&el.value==rwAuto[f])){el.value=v;if(v){na[f]=v;rwN++}}});
  rwAuto=na;if(km)km.placeholder=l[0].d.km?'Terakhir: '+l[0].d.km:'';upd()}
 box.innerHTML=rwHtml(l,rwN)}
var DEFP={MPX:78500,SPX:93500};
function autoPrice(e){var t=e.target,k=t.dataset&&t.dataset.k;if(!k)return;var f=document.getElementById('fm');if(!f)return;
 var q=function(n){return f.querySelector('[data-k="'+n+'"]')};
 var isDef=function(v){v=String(v||'').replace(/\D/g,'');return !v||v=='60000'||v=='78500'||v=='93500'};
 var setP=function(n,val){var p=q('jb'+n);if(p&&isDef(p.value))p.value=val?String(val):''};
 if(k=='j1')setP(1,t.checked?60000:0);
 else if(k=='svc'){if(t.value){q('j1').checked=true;setP(1,60000)}}
 else if(k=='j2'){var o=q('oli').value;setP(2,t.checked?(DEFP[o]||0):0)}
 else if(k=='oli'){if(t.value){q('j2').checked=true;setP(2,DEFP[t.value])}}}
function upd(){var e=$('tot');if(e)e.textContent=R0(totalOf(collect()))}

function edit(i){if(lockd(jf(i))){alert('Data sudah diambil dan dikunci. Hanya admin yang bisa mengubahnya.');return}editId=i;cur=jf(i).d;tab='new';render()}
function vQ(){return '<div class="row"><input placeholder="Cari plat / nama / no. servis / rangka / mesin" value="'+esc(srch)+'" oninput="srch=this.value;rq()"><select onchange="filt=this.value;rq()">'+['Semua'].concat(ST).concat(can('del')?['Arsip']:[]).map(function(s){return '<option'+(s==filt?' selected':'')+'>'+s+'</option>'}).join('')+'</select></div><div id="ql">'+ql()+'</div>'}
function qHit(x,q){var d=x.d||{},t=String(q).toLowerCase().trim(),n=np(q);
 if([d.plat,d.pm_nama,d.pb_nama,x.no,d.tipe,d.noRangka,d.noMesin].join(' ').toLowerCase().indexOf(t)>-1)return true;
 return n.length>=3&&(np(d.plat)+' '+np(d.noRangka)+' '+np(d.noMesin)+' '+np(x.no)).indexOf(n)>-1}
function ql(){var l=db.jobs.filter(function(x){return(filt=='Arsip'?!!x.arsip:(!x.arsip&&(filt=='Semua'||x.status==filt)))&&(!srch||qHit(x,srch))});l.sort(function(a,b){return a.ts-b.ts});return l.length?l.map(card).join(''):'<div class="card empty">Tidak ada data.</div>'}
function rq(){$('ql').innerHTML=ql()}
function inRep(x){var t=x.ts,n=new Date(),sod=new Date(n.getFullYear(),n.getMonth(),n.getDate()).getTime();
 if(repF=='Hari ini')return t>=sod;if(repF=='7 hari')return t>=sod-6*864e5;if(repF=='30 hari')return t>=sod-29*864e5;
 if(repF=='Bulan ini'){var d=new Date(t);return d.getMonth()==n.getMonth()&&d.getFullYear()==n.getFullYear()}return true}
function repList(){return db.jobs.filter(inRep)}
function setRF(v){repF=v;$('app').innerHTML=vRep()}
function shortRp(n){return n>=1e6?(n/1e6).toFixed(1).replace('.',',')+' jt':n>=1000?Math.round(n/1000)+' rb':String(n)}

var REMK='bc_rem_m',REMC='bc_rem_c';
function remM(){var v=kv(REMK);return(v==1||v==2||v==3||v==4)?v:3}
function setRM(v){kv(REMK,v);$('app').innerHTML=vRem()}
function waNo(t){var n=String(t||'').replace(/\D/g,'');if(!n)return '';if(n.indexOf('62')==0)return n;if(n.charAt(0)=='0')return '62'+n.slice(1);if(n.charAt(0)=='8')return '62'+n;return n}
function remList(){
 var g={},now=Date.now(),M=remM(),out=[];
 db.jobs.forEach(function(x){var k=np(x.d.plat);if(k.length<4)return;(g[k]=g[k]||[]).push(x)});
 Object.keys(g).forEach(function(k){
  var a=g[k].sort(function(p,q){return q.ts-p.ts}),last=null,open=false;
  for(var i=0;i<a.length;i++){var st=a[i].status;if(st=='Selesai'||st=='Diambil'){last=a[i];break}open=true}
  if(!last||open)return;
  var mo=(now-last.ts)/(30.44*864e5);if(mo<M)return;
  out.push({k:k,x:last,mo:mo,n:a.length})});
 return out.sort(function(p,q){return q.mo-p.mo})}
function remMsg(r){var d=r.x.d,nm=d.pm_nama||d.pb_nama||'';
 return 'Halo '+(nm?'Bapak/Ibu '+nm:'Bapak/Ibu')+', kami dari Business Center TBSM SMKS Darul Fatwa. Motor '+(d.tipe?d.tipe+' ':'')+'('+String(d.plat||'').toUpperCase()+') terakhir servis pada '+tglID(r.x.ts)+(d.km?' (KM '+rp(num(d.km))+')':'')+'. Sudah waktunya servis berikutnya. Kami tunggu kedatangannya. Terima kasih.'}
function remMark(k){var c=kv(REMC)||{};c[k]=Date.now();kv(REMC,c);setTimeout(function(){if(tab=='rem')$('app').innerHTML=vRem()},400)}
function vRem(){
 var M=remM(),l=remList(),c=kv(REMC)||{};
 var chips='<div class="chps">'+[1,2,3,4].map(function(v){return '<button class="chp'+(M==v?' on':'')+'" onclick="setRM('+v+')">'+v+' bulan</button>'}).join('')+'</div>';
 var rows=l.length?l.map(function(r){var d=r.x.d,no=waNo(d.pm_hp||d.pb_hp),mo=Math.floor(r.mo),ct=c[r.k];
  var wa=no?'<a class="btn s" target="_blank" rel="noopener" href="https://wa.me/'+no+'?text='+encodeURIComponent(remMsg(r))+'" onclick="remMark(\''+r.k+'\')">Kirim WhatsApp</a>':'<span class="mut">Nomor HP belum diisi</span>';
  return '<div class="rmc"><b>'+esc(String(d.plat||'').toUpperCase())+(d.tipe?' · '+esc(d.tipe):'')+'</b><span>'+esc(d.pm_nama||d.pb_nama||'-')+'</span><span>Servis terakhir '+tglID(r.x.ts)+' · <b class="late" style="display:inline">'+mo+' bulan lalu</b>'+(d.km?' · KM '+esc(rp(num(d.km))):'')+'</span><div class="rma">'+wa+(ct?'<span class="mut">Dihubungi '+tglID(ct)+'</span>':'')+'</div></div>'}).join(''):'<p class="mut">Tidak ada unit yang sudah lewat '+M+' bulan dari servis terakhir.</p>';
 return '<section class="dh"><span class="ey">Unit jatuh tempo servis</span><h2 class="big">'+l.length+'</h2><p class="rp">Servis terakhir lebih dari '+M+' bulan lalu</p></section>'+chips+
  '<div class="card"><h3>Daftar pengingat</h3>'+rows+'</div>'+
  '<p class="mut">Dihitung dari servis terakhir yang berstatus Selesai atau Diambil (termasuk data arsip). Unit yang sedang diservis tidak ditampilkan. Tanda "Dihubungi" hanya tersimpan di HP ini. Pesan WhatsApp dikirim manual oleh petugas.</p>'}

/* ===== Foto kondisi motor (disimpan di Google Drive lewat function foto-drive) ===== */
var FMAX=12,FC={},FLB={sebelum:'Sebelum',sesudah:'Sesudah',plat:'No. Polisi',noMesin:'No. Mesin',noRangka:'No. Rangka'};
function fotoLbl(k){return FLB[k]||'Foto'}
function fotoList(d){var a=[];try{a=JSON.parse((d&&d.fotos)||'[]')}catch(e){}return Array.isArray(a)?a:[]}
function fotoCur(){var e=fe('fotos');return fotoList({fotos:e?e.value:cur.fotos})}
function fotoSet(a){var e=fe('fotos');if(e)e.value=JSON.stringify(a)}
async function fapi(o){
 if(!CFG.functionId)throw new Error('functionId belum diisi di config.js');
 var ex=await AW.f.createExecution({functionId:CFG.functionId,body:JSON.stringify(Object.assign({action:'foto'},o)),async:false,path:'/',method:(Appwrite.ExecutionMethod?Appwrite.ExecutionMethod.POST:'POST')});
 var r={};try{r=JSON.parse(ex.responseBody||'{}')}catch(e){}
 if(ex.responseStatusCode>=400||r.ok===false)throw new Error(r.error||('Kesalahan '+ex.responseStatusCode));
 return r}
function fotoCard(){
 var hid='<input type="hidden" data-k="fotos" value="'+esc(cur.fotos||'[]')+'">';
 if(!REMOTE||!CFG.functionId)return '<div class="card"><h3>Foto Kondisi Motor</h3>'+hid+'<p class="mut">Fitur foto belum diaktifkan (functionId di config.js belum diisi).</p></div>';
 return '<div class="card"><h3>Foto Kondisi Motor</h3>'+hid+'<div class="fbt" style="margin-top:8px"><label class="btn s">Kamera Sebelum<input type="file" accept="image/*" capture="environment" onchange="fotoAdd(this,\'sebelum\')"></label><label class="btn s">Galeri Sebelum<input type="file" accept="image/*" multiple onchange="fotoAdd(this,\'sebelum\')"></label></div><div class="fbt" style="margin-top:8px"><label class="btn s">Kamera Sesudah<input type="file" accept="image/*" capture="environment" onchange="fotoAdd(this,\'sesudah\')"></label><label class="btn s">Galeri Sesudah<input type="file" accept="image/*" multiple onchange="fotoAdd(this,\'sesudah\')"></label></div><small class="mut" id="fmsg">Maksimal '+FMAX+' foto. Foto No. Polisi, No. Mesin, dan No. Rangka dari kamera otomatis ikut tersimpan di sini sebagai bukti klaim garansi. Kalau offline, foto disimpan di HP dan diunggah otomatis saat ada internet.</small><div class="fth" id="fth"></div></div>'}
function fotoThumbs(){
 var b=$('fth');if(!b)return;var a=fotoCur();
 b.innerHTML=a.map(function(f,i){return '<div class="ft" data-id="'+esc(f.id)+'">'+(FC[f.id]?'<img src="'+FC[f.id]+'" onclick="fotoBig(\''+esc(f.id)+'\',\''+esc(f.k)+'\')" alt="">':'Memuat…')+'<b>'+fotoLbl(f.k)+'</b>'+(FQ[f.id]?'<em>Menunggu</em>':'')+'<button type="button" class="x" onclick="fotoDel('+i+')" aria-label="Hapus foto">×</button></div>'}).join('');
 a.forEach(function(f){if(!FC[f.id])fotoLoad(f.id,function(){fotoThumbs()})})}
async function fotoLoad(id,cb){
 if(FC[id]){cb&&cb();return}
 try{var r=await fapi({op:'get',id:id});FC[id]='data:image/jpeg;base64,'+r.data}catch(e){FC[id]='data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="#888"/><text x="50" y="54" font-size="11" fill="#fff" text-anchor="middle">Gagal</text></svg>')}
 cb&&cb()}
function fotoShrink(file){return new Promise(function(res,rej){
 var u=URL.createObjectURL(file),im=new Image();
 im.onload=function(){var m=1280,w=im.width,h=im.height,k=Math.min(1,m/Math.max(w,h)),c=document.createElement('canvas');c.width=Math.round(w*k);c.height=Math.round(h*k);c.getContext('2d').drawImage(im,0,0,c.width,c.height);URL.revokeObjectURL(u);var d=c.toDataURL('image/jpeg',.72);res(d)};
 im.onerror=function(){URL.revokeObjectURL(u);rej(new Error('Foto tidak bisa dibaca'))};im.src=u})}
async function fotoAdd(inp,k){
 var fs=Array.prototype.slice.call(inp.files||[]);inp.value='';if(!fs.length)return;
 for(var i=0;i<fs.length;i++){
  if(fotoCur().length>=FMAX){alert('Maksimal '+FMAX+' foto per servis.');break}
  try{await fotoPut(k,await fotoShrink(fs[i]))}catch(e){alert('Foto gagal disimpan: '+(e.message||e));break}}}
async function fotoDel(i){
 if(!confirm('Lepas foto ini dari data servis? Berkas di Google Drive tidak dihapus.'))return;
 var a=fotoCur(),f=a.splice(i,1)[0];fotoSet(a);fotoThumbs();
 if(f&&FQ[f.id]){delete FQ[f.id];try{await qDel(f.id)}catch(e){}synUI()}}

async function fotoEvid(k,cv){
 if(!REMOTE||!CFG.functionId||!fe('fotos')||!FLB[k])return;
 var du;try{du=cv.toDataURL('image/jpeg',.8)}catch(e){return}
 try{await fotoPut(k,du,true)}catch(e){var m=$('fmsg');if(m)m.textContent='Foto '+fotoLbl(k)+' gagal disimpan: '+(e.message||e)}}
var QDB=null,FQ={},FFB=false;
function qOpen(){return new Promise(function(res,rej){if(QDB)return res(QDB);if(!window.indexedDB)return rej(new Error('Penyimpanan HP tidak tersedia'));var r=indexedDB.open('bcfoto',1);r.onupgradeneeded=function(){r.result.createObjectStore('q',{keyPath:'key'})};r.onsuccess=function(){QDB=r.result;res(QDB)};r.onerror=function(){rej(r.error)}})}
function qTx(m,fn){return qOpen().then(function(db){return new Promise(function(res,rej){var t=db.transaction('q',m),rq=fn(t.objectStore('q'));t.oncomplete=function(){res(rq&&rq.result)};t.onerror=function(){rej(t.error)}})})}
function qPut(o){return qTx('readwrite',function(st){return st.put(o)})}
function qDel(k){return qTx('readwrite',function(st){return st.delete(k)})}
function qAll(){return qTx('readonly',function(st){return st.getAll()})}
function fotoKey(){return 'qk'+Date.now().toString(36)+Math.random().toString(36).slice(2,8)}
async function fotoPut(k,du,replace){
 if(fotoCur().length>=FMAX&&!replace)throw new Error('Maksimal '+FMAX+' foto per servis');
 var key=fotoKey(),no=editId?(jf(editId)||{}).no:'baru',m=$('fmsg');
 await qPut({key:key,k:k,no:no||'baru',data:du,ts:Date.now()});
 FQ[key]=1;FC[key]=du;
 var a=fotoCur();if(replace)a=a.filter(function(f){return f.k!=k});a.push({id:key,k:k,t:Date.now()});fotoSet(a);fotoThumbs();synUI();
 if(m)m.textContent='Foto '+fotoLbl(k)+(navigator.onLine?' diunggah ke Google Drive…':' disimpan di HP dan akan diunggah otomatis saat ada internet')+'. Tekan Simpan untuk menautkan ke data servis.';
 fotoFlush()}
async function fotoFlush(){
 if(FFB||!REMOTE||!CFG.functionId||!AW.u||!navigator.onLine)return;
 FFB=true;
 try{
  var rows=await qAll();
  for(var i=0;i<rows.length;i++){var r=rows[i];
   try{await fapi({op:'up',key:r.key,k:r.k,no:r.no,data:r.data.split(',')[1]});await qDel(r.key);delete FQ[r.key];fotoThumbs();synUI();var m=$('fmsg');if(m)m.textContent='Foto '+fotoLbl(r.k)+' tersimpan di Google Drive.'}
   catch(e){var t=String((e&&e.message)||e);if(/tidak valid|format JPEG/.test(t)){await qDel(r.key);delete FQ[r.key]}else break}}
 }catch(e){}
 FFB=false;synUI()}
async function fotoBoot(){try{var rows=await qAll();rows.forEach(function(r){FQ[r.key]=1;FC[r.key]=r.data});synUI();fotoFlush()}catch(e){}}
addEventListener('online',function(){setTimeout(fotoFlush,1500)});setInterval(fotoFlush,45000);
function fotoBig(id,k){fotoLb(id,k)}
function fotoLb(id,k){
 var o=document.createElement('div');o.id='lbx';o.onclick=function(){o.remove()};
 o.innerHTML='<button class="btn s" type="button">Tutup</button><img alt=""><p>'+fotoLbl(k)+'</p>';
 document.body.appendChild(o);var im=o.querySelector('img');
 if(FC[id])im.src=FC[id];else fotoLoad(id,function(){im.src=FC[id]})}
function fotoView(i){
 var x=jf(i);if(!x)return;var OR=['plat','noMesin','noRangka','sebelum','sesudah'],a=fotoList(x.d).sort(function(p,q){return OR.indexOf(p.k)-OR.indexOf(q.k)});if(!a.length)return;
 var o=document.createElement('div');o.id='lbx';o.style.overflow='auto';o.style.justifyContent='flex-start';
 o.innerHTML='<button class="btn s" type="button" onclick="this.parentNode.remove()">Tutup</button><p style="margin:36px 0 8px"><b>'+esc(x.d.plat)+'</b> · '+esc(x.no)+'</p><div class="fth" style="width:100%;max-width:640px" id="fvg"></div>';
 document.body.appendChild(o);
 var g=o.querySelector('#fvg');
 function draw(){g.innerHTML=a.map(function(f){return '<div class="ft">'+(FC[f.id]?'<img src="'+FC[f.id]+'" onclick="event.stopPropagation();fotoLb(\''+esc(f.id)+'\',\''+esc(f.k)+'\')" alt="">':'Memuat…')+'<b>'+fotoLbl(f.k)+'</b></div>'}).join('')}
 draw();a.forEach(function(f){fotoLoad(f.id,draw)})}

/* ===== Cek Garansi (aturan mengikuti teks Garansi pada form servis) ===== */
function garRule(x){var d=x.d||{},prem=/CBR\s*250|PCX\s*150/i.test(d.tipe||''),bk=!!(d.j4||num(d.jb4));
 if(prem&&bk)return {km:1500,days:45,t:'1.500 km / 45 hari'};
 if(prem||bk)return {km:1000,m:1,t:'1.000 km / 1 bulan'};
 return {km:500,days:7,t:'500 km / 1 minggu'}}
function garEnd(ts,r){var e=new Date(ts);if(r.m)e.setMonth(e.getMonth()+r.m);else e.setDate(e.getDate()+r.days);e.setHours(23,59,59,999);return e}
function garEval(x,kmNow,now){
 var r=garRule(x),e=garEnd(x.ts,r),tOk=now<=e,left=Math.ceil((e-now)/864e5),kmS=num(x.d&&x.d.km),k=null,v;
 if(kmNow>0&&kmS>0){k={run:kmNow-kmS};k.ok=k.run>=0&&k.run<=r.km}
 if(!tOk||(k&&!k.ok&&k.run>=0))v='no';else if(k&&k.run<0)v='wa';else if(k)v='ok';else v='wa';
 return {r:r,end:e,tOk:tOk,left:left,k:k,v:v,kmS:kmS}}
function garList(q,kmNow){
 var n=np(q);if(n.length<3)return null;
 return db.jobs.filter(function(x){var d=x.d||{};return (x.status=='Selesai'||x.status=='Diambil')&&(np(d.plat).indexOf(n)>-1||np(d.noRangka).indexOf(n)>-1||np(d.noMesin).indexOf(n)>-1)}).sort(function(a,b){return b.ts-a.ts})}
function garRes(){
 var q=($('gq')||{}).value||'',kn=num(($('gk')||{}).value),l=garList(q,kn),now=Date.now();
 if(l===null)return '<p class="mut">Ketik minimal 3 karakter No. Polisi, No. Rangka, atau No. Mesin.</p>';
 if(!l.length)return '<div class="card empty">Tidak ada servis selesai untuk "'+esc(q)+'". Garansi tidak bisa dipastikan dari data ini.</div>';
 return l.slice(0,10).map(function(x){var d=x.d,g=garEval(x,kn,now),fa=fotoList(d).length,
  vt=g.v=='ok'?'MASIH GARANSI':g.v=='no'?'DI LUAR GARANSI':'WAKTU MASIH BERLAKU';
  var kl=g.k?(g.k.run<0?'KM saat ini lebih kecil dari KM servis ('+rp(g.kmS)+'). Periksa angkanya.':'Menempuh '+rp(g.k.run)+' km sejak servis (batas '+rp(g.r.km)+' km)'+(g.k.ok?'.':', melewati batas.')):(kn>0&&!g.kmS?'KM servis tidak tercatat, KM belum bisa dihitung.':'Isi KM saat ini untuk memeriksa batas '+rp(g.r.km)+' km.');
  return '<div class="card"><div class="rmc" style="border:0;padding:0"><b>'+esc(String(d.plat||'').toUpperCase())+(d.tipe?' · '+esc(d.tipe):'')+'</b><span>'+esc(x.no)+' · servis '+tglID(x.ts)+(g.kmS?' · KM '+esc(rp(g.kmS)):'')+'</span><span>'+esc(daftar(x))+'</span><span>Rangka: '+esc(d.noRangka||'-')+' · Mesin: '+esc(d.noMesin||'-')+'</span>'+
  '<div class="rma"><span class="gv '+g.v+'">'+vt+'</span></div>'+
  '<span>Aturan: '+g.r.t+'. Waktu '+(g.tOk?'berlaku sampai '+tglID(g.end.getTime())+' (sisa '+g.left+' hari).':'berakhir pada '+tglID(g.end.getTime())+'.')+'</span><span>'+kl+'</span>'+
  (fa?'<div class="rma"><button class="btn s" onclick="fotoView(\''+x.id+'\')">Foto bukti ('+fa+')</button></div>':'<span>Belum ada foto bukti pada servis ini.</span>')+'</div></div>'}).join('')+(l.length>10?'<p class="mut">Menampilkan 10 dari '+l.length+' servis terbaru.</p>':'')}
function garGo(){var r=$('garRes');if(r)r.innerHTML=garRes()}
function vGar(){
 return '<div class="card"><h3>Cek Garansi Servis</h3><label class="fld"><span>No. Polisi / No. Rangka / No. Mesin</span><input id="gq" autocomplete="off" autocapitalize="characters" placeholder="mis. E 5380 JT" oninput="garGo()"></label><label class="fld"><span>KM saat ini (opsional)</span><input id="gk" inputmode="numeric" placeholder="mis. 12800" oninput="garGo()"></label></div><div id="garRes">'+garRes()+'</div>'+
 '<p class="mut">Aturan mengikuti teks Garansi pada form servis: 500 km / 1 minggu (service reguler), 1.000 km / 1 bulan (bongkar mesin reguler, atau service CBR 250 dan PCX 150), 1.500 km / 45 hari (bongkar mesin CBR 250 dan PCX 150). Pekerjaan "Turun Mesin" dianggap bongkar mesin. Waktu dihitung dari tanggal servis. Keputusan klaim tetap di tangan petugas dan AHASS. Cocokkan nomor rangka dan mesin dengan foto bukti.</p>'}
function vRep(){
 var l=repList(),m=can('money'),dn=l.filter(function(x){return x.status=='Selesai'||x.status=='Diambil'}),t=dn.reduce(function(a,x){return a+revOf(x)},0),avg=dn.length?Math.round(t/dn.length):0;
 var hero='<section class="dh"><span class="ey">'+(m?'Total pendapatan':'Total unit')+'</span><h2 class="big">'+(m?R0(t):l.length)+'</h2><p class="rp">Periode: '+repF+'</p>'+
  '<div class="kp"><div><b>'+l.length+'</b><span>Total unit</span></div><div><b>'+dn.length+'</b><span>Servis selesai</span></div>'+(m?'<div><b class="kpm">Rp '+shortRp(avg)+'</b><span>Rata-rata / unit</span></div>':'<div><b>'+(l.length-dn.length)+'</b><span>Masih proses</span></div>')+'</div></section>';
 var chips='<div class="chps">'+['Semua','Hari ini','7 hari','30 hari','Bulan ini'].map(function(k){return '<button class="chp'+(repF==k?' on':'')+'" onclick="setRF(\''+k+'\')">'+k+'</button>'}).join('')+'</div>';
 var HR=['Min','Sen','Sel','Rab','Kam','Jum','Sab'],bars=[],mx=1,i,d,n;
 if(m){for(i=6;i>=0;i--){d=new Date(Date.now()-i*864e5);n=db.jobs.filter(function(x){return (x.status=='Selesai'||x.status=='Diambil')&&new Date(x.ts).toDateString()==d.toDateString()}).reduce(function(a,x){return a+revOf(x)},0);bars.push([HR[d.getDay()],n,i==0]);if(n>mx)mx=n}}
 var ch=m?'<div class="card"><h3>Pendapatan 7 hari terakhir</h3><div class="bars">'+bars.map(function(b){return '<div class="bc'+(b[2]?' td':'')+'"><em>'+(b[1]?shortRp(b[1]):'0')+'</em><i style="height:'+Math.max(4,Math.round(b[1]/mx*100))+'%"></i><span>'+b[0]+'</span></div>'}).join('')+'</div></div>':'';
 var isDn=function(x){return x.status=='Selesai'||x.status=='Diambil'},mb=[],mmx=1,nw=new Date(),q,mm,mt;
 if(m){for(q=5;q>=0;q--){mm=new Date(nw.getFullYear(),nw.getMonth()-q,1);mt=db.jobs.filter(function(x){var z=new Date(x.ts);return isDn(x)&&z.getMonth()==mm.getMonth()&&z.getFullYear()==mm.getFullYear()}).reduce(function(a,x){return a+revOf(x)},0);mb.push([BLN[mm.getMonth()].slice(0,3),mt,q==0]);if(mt>mmx)mmx=mt}}
 var chm=m?'<div class="card"><h3>Pendapatan 6 bulan terakhir</h3><div class="bars">'+mb.map(function(b){return '<div class="bc'+(b[2]?' td':'')+'"><em>'+(b[1]?shortRp(b[1]):'0')+'</em><i style="height:'+Math.max(4,Math.round(b[1]/mmx*100))+'%"></i><span>'+b[0]+'</span></div>'}).join('')+'</div></div>':'';
 var mk={},jn={},JL=['KPB','Servis','Ganti Oli','Ganti Part','Turun Mesin'];
 l.forEach(function(x){var d=x.d,nm=(d.mekanik||'').trim()||'(Belum diisi)';mk[nm]=mk[nm]||{u:0,t:0};mk[nm].u++;if(isDn(x))mk[nm].t+=revOf(x);for(var i=0;i<7;i++){if(d['j'+i]||d['jb'+i]||(i==6&&d.cuci)){var jl=i<5?JL[i]:i==5?(d.j5t||'Lainnya'):'Cuci Motor';jn[jl]=(jn[jl]||0)+1}}});
 var mkr=Object.keys(mk).sort(function(a,b){return mk[b].u-mk[a].u}),jnr=Object.keys(jn).sort(function(a,b){return jn[b]-jn[a]});
 var rk=l.length?'<div class="card"><h3>Rekap per mekanik</h3>'+mkr.map(function(k){return '<div class="ri"><div><b>'+esc(k)+'</b></div><div style="text-align:right"><span>'+mk[k].u+' unit</span>'+(m&&mk[k].t?'<b class="amt">'+R0(mk[k].t)+'</b>':'')+'</div></div>'}).join('')+'</div><div class="card"><h3>Jenis pekerjaan terbanyak</h3>'+(jnr.length?jnr.map(function(k){return '<div class="ri"><div><b>'+esc(k)+'</b></div><div style="text-align:right"><span>'+jn[k]+' kali</span></div></div>'}).join(''):'<p class="mut">Belum ada pekerjaan tercatat.</p>')+'</div>':'';
 var cuN=function(x){return x.d.j6||num(x.d.jb6)||x.d.cuci},cu=dn.filter(cuN).length,slN=dn.filter(function(x){return x.d.j1||num(x.d.jb1)}).length,cuR=dn.reduce(function(a,x){return a+num(x.d.jb6)},0),cbk=can('cb')?'<div class="card"><h3>Cashback &amp; Cuci Motor</h3><div class="ri"><div><b>Cashback per unit servis</b><span>'+slN+' unit Service Lengkap Ringan selesai x '+R0(CASHBACK)+'</span></div><div style="text-align:right"><b class="amt">'+R0(slN*CASHBACK)+'</b></div></div><div class="ri"><div><b>Cuci Motor</b><span>unit selesai yang dicuci</span></div><div style="text-align:right"><span>'+cu+' unit</span>'+(m&&cuR?'<b class="amt">'+R0(cuR)+'</b>':'')+'</div></div></div>':'';
 var pdfb='<button class="btn s w xl" style="margin-top:8px" onclick="repPdf()">'+ic('download')+'<span>Cetak PDF ('+l.length+' baris)</span></button>';
 var dl='<button class="btn w xl" onclick="xls()">'+ic('download')+'<span>Unduh Excel ('+l.length+' baris)</span></button>';
 var rows=l.length?'<div class="card rcl">'+l.map(function(x){var d=x.d;return '<div class="ri"><div><b>'+esc(d.plat)+(d.tipe?' · '+esc(d.tipe):'')+'</b><span>'+esc(x.no)+' · '+tglID(x.ts)+'</span><span>'+esc(d.pm_nama||'-')+' · '+esc(daftar(x))+'</span></div><div style="text-align:right"><span class="tag '+x.status+'">'+slb(x.status)+'</span>'+(m?'<b class="amt">'+R0(totalOf(d))+'</b>':'')+'</div></div>'}).join('')+'</div>':'<div class="card empty">Belum ada data pada periode ini.</div>';
 return hero+chips+cbk+(m?payCard(dn):'')+ch+chm+dl+pdfb+rk+'<h2>Rincian servis <small class="cnt">'+l.length+' unit</small></h2>'+rows;
}
function loadXLSX(){return new Promise(function(ok,no){if(window.XLSX)return ok();var s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';s.onload=ok;s.onerror=no;document.head.appendChild(s)})}
function saveBlob(b,fn){var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=fn;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},1500)}
function repPdf(){var l=repList().slice().sort(function(a,b){return a.ts-b.ts});if(!l.length){alert('Belum ada data untuk dicetak.');return}
 if(!window.jspdf){alert('Pustaka PDF belum termuat. Periksa koneksi internet.');return}
 var d=new window.jspdf.jsPDF({unit:'mm',format:'a4'}),m=can('money'),y=16,cut=function(t,n){t=String(t||'-');return t.length>n?t.slice(0,n-1)+'...':t},
  dn=l.filter(function(x){return x.status=='Selesai'||x.status=='Diambil'}),tot=dn.reduce(function(a,x){return a+revOf(x)},0);
 try{d.addImage(IMG.df,'JPEG',14,10,22,22)}catch(e){}
 d.setFont('helvetica','bold');d.setFontSize(16);d.text('Business Center TBSM',105,17,{align:'center'});
 d.setFontSize(12);d.text('SMKS Darul Fatwa',105,23,{align:'center'});
 d.setFont('helvetica','normal');d.setFontSize(8);d.text('Jl. Letda Lukito No.90, Jatiroke, Kec. Jatinangor, Kab. Sumedang, Jawa Barat 45363',105,28.5,{align:'center'});
 d.setLineWidth(.8);d.line(14,35,196,35);d.setLineWidth(.2);d.line(14,36.2,196,36.2);
 y=45;d.setFont('helvetica','bold');d.setFontSize(12);d.text('Laporan Servis per '+tglID(Date.now()),105,y,{align:'center'});y+=7;
 d.setFont('helvetica','normal');d.setFontSize(9);
 d.text('Periode: '+repF+'   |   Total unit: '+l.length+'   |   Selesai: '+dn.length,14,y);y+=6;
 if(m){d.setFont('helvetica','bold');d.text('Pendapatan bersih setelah diskon (unit selesai/diambil): '+R0(tot),14,y);d.setFont('helvetica','normal');y+=6}
 if(can('cb')){var slc=dn.filter(function(x){return x.d.j1||num(x.d.jb1)}).length,cuc=dn.filter(function(x){return x.d.j6||num(x.d.jb6)||x.d.cuci}).length,cur=dn.reduce(function(a,x){return a+num(x.d.jb6)},0);
  y+=1;d.setDrawColor(150);d.setLineWidth(.2);d.rect(14,y-4,182,15);
  d.text('Cashback: '+slc+' unit Service Lengkap Ringan x '+R0(CASHBACK),17,y+1);d.setFont('helvetica','bold');d.text(R0(slc*CASHBACK),193,y+1,{align:'right'});d.setFont('helvetica','normal');
  d.text('Cuci Motor: '+cuc+' unit',17,y+7.5);d.setFont('helvetica','bold');d.text(R0(cur),193,y+7.5,{align:'right'});d.setFont('helvetica','normal');d.setDrawColor(0);y+=17}
 y+=2;
 var head=function(){d.setFont('helvetica','bold');d.setFontSize(8.5);d.text('No. Servis',14,y);d.text('Tanggal',50,y);d.text('Plat',78,y);d.text('Pemilik',102,y);d.text('Status',142,y);if(m)d.text('Total',196,y,{align:'right'});d.setLineWidth(.2);d.line(14,y+1.5,196,y+1.5);y+=6;d.setFont('helvetica','normal')};
 head();
 l.forEach(function(x){if(y>280){d.addPage();y=16;head()}var z=x.d;d.setFontSize(8.5);d.text(cut(x.no,22),14,y);d.text(tglID(x.ts),50,y);d.text(cut(z.plat,14),78,y);d.text(cut(z.pm_nama,22),102,y);d.text(slb(x.status),142,y);if(m)d.text(R0(revOf(x)),196,y,{align:'right'});y+=5.5});
 if(m){var all=l.reduce(function(a,x){return a+revOf(x)},0);if(y>270){d.addPage();y=16}d.setLineWidth(.4);d.line(14,y-3.5,196,y-3.5);d.setFont('helvetica','bold');d.setFontSize(9);d.text('TOTAL'+(all!=tot?' (semua status)':''),142,y+1,{align:'right'});d.text(R0(all),196,y+1,{align:'right'});y+=6;if(all!=tot){d.text('TOTAL (selesai/diambil)',142,y+1,{align:'right'});d.text(R0(tot),196,y+1,{align:'right'});y+=6}d.setFont('helvetica','normal')}
 var pg=d.internal.getNumberOfPages();for(var i=1;i<=pg;i++){d.setPage(i);d.setFontSize(7.5);d.text('Dicetak '+tglID(Date.now())+' '+hhmm()+' oleh '+cut(who(),30)+' | Business Center TBSM SMKS Darul Fatwa | Hal '+i+'/'+pg,14,291)}
 d.save('Laporan-Servis-'+new Date().toISOString().slice(0,10)+'.pdf')}
async function xls(){
 var l=repList();if(!l.length){alert('Belum ada data untuk diunduh.');return}
 var A=[['No','Tanggal','Plat','Type','KM','Pemilik','HP','Pekerjaan','Mekanik','Pembimbing','Status','Total (Rp)','Diskon (Rp)','Netto (Rp)','Metode bayar','Pit']].concat(l.map(function(x){var d=x.d;return [x.no,tglID(x.ts),d.plat,d.tipe,d.km,d.pm_nama,d.pm_hp,daftar(x),d.mekanik,d.pembimbing,x.status,totalOf(d),(x.tw&&x.tw.pay?num(x.tw.pay.disc):0),revOf(x),(x.tw&&x.tw.pay?x.tw.pay.m:''),pitOf(x)]}));
 var tot=l.reduce(function(a,x){return a+totalOf(x.d)},0),tn=l.reduce(function(a,x){return a+revOf(x)},0);A.push(['','','','','','','','','','','TOTAL',tot,tot-tn,tn,'','']);
 var fn='Laporan-Service-Point-'+new Date().toISOString().slice(0,10);
 try{await loadXLSX();var ws=XLSX.utils.aoa_to_sheet(A);ws['!cols']=[{wch:15},{wch:16},{wch:12},{wch:14},{wch:10},{wch:20},{wch:15},{wch:30},{wch:18},{wch:18},{wch:12},{wch:14},{wch:14},{wch:14},{wch:14},{wch:8}];
  for(var r=2;r<=A.length;r++){if(ws['L'+r])ws['L'+r].z='#,##0';if(ws['M'+r])ws['M'+r].z='#,##0';if(ws['N'+r])ws['N'+r].z='#,##0'}
  var wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,'Laporan Servis');XLSX.writeFile(wb,fn+'.xlsx')
 }catch(e){
  var h='<html xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="utf-8"></head><body><table border="1">'+A.map(function(r,i){return '<tr>'+r.map(function(c){return (i==0?'<th>':'<td>')+esc(c)+(i==0?'</th>':'</td>')}).join('')+'</tr>'}).join('')+'</table></body></html>';
  saveBlob(new Blob(['\ufeff'+h],{type:'application/vnd.ms-excel'}),fn+'.xls')}
}
function pdfWait(on){var o=document.getElementById('pdfw');if(!on){if(o)o.remove();return}if(o)return;o=document.createElement('div');o.id='pdfw';o.style.cssText='position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:99;background:#111;color:#fff;padding:10px 16px;border-radius:99px;font-size:13px;box-shadow:0 4px 16px rgba(0,0,0,.4)';o.textContent='Menyiapkan PDF dan foto…';document.body.appendChild(o)}
function imgSz(du){return new Promise(function(res){var im=new Image();im.onload=function(){res({w:im.naturalWidth||im.width,h:im.naturalHeight||im.height})};im.onerror=function(){res(null)};im.src=du})}
async function pdfFoto(d,x,a,sy){
 var OR=['plat','noMesin','noRangka','sebelum','sesudah'],L=[];
 a=a.slice().sort(function(p,q){return OR.indexOf(p.k)-OR.indexOf(q.k)});
 for(var i=0;i<a.length;i++){
  await new Promise(function(r){fotoLoad(a[i].id,r)});
  var du=FC[a[i].id];if(!du||du.indexOf('data:image/jpeg')!==0)continue;
  var z=await imgSz(du);if(!z||!z.w||!z.h)continue;
  L.push({du:du,k:a[i].k,w:z.w,h:z.h})}
 if(!L.length)return;
 var CW=93,CH=70,X0=[10,107],PH=78,pg=0,Y0=24,cap=6,cnt=6,first=true,land=false,NX=[10,104,198];
 for(var n=0;n<L.length;n++){
  if(cnt>=cap){
   if(first){
    if(sy!=null&&sy>0){Y0=sy+8;cap=2*Math.max(1,Math.floor((288-Y0)/PH));
     d.setFont('helvetica','bold');d.setFontSize(9);d.text('Lampiran Foto',10,sy+4);
     d.setFont('helvetica','normal');d.setFontSize(7.5);d.text('No. Servis: '+(x.no||'-')+'   |   No. Polisi: '+String((x.d&&x.d.plat)||'-').toUpperCase(),48,sy+4)}
    else{Y0=24;cap=6;
     d.setFont('helvetica','bold');d.setFontSize(11);d.text('Lampiran Foto',10,14);
     d.setFont('helvetica','normal');d.setFontSize(8.5);d.text('No. Servis: '+(x.no||'-')+'   |   No. Polisi: '+String((x.d&&x.d.plat)||'-').toUpperCase(),10,19.5)}
    first=false}
   else{land=true;CW=88;CH=70;d._close();d.addPage();Y0=22;cap=6;
    d.setFont('helvetica','bold');d.setFontSize(11);d.text('Lampiran Foto',10,12);
    d.setFont('helvetica','normal');d.setFontSize(8.5);d.text('No. Servis: '+(x.no||'-')+'   |   No. Polisi: '+String((x.d&&x.d.plat)||'-').toUpperCase(),10,17);
    d.setFontSize(7);d.text('Business Center TBSM - SMKS Darul Fatwa  |  Lampiran halaman '+(pg+1),10,205)}
   pg++;cnt=0}
  var cx=land?NX[cnt%3]:X0[cnt%2],cy=Y0+Math.floor(cnt/(land?3:2))*(land?80:PH),it=L[n],sc=Math.min(CW/it.w,CH/it.h),iw=it.w*sc,ih=it.h*sc;cnt++;
  d.setDrawColor(150);d.setLineWidth(.2);d.rect(cx,cy,CW,CH,'S');
  d.addImage(it.du,'JPEG',cx+(CW-iw)/2,cy+(CH-ih)/2,iw,ih,undefined,'FAST');
  d.setFont('helvetica','bold');d.setFontSize(8);d.text(fotoLbl(it.k),cx,cy+CH+4.5)}
}
function lsDoc(){
 var d=new window.jspdf.jsPDF({unit:'mm',format:'a4',orientation:'landscape'}),k=d.internal.scaleFactor,S=148/210,ty=(210*(1-S)*k).toFixed(3),ap=d.addPage.bind(d),sv=d.save.bind(d);
 d._q=false;
 d._close=function(){if(d._q){d.internal.write('Q');d._q=false}};
 d._open=function(tx){d._close();d.internal.write('q',S.toFixed(5),'0 0',S.toFixed(5),((tx||0)*k).toFixed(3),ty,'cm');d._q=true};
 d.addPage=function(){d._close();return ap.apply(d,arguments)};
 d.save=function(){d._close();return sv.apply(d,arguments)};
 return d}
function a5Doc(){
 var d=new window.jspdf.jsPDF({unit:'mm',format:'a5'}),k=d.internal.scaleFactor,S=148/210,ty=(210*(1-S)*k).toFixed(3),ap=d.addPage.bind(d),sv=d.save.bind(d);
 d._q=false;
 d._open=function(){d.internal.write('q',S.toFixed(5),'0 0',S.toFixed(5),'0',ty,'cm');d._q=true};
 d._close=function(){if(d._q){d.internal.write('Q');d._q=false}};
 d.addPage=function(){d._close();var r=ap.apply(d,arguments);d._open();return r};
 d._raw=function(){d._close();return ap()};
 d.save=function(){d._close();return sv.apply(d,arguments)};
 d._open();return d}
async function pdf(i){var x=jf(i);if(!window.jspdf){alert('Pustaka PDF belum termuat. Periksa koneksi internet.');return}
 var d=lsDoc();d._open(0);pdfLayout(d,x,IMG);d._close();
 d.setDrawColor(120);d.setLineWidth(.2);if(d.setLineDashPattern){d.setLineDashPattern([2,2],0);d.line(148.5,6,148.5,204);d.setLineDashPattern([],0)}else d.line(148.5,6,148.5,204);
 d._open(148.5);var pyi=payInfo(x),sy=pyi?payRcptCompact(d,x,pyi):null;
 var fa=fotoList(x.d);
 if(fa.length&&REMOTE&&CFG.functionId){pdfWait(true);try{await pdfFoto(d,x,fa,sy)}catch(e){}pdfWait(false)}
 d.save('Form-Service-'+String(x.d.plat||'').replace(/\\s+/g,'')+'.pdf')}
$('th').onclick=function(){var r=document.documentElement,d=r.getAttribute('data-theme')||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');var n=d=='dark'?'light':'dark';r.setAttribute('data-theme',n);try{localStorage.setItem('bc_theme',n)}catch(e){}};
var CFG=window.SP_CONFIG||{},REMOTE=!!(CFG.projectId&&window.Appwrite),AW={};
function lsLoad(){try{var s=localStorage.getItem(KEY);if(s)db=JSON.parse(s)}catch(e){}}
function lsSave(){try{localStorage.setItem(KEY,JSON.stringify(db))}catch(e){}}
function nextNo(){var d=new Date(),pf='SPK-'+String(d.getMonth()+1).padStart(2,'0')+'-'+d.getFullYear()+'-',m=0;db.jobs.forEach(function(x){var t=String(x.no||'');if(t.indexOf(pf)!==0)return;var n=parseInt(t.slice(pf.length))||0;if(n>m)m=n});return pf+String(m+1).padStart(4,'0')}
function pl(x){return JSON.stringify({no:x.no,ts:x.ts,status:x.status,d:x.d,tw:x.tw,log:x.log,arsip:x.arsip||undefined})}
function ids(){return {databaseId:CFG.databaseId,tableId:CFG.tableId}}
async function saveJob(x,isNew){
 if(!REMOTE){lsSave();return}
 if(isNew)x.id=Appwrite.ID.unique();
 if(!obPush({k:isNew?'c':'u',id:x.id,p:pl(x),l:(x.d.plat||'-')+' · '+(x.no||'-')})){alert('Memori HP penuh, perubahan belum bisa disimpan. Kosongkan memori lalu coba lagi.');throw new Error('penuh')}
 cacheSave();obFlush()
}
async function removeJob(id){
 var x=jf(id);
 if(!REMOTE){db.jobs=db.jobs.filter(function(x){return x.id!=id});lsSave();return}
 db.jobs=db.jobs.filter(function(x){return x.id!=id});
 obPush({k:'d',id:id,l:x?((x.d.plat||'-')+' · '+(x.no||'-')):'-'});cacheSave();obFlush()
}





async function logout(){if(!navigator.onLine){alert('Keluar membutuhkan koneksi internet.');return}if(OB.length&&!confirm(OB.length+' perubahan belum terunggah. Data tetap tersimpan di HP dan akan diunggah saat Anda masuk lagi. Keluar sekarang?'))return;try{await AW.a.deleteSession({sessionId:'current'})}catch(e){}kv(USK,null);kv(CCK,null);location.reload()}

async function simpan(){
 var d=collect();if(!d.plat||!d.pm_nama){alert('No. Polisi dan Nama Pemilik wajib diisi.');return}
 try{
  if(editId){var x=jf(editId);if(lockd(x)){alert('Data sudah diambil dan dikunci. Hanya admin yang bisa mengubahnya.');return}var df=diffD(x.d,d);x.d=d;if(df.length)aud(x,'ubah','Data diubah: '+df.slice(0,8).join(', ')+(df.length>8?' dan '+(df.length-8)+' lainnya':''));await saveJob(x,false)}
  else{var n={no:nextNo(),ts:Date.now(),status:'Menunggu',d:d,tw:{daftar:hhmm()}};aud(n,'buat','Pendaftaran dibuat');if(!REMOTE){db.n=(db.n||0)+1;n.id=db.n}await saveJob(n,true);db.jobs.unshift(n);cacheSave()}
 }catch(e){return}
 editId=null;tab='q';render();
}
async function setS(i,v){var x=jf(i);if(x&&v!='Diambil'&&!(x.tw&&x.tw.pay))await freshen(x);if(lockd(x)){alert('Data sudah diambil dan dikunci. Hanya admin yang bisa mengubahnya.');render();return}if(x.status!=v){aud(x,'status',slb(x.status)+' → '+slb(v));if(x.tw){if(v=='Menunggu'){delete x.tw.fc;delete x.tw.pit;delete x.tw.pitEmail;delete x.tw.mulai;delete x.tw.kerja}else if(x.status=='Menunggu'&&v=='Dikerjakan')delete x.tw.fc}}x.status=v;x.tw=x.tw||{};if(v=='Dikerjakan'&&!x.tw.kerja)x.tw.kerja=hhmm();if((v=='Selesai'||v=='Diambil')&&!x.tw.selesai)x.tw.selesai=hhmm();try{await saveJob(x,false)}catch(e){}render()}
async function arsip(i,on){var x=jf(i);if(!x||!can('del'))return;if(on&&!confirm('Arsipkan data ini? Data disembunyikan dari Antrian, tetapi tetap tersimpan untuk riwayat servis dan laporan.'))return;if(on)x.arsip=Date.now();else delete x.arsip;aud(x,'ubah',on?'Diarsipkan':'Arsip dipulihkan');try{await saveJob(x,false)}catch(e){}cacheSave();render()}
async function del(i){if(confirm('Hapus data servis ini secara permanen? Riwayat servis unit ini ikut hilang. Untuk data yang sudah diambil, sebaiknya pakai Arsipkan.')){var x=jf(i);try{await removeJob(i)}catch(e){return}if(x)await audDel(x);render()}}


var ICO={wallet:'<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M16 15h2"/>',chev:'<path d="M6 9l6 6 6-6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',sync:'<path d="M20 11a8 8 0 0 0-14-4M4 5v4h4M4 13a8 8 0 0 0 14 4M20 19v-4h-4"/>',cal:'<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 10h16M8 3v4M16 3v4"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/>',doc:'<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',download:'<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',wrench:'<path d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3 17.7 6.3 21l6.3-6.3a4 4 0 0 0 5.1-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',check:'<path d="M20 6 9 17l-5-5"/>',box:'<path d="M21 8l-9-5-9 5v8l9 5 9-5zM3 8l9 5 9-5M12 13v8"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.6 3.1-5.5 7-5.5s7 1.9 7 5.5M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.8c2.4.6 4 2.2 4 5.2"/>',pulse:'<path d="M3 12h4l3-8 4 16 3-8h4"/>',menu:'<path d="M3 6h18M3 12h18M3 18h18"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',home:'<path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',grid:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',plus:'<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',login:'<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/>',logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>'};
function ic(n){return '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+ICO[n]+'</svg>'}
var ROLE_DEF={admin:{n:'Admin',create:1,edit:1,status:1,del:1,rep:1,money:1},pembimbing:{n:'Pembimbing',create:0,edit:1,status:1,del:0,rep:1,money:1},advisor:{n:'Service Advisor',create:1,edit:1,status:1,del:0,rep:1,money:1},mekanik:{n:'Mekanik / Siswa Praktik',create:0,edit:0,status:1,del:0,rep:0,money:0},kepsek:{n:'Kepala Sekolah',create:0,edit:0,status:0,del:0,rep:1,money:1},wakahubin:{n:'Wakasek Hubin',create:0,edit:0,status:0,del:0,rep:1,money:1}};var CASHBACK=10000;ROLE_DEF.admin.pay=1;ROLE_DEF.advisor.pay=1;ROLE_DEF.admin.cb=1;ROLE_DEF.kepsek.cb=1;ROLE_DEF.wakahubin.cb=1;ROLE_DEF.kepsek.exec=1;ROLE_DEF.wakahubin.exec=1;ROLE_DEF.admin.rem=1;ROLE_DEF.pembimbing.rem=1;ROLE_DEF.advisor.rem=1;
var TITLES={bak:'Cadangan Data',syn:'Sinkronisasi',aud:'Audit Trail',tos:'Syarat & Ketentuan',home:'Beranda',login:'Masuk',dash:'Dashboard',mon:'Monitor Servis',new:'Pendaftaran Servis',q:'Antrian Servis',rep:'Laporan',rem:'Pengingat Servis',pay:'Pembayaran',lay:'Layar Antrian',gar:'Cek Garansi',prof:'Profil & Peran'};
var loadErr='';
function myRole(){if(!REMOTE)return 'admin';var l=(AW.u&&AW.u.labels)||[];for(var k in ROLE_DEF)if(l.indexOf(k)>-1)return k;return null}
function can(a){var r=myRole();return !!(r&&ROLE_DEF[r][a])}
function lockd(x){return !!x&&x.status=='Diambil'&&myRole()!='admin'}
function tog(o){$('sb').classList.toggle('open',!!o);$('scrim').classList.toggle('show',!!o)}
function mgShut(id){var o=kv('bc_mg_'+PJ)||{};return o[id]!==1}
function mgTog(id){var o=kv('bc_mg_'+PJ)||{};o[id]=(o[id]===1)?0:1;kv('bc_mg_'+PJ,o);buildMenu()}
function buildMenu(){
 var gu=REMOTE&&!AW.u,r=myRole(),H='';
 var mi=function(i,sub){return '<button class="mi'+(sub?' sub':'')+(tab==i[0]?' on':'')+'" onclick="go(\''+i[0]+'\')">'+ic(i[2])+'<span>'+i[1]+'</span></button>'};
 var grp=function(id,label,icn,arr){if(!arr.length)return '';var has=arr.some(function(i){return i[0]==tab}),shut=mgShut(id)&&!has;
  return '<button class="mi mg'+(shut?' shut':'')+(has?' has':'')+'" onclick="mgTog(\''+id+'\')">'+ic(icn)+'<span>'+label+'</span>'+ic('chev')+'</button>'+(shut?'':'<div class="mgb">'+arr.map(function(i){return mi(i,1)}).join('')+'</div>')};
 if(gu)H='<small class="sec">Menu</small>'+[['home','Beranda','home'],['tos','Syarat & Ketentuan','doc']].map(function(i){return mi(i)}).join('');
 else{
  var sv=[];if(can('create'))sv.push(['new','Pendaftaran','plus']);if(r&&!can('exec'))sv.push(['q','Antrian Servis','list']);if(r)sv.push(['mon','Monitor Servis','pulse']);if(can('rep'))sv.push(['rep','Laporan','chart']);if(can('rem'))sv.push(['rem','Pengingat Servis','clock']);if(can('pay'))sv.push(['pay','Pembayaran','wallet']);if(r)sv.push(['lay','Layar Antrian','list']);sv.push(['gar','Cek Garansi','shield']);
  var ad=[];if(can('users')&&REMOTE)ad.push(['akun','Kelola Akun','users']);if(can('audit'))ad.push(['aud','Audit Trail','shield']);if(can('bak'))ad.push(['bak','Cadangan Data','download']);
  H=mi(['dash','Dashboard','grid'])+grp('svc','Service Point','wrench',sv)+grp('adm','Administrasi','shield',ad)+mi(['prof','Profil & Peran','user'])+(REMOTE?mi(['syn','Sinkronisasi','sync']):'')+mi(['tos','Syarat & Ketentuan','doc']);
 }
 $('menu').innerHTML=H;
 var nm=AW.u?(AW.u.name||AW.u.email):'Mode lokal';
 $('acct').innerHTML=gu?'<button class="mi" onclick="go(\'login\')">'+ic('login')+'<span>Masuk</span></button>':'<div class="who"><div class="av">'+esc(nm.charAt(0).toUpperCase())+'</div><div><b>'+esc(nm)+'</b><span>'+(r?ROLE_DEF[r].n:'Belum ada peran')+'</span></div></div>'+(REMOTE?'<button class="mi" onclick="logout()">'+ic('logout')+'<span>Keluar</span></button>':'');
}
function render(){
 var gu=REMOTE&&!AW.u;
 if(gu&&tab!='home'&&tab!='login'&&tab!='tos')tab='home';
 if(!gu&&(tab=='home'||tab=='login'))tab='dash';
 if(!gu&&!myRole()&&tab!='prof'&&tab!='tos')tab='prof';
 if(tab=='aud'&&!can('audit'))tab='dash';
 if(tab=='bak'&&!can('bak'))tab='dash';
 if(tab=='syn'&&(!REMOTE||!AW.u))tab='dash';
 if(tab=='rep'&&!can('rep'))tab='dash';
 if(tab=='rem'&&!can('rem'))tab='dash';if(tab=='q'&&can('exec'))tab='dash';if(tab=='pay'&&!can('pay'))tab='dash';
 if(tab=='new'&&!(can('create')||(editId&&can('edit'))))tab='dash';
 if(tab=='akun'&&!(can('users')&&REMOTE))tab='dash';
 var V={bak:vBak,syn:vSyn,aud:vAud,tos:vTos,akun:vAkun,home:vHome,login:vLogin,dash:vDash,mon:vMon,new:vNew,q:vQ,rep:vRep,rem:vRem,pay:vPay,lay:function(){layCheck();return vLay()},gar:vGar,prof:vProf};
 $('ttl').textContent=TITLES[tab];$('app').innerHTML=V[tab]();buildMenu();tog(0);scrollTo(0,0);synUI();try{history.replaceState(null,'','#'+tab)}catch(e){}
}
function vHome(){
 return '<section class="hero"><img src="'+IMG.df+'" alt=""><div><span class="ey">Selamat datang</span><h2>Business Center TBSM</h2><p>SMKS Darul Fatwa</p><small>Jl. Letda Lukito No.90, Jatiroke, Kec. Jatinangor,<br>Kab. Sumedang, Jawa Barat 45363</small><button class="btn" onclick="go(\'login\')">Masuk ke Dashboard</button></div></section>'+
 '<h2>Unit usaha</h2><div class="card"><div class="unit"><img src="'+IMG.ah+'" alt=""><div><b class="pill">Service Point</b><span>Layanan servis motor di bengkel sekolah, kerjasama AHASS Daya Anugrah Mandiri Jatinangor.</span></div></div></div>'+
 '<div class="card"><div class="unit"><div><b>Unit usaha lainnya</b><span>Segera hadir.</span></div></div></div>';
}
function vLogin(){
 if(!REMOTE)return '<div class="card lg"><div class="lgh"><img src="'+IMG.df+'" alt=""><h2>Mode lokal</h2></div><p class="mut">Appwrite belum dikonfigurasi di config.js, jadi login tidak diperlukan.</p><button class="btn w" onclick="go(\'dash\')">Buka Dashboard</button></div>';
 return '<div class="card lg"><div class="lgh"><img src="'+IMG.df+'" alt=""><h2>Masuk</h2><p>Business Center TBSM</p></div><label>Email</label><input id="le" type="email" autocomplete="username"><label>Kata sandi</label><input id="lp" type="password" autocomplete="current-password" onkeydown="if(event.key===\'Enter\')login()"><p id="lm" class="err"></p><button class="btn w" onclick="login()">Masuk</button><p class="mut" style="text-align:center;margin-top:10px">Akun dan peran diatur oleh admin.</p><p style="text-align:center;margin:8px 0 0;font-size:13px"><a href="#" style="color:var(--pri)" onclick="go(\'tos\');return false">Syarat &amp; Ketentuan</a></p></div>';
}
async function login(){
 $('lm').textContent='';
 try{await AW.a.createEmailPasswordSession({email:$('le').value.trim(),password:$('lp').value});AW.u=await AW.a.get();await boot()}
 catch(e){$('lm').textContent='Login gagal: '+(e.message||e)}
}
function noRole(){return '<div class="card"><h3>Peran belum diatur</h3><p>Akun Anda sudah masuk tetapi belum memiliki peran (admin, pembimbing, advisor, mekanik, kepala sekolah, atau wakasek hubin). Hubungi admin untuk diberi peran, lalu keluar dan masuk kembali.</p></div>'}
var monF='Aktif',repF='Semua';
var NX={Menunggu:['Dikerjakan','Mulai kerjakan'],Dikerjakan:['Selesai','Tandai selesai'],Selesai:['Diambil','Sudah diambil']};
var SC={Menunggu:'#d98b00',Dikerjakan:'#2f6fe0',Selesai:'#0e8a5f',Diambil:'#778899'};
function slb(t){return t=='Selesai'?'Siap diambil':t}
function mcard(x){
 var d=x.d,nx=NX[x.status],ok=can('status')&&nx&&!lockd(x)&&!(myRole()=='mekanik'&&nx[0]=='Diambil');
 return '<div class="mc" style="--c:'+SC[x.status]+'"><div class="mch"><div><b>'+esc(d.plat)+(d.tipe?' · '+esc(d.tipe):'')+'</b><span>'+esc(x.no)+' · '+tglID(x.ts)+' '+esc((x.tw||{}).daftar||'')+'</span></div><span class="tag '+x.status+'">'+slb(x.status)+'</span></div>'+
 '<p class="mcp">'+esc(d.pm_nama||'-')+(d.pm_hp?' · '+esc(d.pm_hp):'')+'</p><p class="mcw">'+esc(daftar(x))+(d.keluhan?' — '+esc(d.keluhan):'')+'</p>'+
 '<div class="mcf"><div>'+(pitOf(x)?'<span class="chip">'+esc(pitOf(x))+'</span>':'')+(x.tw&&x.tw.fc&&x.status=='Dikerjakan'?'<span class="chip">Final check</span>':'')+(d.mekanik?'<span class="chip">'+esc(d.mekanik)+'</span>':'')+(can('money')?'<b class="amt">'+R0(totalOf(d))+'</b>':'')+'</div><div class="acts">'+(ok?'<button class="btn s adv" onclick="setS(\''+x.id+'\',\''+nx[0]+'\')">'+nx[1]+'</button>':'')+'<button class="btn s" onclick="pdf(\''+x.id+'\')">PDF</button></div></div></div>';
}
function setMF(v){monF=(monF==v)?'Aktif':v;$('app').innerHTML=vMon()}
function vMon(){
 var r=myRole();if(!r)return noRole();
 var j=db.jobs,m=can('money'),c=function(s){return j.filter(function(x){return x.status==s}).length};
 var td=j.filter(function(x){return sameDay(x.ts)}),dn=td.filter(function(x){return x.status=='Selesai'||x.status=='Diambil'}).length,pct=td.length?Math.round(dn/td.length*100):0;
 var inc=j.filter(function(x){return sameDay(x.ts)&&(x.status=='Selesai'||x.status=='Diambil')}).reduce(function(a,x){return a+revOf(x)},0);
 var hero='<section class="dh"><div class="dht"><div><span class="ey">Hari ini</span><h2>Monitor Servis</h2><p>'+tglID(Date.now())+'</p></div>'+(REMOTE?'<button class="rf" onclick="reload2()" aria-label="Muat ulang" title="Muat ulang">&#8635;</button>':'')+'</div>'+
  '<div class="kp"><div><b>'+td.length+'</b><span>Unit masuk</span></div><div><b>'+(c('Menunggu')+c('Dikerjakan'))+'</b><span>Unit aktif</span></div>'+(m?'<div><b class="kpm">'+R0(inc)+'</b><span>Pendapatan</span></div>':'<div><b>'+c('Selesai')+'</b><span>Siap diambil</span></div>')+'</div>'+
  '<div class="pgl"><span>Selesai hari ini</span><b>'+dn+' / '+td.length+'</b></div><div class="pgb"><i style="width:'+pct+'%"></i></div></section>';
 var T=[['Menunggu','Menunggu','clock'],['Dikerjakan','Dikerjakan','wrench'],['Selesai','Siap diambil','check'],['Diambil','Sudah diambil','box']];
 var tiles='<div class="st4">'+T.map(function(t){return '<button class="sx'+(monF==t[0]?' on':'')+'" style="--c:'+SC[t[0]]+'" onclick="setMF(\''+t[0]+'\')"><i>'+ic(t[2])+'</i><div><b>'+c(t[0])+'</b><span>'+t[1]+'</span></div></button>'}).join('')+'</div>';
 var l=j.filter(function(x){return monF=='Aktif'?x.status!='Diambil':x.status==monF}),sh=l.slice(0,30);
 var ttl=monF=='Aktif'?'Unit aktif':slb(monF)=='Selesai'?'Selesai':(monF=='Diambil'?'Sudah diambil':slb(monF));
 return (loadErr?'<div class="card err">'+esc(loadErr)+'</div>':'')+hero+tiles+'<h2>'+ttl+' <small class="cnt">'+l.length+' unit</small></h2>'+(sh.length?sh.map(mcard).join(''):'<div class="card empty">Belum ada unit di sini.</div>')+(l.length>30?'<p class="mut" style="text-align:center">Menampilkan 30 terbaru.</p>':'');
}
function card(x){
 var d=x.d,mk=myRole()=='mekanik'&&x.status!='Diambil',sts=mk?ST.slice(0,3):ST;
 return '<div class="card qc"><div class="job"><div><h3>'+esc(d.plat)+(d.tipe?' · '+esc(d.tipe):'')+'</h3><p>'+esc(x.no)+' · '+tglID(x.ts)+' '+esc((x.tw||{}).daftar||'')+'</p><p>Pemilik: '+esc(d.pm_nama)+(d.pm_hp?' · '+esc(d.pm_hp):'')+'</p><p>'+esc(daftar(x))+(d.keluhan?' — '+esc(d.keluhan):'')+'</p>'+(d.mekanik?'<p>Mekanik: '+esc(d.mekanik)+'</p>':'')+(pitOf(x)?'<p>'+esc(pitOf(x))+(x.tw&&x.tw.fc&&x.status=='Dikerjakan'?' · Final check advisor':'')+'</p>':'')+'</div><div style="text-align:right"><span class="tag '+x.status+'">'+x.status+'</span>'+(can('money')?'<p class="amt">'+R0(totalOf(d))+'</p>':'')+'</div></div>'+
 '<div class="acts">'+(lockd(x)?'<span class="chip">Terkunci · hanya lihat dan cetak PDF</span>':(can('status')?'<select onchange="setS(\''+x.id+'\',this.value)">'+sts.map(function(s){return '<option'+(s==x.status?' selected':'')+'>'+s+'</option>'}).join('')+'</select>':'')+(can('edit')?'<button class="btn s" onclick="edit(\''+x.id+'\')">Edit / Rincian</button>':''))+'<button class="btn s" onclick="pdf(\''+x.id+'\')">PDF</button>'+(fotoList(d).length?'<button class="btn s" onclick="fotoView(\''+x.id+'\')">Foto ('+fotoList(d).length+')</button>':'')+(can('del')&&x.status=='Diambil'?'<button class="btn s" onclick="arsip(\''+x.id+'\','+(x.arsip?0:1)+')">'+(x.arsip?'Pulihkan':'Arsipkan')+'</button>':'')+(can('del')?'<button class="btn s dg" onclick="del(\''+x.id+'\')">Hapus</button>':'')+'</div></div>';
}
function vProf(){
 var r=myRole(),u=AW.u||{},ok=function(v){return v?'✓':'–'};
 var h='<div class="card"><h3>Akun</h3><div class="kv"><span>Email</span><b>'+esc(u.email||'-')+'</b><span>Nama</span><b>'+esc(u.name||'-')+'</b><span>Peran</span><b>'+(r?'<span class="badge">'+ROLE_DEF[r].n+'</span>':'Belum diberi peran')+'</b><span>Penyimpanan</span><b>'+(REMOTE?'Appwrite (server)':'Lokal (peramban)')+'</b></div></div>';
 if(!r)h+=noRole();
 h+='<div class="card sc"><h3>Hak akses per peran</h3><table><tr><th>Peran</th><th>Daftar baru</th><th>Ubah data</th><th>Ubah status</th><th>Hapus</th><th>Laporan & biaya</th><th>Kelola akun</th></tr>'+Object.keys(ROLE_DEF).map(function(k){var d=ROLE_DEF[k];return '<tr'+(k==r?' class="me"':'')+'><td>'+d.n+'</td><td>'+ok(d.create)+'</td><td>'+ok(d.edit)+'</td><td>'+ok(d.status)+'</td><td>'+ok(d.del)+'</td><td>'+ok(d.rep)+'</td><td>'+ok(d.users)+'</td></tr>'}).join('')+'</table></div>';
 if(r=='admin'&&REMOTE)h+='<div class="card"><h3>Cara mengatur peran (admin)</h3><ol class="st"><li>Buat akun dan atur peran lewat menu <b>Kelola Akun</b>.</li><li>Table → <b>Settings → Permissions</b>: ganti role Users dengan role Label. Read: semua label. Create: <code>admin</code>, <code>advisor</code>. Update: semua label. Delete: <code>admin</code>.</li><li>Pengguna keluar lalu masuk lagi agar peran terbaca.</li></ol><p class="mut">Lakukan langkah 2 setelah semua pengguna diberi label.</p></div>';
 return h;
}
function qNo(x){return parseInt(String(x.no||'').split('-').pop(),10)||0}
function waitQ(){return db.jobs.filter(function(x){return x.status=='Menunggu'&&!x.arsip}).sort(function(a,b){return a.ts-b.ts})}
function spellPlat(p){var W=['nol','satu','dua','tiga','empat','lima','enam','tujuh','delapan','sembilan'];return String(p||'').toUpperCase().replace(/[^A-Z0-9]/g,'').split('').map(function(c){return /\d/.test(c)?W[+c]:c}).join(' ')}
var PITS={'Pit 1':'mekanik1@smkdf.com','Pit 2':'mekanik2@smkdf.com'},PITSEL='';
function say(t){try{if(window.speechSynthesis){speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(t);u.lang='id-ID';u.rate=.9;speechSynthesis.speak(u)}}catch(e){}}
function pitBusy(p,exId){return db.jobs.some(function(x){return x.status=='Dikerjakan'&&!x.arsip&&x.id!=exId&&!(x.tw&&x.tw.fc)&&pitOf(x)==p})}
function pitDef(){var ks=Object.keys(PITS);if(PITSEL&&!pitBusy(PITSEL))return PITSEL;var f=ks.filter(function(p){return !pitBusy(p)})[0];return f||''}
function myPit(){var em=((AW.u&&AW.u.email)||'').toLowerCase(),k=Object.keys(PITS).filter(function(p){return PITS[p]==em})[0];return k||''}
function pitVal(){var mp=myPit();if(mp)return mp;var e=document.getElementById('pitSel');return e?e.value:PITSEL}
function callQ(id){
 var x=db.jobs.filter(function(j){return j.id==id})[0];if(!x)return;
 var d=x.d||{};x.tw=x.tw||{};x.tw.call=Date.now();x.tw.callBy=who();
 var c=kv('bc_callq')||{};c[id]=x.tw.call;kv('bc_callq',c);
 say('Nomor antrian '+qNo(x)+'. Plat nomor '+spellPlat(d.plat)+'. Ready.');
 saveJob(x,false).catch(function(){});
 if(tab=='dash')$('app').innerHTML=vDash();
}
function mulaiQ(id){
 var x=db.jobs.filter(function(j){return j.id==id})[0];if(!x)return;
 var p=pitVal();PITSEL=p;
 if(!p){alert('Pilih Pit terlebih dahulu (Pit 1 atau Pit 2).');return}
 if(pitBusy(p,id)&&!confirm(p+' masih dipakai unit lain. Tetap lanjutkan?'))return;
 var d=x.d||{};x.tw=x.tw||{};x.tw.pit=p;x.tw.pitEmail=PITS[p];x.tw.mulai=Date.now();
 try{aud(x,'ubah','Masuk '+p+' ('+PITS[p]+')')}catch(e){}
 say('Nomor antrian '+qNo(x)+'. Plat nomor '+spellPlat(d.plat)+(d.pm_nama?', atas nama '+d.pm_nama:'')+'. Lanjut ke proses pemeriksaan di '+p+'.');
 setS(id,'Dikerjakan');
}
function pitOf(x){return (x.tw&&x.tw.pit)||(x.d&&x.d.pit)||''}
function selesaiQ(id){
 var x=db.jobs.filter(function(j){return j.id==id})[0];if(!x)return;
 if(x.status!='Dikerjakan'||(x.tw&&x.tw.fc))return;
 var dd=x.d||{},mn=x.tw&&x.tw.mulai?Math.round((Date.now()-x.tw.mulai)/60000):null;
 if(!confirm('Pemeriksaan No. '+qNo(x)+' ('+(dd.plat||'-')+') sudah selesai di '+(pitOf(x)||'pit')+'?'+(mn!==null&&mn<5?'\n\nBaru '+mn+' menit sejak masuk pit.':'')+'\n\nUnit akan dipindah ke Final check.'))return;
 var d=x.d||{};x.tw=x.tw||{};x.tw.fc=hhmm();
 try{aud(x,'ubah','Selesai dikerjakan, menunggu final check advisor')}catch(e){}
 say('Nomor antrian '+qNo(x)+'. Plat nomor '+spellPlat(d.plat)+(d.pm_nama?', atas nama '+d.pm_nama:'')+'. Lanjut ke proses final check oleh service advisor.');
 saveJob(x,false).catch(function(){}).then(function(){render()});
}
function batalFc(id){
 var x=jf(id);if(!x||x.status!='Dikerjakan'||!(x.tw&&x.tw.fc))return;
 if(!confirm('Kembalikan No. '+qNo(x)+' ke '+(pitOf(x)||'pit')+' (belum selesai diperiksa)?'))return;
 delete x.tw.fc;
 try{aud(x,'ubah','Final check dibatalkan, kembali ke '+(pitOf(x)||'pit'))}catch(e){}
 saveJob(x,false).catch(function(){}).then(function(){render()});
}
function siapQ(id){
 var x=db.jobs.filter(function(j){return j.id==id})[0];if(!x)return;
 var d=x.d||{};
 say('Nomor antrian '+qNo(x)+'. Plat nomor '+spellPlat(d.plat)+(d.pm_nama?', atas nama '+d.pm_nama:'')+'. Siap diambil. Lakukan proses pembayaran di kasir.');
 setS(id,'Selesai');
}
function unitCard(x,btn,fn,pil,ex){var d=x.d||{};return '<div class="card wk"><div class="job"><div><h3>'+esc(d.plat||'-')+(d.tipe?' · '+esc(d.tipe):'')+'</h3><p>No. '+qNo(x)+' · '+esc(d.pm_nama||'-')+'</p><p>'+esc(daftar(x))+(d.keluhan?' — '+esc(d.keluhan):'')+'</p>'+(pil?'<p><span class="chip">'+esc(pil)+'</span></p>':'')+'</div></div><button class="btn w" onclick="'+fn+'(\''+x.id+'\')">'+btn+'</button>'+(ex||'')+'</div>'}
function vPits(){
 var r=myRole();if(r!='admin'&&r!='advisor')return '';
 var l=db.jobs.filter(function(x){return x.status=='Dikerjakan'&&!x.arsip&&!(x.tw&&x.tw.fc)}).sort(function(a,b){return a.ts-b.ts});
 if(!l.length)return '';
 var ks=Object.keys(PITS),row=function(x){var d=x.d||{};return '<div class="ri"><div><b>'+esc(d.plat||'-')+(d.tipe?' · '+esc(d.tipe):'')+'</b><span>No. '+qNo(x)+' · '+esc(d.pm_nama||'-')+(x.tw&&x.tw.kerja?' · mulai '+esc(x.tw.kerja):'')+'</span><span>'+esc(daftar(x))+'</span></div><button class="btn s cqk" onclick="selesaiQ(\''+x.id+'\')">Selesai</button></div>'};
 var h='<h2>Unit Sedang Dikerjakan <small class="cnt">'+l.length+' unit</small></h2><div class="card pt">';
 ks.forEach(function(p){var it=l.filter(function(x){return pitOf(x)==p});h+='<div class="ps"><b class="pn">'+p+'</b>'+(it.length?it.map(row).join(''):'<span class="mut">Kosong</span>')+'</div>'});
 var np2=l.filter(function(x){return ks.indexOf(pitOf(x))<0});
 if(np2.length)h+='<div class="ps"><b class="pn">Tanpa pit</b>'+np2.map(row).join('')+'</div>';
 return h+'</div>';
}
function vWork(){
 if(myRole()!='mekanik')return '';
 var mp=myPit(),l=db.jobs.filter(function(x){return x.status=='Dikerjakan'&&!x.arsip&&!(x.tw&&x.tw.fc)&&(!mp||pitOf(x)==mp)}).sort(function(a,b){return a.ts-b.ts});
 if(!l.length)return '';
 return '<h2>Unit Sedang Dikerjakan'+(mp?' · '+mp:'')+' <small class="cnt">'+l.length+' unit</small></h2>'+l.map(function(x){return unitCard(x,'Selesai','selesaiQ',pitOf(x))}).join('');
}
function vFc(){
 var r=myRole();if(r!='admin'&&r!='advisor')return '';
 var l=db.jobs.filter(function(x){return x.status=='Dikerjakan'&&!x.arsip&&x.tw&&x.tw.fc}).sort(function(a,b){return a.ts-b.ts});
 if(!l.length)return '';
 return '<h2>Final Check Advisor <small class="cnt">'+l.length+' unit</small></h2>'+l.map(function(x){return unitCard(x,'Siap diambil','siapQ',pitOf(x),'<button class="btn s w" style="margin-top:8px" onclick="batalFc(\''+x.id+'\')">Kembali ke Pit</button>')}).join('');
}
var payF='belum',payOpen=null;
function payInfo(x){return (x.tw&&x.tw.pay)||null}
function pyv(i){var e=document.getElementById(i);return e?e.value:''}
function payCalc(id){var x=jf(id);if(!x)return;var tot=totalOf(x.d),dis=Math.min(num(pyv('pdis')),tot),due=Math.max(0,tot-dis),by=pyv('pbayar')===''?due:num(pyv('pbayar'));
 var a=document.getElementById('ptag'),b=document.getElementById('pkem');if(a)a.textContent=R0(due);if(b)b.textContent=by>=due?R0(by-due):'Kurang '+R0(due-by)}
function payTab(f){payF=f;payOpen=null;$('app').innerHTML=vPay()}
function payToggle(id){payOpen=payOpen==id?null:id;$('app').innerHTML=vPay();if(payOpen)setTimeout(function(){payCalc(id)},0)}
function payForm(x){var tot=totalOf(x.d);return '<div class="pf"><div class="ri"><div><b>Total servis</b></div><div style="text-align:right"><b class="amt">'+R0(tot)+'</b></div></div>'+
 '<label>Diskon (Rp)</label><input id="pdis" inputmode="numeric" placeholder="0" oninput="payCalc(\''+x.id+'\')">'+
 '<div class="ri"><div><b>Tagihan</b></div><div style="text-align:right"><b class="amt" id="ptag">'+R0(tot)+'</b></div></div>'+
 '<label>Metode bayar</label><select id="pmet"><option>Tunai</option><option>Transfer</option><option>QRIS</option></select>'+
 '<label>Jumlah dibayar (Rp)</label><input id="pbayar" inputmode="numeric" placeholder="'+rp(tot)+'" oninput="payCalc(\''+x.id+'\')">'+
 '<div class="ri"><div><b>Kembalian</b></div><div style="text-align:right"><span id="pkem">'+R0(0)+'</span></div></div>'+
 '<label>Catatan (opsional)</label><input id="pnote" placeholder="Catatan pembayaran">'+
 '<div class="cqa" style="margin-top:10px"><button class="btn" onclick="paySave(\''+x.id+'\')">Simpan &amp; Diambil</button><button class="btn s" onclick="payToggle(\''+x.id+'\')">Batal</button></div></div>'}
async function paySave(id){
 var x=jf(id);if(!x||!can('pay'))return;
 await freshen(x);
 if(payInfo(x)){alert('Unit ini sudah dibayar dari perangkat lain ('+payInfo(x).no+').');payOpen=null;payF='sudah';render();return}
 if(x._rs&&x._rs!='Selesai'&&x._rs!=x.status){alert('Status unit sudah berubah di perangkat lain ('+x._rs+'). Data dimuat ulang.');try{await loadAll()}catch(e){}payOpen=null;render();return}
 var tot=totalOf(x.d),dis=num(pyv('pdis'));
 if(dis>tot){alert('Diskon tidak boleh melebihi total servis.');return}
 var due=tot-dis,paid=pyv('pbayar')===''?due:num(pyv('pbayar')),m=pyv('pmet')||'Tunai';
 if(paid<due){alert('Jumlah dibayar kurang dari tagihan ('+R0(due)+').');return}
 if(m!='Tunai'&&paid!=due){alert('Untuk '+m+', jumlah dibayar harus sama dengan tagihan ('+R0(due)+').');return}
 x.tw=x.tw||{};x.tw.pay={no:'KWT-'+String(x.no||'').replace(/^SPK-/,''),m:m,total:tot,disc:dis,due:due,paid:paid,change:paid-due,note:pyv('pnote').trim(),ts:Date.now(),by:who()};x.tw.ambil=hhmm();
 try{aud(x,'ubah','Pembayaran '+m+' '+R0(paid)+(dis?', diskon '+R0(dis):''))}catch(e){}
 payOpen=null;payF='sudah';
 await setS(id,'Diambil');
}
function vPay(){
 if(!can('pay'))return '<div class="card empty">Menu ini hanya untuk admin dan advisor.</div>';
 var l=db.jobs.filter(function(x){return !x.arsip}),
  bel=l.filter(function(x){return x.status=='Selesai'}).sort(function(a,b){return a.ts-b.ts}),
  sdh=l.filter(function(x){return x.status=='Diambil'&&payInfo(x)}).sort(function(a,b){return payInfo(b).ts-payInfo(a).ts});
 var h='<div class="row" style="gap:8px"><button class="btn '+(payF=='belum'?'':'s')+'" style="flex:1" onclick="payTab(\'belum\')">Belum dibayar ('+bel.length+')</button><button class="btn '+(payF=='sudah'?'':'s')+'" style="flex:1" onclick="payTab(\'sudah\')">Sudah dibayar ('+sdh.length+')</button><button class="btn '+(payF=='kas'?'':'s')+'" style="flex:1" onclick="payTab(\'kas\')">Kas harian</button></div>';
 if(payF=='kas')return h+kasView();
 if(payF=='belum'){
  if(!bel.length)return h+'<div class="card empty">Tidak ada unit yang menunggu pembayaran.</div>';
  return h+bel.map(function(x){var d=x.d||{};return '<div class="card"><div class="job"><div><h3>'+esc(d.plat||'-')+(d.tipe?' · '+esc(d.tipe):'')+'</h3><p>No. '+qNo(x)+' · '+esc(d.pm_nama||'-')+'</p><p>'+esc(daftar(x))+'</p></div><div style="text-align:right"><b class="amt">'+R0(totalOf(d))+'</b></div></div>'+(payOpen==x.id?payForm(x):'<button class="btn w" style="margin-top:10px" onclick="payToggle(\''+x.id+'\')">Bayar</button>')+'</div>'}).join('');
 }
 if(!sdh.length)return h+'<div class="card empty">Belum ada pembayaran tercatat.</div>';
 return h+sdh.slice(0,40).map(function(x){var d=x.d||{},p=payInfo(x);return '<div class="card"><div class="job"><div><h3>'+esc(d.plat||'-')+(d.tipe?' · '+esc(d.tipe):'')+'</h3><p>'+esc(p.no)+' · '+tglID(p.ts)+' '+new Date(p.ts).toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'})+'</p><p>'+esc(p.m)+(p.disc?' · diskon '+R0(p.disc):'')+'</p></div><div style="text-align:right"><b class="amt">'+R0(p.due)+'</b></div></div><div class="cqa" style="margin-top:10px"><button class="btn s" onclick="pdf(\''+x.id+'\')">PDF Form + Kuitansi</button><button class="btn s" onclick="payRcpt(\''+x.id+'\')">Kuitansi saja</button></div>'+(myRole()=='admin'?'<button class="btn w s" style="margin-top:8px;color:var(--red)" onclick="payVoid(\''+x.id+'\')">Batalkan pembayaran</button>':'')+'</div>'}).join('');
}
function payRcptCompact(d,x,p){
 var s=x.d||{},L=10,R=200,cx=105,y,
  T=function(t,xx,yy,o,sz,b){d.setFont('helvetica',b?'bold':'normal');d.setFontSize(sz||8.5);d.text(String(t),xx,yy,o||{})},
  hm=new Date(p.ts).toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'});
 try{d.addImage(IMG.df,'JPEG',L,9,16,16)}catch(e){}
 T('Business Center TBSM',cx,15,{align:'center'},13,1);T('SMKS Darul Fatwa',cx,20.5,{align:'center'},9.5,1);
 T('Jl. Letda Lukito No.90, Jatiroke, Kec. Jatinangor, Kab. Sumedang, Jawa Barat 45363',cx,25,{align:'center'},7);
 d.setLineWidth(.7);d.line(L,28.5,R,28.5);d.setLineWidth(.2);d.line(L,29.7,R,29.7);
 T('KUITANSI PEMBAYARAN',cx,35.5,{align:'center'},11,1);
 var I=function(a,b,xx,yy,bold){T(a,xx,yy,{},8.5);T(': '+b,xx+25,yy,{},8.5,bold)};
 I('No. Kuitansi',p.no,L,41.5,1);I('Tanggal',tglID(p.ts)+' '+hm,L,46);I('No. Servis',x.no||'-',L,50.5);
 I('Diterima dari',s.pm_nama||'-',112,41.5);I('No. Polisi',(s.plat||'-')+(s.tipe?' · '+s.tipe:''),112,46);I('Metode bayar',p.m,112,50.5);
 y=56;d.line(L,y,R,y);T('Rincian',L,y+4.2,{},8.5,1);T('Jumlah',R,y+4.2,{align:'right'},8.5,1);d.line(L,y+6,R,y+6);y+=10.6;
 var items=[];[0,1,2,3,4,6,5].forEach(function(i){var v=num(s['jb'+i]);if(v>0)items.push([i==0?'KPB'+(s.kpb?' ke-'+s.kpb:''):i==1?'Servis'+(s.svc?' '+s.svc:''):i==2?'Ganti Oli'+(s.oli?' '+s.oli:''):i==3?'Ganti Part':i==4?'Turun Mesin':i==5?(s.j5t||'Lainnya'):'Cuci Motor',v])});
 for(var k=0;k<5;k++){var pv=num(s['p'+k+'h']);if(pv>0)items.push([s['p'+k+'n']||'Suku cadang',pv])}
 items.forEach(function(it){T(String(it[0]).slice(0,60),L,y,{},8.5);T(R0(it[1]),R,y,{align:'right'},8.5);y+=4.5});
 d.line(L,y-2.2,R,y-2.2);y+=2.2;
 var y1=y,ln=function(a,b,bold){T(a,R-32,y,{align:'right'},8.5,bold);T(b,R,y,{align:'right'},8.5,bold);y+=4.5};
 ln('Total servis',R0(p.total));if(p.disc)ln('Diskon','- '+R0(p.disc));ln('Total tagihan',R0(p.due),1);ln('Dibayar',R0(p.paid));if(p.change>0)ln('Kembalian',R0(p.change));
 T('Terima kasih atas kepercayaan Anda.',L,y1,{},7.5);
 if(p.note)T('Catatan: '+String(p.note).slice(0,70),L,y1+4.5,{},7.5);
 T('Diterima oleh,',82,y1,{align:'center'},8.5);T(p.by||'-',82,y1+13.5,{align:'center'},8.5,1);d.line(62,y1+14.8,102,y1+14.8);
 y=Math.max(y,y1+17)+2;
 d.setLineWidth(.2);if(d.setLineDashPattern){d.setLineDashPattern([1.5,1.5],0);d.line(L,y,R,y);d.setLineDashPattern([],0)}else d.line(L,y,R,y);
 return y;
}
function payRcpt(id){
 var x=jf(id),p=x&&payInfo(x);if(!p)return;
 if(!window.jspdf){alert('Pustaka PDF belum termuat. Periksa koneksi internet.');return}
 var d=a5Doc();payRcptCompact(d,x,p);
 d.save('Kuitansi-'+String((x.d||{}).plat||'servis').replace(/\s+/g,'')+'-'+p.no+'.pdf');
}
function payCard(dn){
 var pd=dn.filter(function(x){return payInfo(x)}),by={Tunai:0,Transfer:0,QRIS:0},dis=0;
 pd.forEach(function(x){var p=payInfo(x);by[p.m]=(by[p.m]||0)+num(p.due);dis+=num(p.disc)});
 var ub=dn.filter(function(x){return x.status=='Selesai'}),ut=ub.reduce(function(a,x){return a+totalOf(x.d)},0);
 if(!pd.length&&!ub.length)return '';
 var r=function(a,b,c){return '<div class="ri"><div><b>'+a+'</b>'+(c?'<span>'+c+'</span>':'')+'</div><div style="text-align:right"><b class="amt">'+b+'</b></div></div>'};
 return '<div class="card"><h3>Pembayaran</h3>'+r('Tunai',R0(by.Tunai))+r('Transfer',R0(by.Transfer))+r('QRIS',R0(by.QRIS))+r('Diskon diberikan',R0(dis),pd.length+' pembayaran tercatat')+r('Belum dibayar',R0(ut),ub.length+' unit siap diambil')+'</div>';
}
var kasD='';
function ymd(ts){var t=new Date(ts);return t.getFullYear()+'-'+('0'+(t.getMonth()+1)).slice(-2)+'-'+('0'+t.getDate()).slice(-2)}
function revOf(x){var p=x.tw&&x.tw.pay,g=totalOf(x.d);return g-(p?Math.min(num(p.disc),g):0)}
function kasData(){
 var d0=kasD||ymd(Date.now()),pays=[],vo=[];
 db.jobs.forEach(function(x){var t=x.tw||{};if(t.pay&&ymd(t.pay.ts)==d0)pays.push({x:x,p:t.pay});(t.payVoid||[]).forEach(function(v){if(v.voidTs&&ymd(v.voidTs)==d0)vo.push({x:x,p:v})})});
 pays.sort(function(a,b){return a.p.ts-b.p.ts});
 var by={Tunai:[0,0],Transfer:[0,0],QRIS:[0,0]},dis=0,tot=0;
 pays.forEach(function(e){var m=e.p.m;by[m]=by[m]||[0,0];by[m][0]++;by[m][1]+=num(e.p.due);dis+=num(e.p.disc);tot+=num(e.p.due)});
 return {d0:d0,pays:pays,vo:vo,by:by,dis:dis,tot:tot}
}
function kasView(){
 var k=kasData(),hm=function(t){return new Date(t).toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'})};
 var h='<div class="card"><label>Tanggal kas</label><input type="date" id="kasd" value="'+k.d0+'" onchange="kasD=this.value;payTab(\'kas\')"></div>';
 h+='<div class="card"><h3>Rekap '+tglID(new Date(k.d0+'T12:00:00').getTime())+'</h3>'+['Tunai','Transfer','QRIS'].map(function(m){var v=k.by[m]||[0,0];return '<div class="ri"><div><b>'+m+'</b><span>'+v[0]+' transaksi</span></div><div style="text-align:right"><b class="amt">'+R0(v[1])+'</b></div></div>'}).join('')+
  '<div class="ri"><div><b>Diskon diberikan</b></div><div style="text-align:right"><span>'+R0(k.dis)+'</span></div></div>'+
  '<div class="ri"><div><b>Total kas masuk</b><span>'+k.pays.length+' pembayaran</span></div><div style="text-align:right"><b class="amt">'+R0(k.tot)+'</b></div></div>'+
  (k.vo.length?'<p class="mut" style="margin:8px 0 0">'+k.vo.length+' pembayaran dibatalkan pada tanggal ini.</p>':'')+'</div>';
 if(k.pays.length){h+='<div class="card"><h3>Rincian</h3>'+k.pays.map(function(e){var d=e.x.d||{};return '<div class="ri"><div><b>'+esc(d.plat||'-')+' · '+esc(e.p.m)+'</b><span>'+esc(e.p.no)+' · '+hm(e.p.ts)+' · '+esc(e.p.by||'-')+'</span></div><div style="text-align:right"><b class="amt">'+R0(e.p.due)+'</b></div></div>'}).join('')+'</div>';
  h+='<button class="btn w" onclick="payKasPdf()">Cetak PDF Kas Harian</button>'}
 else h+='<div class="card empty">Belum ada pembayaran pada tanggal ini.</div>';
 return h;
}
function payKasPdf(){
 if(!window.jspdf){alert('Pustaka PDF belum termuat. Periksa koneksi internet.');return}
 var k=kasData();if(!k.pays.length){alert('Belum ada pembayaran pada tanggal ini.');return}
 var d=new window.jspdf.jsPDF({unit:'mm',format:'a4'}),y,
  T=function(t,xx,yy,o,sz,b){d.setFont('helvetica',b?'bold':'normal');d.setFontSize(sz||9);d.text(String(t),xx,yy,o||{})},
  hm=function(t){return new Date(t).toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'})},
  cut=function(t,n){t=String(t||'-');return t.length>n?t.slice(0,n-1)+'...':t};
 try{d.addImage(IMG.df,'JPEG',14,10,22,22)}catch(e){}
 T('Business Center TBSM',105,17,{align:'center'},16,1);T('SMKS Darul Fatwa',105,23,{align:'center'},12,1);
 T('Jl. Letda Lukito No.90, Jatiroke, Kec. Jatinangor, Kab. Sumedang, Jawa Barat 45363',105,28.5,{align:'center'},8);
 d.setLineWidth(.8);d.line(14,35,196,35);d.setLineWidth(.2);d.line(14,36.2,196,36.2);
 T('Laporan Kas Harian',105,45,{align:'center'},12,1);T('Tanggal: '+tglID(new Date(k.d0+'T12:00:00').getTime()),105,51,{align:'center'},9.5);
 y=60;var head=function(){T('No',14,y,{},8.5,1);T('Kuitansi',22,y,{},8.5,1);T('Jam',58,y,{},8.5,1);T('Plat',70,y,{},8.5,1);T('Pemilik',96,y,{},8.5,1);T('Metode',138,y,{},8.5,1);T('Diskon',172,y,{align:'right'},8.5,1);T('Dibayar',196,y,{align:'right'},8.5,1);d.setLineWidth(.2);d.line(14,y+1.5,196,y+1.5);y+=6};
 head();
 k.pays.forEach(function(e,i){if(y>262){d.addPage();y=16;head()}var z=e.x.d||{};T(i+1,14,y,{},8.5);T(e.p.no,22,y,{},8.5);T(hm(e.p.ts),58,y,{},8.5);T(cut(z.plat,14),70,y,{},8.5);T(cut(z.pm_nama,22),96,y,{},8.5);T(e.p.m,138,y,{},8.5);T(e.p.disc?R0(e.p.disc):'-',172,y,{align:'right'},8.5);T(R0(e.p.due),196,y,{align:'right'},8.5);y+=5.5});
 if(y>225){d.addPage();y=16}
 d.setLineWidth(.4);d.line(14,y-3.5,196,y-3.5);y+=2;
 ['Tunai','Transfer','QRIS'].forEach(function(m){var v=k.by[m]||[0,0];T(m+' ('+v[0]+' transaksi)',150,y,{align:'right'},9);T(R0(v[1]),196,y,{align:'right'},9);y+=5.5});
 T('Total diskon',150,y,{align:'right'},9);T(R0(k.dis),196,y,{align:'right'},9);y+=5.5;
 T('TOTAL KAS MASUK ('+k.pays.length+' pembayaran)',150,y,{align:'right'},10,1);T(R0(k.tot),196,y,{align:'right'},10,1);y+=6;
 if(k.vo.length){T('Pembayaran dibatalkan pada tanggal ini: '+k.vo.length,14,y,{},8.5);y+=6}
 y+=8;T('Dibuat oleh,',45,y,{align:'center'},9);T('Mengetahui,',155,y,{align:'center'},9);
 T(who(),45,y+24,{align:'center'},9,1);d.line(22,y+25.5,68,y+25.5);d.line(132,y+25.5,178,y+25.5);
 T('Dicetak '+tglID(Date.now())+' '+hhmm()+' oleh '+cut(who(),30)+' | Business Center TBSM SMKS Darul Fatwa',14,291,{},7.5);
 d.save('Kas-Harian-'+k.d0+'.pdf');
}
async function payVoid(id){
 var x=jf(id),p=x&&payInfo(x);if(!x||!p||myRole()!='admin')return;
 var a=prompt('Alasan membatalkan pembayaran '+p.no+'?');if(a===null)return;a=a.trim();if(!a){alert('Alasan wajib diisi.');return}
 if(!confirm('Batalkan pembayaran '+p.no+' ('+R0(p.due)+')? Unit kembali ke Belum dibayar dan bisa dibayar ulang.'))return;
 x.tw=x.tw||{};x.tw.payVoid=(x.tw.payVoid||[]).concat([{no:p.no,m:p.m,total:p.total,disc:p.disc,due:p.due,paid:p.paid,ts:p.ts,by:p.by,voidTs:Date.now(),voidBy:who(),alasan:a}]);
 delete x.tw.pay;delete x.tw.ambil;
 try{aud(x,'ubah','Pembayaran dibatalkan ('+p.no+', '+R0(p.due)+'): '+a)}catch(e){}
 payF='belum';payOpen=null;
 await setS(id,'Selesai');
}
var LAY={init:false,call:0,mulai:0,voice:false};
function sayq(t){try{if(window.speechSynthesis){var u=new SpeechSynthesisUtterance(t);u.lang='id-ID';u.rate=.9;speechSynthesis.speak(u)}}catch(e){}}
function layVoice(){LAY.voice=!LAY.voice;if(LAY.voice)sayq('Suara layar antrian aktif.');$('app').innerHTML=vLay()}
function layFull(){try{if(document.fullscreenElement)document.exitFullscreen();else document.documentElement.requestFullscreen()}catch(e){}}
function layCheck(){
 var mc=0,mm=0;db.jobs.forEach(function(x){var t=x.tw||{};if(t.call>mc)mc=t.call;if(t.mulai>mm)mm=t.mulai});
 if(!LAY.init){LAY.init=true;LAY.call=mc;LAY.mulai=mm;return}
 var ev=[];db.jobs.forEach(function(x){var t=x.tw||{},d=x.d||{};
  if(t.call>LAY.call)ev.push([t.call,'Nomor antrian '+qNo(x)+'. Plat nomor '+spellPlat(d.plat)+'. Ready.']);
  if(t.mulai>LAY.mulai&&t.pit)ev.push([t.mulai,'Nomor antrian '+qNo(x)+'. Plat nomor '+spellPlat(d.plat)+(d.pm_nama?', atas nama '+d.pm_nama:'')+'. Lanjut ke proses pemeriksaan di '+t.pit+'.'])});
 LAY.call=Math.max(LAY.call,mc);LAY.mulai=Math.max(LAY.mulai,mm);
 if(LAY.voice)ev.sort(function(a,b){return a[0]-b[0]}).forEach(function(e){sayq(e[1])})
}
function vLay(){
 var j=db.jobs.filter(function(x){return !x.arsip}),nums=function(l){return l.length?l.map(function(x){return '<span class="lchip">'+qNo(x)+'</span>'}).join(''):'<span class="mut">-</span>'};
 var act=j.filter(function(x){return (x.status=='Menunggu'||x.status=='Dikerjakan')&&!(x.tw&&x.tw.fc)&&x.tw&&x.tw.call}).sort(function(a,b){return b.tw.call-a.tw.call})[0];
 var big=act?'<div class="lb"><span>Sedang dipanggil</span><b class="ln">'+qNo(act)+'</b><div class="lp">'+esc((act.d||{}).plat||'-')+((act.d||{}).tipe?' · '+esc(act.d.tipe):'')+'</div><div class="ls">'+(act.status=='Menunggu'?'Silakan menuju bengkel':'Menuju '+(pitOf(act)||'pemeriksaan'))+'</div></div>':'<div class="lb"><span>Belum ada panggilan</span></div>';
 var pits=Object.keys(PITS).map(function(p){var u=j.filter(function(x){return x.status=='Dikerjakan'&&!(x.tw&&x.tw.fc)&&pitOf(x)==p})[0];return '<div class="lpit"><span>'+p+'</span>'+(u?'<b>'+qNo(u)+'</b><small>'+esc((u.d||{}).plat||'-')+'</small>':'<b class="mut">Kosong</b>')+'</div>'}).join('');
 var wait=j.filter(function(x){return x.status=='Menunggu'}).sort(function(a,b){return a.ts-b.ts}),fc=j.filter(function(x){return x.status=='Dikerjakan'&&x.tw&&x.tw.fc}).sort(function(a,b){return a.ts-b.ts}),rd=j.filter(function(x){return x.status=='Selesai'}).sort(function(a,b){return a.ts-b.ts});
 return '<div class="lay">'+big+'<div class="lpits">'+pits+'</div><div class="card"><h3>Antrian berikutnya</h3><div class="lrow">'+nums(wait.slice(0,10))+'</div></div><div class="two"><div class="card"><h3>Final check</h3><div class="lrow">'+nums(fc)+'</div></div><div class="card"><h3>Siap diambil</h3><div class="lrow">'+nums(rd)+'</div></div></div>'+
  '<div class="cqa"><button class="btn s" onclick="layVoice()">Suara: '+(LAY.voice?'aktif':'nonaktif')+'</button><button class="btn s" onclick="layFull()">Layar penuh</button></div><p class="mut" style="text-align:center;font-size:12px">Diperbarui otomatis tiap 10 detik.</p></div>';
}
var arTick=0,selT=0,arBusy=false;
document.addEventListener('focusin',function(e){if(e.target&&e.target.tagName=='SELECT')selT=Date.now()});
document.addEventListener('change',function(e){var t=e.target;if(t&&t.tagName=='SELECT'&&t.type!='select-multiple')setTimeout(function(){try{t.blur()}catch(x){}},400)});
function arTyping(){
 var ae=document.activeElement;if(!ae)return false;
 if(/^(INPUT|TEXTAREA)$/.test(ae.tagName)&&ae.type!='button'&&ae.type!='checkbox'&&ae.type!='radio')return true;
 if(ae.tagName=='SELECT'&&Date.now()-selT<8000)return true;
 return false}
async function autoRefresh(force){
 if(arBusy||!REMOTE||!AW.u||document.hidden||!navigator.onLine||OB.length||SYN.busy)return;
 var T={lay:1,dash:2,q:2,mon:2,pay:2,rep:3};if(!T[tab])return;
 if(force!==true){arTick++;if(arTick%T[tab])return}
 if(arTyping())return;
 if(tab=='pay'&&payOpen)return;
 arBusy=true;var t0=tab;
 try{await loadAll()}catch(e){arBusy=false;return}
 arBusy=false;
 if(tab!=t0||arTyping()||OB.length||(tab=='pay'&&payOpen))return;
 var y=scrollY;
 if(tab=='lay'){layCheck();$('app').innerHTML=vLay()}
 else if(tab=='dash')$('app').innerHTML=vDash();
 else if(tab=='q'){if($('ql'))rq()}
 else if(tab=='mon')$('app').innerHTML=vMon();
 else if(tab=='pay')$('app').innerHTML=vPay();
 else if(tab=='rep'&&typeof rwKey!='undefined'&&!rwKey)$('app').innerHTML=vRep();
 else return;
 scrollTo(0,y);
}
setInterval(autoRefresh,10000);
document.addEventListener('visibilitychange',function(){if(!document.hidden)autoRefresh(true)});
/* Ambil data terbaru satu unit dari server sebelum menyimpan, supaya pembayaran dari HP lain tidak tertimpa data lama */
async function freshen(x){
 if(!REMOTE||!AW.u||!navigator.onLine||!x||!x.id)return;
 if(OB.some(function(o){return o.id==x.id}))return;
 var a=ids(),r;a.rowId=x.id;
 try{r=await tmo(AW.t.getRow(a),8000)}catch(e){return}
 var j;try{j=JSON.parse(r.payload)}catch(e){return}
 if(!j||j.au)return;
 x.tw=x.tw||{};var rt=j.tw||{};
 var lv=(x.tw.payVoid||[]).length,rv=(rt.payVoid||[]).length;
 if(rv>lv)x.tw.payVoid=rt.payVoid;
 if(rt.pay&&!x.tw.pay&&lv<=rv){x.tw.pay=rt.pay;if(rt.ambil)x.tw.ambil=rt.ambil}
 else if(!rt.pay&&x.tw.pay&&rv>lv){delete x.tw.pay}
 Object.keys(rt).forEach(function(k){if(k!='pay'&&k!='payVoid'&&k!='ambil'&&x.tw[k]===undefined)x.tw[k]=rt[k]});
 if(j.arsip&&!x.arsip)x.arsip=j.arsip;
 x._rs=j.status}
function vCall(){
 var w=waitQ();
 if(!w.length)return '';
 var cm=kv('bc_callq')||{},cc=can('status'),jam=function(t){return new Date(t).toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'})};
 var f=w[0],fd=f.d||{},mp=myPit(),pd=mp||pitDef(),ct=function(x){return (x.tw&&x.tw.call)||cm[x.id]||0};PITSEL=pd;
 var sel='<select id="pitSel" class="cqp" onchange="PITSEL=this.value"'+(mp?' disabled':'')+'>'+(pd?'':'<option value="" selected>Pilih Pit</option>')+Object.keys(PITS).filter(function(p){return !mp||p==mp}).map(function(p){return '<option value="'+p+'"'+(p==pd?' selected':'')+'>'+p+(pitBusy(p)?' (terisi)':'')+'</option>'}).join('')+'</select>';
 var h='<h2>Panggilan Antrian <small class="cnt">'+w.length+' menunggu</small></h2><div class="card cq">'+
  (cc?'<button class="cqn" onclick="callQ(\''+f.id+'\')"><span>Ketuk untuk panggil</span><b>'+qNo(f)+'</b></button>':'<div class="cqn"><span>Nomor berikutnya</span><b>'+qNo(f)+'</b></div>')+
  '<div class="cqi"><b>'+esc(fd.plat||'-')+(fd.tipe?' · '+esc(fd.tipe):'')+'</b><span>'+esc(fd.pm_nama||'-')+'</span>'+(ct(f)?'<em>Dipanggil '+jam(ct(f))+'</em>':'')+'</div>'+
  (cc?'<div class="cqa">'+sel+'<button class="btn" onclick="mulaiQ(\''+f.id+'\')">Dikerjakan</button></div>':'')+'</div>';
 if(w.length>1)h+='<div class="card rcl">'+w.slice(1,6).map(function(x){var d=x.d||{};return '<div class="ri"><div><b>No. '+qNo(x)+' · '+esc(d.plat||'-')+'</b><span>'+esc(d.pm_nama||'-')+(ct(x)?' · dipanggil '+jam(ct(x)):'')+'</span></div>'+(cc?'<div class="cqs"><button class="btn s" onclick="callQ(\''+x.id+'\')">Panggil</button><button class="btn s cqk" onclick="mulaiQ(\''+x.id+'\')">Dikerjakan</button></div>':'')+'</div>'}).join('')+(w.length>6?'<p class="mut" style="text-align:center;margin:8px 0 0">+'+(w.length-6)+' nomor lagi di Antrian</p>':'')+'</div>';
 return h;
}
function vDash(){
 var r=myRole();if(!r)return noRole();
 var j=db.jobs,m=can('money'),nm=AW.u?(AW.u.name||AW.u.email.split('@')[0]):'Admin';
 var hr=new Date().getHours(),sal=hr<11?'Selamat pagi':hr<15?'Selamat siang':hr<18?'Selamat sore':'Selamat malam';
 var c=function(s){return j.filter(function(x){return x.status==s}).length};
 var today=j.filter(function(x){return sameDay(x.ts)}).length,aktif=c('Menunggu')+c('Dikerjakan');
 var inc=j.filter(function(x){return sameDay(x.ts)&&(x.status=='Selesai'||x.status=='Diambil')}).reduce(function(a,x){return a+revOf(x)},0);
 var hero='<section class="dh"><div class="dht"><img src="'+IMG.df+'" alt=""><div><span class="ey">'+sal+'</span><h2>'+esc(nm)+'</h2><p>'+ROLE_DEF[r].n+'</p><p>'+tglID(Date.now())+'</p></div>'+(REMOTE?'<button class="rf" onclick="reload2()" aria-label="Muat ulang" title="Muat ulang">&#8635;</button>':'')+'</div>'+
  '<div class="kp"><div><b>'+today+'</b><span>Unit hari ini</span></div><div><b>'+aktif+'</b><span>Unit aktif</span></div>'+(m?'<div><b class="kpm">'+R0(inc)+'</b><span>Pendapatan hari ini</span></div>':'<div><b>'+c('Selesai')+'</b><span>Siap diambil</span></div>')+'</div></section>';
 var qa=[];
 if(can('create'))qa.push(['new','Pendaftaran','plus','Daftarkan unit baru']);
 if(!can('exec'))qa.push(['q','Antrian Servis','list',aktif+' unit aktif']);
 qa.push(['mon','Monitor Servis','pulse','Pantau status']);
 if(can('pay'))qa.push(['pay','Pembayaran','wallet','Kasir dan kuitansi']);
 if(can('rep'))qa.push(['rep','Laporan','chart','Rekap dan unduh']);
 if(can('users')&&REMOTE)qa.push(['akun','Kelola Akun','users','Atur akun dan peran']);
 if(can('audit'))qa.push(['aud','Audit Trail','shield','Jejak perubahan data']);
 var qh='<h2>Menu cepat</h2><div class="qa">'+qa.map(function(i){return '<button class="qt" onclick="go(\''+i[0]+'\')"><span class="qi">'+ic(i[2])+'</span><b>'+i[1]+'</b><small>'+i[3]+'</small></button>'}).join('')+'</div>';
 var HR=['Min','Sen','Sel','Rab','Kam','Jum','Sab'],bars=[],mx=1,i,d,n;
 for(i=6;i>=0;i--){d=new Date(Date.now()-i*864e5);n=j.filter(function(x){return new Date(x.ts).toDateString()==d.toDateString()}).length;bars.push([HR[d.getDay()],n,i==0]);if(n>mx)mx=n}
 var ch='<div class="card"><h3>Unit masuk 7 hari terakhir</h3><div class="bars">'+bars.map(function(b){return '<div class="bc'+(b[2]?' td':'')+'"><em>'+b[1]+'</em><i style="height:'+Math.max(4,Math.round(b[1]/mx*100))+'%"></i><span>'+b[0]+'</span></div>'}).join('')+'</div></div>';
 var CL={Menunggu:'#d98b00',Dikerjakan:'#2f6fe0',Selesai:'#0e8a5f',Diambil:'#778899'},tot=j.length,acc=0,seg=[];
 ST.forEach(function(k){var v=c(k);if(v){seg.push(CL[k]+' '+(acc/tot*100)+'% '+((acc+v)/tot*100)+'%');acc+=v}});
 var dn='<div class="card"><h3>Status unit</h3><div class="dnw"><div class="dn" style="background:'+(tot?'conic-gradient('+seg.join(',')+')':'var(--gr)')+'"><div><b>'+tot+'</b><span>unit</span></div></div><ul class="lgd">'+ST.map(function(k){return '<li><i style="background:'+CL[k]+'"></i>'+(k=='Selesai'?'Siap diambil':k)+'<b>'+c(k)+'</b></li>'}).join('')+'</ul></div></div>';
 var rc=j.slice(0,5),rh='<h2>Aktivitas terbaru</h2>'+(rc.length?'<div class="card rcl">'+rc.map(function(x){return '<div class="ri"><div><b>'+esc(x.d.plat)+(x.d.tipe?' · '+esc(x.d.tipe):'')+'</b><span>'+esc(x.d.pm_nama||'-')+' · '+tglID(x.ts)+'</span></div><span class="tag '+x.status+'">'+x.status+'</span></div>'}).join('')+'</div>':'<div class="card empty">Belum ada aktivitas.</div>');
 return (loadErr?'<div class="card err">'+esc(loadErr)+'</div>':'')+hero+(can('exec')?'':vCall())+vFc()+vPits()+vWork()+qh+'<div class="two">'+ch+dn+'</div>'+rh;
}
async function loadAll(){
 loadErr='';
 if(!REMOTE){lsLoad();return}
 if(OB.length&&AW.u)await obFlush();
 var o=ids();o.queries=[Appwrite.Query.orderDesc('$createdAt'),Appwrite.Query.limit(500)];
 var r;
 try{r=await tmo(AW.t.listRows(o),12000)}
 catch(e){if(e&&e.code)throw e;if(cacheLoad()){OB.forEach(function(){});return}throw e}
 db.jobs=[];db.audx=[];r.rows.forEach(function(w){var j;try{j=JSON.parse(w.payload)}catch(e){return}if(j.au){db.audx.push(j);return}j.id=w.$id;db.jobs.push(j)});
 OB.forEach(function(o){var i=-1;db.jobs.forEach(function(j,n){if(j.id==o.id)i=n});
  if(o.k=='d'){if(i>-1)db.jobs.splice(i,1);return}
  var j;try{j=JSON.parse(o.p)}catch(e){return}
  if(j.au){var dup=db.audx.some(function(g){return g.t==j.t&&g.no==j.no});if(!dup)db.audx.unshift(j);return}
  j.id=o.id;if(i>-1)db.jobs[i]=j;else db.jobs.unshift(j)});
 cacheSave();
}
async function reload2(){var y=scrollY;try{await loadAll()}catch(e){loadErr='Gagal memuat data: '+(e.message||e)}render();scrollTo(0,y)}
/* ===== Offline-first: simpan di HP, unggah otomatis saat ada jaringan ===== */
var PJ=(CFG.projectId||'x'),OBK='bc_ob_'+PJ,OFK='bc_fail_'+PJ,CCK='bc_cache_'+PJ,USK='bc_user_'+PJ;
var OB=[],OFL=[],SYN={busy:false,err:'',ok:0};
function kv(k,v){try{if(v===undefined){var s=localStorage.getItem(k);return s?JSON.parse(s):null}if(v===null){localStorage.removeItem(k);return true}localStorage.setItem(k,JSON.stringify(v));return true}catch(e){return false}}
function tmo(p,ms){return new Promise(function(res,rej){var t=setTimeout(function(){rej(new Error('Waktu habis'))},ms);p.then(function(v){clearTimeout(t);res(v)},function(e){clearTimeout(t);rej(e)})})}
function obLoad(){OB=kv(OBK)||[];OFL=kv(OFK)||[]}
function obSave(){var a=kv(OBK,OB),b=kv(OFK,OFL);synUI();return a&&b}
function cacheSave(){if(REMOTE)kv(CCK,{jobs:db.jobs,audx:db.audx||[],t:Date.now()})}
function cacheLoad(){var c=kv(CCK);if(!c)return false;db.jobs=c.jobs||[];db.audx=c.audx||[];return true}
function obPush(op){
 op.t=Date.now();var i=-1;OB.forEach(function(o,n){if(o.id==op.id)i=n});
 if(i<0)OB.push(op);
 else{var o=OB[i];
  if(op.k=='d'){if(o.k=='c')OB.splice(i,1);else{OB[i]=op}}
  else if(o.k=='d'){}
  else{o.p=op.p;o.l=op.l;o.t=op.t}}
 return obSave()}
async function obSend(o){
 var GID=CFG.guardId||(CFG.guard&&CFG.functionId);
 if(GID){var ex;try{ex=await AW.f.createExecution({functionId:GID,body:JSON.stringify({action:'job',k:o.k,id:o.id,p:o.p}),async:false,path:'/',method:(Appwrite.ExecutionMethod?Appwrite.ExecutionMethod.POST:'POST')})}catch(e0){var c0=e0&&e0.code;if(c0==401||c0==403){var live=true;try{await AW.a.get()}catch(e1){if(e1&&e1.code==401)live=false}if(live){var e2=new Error('Akun tidak boleh menjalankan function ('+(e0.type||c0)+': '+(e0.message||'')+'). Periksa Execute access function.');e2.code=424;throw e2}}throw e0}var r={};try{r=JSON.parse(ex.responseBody||'{}')}catch(e){}var c=ex.responseStatusCode;if(c>=400||r.ok===false){var er=new Error(r.error||('Kesalahan '+c));er.code=c||500;throw er}return}
 var a=ids();a.rowId=o.id;
 if(o.k=='c'){a.data={payload:o.p};await AW.t.createRow(a)}
 else if(o.k=='u'){a.data={payload:o.p};await AW.t.updateRow(a)}
 else await AW.t.deleteRow(a)}
async function fixDup(o){
 var j;try{j=JSON.parse(o.p)}catch(e){return}
 if(!j||!j.no||j.au)return;
 var q=ids();q.queries=[Appwrite.Query.orderDesc('$createdAt'),Appwrite.Query.limit(500)];
 var r;
 try{r=await tmo(AW.t.listRows(q),12000)}catch(e){if(e&&e.code&&e.code!=401)return;throw e}
 var used={};
 r.rows.forEach(function(w){if(w.$id==o.id)return;try{var t=JSON.parse(w.payload);if(t&&t.no&&!t.au)used[t.no]=1}catch(e){}});
 if(!used[j.no])return;
 OB.forEach(function(p){if(p===o)return;try{var t=JSON.parse(p.p);if(t&&t.no&&!t.au)used[t.no]=1}catch(e){}});
 var old=j.no,i=old.lastIndexOf('-')+1,pf=old.slice(0,i),m=0;
 Object.keys(used).forEach(function(n){if(n.indexOf(pf)===0){var v=parseInt(n.slice(pf.length))||0;if(v>m)m=v}});
 j.no=pf+String(m+1).padStart(4,'0');
 j.log=j.log||[];j.log.push({t:Date.now(),u:who(),r:roleN(),a:'ubah',m:'Nomor servis disesuaikan dari '+old+' ke '+j.no+' karena sudah dipakai perangkat lain'});
 if(j.log.length>40)j.log=j.log.slice(-40);
 o.p=JSON.stringify(j);o.l=(j.d&&j.d.plat||'-')+' · '+j.no;
 db.jobs.forEach(function(x){if(x.id==o.id){x.no=j.no;x.log=j.log}});
 cacheSave();obSave()}
async function obFlush(){
 if(!REMOTE||!AW.u||SYN.busy||!OB.length)return;
 if(!navigator.onLine){synUI();return}
 SYN.busy=true;SYN.err='';synUI();var fin=false;
 try{
  while(OB.length){var o=OB[0];
   try{if(o.k=='c')await fixDup(o);await tmo(obSend(o),20000)}
   catch(e){var c=e&&e.code;
    if(c==401){SYN.err='auth';break}
    if(c==409&&o.k=='c'){o.k='u';continue}
    if(c==404&&o.k=='d'){OB.shift();obSave();continue}
    if(c&&c>=400&&c<500&&c!=408&&c!=429){o.e=(c==404?'Data sudah tidak ada di server':(e.message||'Ditolak server'));OFL.push(OB.shift());obSave();continue}
    SYN.err='net';break}
   OB.shift();obSave()}
  fin=!OB.length&&!SYN.err;
 }finally{SYN.busy=false;if(fin&&!OFL.length)SYN.ok=Date.now();synUI();if(fin)setTimeout(synUI,4300)}
}
function jstr(){return JSON.stringify([db.jobs,db.audx])}
async function syncNow(){
 if(!REMOTE||!AW.u)return;
 await obFlush();
 if(SYN.err||SYN.busy)return;
 var h=jstr();try{await loadAll()}catch(e){return}
 if(jstr()!=h&&tab!='new'&&tab!='syn')render();else if(tab=='syn')render();
 synUI()}
function synUI(){var b=$('syn');if(!b)return;
 if(!REMOTE||!AW.u){b.hidden=true;return}
 var n=OB.length+Object.keys(FQ).length,f=OFL.length,t='',c='';
 if(f){t=f+' gagal';c='bad'}
 else if(SYN.err=='auth'){t='Masuk ulang';c='bad'}
 else if(SYN.busy){t='Mengunggah';c='wait'}
 else if(!navigator.onLine){t='Offline'+(n?' · '+n:'');c='off'}
 else if(n){t=n+' tertunda';c='wait'}
 else if(SYN.ok&&Date.now()-SYN.ok<4000){t='Tersinkron';c='ok'}
 else{b.hidden=true;return}
 b.hidden=false;b.className='synp '+c;b.textContent=t}
function reauth(){AW.u=null;kv(USK,null);SYN.err='';tab='login';render()}
function retryF(i){var o=OFL.splice(i,1)[0];if(o){delete o.e;OB.push(o);obSave();obFlush();render()}}
function dropF(i){OFL.splice(i,1);obSave();render()}
function dropAllF(){if(confirm('Buang semua perubahan yang gagal? Perubahan ini tidak akan diunggah.')){OFL=[];obSave();render()}}
var OA={c:'Tambah',u:'Ubah',d:'Hapus'};
function vSyn(){
 var st=SYN.err=='auth'?'Sesi habis':SYN.busy?'Mengunggah…':!navigator.onLine?'Offline':'Online';
 var it=function(o,i,fail){return '<div class="ae" style="--c:'+(fail?'#d71920':'#d98b00')+'"><i></i><div><b>'+OA[o.k]+' · '+esc(o.l||'-')+'</b><span>'+tglID(o.t)+' '+jam(o.t)+(fail?' · '+esc(o.e||'Gagal'):'')+'</span>'+(fail?'<div class="ah2"><button class="btn s" onclick="retryF('+i+')">Coba lagi</button><button class="btn s" onclick="dropF('+i+')">Buang</button></div>':'')+'</div></div>'};
 var h='<div class="card"><h3>Sinkronisasi</h3><p class="mut">Perubahan disimpan di HP lebih dulu, lalu diunggah ke server otomatis saat jaringan tersambung. Status: <b>'+st+'</b>.</p><div class="ah2">'+(SYN.err=='auth'?'<button class="btn" onclick="reauth()">Masuk ulang</button>':'<button class="btn s" onclick="syncNow().then(render)">Kirim sekarang</button>')+'</div></div>';
 h+=OB.length?'<h2>Menunggu unggah <small class="cnt">'+OB.length+'</small></h2><div class="card rcl">'+OB.map(function(o,i){return it(o,i,false)}).join('')+'</div>':'<div class="card empty">Semua data sudah terunggah.</div>';
 if(OFL.length)h+='<h2>Gagal diunggah <small class="cnt">'+OFL.length+'</small></h2><div class="card rcl">'+OFL.map(function(o,i){return it(o,i,true)}).join('')+'<div class="ah2" style="margin-top:8px"><button class="btn s" onclick="dropAllF()">Buang semua</button></div></div>';
 return h+'<p class="mut" style="text-align:center;font-size:11.5px">Jika dua perangkat mengubah data yang sama saat offline, perubahan yang diunggah terakhir yang dipakai. Nomor urut yang dibuat saat offline bisa sama dengan perangkat lain.</p>'}
obLoad();
addEventListener('online',function(){synUI();syncNow()});addEventListener('offline',synUI);
document.addEventListener('visibilitychange',function(){if(!document.hidden&&OB.length)obFlush()});
setInterval(function(){if(OB.length&&!SYN.busy&&navigator.onLine)obFlush()},15000);
/* ===== Kamera: baca No. Polisi / No. Mesin / No. Rangka (OCR di HP, Tesseract.js) ===== */
function gResize(G,nw,nh){nh=nh||Math.max(1,Math.round(G.h*nw/G.w));var o=new Float32Array(nw*nh),sx=G.w/nw,sy=G.h/nh,x,y,g=G.g;
 if(sx>=1&&sy>=1){for(y=0;y<nh;y++){var y0=Math.floor(y*sy),y1=Math.max(y0+1,Math.min(G.h,Math.floor((y+1)*sy)));for(x=0;x<nw;x++){var x0=Math.floor(x*sx),x1=Math.max(x0+1,Math.min(G.w,Math.floor((x+1)*sx))),s=0,n=0;for(var yy=y0;yy<y1;yy++){var r=yy*G.w;for(var xx=x0;xx<x1;xx++){s+=g[r+xx];n++}}o[y*nw+x]=s/n}}}
 else{for(y=0;y<nh;y++){var fy=Math.min(G.h-1,Math.max(0,(y+.5)*sy-.5)),a=Math.floor(fy),b=Math.min(G.h-1,a+1),ty=fy-a;for(x=0;x<nw;x++){var fx=Math.min(G.w-1,Math.max(0,(x+.5)*sx-.5)),c=Math.floor(fx),d=Math.min(G.w-1,c+1),tx=fx-c;o[y*nw+x]=(g[a*G.w+c]*(1-tx)+g[a*G.w+d]*tx)*(1-ty)+(g[b*G.w+c]*(1-tx)+g[b*G.w+d]*tx)*ty}}}
 return {g:o,w:nw,h:nh}}
function gBlur3(G){var w=G.w,h=G.h,t=new Float32Array(w*h),o=new Float32Array(w*h),x,y,g=G.g;
 for(y=0;y<h;y++)for(x=0;x<w;x++){var l=g[y*w+Math.max(0,x-1)],r=g[y*w+Math.min(w-1,x+1)];t[y*w+x]=(l+2*g[y*w+x]+r)/4}
 for(y=0;y<h;y++){var u=Math.max(0,y-1),d=Math.min(h-1,y+1);for(x=0;x<w;x++)o[y*w+x]=(t[u*w+x]+2*t[y*w+x]+t[d*w+x])/4}
 return {g:o,w:w,h:h}}
function gSobelX(G){var w=G.w,h=G.h,o=new Float32Array(w*h),g=G.g,x,y;
 for(y=0;y<h;y++){var u=Math.max(0,y-1)*w,m=y*w,d=Math.min(h-1,y+1)*w;for(x=0;x<w;x++){var l=Math.max(0,x-1),r=Math.min(w-1,x+1);o[m+x]=Math.abs((g[u+r]-g[u+l])+2*(g[m+r]-g[m+l])+(g[d+r]-g[d+l]))}}
 return o}
function pctl(a,p){var c=Float32Array.from(a).sort();return c[Math.min(c.length-1,Math.floor(c.length*p/100))]}
function smoothV(v,k){k=Math.max(1,Math.floor(k));var n=v.length,o=new Float32Array(n),h=Math.floor(k/2),i,j;for(i=0;i<n;i++){var s=0;for(j=i-h;j<i-h+k;j++)if(j>=0&&j<n)s+=v[j];o[i]=s/k}return o}
function gBands(G){
 var s=400/G.w,S=gBlur3(gResize(G,400,Math.max(20,Math.floor(G.h*s)))),w=S.w,h=S.h,gx=gSobelX(S),th=Math.max(25,pctl(gx,92)),E=new Float32Array(w*h),i,x,y;
 for(i=0;i<E.length;i++)E[i]=gx[i]>th?1:0;
 var rs=new Float32Array(h);for(y=0;y<h;y++){var q=0;for(x=0;x<w;x++)q+=E[y*w+x];rs[y]=q}
 var R=smoothV(rs,Math.max(3,h*.04)),used=new Uint8Array(h),out=[];
 for(var it=0;it<2;it++){var m=0,yc=-1;for(y=0;y<h;y++){var r=used[y]?0:R[y];if(r>m){m=r;yc=y}}
  if(m<=0)break;var lo=yc,hi=yc;
  while(lo>0&&!used[lo-1]&&R[lo-1]>.35*m)lo--;while(hi<h-1&&!used[hi+1]&&R[hi+1]>.35*m)hi++;
  for(y=Math.max(0,lo-3);y<=Math.min(h-1,hi+3);y++)used[y]=1;
  if(hi-lo<h*.08)continue;
  var cs=new Float32Array(w);for(y=lo;y<=hi;y++)for(x=0;x<w;x++)cs[x]+=E[y*w+x];
  var C=smoothV(cs,6),cm=0;for(x=0;x<w;x++)if(C[x]>cm)cm=C[x];
  var L=-1,Rr=-1;for(x=0;x<w;x++)if(C[x]>.18*cm){if(L<0)L=x;Rr=x}
  if(L<0)continue;var bw=Rr-L,bh=hi-lo,px=Math.floor(bw*.05)+6,py=Math.floor(bh*.18)+3;
  var b=[Math.max(0,L-px),Math.max(0,lo-py),Math.min(w-1,Rr+px),Math.min(h-1,hi+py)];
  out.push(b.map(function(v){return Math.floor(v/s)}))}
 return out}
function gCrop(G,b){var x0=Math.max(0,b[0]),y0=Math.max(0,b[1]),x1=Math.min(G.w,b[2]),y1=Math.min(G.h,b[3]),w=x1-x0,h=y1-y0,o=new Float32Array(w*h);for(var y=0;y<h;y++)for(var x=0;x<w;x++)o[y*w+x]=G.g[(y0+y)*G.w+x0+x];return {g:o,w:w,h:h}}
/* ambang adaptif (rata-rata lokal), tinggi teks dibuat th piksel, bingkai putih 16px */
function gPrep(G,th,inv,CC){
 var nw=Math.max(8,Math.round(G.w*th/G.h)),S=gBlur3(gResize(G,nw,th)),w=S.w,h=S.h,bs=(Math.floor(th/3))|1,r=(bs-1)/2,C=CC==null?10:CC,
  I=new Float64Array((w+1)*(h+1)),x,y;
 for(y=0;y<h;y++){var rs=0;for(x=0;x<w;x++){rs+=S.g[y*w+x];I[(y+1)*(w+1)+x+1]=I[y*(w+1)+x+1]+rs}}
 var B=16,ow=w+2*B,oh=h+2*B,o=new Uint8Array(ow*oh).fill(255);
 for(y=0;y<h;y++){var y0=Math.max(0,y-r),y1=Math.min(h-1,y+r);for(x=0;x<w;x++){var x0=Math.max(0,x-r),x1=Math.min(w-1,x+r),n=(x1-x0+1)*(y1-y0+1),sm=I[(y1+1)*(w+1)+x1+1]-I[y0*(w+1)+x1+1]-I[(y1+1)*(w+1)+x0]+I[y0*(w+1)+x0],t=sm/n-C,v=S.g[y*w+x]>t?255:0;o[(y+B)*ow+x+B]=inv?255-v:v}}
 return {d:o,w:ow,h:oh}}

var D2L={'0':'O','1':'I','5':'S','8':'B','2':'Z','6':'G'},L2D={O:'0',Q:'0',I:'1',L:'1',S:'5',B:'8',Z:'2',G:'6'};
var PF1='ABDEFGHKLMNPRSTWZ',PF2={};'AA AB AD AE AG BA BB BD BE BG BH BK BL BM BN BP DA DB DC DD DE DG DH DK DL DM DN DR DS DT DW EA EB ED KB KH KT KU PA PB'.split(' ').forEach(function(k){PF2[k]=1});
function okPfx(p){return p.length==1?PF1.indexOf(p)>-1:!!PF2[p]}
function fixPlat(seg,a,b){var out='',cost=0;for(var j=0;j<seg.length;j++){var ch=seg.charAt(j),lp=j<a||j>=a+b;
  if(lp){if(/[A-Z]/.test(ch))out+=ch;else if(D2L[ch]){out+=D2L[ch];cost+=j<a?3:1.5}else return null}
  else{if(/[0-9]/.test(ch))out+=ch;else if(L2D[ch]){out+=L2D[ch];cost+=1.5}else return null}}
 return {o:out,c:cost}}
function parsePlat(t){
 var best=null,groups=String(t||'').toUpperCase().split(/\n+/).map(function(l){return l.split(/[^A-Z0-9]+/).filter(Boolean)});
 groups.push([].concat.apply([],groups));
 groups.forEach(function(tk){
  for(var i=0;i<tk.length;i++){var s='',bd={};
   for(var k=i;k<Math.min(tk.length,i+3);k++){s+=tk[k];bd[s.length]=1;
    for(var o=0;o<=2;o++)for(var e=0;e<=2;e++){var m=s.slice(o,s.length-e);if(m.length<3)continue;
     for(var a=1;a<=2;a++)for(var b=1;b<=4;b++){var c=m.length-a-b;if(c<1||c>3)continue;
      var r=fixPlat(m,a,b);if(!r)continue;
      var pf=r.o.slice(0,a),sf=r.o.slice(a+b);if(!okPfx(pf)||/[IO]/.test(sf))continue;
      var sc=-r.c+(c>=2?1:0)+(b>=3?1:0)+(bd[o+a]?1:0)+(bd[o+a+b]?1:0)-(k==i?0:.5)-.5*(o+e);
      if(sc>=.5&&(!best||sc>best.sc))best={sc:sc,v:pf+' '+r.o.slice(a,a+b)+' '+sf}}}}}});
 return best?best.v:null}
function parseMesin(t){
 var best=null;
 String(t||'').toUpperCase().split(/\n+/).forEach(function(line){
  var s=line.replace(/[^A-Z0-9]/g,'');if(s.length>16){var tk=line.split(/[^A-Z0-9]+/).filter(Boolean).sort(function(a,b){return b.length-a.length});s=tk[0]||''}
  if(s.length<8||s.length>16)return;
  var sc=-Math.abs(s.length-12)+(/[A-Z]/.test(s)&&/[0-9]/.test(s)?3:0);
  if(!best||sc>best.sc)best={sc:sc,v:s}});
 return best?best.v:null}
var VIN_WL='0123456789ABCDEFGHJKLMNPRSTUVWXYZ',VIN_PF=['MH1','MLH'],VCONF={M:'MNW',H:'HNM',L:'L1I',1:'1ILJ7T'},D2LV={'5':'S','8':'B','2':'Z','6':'G','4':'A'};
function vinPfx(w){var best=null;VIN_PF.forEach(function(t){var m=0;for(var j=0;j<3;j++){var c=w.charAt(j);if(c!=t.charAt(j)&&(VCONF[t.charAt(j)]||'').indexOf(c)<0)m++}if(!best||m<best.m)best={m:m,t:t}});return best}
function vinFix(w){
 var pf=vinPfx(w);if(pf.m>1)return null;
 var o=pf.t,c=pf.m*1.5,j,ch;
 for(j=3;j<8;j++)o+=w.charAt(j);
 ch=w.charAt(8);if(/[0-9X]/.test(ch))o+=ch;else if(L2D[ch]){o+=L2D[ch];c+=1.5}else{o+=ch;c+=3}
 ch=w.charAt(9);o+=ch;
 ch=w.charAt(10);if(/[A-Z]/.test(ch))o+=ch;else if(D2LV[ch]){o+=D2LV[ch];c+=1.5}else{o+=ch;c+=3}
 for(j=11;j<17;j++){ch=w.charAt(j);if(/[0-9]/.test(ch))o+=ch;else if(L2D[ch]){o+=L2D[ch];c+=1.5}else return null}
 return {o:o,c:c}}
function parseRangka(t){
 var lines=String(t||'').toUpperCase().split(/\n+/).map(function(l){return l.replace(/[^A-Z0-9]/g,'').replace(/[OQ]/g,'0').replace(/I/g,'1')}).filter(function(l){return l.length>=3}),
  src=lines.slice();
 for(var q=0;q+1<lines.length;q++)src.push(lines[q]+lines[q+1]);
 if(lines.length>2)src.push(lines.join(''));
 var best=null,part=null;
 src.forEach(function(s){
  for(var i=0;i+17<=s.length;i++){var r=vinFix(s.substr(i,17));if(!r)continue;var sc=r.c+i*.3;if(sc<=5&&(!best||sc<best.sc))best={sc:sc,v:r.o}}
  for(var i2=0;i2<s.length-9;i2++){var pf=vinPfx(s.substr(i2,3));if(pf.m>1)continue;var seg=pf.t+s.substr(i2+3,14);if(!part||seg.length>part.length)part=seg}});
 return best?best.v:(part&&part.length>=12?part:null)}

var TESS_JS='https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js',TESS_LANG='https://cdn.jsdelivr.net/npm/@tesseract.js-data/eng/4.0.0_best_int',OCR_WL='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
var CAMK='',CAMB=false,TW=null,CAMS=null,TORCH=false;
function camPic(k,cv,b){var im=$('cp_'+k);if(!im)return;try{var x0=0,y0=0,w=cv.width,h=cv.height;if(b){x0=Math.max(0,b[0]);y0=Math.max(0,b[1]);w=Math.min(cv.width,b[2])-x0;h=Math.min(cv.height,b[3])-y0}if(w<8||h<8){x0=0;y0=0;w=cv.width;h=cv.height}var sc=Math.min(1,900/w),c=document.createElement('canvas');c.width=Math.round(w*sc);c.height=Math.round(h*sc);c.getContext('2d').drawImage(cv,x0,y0,w,h,0,0,c.width,c.height);im.src=c.toDataURL('image/jpeg',.7);im.classList.add('on')}catch(e){}}
function camPicOff(k){var im=$('cp_'+k);if(im){im.classList.remove('on');im.removeAttribute('src')}}
function camHint(k,t,bad){var h=$('ch_'+k);if(h){h.textContent=t;h.style.color=bad?'#d71920':''}}
function loadTess(){return new Promise(function(res,rej){if(window.Tesseract)return res();var s=document.createElement('script');s.src=TESS_JS;s.onload=function(){res()};s.onerror=function(){rej(new Error('load'))};document.head.appendChild(s)})}
async function getTW(){if(!TW)TW=await Tesseract.createWorker('eng',1,{langPath:TESS_LANG});return TW}
function gOf(cv){var x=cv.getContext('2d'),w=cv.width,h=cv.height,d=x.getImageData(0,0,w,h).data,g=new Float32Array(w*h);for(var i=0,j=0;i<d.length;i+=4,j++)g[j]=.299*d[i]+.587*d[i+1]+.114*d[i+2];return {g:g,w:w,h:h}}
function toCv(I){var c=document.createElement('canvas');c.width=I.w;c.height=I.h;var x=c.getContext('2d'),im=x.createImageData(I.w,I.h);for(var i=0,j=0;i<I.d.length;i++,j+=4){im.data[j]=im.data[j+1]=im.data[j+2]=I.d[i];im.data[j+3]=255}x.putImageData(im,0,0);return c}
function scan(k){if(CAMB)return;CAMK=k;if(!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)){camFile();return}camOpen(k)}
function camFile(){var f=$('camf');f.value='';f.click()}
async function camOpen(k){
 var o=$('cam');
 if(!o){o=document.createElement('div');o.id='cam';o.innerHTML='<video id="camv" playsinline muted autoplay></video><div id="camg"></div><div id="camt"></div><div id="camb"><button type="button" id="camx" onclick="camClose()">Batal</button><button type="button" id="camsh" onclick="camShot()" aria-label="Ambil foto"></button><button type="button" id="camtl" onclick="camTorch()">Lampu</button></div>';document.body.appendChild(o)}
 var asp=k=='plat'?2.6:4.2,g=$('camg'),bw=Math.min(innerWidth*.9,560);g.style.width=bw+'px';g.style.height=(bw/asp)+'px';
 $('camt').textContent=k=='plat'?'Posisikan plat di dalam kotak. Dekatkan dan tegak lurus.':k=='noMesin'?'Posisikan nomor mesin di dalam kotak.':'Posisikan nomor rangka di dalam kotak.';
 o.style.display='block';
 try{CAMS=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'},width:{ideal:1920},height:{ideal:1080}},audio:false});
  var v=$('camv');v.srcObject=CAMS;try{await v.play()}catch(e){}
  var tr=CAMS.getVideoTracks()[0],cap=tr.getCapabilities?tr.getCapabilities():{};
  $('camtl').style.display=cap.torch?'':'none';TORCH=false;
  if(cap.focusMode&&cap.focusMode.indexOf('continuous')>-1)tr.applyConstraints({advanced:[{focusMode:'continuous'}]}).catch(function(){})
 }catch(e){camClose();camHint(k,'Kamera langsung tidak bisa dibuka. Memakai kamera bawaan HP.',1);camFile()}
}
function camClose(){var o=$('cam');if(o)o.style.display='none';if(CAMS){CAMS.getTracks().forEach(function(t){t.stop()});CAMS=null}}
function camTorch(){if(!CAMS)return;TORCH=!TORCH;CAMS.getVideoTracks()[0].applyConstraints({advanced:[{torch:TORCH}]}).catch(function(){})}
function camCrop(vw,vh,cw,ch,g){
 var sc=Math.max(cw/vw,ch/vh),ox=(vw*sc-cw)/2,oy=(vh*sc-ch)/2,sx=(g.left+ox)/sc,sy=(g.top+oy)/sc,sw=g.width/sc,sh=g.height/sc,mx=sw*.08,my=sh*.12;
 sx=Math.max(0,sx-mx);sy=Math.max(0,sy-my);sw=Math.min(vw-sx,sw+2*mx);sh=Math.min(vh-sy,sh+2*my);return {x:sx,y:sy,w:sw,h:sh}}
var CAMFULL=null;
function camShot(){
 var v=$('camv'),o=$('cam');if(!v||!v.videoWidth)return;
 var fk=Math.min(1,1600/v.videoWidth),fc=document.createElement('canvas');fc.width=Math.round(v.videoWidth*fk);fc.height=Math.round(v.videoHeight*fk);fc.getContext('2d').drawImage(v,0,0,fc.width,fc.height);CAMFULL=fc;
 var r=camCrop(v.videoWidth,v.videoHeight,o.clientWidth,o.clientHeight,$('camg').getBoundingClientRect()),k=Math.min(1,1600/r.w),c=document.createElement('canvas');
 c.width=Math.round(r.w*k);c.height=Math.round(r.h*k);c.getContext('2d').drawImage(v,r.x,r.y,r.w,r.h,0,0,c.width,c.height);camClose();ocrGo(c)}
async function camPick(ev){
 var f=ev.target.files&&ev.target.files[0];if(!f||!CAMK)return;CAMFULL=null;
 try{var bmp=await createImageBitmap(f),k=Math.min(1,1600/Math.max(bmp.width,bmp.height)),c=document.createElement('canvas');c.width=Math.round(bmp.width*k);c.height=Math.round(bmp.height*k);c.getContext('2d').drawImage(bmp,0,0,c.width,c.height);ocrGo(c)}
 catch(e){camHint(CAMK,'Foto tidak bisa dibaca. Coba lagi atau ketik manual.',1)}}
function camFlags(res,allv,confs){
 var n=allv.length,out=[],cf=confs[res]||null;
 for(var i=0;i<res.length;i++){
  var f='',same=0;
  allv.forEach(function(v){if(v.length==res.length&&v.charAt(i)==res.charAt(i))same++});
  if(n>=2&&same<n)f='r';
  else if(cf&&cf[i]!=null&&cf[i]<70)f='y';
  out.push(f)}
 return out}
function camMarks(k,res,allv,confs){
 var h=$('ch_'+k),old=$('cm_'+k);if(old)old.remove();if(!h||!res)return;
 var fl=camFlags(res,allv,confs),bad=fl.filter(Boolean).length,d=document.createElement('div');d.id='cm_'+k;
 d.innerHTML='<div class="cm">'+res.split('').map(function(c,i){return '<i class="'+(fl[i]=='r'?'cr':fl[i]=='y'?'cy':'')+'">'+esc(c)+'</i>'}).join('')+'</div><div class="cml">'+(bad?'Merah: hasil bacaan berbeda-beda. Kuning: kamera kurang yakin. Periksa karakter berwarna dulu, lalu cocokkan semuanya dengan aslinya.':(allv.length<2?'Hanya satu hasil bacaan, belum bisa dibandingkan. Cocokkan semua karakter dengan aslinya.':'Semua bacaan konsisten, tetapi tetap cocokkan dengan aslinya.'))+'</div>';
 h.insertAdjacentElement('afterend',d);
 var el=fe(k);if(el){if(el._cmh)el.removeEventListener('input',el._cmh);el._cmh=function(){if(el.value!==res){var m=$('cm_'+k);if(m)m.remove()}};el.addEventListener('input',el._cmh)}}
async function ocrGo(cv){
 var k=CAMK,btn=document.querySelector('#fm .cam[data-for="'+k+'"]');fotoEvid(k,CAMFULL||cv);CAMFULL=null;CAMB=true;camPicOff(k);var om=$('cm_'+k);if(om)om.remove();if(btn)btn.disabled=true;camHint(k,'Menyiapkan pembaca teks…');
 try{
  try{await loadTess()}catch(e){camHint(k,'Pembaca teks belum bisa dimuat. Hubungkan internet satu kali, lalu coba lagi.',1);return}
  var wk=await getTW(),parse=k=='plat'?parsePlat:k=='noMesin'?parseMesin:parseRangka,G=gOf(cv),cands=[],bx=gBands(G);
  bx.forEach(function(b){cands.push({g:gCrop(G,b),psm:'7'})});cands.push({g:G,psm:'6'});
  var pipes=k=='noRangka'?[[130,0,-10],[130,0,-15],[100,0,-15],[90,0,-15],[130,0,-5],[130,0,-20],[100,0,-20]]:[[130,0],[180,0],[100,0],[130,1]],votes={},order=[],allv=[],confs={},n=0,max=Math.min(k=='noRangka'?14:12,cands.length*pipes.length),res=null;
  var att=async function(i,j){if(n>=max)return null;n++;camHint(k,'Membaca foto… '+n+'/'+max);
   await wk.setParameters({tessedit_char_whitelist:k=='noRangka'?VIN_WL:OCR_WL,tessedit_pageseg_mode:cands[i].psm});
   var r=await wk.recognize(toCv(gPrep(cands[i].g,pipes[j][0],pipes[j][1],pipes[j][2]))),p=parse(r&&r.data&&r.data.text);
   if(p){allv.push(p);if(!votes[p]){votes[p]=0;order.push(p)}votes[p]++;
    try{var sy=((r.data&&r.data.symbols)||[]).filter(function(q){return /[A-Za-z0-9]/.test(q.text||'')});if(sy.length==p.length){var cc=sy.map(function(q){return q.confidence}),pv=confs[p];confs[p]=pv?pv.map(function(x,ix){return Math.min(x,cc[ix])}):cc}}catch(e2){}}return p};
  var win=-1,i,j;
  for(i=0;i<cands.length&&win<0;i++){if(await att(i,0))win=i}
  if(win>=0){for(j=1;j<pipes.length&&!res;j++){await att(win,j);order.forEach(function(v){if(votes[v]>=2)res=v})}}
  else{for(j=1;j<pipes.length&&!res;j++)for(i=0;i<cands.length&&!res;i++){await att(i,j);order.forEach(function(v){if(votes[v]>=2)res=v})}}
  if(!res&&k=='noRangka'&&allv.length>=2){var lv=function(x,y){var d=[],i2,j2;for(j2=0;j2<=y.length;j2++)d[j2]=j2;for(i2=1;i2<=x.length;i2++){var pv=d.slice();d[0]=i2;for(j2=1;j2<=y.length;j2++)d[j2]=Math.min(pv[j2]+1,d[j2-1]+1,pv[j2-1]+(x.charAt(i2-1)!=y.charAt(j2-1)?1:0))}return d[y.length]},bm=1e9;allv.forEach(function(x){var t=0;allv.forEach(function(y){t+=lv(x,y)});if(t<bm||(t==bm&&x.length==17&&res&&res.length!=17)){bm=t;res=x}})}
  if(!res&&order.length){res=order.sort(function(a,b){return votes[b]-votes[a]})[0]}
  if(!res){camHint(k,'Teks belum terbaca. Pastikan teks memenuhi kotak, cukup terang, tidak silau, atau ketik manual.',1);return}
  camPic(k,cv,bx.length?bx[0]:null);var el=fe(k);if(el){el.value=res;el.dispatchEvent(new Event('input',{bubbles:true}))}
  if(k=='noRangka'&&res.length!=17)camHint(k,'Terbaca '+res.length+' dari 17 karakter: '+res+'. Lengkapi atau foto ulang lebih dekat.',1);else camHint(k,'Hasil dari kamera: '+res+'. Periksa kembali sebelum menyimpan.');
  camMarks(k,res,allv,confs)
 }catch(e){camHint(k,'Gagal membaca foto. Coba lagi atau ketik manual.',1)}
 finally{CAMB=false;if(btn)btn.disabled=false}
}
async function boot0(){
 if(CFG.projectId&&!window.Appwrite){$('app').innerHTML='<div class="card empty">Pustaka Appwrite gagal dimuat. Periksa koneksi internet.</div>';return}
 if(REMOTE){
  var c=new Appwrite.Client().setEndpoint(CFG.endpoint).setProject(CFG.projectId);
  AW.a=new Appwrite.Account(c);AW.t=new Appwrite.TablesDB(c);AW.f=new Appwrite.Functions(c);
  try{AW.u=await tmo(AW.a.get(),8000);kv(USK,{$id:AW.u.$id,name:AW.u.name,email:AW.u.email,labels:AW.u.labels})}catch(e){AW.u=null;if(e&&e.code==401)kv(USK,null);else if(!(e&&e.code)){var cu=kv(USK);if(cu)AW.u=cu}}
 }
 if((!REMOTE||AW.u)&&myRole()){try{await loadAll()}catch(e){loadErr='Gagal memuat data: '+(e.message||e)}}
 fotoBoot();var hh=(location.hash||'').slice(1);tab=(REMOTE&&!AW.u)?'home':(TITLES[hh]&&hh!='home'&&hh!='login'?hh:'dash');render();
}
async function boot(){try{await boot0()}catch(e){$('app').innerHTML='<div class="card empty">Terjadi kesalahan: '+esc(e.message||e)+'</div>'}}
function setFt(){var f=$('ft');if(f)document.documentElement.style.setProperty('--ftH',f.offsetHeight+'px')}
setFt();addEventListener('resize',setFt);addEventListener('load',setFt);
if('serviceWorker' in navigator)addEventListener('load',function(){navigator.serviceWorker.register('sw.js').catch(function(){})});
$('lgdf').src=IMG.df;$('burger').innerHTML=ic('menu');$('th').innerHTML=ic('sun');
ROLE_DEF.admin.users=1;
ROLE_DEF.admin.bak=1;
function bakLast(){try{return localStorage.getItem('bc_lastbak')||''}catch(e){return ''}}
function vBak(){var n=db.jobs.length,lb=bakLast();
 return '<div class="card"><h3>Cadangan Data</h3><p class="mut" style="margin:0 0 10px">Simpan salinan seluruh data servis ('+n+' data) ke HP Anda. Lakukan secara rutin, misalnya seminggu sekali.</p>'+
 '<p style="margin:0 0 12px"><small class="mut">Cadangan terakhir: '+(lb?esc(lb):'belum pernah')+'</small></p>'+
 '<div class="acts"><button class="btn" onclick="bakJson()">'+ic('download')+'<span>Unduh cadangan (JSON)</span></button><button class="btn s" onclick="bakXls()">'+ic('download')+'<span>Unduh semua data (Excel)</span></button></div>'+
 '<p class="mut" style="margin:12px 0 0;font-size:12px;line-height:1.5">JSON memuat semua isian dan jejak perubahan, cocok untuk arsip. Excel mudah dibaca dan dibuka di komputer. Berkas ini berisi data pribadi pelanggan, jadi simpan di tempat aman dan jangan dibagikan sembarangan. Pemulihan dari cadangan belum tersedia di aplikasi; hubungi pengembang bila perlu memulihkan.</p></div>'}
function bakMark(){var t=tglID(Date.now())+' '+hhmm();try{localStorage.setItem('bc_lastbak',t)}catch(e){}if(tab=='bak')render()}
function bakJson(){if(!db.jobs.length){alert('Belum ada data untuk dicadangkan.');return}
 var o={aplikasi:'Business Center TBSM',dibuat:new Date().toISOString(),oleh:who(),jumlah:db.jobs.length,data:db.jobs};
 saveBlob(new Blob([JSON.stringify(o,null,1)],{type:'application/json'}),'Cadangan-Business-Center-'+new Date().toISOString().slice(0,10)+'.json');bakMark()}
async function bakXls(){if(!db.jobs.length){alert('Belum ada data untuk diunduh.');return}
 var keys=[],seen={};db.jobs.forEach(function(x){Object.keys(x.d||{}).forEach(function(k){if(!seen[k]){seen[k]=1;keys.push(k)}})});
 keys.sort(function(a,b){return fl(a)<fl(b)?-1:1});
 var A=[['No. Servis','Tanggal','Status','Total (Rp)'].concat(keys.map(fl))].concat(db.jobs.slice().sort(function(a,b){return a.ts-b.ts}).map(function(x){var d=x.d||{};return [x.no,tglID(x.ts),x.status,totalOf(d)].concat(keys.map(function(k){var v=d[k];return v===true?'Ya':(v===false||v==null?'':v)}))}));
 var fn='Semua-Data-Business-Center-'+new Date().toISOString().slice(0,10);
 try{await loadXLSX();var ws=XLSX.utils.aoa_to_sheet(A),wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,'Data Servis');XLSX.writeFile(wb,fn+'.xlsx')}catch(e){
  var h='<html xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="utf-8"></head><body><table border="1">'+A.map(function(r,i){return '<tr>'+r.map(function(c){return (i==0?'<th>':'<td>')+esc(c)+(i==0?'</th>':'</td>')}).join('')+'</tr>'}).join('')+'</table></body></html>';
  saveBlob(new Blob(['\ufeff'+h],{type:'application/vnd.ms-excel'}),fn+'.xls')}
 bakMark()}
ROLE_DEF.admin.audit=1;ROLE_DEF.pembimbing.audit=1;
var AF='Semua',TS='ket';
var AL={buat:['Dibuat','#0e8a5f'],ubah:['Diubah','#2f6fe0'],status:['Status','#d98b00'],hapus:['Dihapus','#d71920']};
var FL={cuci:'Cuci Motor',fotos:'Foto kondisi motor',plat:'No. Polisi',tipe:'Type',tahun:'Tahun',km:'KM',noMesin:'No. Mesin',noRangka:'No. Rangka',email:'Email',sosmed:'Sosmed',pb_nama:'Nama pembawa',pb_hp:'Telp pembawa',pb_alamat:'Alamat pembawa',pb_kel:'Kel/Kec pembawa',pm_nama:'Nama pemilik',pm_hp:'Telp pemilik',pm_alamat:'Alamat pemilik',pm_kel:'Kel/Kec pemilik',dealer:'Dari dealer sendiri',hub:'Hubungan',always:'Always Honda',alasan:'Alasan ke AHASS',alasan_e:'Alasan lainnya',pit:'PIT Express',bbm:'BBM',cmb:'MB',cwo:'WO',csor:'SOR',cwor:'WOR',kondisi:'Kondisi motor',j5t:'Nama pekerjaan',keluhan:'Keluhan',analisa:'Analisa',konf:'Konfirmasi',konf_telp:'Telp konfirmasi',bekas:'Part bekas',sa:'Service Advisor',mekanik:'Mekanik',pembimbing:'Pembimbing',saran:'Saran mekanik',kpb:'KPB',oli:'Oli'};
function fl(k){return FL[k]||(/^j\d$/.test(k)?'Pekerjaan':/^jb\d$/.test(k)?'Biaya pekerjaan':/^p\dn$/.test(k)?'Suku cadang':/^p\dh$/.test(k)?'Harga suku cadang':k)}
function who(){return AW.u?(AW.u.name||AW.u.email||'-'):'Mode lokal'}
function roleN(){var r=myRole();return r?ROLE_DEF[r].n:''}
function norm(v){return v===false||v==null||v==='0'?'':String(v)}
function diffD(o,n){var k,a={},out=[];o=o||{};n=n||{};for(k in o)a[k]=1;for(k in n)a[k]=1;for(k in a)if(norm(o[k])!=norm(n[k])){var l=fl(k);if(out.indexOf(l)<0)out.push(l)}return out}
function aud(x,a,m){if(!x.log){x.log=[];if(a!='buat')x.log.push({t:x.ts,u:'',r:'',a:'buat',m:'Pendaftaran dibuat (sebelum audit trail aktif)'})}x.log.push({t:Date.now(),u:who(),r:roleN(),a:a,m:m});if(x.log.length>40)x.log=x.log.slice(-40)}
async function audDel(x){var e={au:1,t:Date.now(),u:who(),r:roleN(),a:'hapus',m:'Data servis dihapus',no:x.no,plat:x.d.plat,nm:x.d.pm_nama};db.audx=db.audx||[];db.audx.unshift(e);
 if(!REMOTE){lsSave();return}
 obPush({k:'c',id:Appwrite.ID.unique(),p:JSON.stringify(e),l:'Catatan penghapusan '+(x.d.plat||'-')});cacheSave();obFlush()}
function jam(t){var d=new Date(t);return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')}
function audEv(){var e=[];db.jobs.forEach(function(x){var l=x.log;if(!l||!l.length)l=[{t:x.ts,u:'',r:'',a:'buat',m:'Pendaftaran dibuat (sebelum audit trail aktif)'}];l.forEach(function(g){e.push({t:g.t,u:g.u,r:g.r,a:g.a,m:g.m,no:x.no,plat:x.d.plat})})});(db.audx||[]).forEach(function(g){e.push({t:g.t,u:g.u,r:g.r,a:g.a,m:g.m,no:g.no,plat:g.plat,nm:g.nm})});e.sort(function(a,b){return b.t-a.t});return e}
var AP='Semua',AD1='',AD2='';
function setAF(v){AF=v;$('app').innerHTML=vAud()}
function setAP(v){AP=v;AD1='';AD2='';$('app').innerHTML=vAud()}
function setAD(){AD1=$('ad1').value;AD2=$('ad2').value;AP=(AD1||AD2)?'Rentang':'Semua';$('app').innerHTML=vAud()}
function audList(){
 var n=Date.now(),sod=new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()).getTime(),a=0,b=1e15;
 if(AP=='Hari ini')a=sod;else if(AP=='7 hari')a=n-7*864e5;else if(AP=='30 hari')a=n-30*864e5;
 else if(AP=='Rentang'){if(AD1)a=new Date(AD1+'T00:00:00').getTime();if(AD2)b=new Date(AD2+'T23:59:59').getTime()}
 return audEv().filter(function(e){return(AF=='Semua'||e.a==AF)&&e.t>=a&&e.t<=b})
}
function dfmt(v){return v?v.split('-').reverse().join('/'):'Pilih tanggal'}
function vAud(){
 var all=audEv(),l=audList(),sh=l.slice(0,100);
 var ch=function(arr,cur,fn,lab){return '<div class="afc">'+arr.map(function(f){return '<button class="'+(cur==f?'on':'')+'" onclick="'+fn+'(\''+f+'\')">'+lab(f)+'</button>'}).join('')+'</div>'};
 var f1=ch(['Semua','buat','ubah','status','hapus'],AF,'setAF',function(f){return f=='Semua'?'Semua':AL[f][0]});
 var dt='<div class="adr"><label>Dari<input id="ad1" type="date" value="'+esc(AD1)+'" onchange="setAD()"></label><label>Sampai<input id="ad2" type="date" value="'+esc(AD2)+'" onchange="setAD()"></label></div>';
 var hd='<div class="ah"><span>'+l.length+' dari '+all.length+' catatan</span><div>'+(REMOTE?'<button class="btn s" onclick="reload2()">Muat ulang</button>':'')+'<button class="btn s" onclick="audXls()">'+ic('download')+'<span>Excel</span></button></div></div>';
 var rows=sh.length?'<div class="card rcl">'+sh.map(function(e){var a=AL[e.a]||AL.ubah;return '<div class="ae" style="--c:'+a[1]+'"><i></i><div><b>'+esc(e.m)+'</b><p>'+esc(e.plat||'-')+' · '+esc(e.no||'-')+(e.nm?' · '+esc(e.nm):'')+'</p><span>'+esc(e.u||'Tidak tercatat')+(e.r?' ('+esc(e.r)+')':'')+' · '+tglID(e.t)+' '+jam(e.t)+'</span></div></div>'}).join('')+'</div>':'<div class="card empty">Tidak ada catatan pada filter ini.</div>';
 return (loadErr?'<div class="card err">'+esc(loadErr)+'</div>':'')+'<div class="card af">'+f1+dt+'</div>'+hd+rows+(l.length>100?'<p class="mut" style="text-align:center;font-size:12px">Menampilkan 100 terbaru. Unduh Excel untuk semuanya.</p>':'')+'<p class="mut" style="text-align:center;font-size:11.5px">Pencatatan dimulai sejak fitur ini aktif. Data lama hanya tercatat saat dibuat.</p>';
}
async function audXls(){
 var l=audList();if(!l.length){alert('Belum ada catatan untuk diunduh.');return}
 var A=[['Waktu','Tindakan','Plat','No. Servis','Keterangan','Pengguna','Peran']].concat(l.map(function(e){return [tglID(e.t)+' '+jam(e.t),(AL[e.a]||AL.ubah)[0],e.plat||'',e.no||'',e.m+(e.nm?' (pemilik '+e.nm+')':''),e.u||'Tidak tercatat',e.r||'']}));
 var fn='Audit-Trail-Service-Point-'+new Date().toISOString().slice(0,10);
 try{await loadXLSX();var ws=XLSX.utils.aoa_to_sheet(A);ws['!cols']=[{wch:24},{wch:11},{wch:12},{wch:15},{wch:48},{wch:20},{wch:20}];
  var wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,'Audit Trail');XLSX.writeFile(wb,fn+'.xlsx')
 }catch(e){
  var h='<html xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="utf-8"></head><body><table border="1">'+A.map(function(r,i){return '<tr>'+r.map(function(c){return (i==0?'<th>':'<td>')+esc(c)+(i==0?'</th>':'</td>')}).join('')+'</tr>'}).join('')+'</table></body></html>';
  saveBlob(new Blob(['\ufeff'+h],{type:'application/vnd.ms-excel'}),fn+'.xls')}
}
function setTS(v){TS=v;$('app').innerHTML=vTos()}
function vTos(){
 var tb='<div class="aud-f"><button class="'+(TS=='ket'?'on':'')+'" onclick="setTS(\'ket\')">Ketentuan Penggunaan</button><button class="'+(TS=='priv'?'on':'')+'" onclick="setTS(\'priv\')">Kebijakan Privasi</button></div>';
 var up='<p class="mut" style="font-size:12px;margin:0 0 10px">Diperbarui 7 November 2026</p>';
 var K='<h3>1. Tentang aplikasi</h3><p>Business Center TBSM adalah aplikasi internal unit usaha Service Point SMKS Darul Fatwa, kerjasama AHASS Daya Anugrah Mandiri Jatinangor. Aplikasi ini dipakai untuk mencatat pendaftaran, antrian, dan layanan servis motor.</p>'+
 '<h3>2. Akun dan peran</h3><ul><li>Akun dibuat dan diatur oleh admin. Peran (Admin, Pembimbing, Service Advisor, Mekanik / Siswa Praktik) menentukan apa yang boleh Anda lihat dan ubah.</li><li>Jaga kerahasiaan kata sandi dan jangan membagikan akun. Semua tindakan lewat akun Anda menjadi tanggung jawab Anda.</li><li>Segera beri tahu admin jika akun Anda dicurigai dipakai orang lain.</li></ul>'+
 '<h3>3. Penggunaan yang diizinkan</h3><ul><li>Gunakan aplikasi hanya untuk keperluan operasional servis di Service Point.</li><li>Isi data dengan benar dan lengkap sesuai keadaan sebenarnya.</li><li>Dilarang membuka data di luar kewenangan peran Anda, mengubah atau menghapus data tanpa alasan, mencoba menembus keamanan, atau memakai data pelanggan untuk keperluan lain.</li></ul>'+
 '<h3>4. Audit trail</h3><p>Pembuatan, perubahan, pergantian status, dan penghapusan data servis dicatat beserta nama pengguna, peran, dan waktunya. Catatan ini dapat dilihat oleh Admin dan Pembimbing.</p>'+
 '<h3>5. Dokumen dan data servis</h3><p>Form Service Advisor (PDF) dan laporan Excel dibuat dari data yang diinput pengguna. Pengguna bertanggung jawab atas kebenaran data tersebut. Syarat servis dan garansi mengikuti yang tercetak pada formulir.</p>'+
 '<h3>6. Ketersediaan layanan</h3><p>Aplikasi membutuhkan internet untuk masuk dan memuat data. Layanan diberikan apa adanya dan dapat berubah atau terhenti sewaktu-waktu, misalnya untuk perawatan atau karena gangguan jaringan.</p>'+
 '<h3>7. Pembatasan akses</h3><p>Admin dapat menonaktifkan atau menghapus akun yang melanggar ketentuan ini atau sudah tidak diperlukan.</p>'+
 '<h3>8. Perubahan ketentuan</h3><p>Ketentuan ini dapat diperbarui. Dengan tetap memakai aplikasi setelah pembaruan, Anda dianggap menyetujuinya.</p>'+
 '<h3>9. Kontak</h3><p>Pertanyaan tentang aplikasi dapat disampaikan kepada admin Business Center TBSM, SMKS Darul Fatwa, Jl. Letda Lukito No.90, Jatiroke, Kec. Jatinangor, Kab. Sumedang, Jawa Barat 45363.</p>';
 var P='<h3>1. Data yang kami olah</h3><ul><li><b>Akun:</b> nama, email, dan peran pengguna.</li><li><b>Data motor:</b> No. Polisi, type, tahun, KM, No. Mesin, No. Rangka.</li><li><b>Data pelanggan:</b> nama, alamat, kelurahan/kecamatan, nomor telepon, email, dan sosial media pembawa dan pemilik motor.</li><li><b>Data servis:</b> keluhan, pekerjaan, suku cadang, biaya, nama mekanik dan pembimbing, serta waktu pengerjaan.</li><li><b>Catatan audit:</b> nama pengguna, peran, tindakan, dan waktu.</li></ul>'+
 '<h3>2. Tujuan penggunaan</h3><p>Data dipakai untuk pendaftaran dan pelayanan servis, antrian, laporan, pengisian otomatis dari riwayat servis, pencetakan form, serta keamanan dan audit. Nomor telepon juga dipakai petugas untuk mengingatkan jadwal servis berikutnya lewat WhatsApp. Data tidak dipakai untuk iklan.</p>'+
 '<h3>3. Tempat penyimpanan</h3><p>Data disimpan di layanan Appwrite Cloud (server wilayah Singapura). Di perangkat Anda, aplikasi menyimpan salinan berkas aplikasi (cache) agar cepat dibuka. Aplikasi tidak memakai pelacak atau analitik pihak ketiga.</p>'+
 '<h3>4. Pihak ketiga</h3><p>Appwrite menyediakan penyimpanan data dan proses masuk. Pustaka aplikasi (Appwrite, PDF, Excel, dan pembaca teks kamera) dimuat dari jsDelivr dan cdnjs, sehingga penyedia tersebut dapat menerima alamat IP dan informasi perangkat Anda saat pustaka dimuat. Teks pada foto nomor polisi, mesin, dan rangka dibaca langsung di HP Anda. Foto-foto itu, serta foto kondisi motor yang ditambahkan petugas, diunggah dan disimpan di Google Drive milik sekolah sebagai bukti identitas unit untuk klaim garansi servis, dan hanya dapat dibuka lewat aplikasi oleh pengguna yang berperan. Data servis tidak dijual. Data hanya dibuka kepada pengguna aplikasi yang berwenang, dan dapat diberikan kepada pihak lain jika diwajibkan hukum atau atas persetujuan pemilik data.</p>'+
 '<h3>5. Akses data</h3><p>Akses dibatasi menurut peran. Misalnya, Mekanik tidak melihat biaya dan laporan, dan hanya Admin yang dapat mengelola akun serta menghapus data servis.</p>'+
 '<h3>6. Penyimpanan dan penghapusan</h3><p>Data disimpan selama masih diperlukan untuk operasional dan pelaporan. Admin dapat mengarsipkan data servis yang sudah selesai (disembunyikan dari antrian, tetap tersimpan untuk riwayat dan laporan) atau menghapusnya. Catatan penghapusannya tetap tersimpan di audit trail.</p>'+
 '<h3>7. Keamanan</h3><p>Aplikasi memakai login email dan kata sandi, koneksi terenkripsi (HTTPS), dan pembatasan akses menurut peran. Tidak ada sistem yang sepenuhnya bebas risiko, jadi jaga kerahasiaan kata sandi Anda.</p>'+
 '<h3>8. Hak pemilik data</h3><p>Pelanggan dapat meminta melihat, memperbaiki, atau menghapus data pribadinya melalui Service Advisor atau admin, sesuai UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.</p>'+
 '<h3>9. Perubahan dan kontak</h3><p>Kebijakan ini dapat diperbarui dan versi terbaru selalu ada di halaman ini. Pertanyaan dapat disampaikan kepada admin Business Center TBSM, SMKS Darul Fatwa.</p>';
 return tb+'<div class="card tos">'+up+(TS=='ket'?K:P)+'</div>';
}
ICO.users='<circle cx="9" cy="8" r="3.5"/><path d="M2 21c0-3.5 3-5.5 7-5.5s7 2 7 5.5M16 4.5a3.5 3.5 0 0 1 0 7M18 15.8c2.4.6 4 2.2 4 5.2"/>';
TITLES.akun='Kelola Akun';
var AK={list:null,err:'',form:null,busy:false};
async function api(action,data){
 var ex=await AW.f.createExecution({functionId:CFG.functionId,body:JSON.stringify(Object.assign({action:action},data||{})),async:false,path:'/',method:(Appwrite.ExecutionMethod?Appwrite.ExecutionMethod.POST:'POST')});
 var r={};try{r=JSON.parse(ex.responseBody||'{}')}catch(e){}
 if(ex.responseStatusCode>=400||r.ok===false)throw new Error(r.error||('Kesalahan '+ex.responseStatusCode));
 return r;
}
async function akunLoad(){AK.err='';try{var r=await api('list');AK.list=r.users}catch(e){AK.err=e.message||String(e)}AK.busy=false;render()}
function roleOf(l){for(var k in ROLE_DEF)if((l||[]).indexOf(k)>-1)return k;return ''}
function vAkun(){
 if(!CFG.functionId)return '<div class="card"><h3>Kelola Akun</h3><p>functionId belum diisi di config.js.</p></div>';
 if(AK.list===null&&!AK.err&&!AK.busy){AK.busy=true;akunLoad()}
 var h='<div class="greet"><div><h2>Kelola Akun</h2><p>Tambah, ubah, nonaktifkan, dan hapus akun pengguna.</p></div><button class="btn" onclick="akunBaru()">Tambah akun</button></div>'+akunForm();
 if(AK.err)h+='<div class="card"><p class="err">'+esc(AK.err)+'</p><p class="mut">Pastikan Function kelola-akun sudah di-deploy dan akses eksekusinya mencakup admin.</p><button class="btn s" onclick="AK.err=\'\';AK.list=null;render()">Coba lagi</button></div>';
 else if(AK.list===null)h+='<div class="card empty">Memuat akun…</div>';
 else h+=AK.list.length?AK.list.map(akunCard).join(''):'<div class="card empty">Belum ada akun.</div>';
 return h;
}
function akunForm(){
 var f=AK.form;if(!f)return '';var e=!!f.id,me=e&&AW.u&&f.id==AW.u.$id;
 var ro=['admin','pembimbing','advisor','mekanik','kepsek','wakahubin',''].map(function(k){return '<option value="'+k+'"'+(f.role==k?' selected':'')+'>'+(k?ROLE_DEF[k].n:'Tanpa peran')+'</option>'}).join('');
 return '<div class="card"><h3>'+(e?'Ubah akun':'Tambah akun')+'</h3><div class="f"><div><label>Nama</label><input id="ak_n" value="'+esc(f.name)+'"></div><div><label>Email</label><input id="ak_e" type="email" value="'+esc(f.email)+'"></div><div><label>Kata sandi'+(e?' (kosongkan jika tidak diganti)':' (min. 8 karakter)')+'</label><input id="ak_p" type="password" autocomplete="new-password"></div><div><label>Peran</label><select id="ak_r"'+(me?' disabled':'')+'>'+ro+'</select></div></div><div style="display:flex;gap:8px;margin-top:12px"><button class="btn" onclick="akunSave()">Simpan</button><button class="btn s" onclick="AK.form=null;render()">Batal</button></div><p id="ak_m" class="err"></p></div>';
}
function akunCard(u){
 var r=roleOf(u.labels),me=AW.u&&u.id==AW.u.$id;
 return '<div class="card"><div class="job"><div><h3>'+esc(u.name||'(tanpa nama)')+(me?' <span class="badge">Anda</span>':'')+'</h3><p>'+esc(u.email)+'</p><p>Bergabung: '+tglID(u.joined)+'</p></div><div style="text-align:right"><span class="badge">'+(r?ROLE_DEF[r].n:'Tanpa peran')+'</span><p class="mut" style="margin:6px 0 0">'+(u.status?'Aktif':'Nonaktif')+'</p></div></div><div class="acts"><button class="btn s" onclick="akunEdit(\''+u.id+'\')">Ubah</button>'+(me?'':'<button class="btn s" onclick="akunStatus(\''+u.id+'\','+(!u.status)+')">'+(u.status?'Nonaktifkan':'Aktifkan')+'</button><button class="btn s dg" onclick="akunDel(\''+u.id+'\')">Hapus</button>')+'</div></div>';
}
function akunBaru(){AK.form={id:'',name:'',email:'',role:'advisor'};render()}
function akunEdit(id){var u=AK.list.filter(function(x){return x.id==id})[0];AK.form={id:id,name:u.name,email:u.email,role:roleOf(u.labels)};render()}
function akunRefresh(){AK.form=null;AK.list=null;AK.err='';AK.busy=false;render()}
async function akunSave(){
 var f=AK.form,m=$('ak_m'),d={name:$('ak_n').value.trim(),email:$('ak_e').value.trim(),password:$('ak_p').value,role:$('ak_r').value};m.textContent='';
 if(!d.name||!d.email){m.textContent='Nama dan email wajib diisi.';return}
 if((!f.id||d.password)&&d.password.length<8){m.textContent='Kata sandi minimal 8 karakter.';return}
 try{if(f.id){var o=AK.list.filter(function(x){return x.id==f.id})[0]||{},u={id:f.id},ch=0;if(d.name!=(o.name||'')){u.name=d.name;ch=1}if(d.email.toLowerCase()!=String(o.email||'').toLowerCase()){u.email=d.email;ch=1}if(d.password){u.password=d.password;ch=1}if(d.role!=roleOf(o.labels)&&!$('ak_r').disabled){u.role=d.role;ch=1}if(!ch){AK.form=null;render();return}await api('update',u)}else await api('create',d);akunRefresh()}
 catch(e){m.textContent=e.message||String(e)}
}
async function akunStatus(id,s){try{await api('update',{id:id,status:s});akunRefresh()}catch(e){alert(e.message||e)}}
async function akunDel(id){if(!confirm('Hapus akun ini secara permanen?'))return;try{await api('delete',{id:id});akunRefresh()}catch(e){alert(e.message||e)}}
function fitKp(){document.querySelectorAll('.kpm').forEach(function(b){b.style.fontSize='';var f=parseFloat(getComputedStyle(b).fontSize),w=b.parentNode.clientWidth-16;while(b.scrollWidth>w&&f>10){f-=.5;b.style.fontSize=f+'px'}})}
try{new MutationObserver(fitKp).observe($('app'),{childList:true});addEventListener('resize',fitKp);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fitKp)}catch(e){}
boot();
