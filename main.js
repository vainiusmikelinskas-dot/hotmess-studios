// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
});

(function tick() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(tick);
})();

document.querySelectorAll('a, button, .service-card, .work-item, .tattoo-item, .ig-item, .rental-feature, .brand-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        ring.style.width = '52px';
        ring.style.height = '52px';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.width = '12px';
        cursor.style.height = '12px';
        ring.style.width = '32px';
        ring.style.height = '32px';
    });
});

// Scroll reveal
const observer = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 60);
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Nav on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 60
        ? 'rgba(255,245,247,0.97)'
        : 'rgba(255,245,247,0.88)';
}, { passive: true });

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (id.length < 2) return;
        const t = document.querySelector(id);
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
});

// Cookie notice: no non-essential tracking runs on this site today.
// The visitor's choice is kept in localStorage; anything optional must
// only be loaded from loadOptionalScripts() after "Accept".
(function cookieNotice() {
    const KEY = 'hm-cookie-consent';
    const read = () => { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
    const write = v => { try { localStorage.setItem(KEY, v); } catch (e) { /* storage blocked */ } };

    function loadOptionalScripts() {
        // Nothing optional is loaded yet. Add analytics/pixels here, never in <head>.
    }

    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Cookie notice');
    banner.hidden = true;
    banner.innerHTML =
        '<div class="cookie-title">Cookies ✦</div>' +
        '<p>We don\'t use tracking or advertising cookies. Visits are counted with cookieless Vercel Web Analytics, and your choice here is saved in your browser. Read our <a href="/privacy">privacy policy</a>.</p>' +
        '<div class="cookie-actions">' +
        '<button type="button" data-consent="accepted">Accept</button>' +
        '<button type="button" data-consent="declined">Decline</button>' +
        '</div>';
    document.body.appendChild(banner);

    banner.querySelectorAll('[data-consent]').forEach(btn => {
        btn.addEventListener('click', () => {
            const v = btn.getAttribute('data-consent');
            write(v);
            banner.hidden = true;
            if (v === 'accepted') loadOptionalScripts();
        });
    });

    document.querySelectorAll('[data-cookie-settings]').forEach(btn => {
        btn.addEventListener('click', () => {
            banner.hidden = false;
            const first = banner.querySelector('button');
            if (first) first.focus();
        });
    });

    const choice = read();
    if (choice === 'accepted') loadOptionalScripts();
    else if (!choice) banner.hidden = false;
})();
