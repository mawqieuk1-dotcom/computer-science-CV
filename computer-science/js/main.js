// AOS
AOS.init({ duration: 800, once: true });

// Dark Mode
const darkToggle = document.getElementById('darkModeToggle'), darkCSS = document.getElementById('dark-mode-css'), body = document.body;
function setDark(e) {
    if(e){ body.classList.add('dark'); darkCSS.disabled=false; darkToggle.innerHTML='<i class="fas fa-sun"></i>'; }
    else { body.classList.remove('dark'); darkCSS.disabled=true; darkToggle.innerHTML='<i class="fas fa-moon"></i>'; }
    localStorage.setItem('darkMode',e?'enabled':'disabled');
}
darkToggle.addEventListener('click',()=>setDark(!body.classList.contains('dark')));
if(localStorage.getItem('darkMode')==='enabled') setDark(true);

// Scroll Header & Nav
const header=document.getElementById('header'), bottomNav=document.getElementById('bottomNav'); let ls=0;
window.addEventListener('scroll',()=>{
    let s=window.pageYOffset||document.documentElement.scrollTop;
    if(s>ls&&s>80){ header.classList.add('header-hidden'); if(bottomNav) bottomNav.classList.add('bottom-nav-hidden'); }
    else { header.classList.remove('header-hidden'); if(bottomNav) bottomNav.classList.remove('bottom-nav-hidden'); }
    ls=s; updateActiveNav();
    animateSkillBars();
});

function updateActiveNav(){
    const sec=['home','projects','techstack','github','contact']; let c='home';
    sec.forEach(id=>{ const el=document.getElementById(id); if(el&&el.getBoundingClientRect().top<=150) c=id; });
    document.querySelectorAll('.nav-list a, .bottom-nav-item').forEach(l=>{ l.classList.remove('active'); if(l.getAttribute('href')==='#'+c) l.classList.add('active'); });
}

// Counter
const counters=document.querySelectorAll('.counter'); let animated=false;
function animateCounters(){
    counters.forEach(c=>{
        const t=+c.getAttribute('data-target'), inc=t/50;
        const u=()=>{ const cur=+c.innerText; if(cur<t){ c.innerText=Math.ceil(cur+inc); setTimeout(u,30); } else c.innerText=t; };
        u();
    });
}
window.addEventListener('scroll',()=>{
    const stats=document.querySelector('.hero-stats');
    if(stats&&!animated&&stats.getBoundingClientRect().top<window.innerHeight-100){ animateCounters(); animated=true; }
});

// Skill Bars Animation
function animateSkillBars(){
    document.querySelectorAll('.tech-fill').forEach(bar=>{
        const rect=bar.getBoundingClientRect();
        if(rect.top<window.innerHeight&&bar.style.width==='0px'||bar.style.width==='0%'){
            bar.style.width=bar.getAttribute('data-width')+'%';
        }
    });
}

// Particle Background (Canvas)
const canvas=document.getElementById('particleCanvas');
if(canvas){
    const ctx=canvas.getContext('2d');
    let w,h,particles=[];
    function resize(){ w=canvas.width=window.innerWidth; h=canvas.height=canvas.parentElement.offsetHeight; }
    resize(); window.addEventListener('resize',resize);
    class Particle{
        constructor(){ this.x=Math.random()*w; this.y=Math.random()*h; this.vx=(Math.random()-0.5)*0.5; this.vy=(Math.random()-0.5)*0.5; this.r=Math.random()*2+1; }
        update(){ this.x+=this.vx; this.y+=this.vy; if(this.x<0||this.x>w) this.vx*=-1; if(this.y<0||this.y>h) this.vy*=-1; }
        draw(){ ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2); ctx.fillStyle='rgba(255,255,255,0.15)'; ctx.fill(); }
    }
    for(let i=0;i<50;i++) particles.push(new Particle());
    function animateParticles(){
        ctx.clearRect(0,0,w,h);
        particles.forEach(p=>{ p.update(); p.draw(); });
        // Connect nearby particles
        for(let i=0;i<particles.length;i++){
            for(let j=i+1;j<particles.length;j++){
                const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y, dist=Math.sqrt(dx*dx+dy*dy);
                if(dist<100){ ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y); ctx.strokeStyle=`rgba(255,255,255,${0.05*(1-dist/100)})`; ctx.stroke(); }
            }
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

// Tilt effect for cards
document.querySelectorAll('.tilt-card').forEach(card=>{
    card.addEventListener('mousemove', e=>{
        const rect=card.getBoundingClientRect();
        const x=e.clientX-rect.left, y=e.clientY-rect.top;
        const centerX=rect.width/2, centerY=rect.height/2;
        const rotateX=(y-centerY)/10, rotateY=(centerX-x)/10;
        card.style.transform=`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
    });
    card.addEventListener('mouseleave', ()=>{ card.style.transform=''; });
});


// Contact form
function submitContact() {
    const name = document.getElementById('name')?.value?.trim() || '';
    const email = document.getElementById('email')?.value?.trim() || '';
    const message = document.getElementById('message')?.value?.trim() || 'لا يوجد';
    const fb = document.getElementById('formFeedback');
    const form = document.getElementById('bookingForm');

    // التحقق من الحقول
    if (!name) {
        fb.textContent = 'الاسم مطلوب';
        fb.style.color = 'red';
        return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        fb.textContent = 'بريد إلكتروني غير صحيح';
        fb.style.color = 'red';
        return;
    }

    // بناء الرسالة
    const msg = `*رسالة جديدة من موقع CV*\n\nالاسم: ${name}\nالبريد: ${email}\nالرسالة: ${message}`;
    const encodedMsg = encodeURIComponent(msg);
    const whatsappURL = `https://wa.me/966507652943?text=${encodedMsg}`;

    // فتح واتساب
    window.open(whatsappURL, '_blank');

    // تنبيه المستخدم وإفراغ الحقول
    fb.textContent = '✅ تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.';
    fb.style.color = 'green';

    // إفراغ الحقول
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';

    // إخفاء رسالة النجاح بعد 5 ثواني
    setTimeout(() => {
        fb.textContent = '';
    }, 5000);
}