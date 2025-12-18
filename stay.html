const WA = "https://wa.me/905438495887?text=";
const PRICE_PER_PERSON_PER_NIGHT = 1500;
const MAX_GUESTS = 4;

/* ====== DOLU TARİH KİLİDİ (localStorage) ====== */
const LOCK_KEY = "alltayf_stay_locked_ranges_v1";
function readLocks(){
  try { return JSON.parse(localStorage.getItem(LOCK_KEY) || "{}"); }
  catch { return {}; }
}
function writeLocks(obj){
  localStorage.setItem(LOCK_KEY, JSON.stringify(obj));
}
function overlaps(aIn, aOut, bIn, bOut){
  const A1 = new Date(aIn+"T00:00:00").getTime();
  const A2 = new Date(aOut+"T00:00:00").getTime();
  const B1 = new Date(bIn+"T00:00:00").getTime();
  const B2 = new Date(bOut+"T00:00:00").getTime();
  return A1 < B2 && B1 < A2; // [in,out) çakışma
}
function isRangeAvailable(planetId, inD, outD){
  const locks = readLocks();
  const list = locks[planetId] || [];
  for(const r of list){
    if(overlaps(inD, outD, r.in, r.out)) return false;
  }
  return true;
}
function lockDatesAfterPayment(planetId, inD, outD){
  const locks = readLocks();
  if(!locks[planetId]) locks[planetId] = [];
  locks[planetId].push({ in: inD, out: outD });
  writeLocks(locks);
}

/* ====== Index: data-wa (varsa) ====== */
document.querySelectorAll("[data-wa]").forEach(el=>{
  el.addEventListener("click",(e)=>{
    e.preventDefault();
    const name = el.getAttribute("data-wa") || "Alltayf";
    const msg = encodeURIComponent(`Selam Rahim, ${name} hakkında bilgi almak istiyorum.`);
    window.open(WA + msg, "_blank", "noopener");
  });
});

/* ====== Stay sayfası elemanları ====== */
const planetGrid = document.getElementById("planetGrid");
const modal = document.getElementById("modal");
const mTitle = document.getElementById("mTitle");
const mClose = document.getElementById("mClose");
const mainPic = document.getElementById("mainPic");
const thumbs = document.getElementById("thumbs");

const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");
const guests = document.getElementById("guests");
const totalEl = document.getElementById("total");
const warn = document.getElementById("warn");
const form = document.getElementById("form");

// Sabit alt bar toplam (id çakışsa bile çalışsın)
const payTotalEl = document.getElementById("payTotal") || document.querySelector(".paybar-total");

// Eğer ayrı buton kullandıysan desteklesin
const payBtn = document.getElementById("payBtn");

let selectedPlanet = null;

/* ====== Tiny house gezegenleri + özel kartlar (cover görseller bağlı) ====== */
const TINY_PLANETS = [
  // ÖZEL KARTLAR
  { id:"sun",      name:"Güneş",       mini:"Merkez", cls:"planet-sun",    cover:"img/gunes.png" },
  { id:"moon",     name:"Ay",          mini:"Yoldaş", cls:"planet-moon",   cover:"img/yildiz.png" }, // şimdilik
  { id:"ship",     name:"Uzay Gemisi", mini:"Geçit",  cls:"planet-ship",   cover:"img/uzay-gemisi.png" },
  { id:"antim",    name:"Antimadde",   mini:"Eşik",   cls:"planet-antim",  cover:"img/antimadde.png" },

  // GEZEGENLER (elindeki alltayf görselleri ile)
  { id:"mercury", name:"Merkür",  mini:"Hız",   cls:"planet-mercury", cover:"img/alltayf-tech.png" },
  { id:"venus",   name:"Venüs",   mini:"Sis",   cls:"planet-venus",   cover:"img/alltayf-aura.png" },
  { id:"earth",   name:"Dünya",   mini:"Yaşam", cls:"planet-earth",   cover:"img/alltayf-farm.png" },
  { id:"mars",    name:"Mars",    mini:"Ateş",  cls:"planet-mars",    cover:"img/alltayf-build.png" },
  { id:"jupiter", name:"Jüpiter", mini:"Dev",   cls:"planet-jupiter", cover:"img/alltayf-event.png" },
  { id:"saturn",  name:"Satürn",  mini:"Halka", cls:"planet-saturn",  cover:"img/alltayf-stone.png" },
  { id:"uranus",  name:"Uranüs",  mini:"Soğuk", cls:"planet-uranus",  cover:"img/alltayf-energy.png" },
  { id:"neptune", name:"Neptün",  mini:"Derin", cls:"planet-neptune", cover:"img/alltayf-triad.png" },
  { id:"pluto",   name:"Plüton",  mini:"Uzak",  cls:"planet-pluto",   cover:"img/alltayf-drill.png" },
];

/* ====== 4 foto seti ======
   - Her gezegen için: 1) kendi cover'ı + 3 kozmik görsel
   - Arka plan dosyan: img/bg-universe.jpg
*/
function photoSet(p){
  const core = p?.cover || "img/bg-universe.jpg";
  const imgs = [
    core,
    "img/gunes.png",
    "img/uzay-gemisi.png",
    "img/antimadde.png",
  ];

  const overlays = [
    `linear-gradient(180deg, rgba(0,0,0,.15), rgba(0,0,0,.55)), radial-gradient(circle at 35% 35%, rgba(255,255,255,.20), transparent 55%)`,
    `linear-gradient(180deg, rgba(0,0,0,.20), rgba(0,0,0,.60)), radial-gradient(circle at 70% 30%, rgba(255,255,255,.18), transparent 60%)`,
    `linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,.58)), radial-gradient(circle at 50% 60%, rgba(255,255,255,.16), transparent 55%)`,
    `linear-gradient(180deg, rgba(0,0,0,.22), rgba(0,0,0,.62)), radial-gradient(circle at 25% 70%, rgba(255,255,255,.14), transparent 55%)`,
  ];

  return imgs.map((src, i)=> `${overlays[i]}, url("${src}")`);
}

/* ====== Tarih/hesap yardımcıları ====== */
function isoToday(){
  const d=new Date();
  const y=d.getFullYear();
  const m=String(d.getMonth()+1).padStart(2,"0");
  const day=String(d.getDate()).padStart(2,"0");
  return `${y}-${m}-${day}`;
}
function addDays(iso, n){
  const d=new Date(iso+"T00:00:00");
  d.setDate(d.getDate()+n);
  const y=d.getFullYear();
  const m=String(d.getMonth()+1).padStart(2,"0");
  const day=String(d.getDate()).padStart(2,"0");
  return `${y}-${m}-${day}`;
}
function diffNights(a,b){
  const d1=new Date(a+"T00:00:00");
  const d2=new Date(b+"T00:00:00");
  return Math.round((d2-d1)/(1000*60*60*24));
}
function fmtTL(n){ return new Intl.NumberFormat("tr-TR").format(n) + " TL"; }

function setWarn(msg, ok=false){
  if(!warn) return;
  warn.textContent = msg;
  warn.style.color = ok ? "rgba(180,255,210,.85)" : "rgba(255,220,220,.85)";
}

/* ====== Grid ====== */
function renderStayGrid(){
  if(!planetGrid) return;
  planetGrid.innerHTML = "";
  TINY_PLANETS.forEach(p=>{
    const a=document.createElement("a");
    a.className="card10";
    a.href="#";

    const bgStyle = p.cover ? `background-image:url('${p.cover}')` : "";

    a.innerHTML=`
      <div class="card10-top">
        <span class="tag">${p.name.toUpperCase()}</span>
        <span class="mini">${p.mini}</span>
      </div>
      <div class="card10-img ${p.cls}" style="${bgStyle}"></div>
      <div class="card10-bot">Tiny house • seç ve incele</div>
    `;
    a.addEventListener("click",(e)=>{ e.preventDefault(); openPlanet(p); });
    planetGrid.appendChild(a);
  });
}

/* ====== Modal aç/kapat ====== */
function openPlanet(p){
  selectedPlanet = p;
  if(mTitle) mTitle.textContent = `${p.name} — Rezervasyon`;

  const t = isoToday();
  if(checkin){
    checkin.min = t;
    checkin.value = t;
  }
  if(checkout){
    checkout.min = addDays(t,1);
    checkout.value = addDays(t,1);
  }
  if(guests) guests.value = "2";

  const photos = photoSet(p);
  if(mainPic) mainPic.style.backgroundImage = photos[0];

  if(thumbs){
    thumbs.innerHTML = "";
    photos.forEach((bg, i)=>{
      const d=document.createElement("div");
      d.className="thumb";
      d.style.backgroundImage = bg;
      d.title = `Fotoğraf ${i+1}`;
      d.addEventListener("click", ()=> { if(mainPic) mainPic.style.backgroundImage = bg; });
      thumbs.appendChild(d);
    });
  }

  recalc();
  if(modal) modal.classList.add("open");
}

function closeModal(){
  if(modal) modal.classList.remove("open");
  selectedPlanet = null;
}

if(mClose) mClose.addEventListener("click", closeModal);
if(modal) modal.addEventListener("click",(e)=>{ if(e.target===modal) closeModal(); });

/* ====== Hesaplama + doluluk kontrolü ====== */
function recalc(){
  if(!selectedPlanet) return;
  if(!checkin || !checkout || !guests || !totalEl) return;

  const inD = checkin.value;
  const outD = checkout.value;
  const gRaw = parseInt(guests.value||"1",10);
  const g = Math.max(1, Math.min(gRaw, MAX_GUESTS));

  if(!inD || !outD){
    totalEl.textContent="0 TL";
    if(payTotalEl) payTotalEl.textContent = "0 TL";
    setWarn("Tarih seçmelisin.");
    return;
  }

  const nights = diffNights(inD,outD);
  if(nights<=0){
    totalEl.textContent="0 TL";
    if(payTotalEl) payTotalEl.textContent = "0 TL";
    setWarn("Çıkış tarihi girişten sonra olmalı.");
    return;
  }

  if(!isRangeAvailable(selectedPlanet.id, inD, outD)){
    totalEl.textContent="0 TL";
    if(payTotalEl) payTotalEl.textContent = "0 TL";
    setWarn("Bu tarihler dolu. Başka tarih seç.");
    return;
  }

  const total = nights * g * PRICE_PER_PERSON_PER_NIGHT;
  const t = fmtTL(total);
  totalEl.textContent = t;
  if(payTotalEl) payTotalEl.textContent = t;

  setWarn(`Uygun ✔ ${nights} gece • ${g} kişi`, true);
}

if(checkin) checkin.addEventListener("change",()=>{
  const minOut = addDays(checkin.value,1);
  if(checkout){
    checkout.min = minOut;
    if(checkout.value < minOut) checkout.value = minOut;
  }
  recalc();
});
if(checkout) checkout.addEventListener("change", recalc);
if(guests) guests.addEventListener("change", recalc);

/* ====== Ödeme varsay + kilitle + WhatsApp ====== */
function handlePaymentAssumed(){
  if(!selectedPlanet) return;

  const inD = checkin?.value;
  const outD = checkout?.value;
  if(!inD || !outD){ setWarn("Tarih seçmelisin."); return; }

  const nights = diffNights(inD, outD);
  if(nights<=0){ setWarn("Çıkış tarihi girişten sonra olmalı."); return; }

  if(!isRangeAvailable(selectedPlanet.id, inD, outD)){
    setWarn("Bu tarihler dolu. Başka tarih seç.");
    return;
  }

  const fullname = document.getElementById("fullname")?.value?.trim() || "";
  const email = document.getElementById("email")?.value?.trim() || "";
  const phone = document.getElementById("phone")?.value?.trim() || "";
  const tc = document.getElementById("tc")?.value?.trim() || "";
  const address = document.getElementById("address")?.value?.trim() || "";

  if(tc && tc.length !== 11){ setWarn("TC Kimlik No 11 hane olmalı."); return; }

  // KİLİTLE
  lockDatesAfterPayment(selectedPlanet.id, inD, outD);

  alert("Ödeme alındı varsayıldı ✅\nTarihler kilitlendi.");

  const msg = encodeURIComponent(
    `ÖDEME ALINDI ✅\n`+
    `Gezegen: ${selectedPlanet.name}\n`+
    `Giriş: ${inD}\n`+
    `Çıkış: ${outD}\n`+
    `Kişi: ${guests?.value || ""}\n`+
    (fullname ? `Ad Soyad: ${fullname}\n` : "")+
    (email ? `E-posta: ${email}\n` : "")+
    (phone ? `Telefon: ${phone}\n` : "")+
    (tc ? `TC: ${tc}\n` : "")+
    (address ? `Adres: ${address}\n` : "")+
    `Toplam: ${totalEl?.textContent || ""}`
  );
  window.open(WA + msg, "_blank", "noopener");

  closeModal();
  renderStayGrid();
}

if(form){
  form.addEventListener("submit",(e)=>{
    e.preventDefault();
    handlePaymentAssumed();
  });
}
if(payBtn){
  payBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    handlePaymentAssumed();
  });
}

/* ====== Başlat ====== */
if(planetGrid) renderStayGrid();
