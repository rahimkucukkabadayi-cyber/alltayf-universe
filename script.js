const WA = "https://wa.me/905438495887?text=";
const PRICE_PER_PERSON_PER_NIGHT = 1500;

// Index: tayf kartları WhatsApp (Stay hariç)
document.querySelectorAll("[data-wa]").forEach(el=>{
  el.addEventListener("click",(e)=>{
    e.preventDefault();
    const name = el.getAttribute("data-wa");
    const msg = encodeURIComponent(`Selam Rahim, ${name} hakkında bilgi almak istiyorum.`);
    window.open(WA + msg, "_blank", "noopener");
  });
});

// Stay sayfası: gezegenler
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

let selectedPlanet = null;

// Tiny house gezegenleri (istersen adları değiştiririz)
const TINY_PLANETS = [
  { id:"mercury", name:"Merkür", mini:"Hız", cls:"planet-mercury" },
  { id:"venus",   name:"Venüs",  mini:"Sis", cls:"planet-venus" },
  { id:"earth",   name:"Dünya",  mini:"Yaşam", cls:"planet-earth" },
  { id:"mars",    name:"Mars",   mini:"Ateş", cls:"planet-mars" },
  { id:"jupiter", name:"Jüpiter",mini:"Dev", cls:"planet-jupiter" },
  { id:"saturn",  name:"Satürn", mini:"Halka", cls:"planet-saturn" },
  { id:"uranus",  name:"Uranüs", mini:"Soğuk", cls:"planet-uranus" },
  { id:"neptune", name:"Neptün", mini:"Derin", cls:"planet-neptune" },
  { id:"pluto",   name:"Plüton", mini:"Uzak", cls:"planet-pluto" },
];

// Şimdilik 4 foto yerine “placeholder” görsel kullanıyoruz.
// Sen sonra /img klasörüne gerçek foto koyunca burada URL’leri değiştiririz.
function photoSet(planetId){
  // aynı görseli farklı açı gibi göstermek için degrade çeşitlendiriyoruz
  const base = [
    `linear-gradient(180deg, rgba(0,0,0,.15), rgba(0,0,0,.55)), radial-gradient(circle at 35% 35%, rgba(255,255,255,.20), transparent 55%)`,
    `linear-gradient(180deg, rgba(0,0,0,.20), rgba(0,0,0,.60)), radial-gradient(circle at 70% 30%, rgba(255,255,255,.18), transparent 60%)`,
    `linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,.58)), radial-gradient(circle at 50% 60%, rgba(255,255,255,.16), transparent 55%)`,
    `linear-gradient(180deg, rgba(0,0,0,.22), rgba(0,0,0,.62)), radial-gradient(circle at 25% 70%, rgba(255,255,255,.14), transparent 55%)`,
  ];
  return base.map(g => `${g}, url("bg-universe.jpg")`);
}

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

function renderStayGrid(){
  if(!planetGrid) return;
  planetGrid.innerHTML = "";
  TINY_PLANETS.forEach(p=>{
    const a=document.createElement("a");
    a.className="card10";
    a.href="#";
    a.innerHTML=`
      <div class="card10-top">
        <span class="tag">${p.name.toUpperCase()}</span>
        <span class="mini">${p.mini}</span>
      </div>
      <div class="card10-img ${p.cls}"></div>
      <div class="card10-bot">Tiny house • seç ve incele</div>
    `;
    a.addEventListener("click",(e)=>{ e.preventDefault(); openPlanet(p); });
    planetGrid.appendChild(a);
  });
}

function openPlanet(p){
  selectedPlanet = p;
  mTitle.textContent = `${p.name} — Rezervasyon`;

  const t = isoToday();
  checkin.min = t;
  checkout.min = addDays(t,1);
  checkin.value = t;
  checkout.value = addDays(t,1);
  guests.value = "2";

  // 4 foto
  const photos = photoSet(p.id);
  mainPic.style.backgroundImage = photos[0];
  thumbs.innerHTML = "";
  photos.forEach((bg, i)=>{
    const d=document.createElement("div");
    d.className="thumb";
    d.style.backgroundImage = bg;
    d.title = `Fotoğraf ${i+1}`;
    d.addEventListener("click", ()=> mainPic.style.backgroundImage = bg);
    thumbs.appendChild(d);
  });

  recalc();
  modal.classList.add("open");
}

function closeModal(){
  modal.classList.remove("open");
  selectedPlanet = null;
}

if(mClose) mClose.addEventListener("click", closeModal);
if(modal) modal.addEventListener("click",(e)=>{ if(e.target===modal) closeModal(); });

function recalc(){
  if(!selectedPlanet) return;
  const inD = checkin.value;
  const outD = checkout.value;
  const g = parseInt(guests.value||"1",10);

  if(!inD || !outD){ totalEl.textContent="0 TL"; setWarn("Tarih seçmelisin."); return; }
  const nights = diffNights(inD,outD);
  if(nights<=0){ totalEl.textContent="0 TL"; setWarn("Çıkış tarihi girişten sonra olmalı."); return; }

  const total = nights * g * PRICE_PER_PERSON_PER_NIGHT;
  totalEl.textContent = fmtTL(total);
  setWarn(`Uygun ✔ ${nights} gece • ${g} kişi`, true);
}

if(checkin) checkin.addEventListener("change",()=>{
  const minOut = addDays(checkin.value,1);
  checkout.min = minOut;
  if(checkout.value < minOut) checkout.value = minOut;
  recalc();
});
if(checkout) checkout.addEventListener("change", recalc);
if(guests) guests.addEventListener("change", recalc);

// Ödeme (şimdilik WhatsApp ile “Ödeme başlat” mesajı)
// PayTR bağlayınca burayı gerçek ödeme linkine çevireceğiz.
if(form){
  form.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(!selectedPlanet) return;

    // Basit kontrol
    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const tc = document.getElementById("tc").value.trim();
    const address = document.getElementById("address").value.trim();

    if(tc.length !== 11){ setWarn("TC Kimlik No 11 hane olmalı."); return; }

    const msg = encodeURIComponent(
      `ÖDEME BAŞLAT / ALLTAYF STAY\n`+
      `Gezegen: ${selectedPlanet.name}\n`+
      `Giriş: ${checkin.value}\n`+
      `Çıkış: ${checkout.value}\n`+
      `Kişi: ${guests.value}\n`+
      `Ad Soyad: ${fullname}\n`+
      `E-posta: ${email}\n`+
      `Telefon: ${phone}\n`+
      `TC: ${tc}\n`+
      `Adres: ${address}\n`+
      `Toplam: ${totalEl.textContent}\n`+
      `Not: PayTR ödeme linki gönder.`
    );
    window.open(WA + msg, "_blank", "noopener");
  });
}

renderStayGrid();

