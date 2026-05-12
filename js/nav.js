/* ==========================================================================
   File: nav.js
   Tujuan: Mengelola interaksi navigasi dan reveal animation berbasis viewport.
   Dipakai oleh: index.html saat DOM selesai dimuat.
   Dependensi utama: markup nav di index.html dan elemen dengan atribut `data-reveal`.
   Fungsi public/utama: Toggle mobile menu, highlight nav aktif, aktifkan reveal animation saat elemen masuk viewport.
   Side effect penting: Menambah/menghapus class DOM dan mengobservasi elemen via IntersectionObserver.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* -- Mobile menu toggle -- */
    const menuBtn = document.getElementById("mobile-menu-btn");
    const mobileNav = document.getElementById("mobile-nav");

    if (menuBtn && mobileNav) {
        const setMenuState = (isOpen) => {
            menuBtn.classList.toggle("is-open", isOpen);
            mobileNav.classList.toggle("is-open", isOpen);
            menuBtn.setAttribute("aria-expanded", String(isOpen));
            mobileNav.setAttribute("aria-hidden", String(!isOpen));
            document.body.classList.toggle("mobile-nav-open", isOpen);
        };

        menuBtn.addEventListener("click", () => {
            const isOpen = !menuBtn.classList.contains("is-open");
            setMenuState(isOpen);
        });

        mobileNav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                setMenuState(false);
            });
        });
    }

    /* -- Active link highlight on scroll -- */
    const sections = document.querySelectorAll("section[id]");
    const desktopNavLinks = document.querySelectorAll("nav a[href^='#']");
    const mobileNavLinks = mobileNav ? mobileNav.querySelectorAll("a[href^='#']") : [];

    const navObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const id = entry.target.id;
                desktopNavLinks.forEach(link => {
                    const active = link.getAttribute("href") === `#${id}`;
                    link.classList.toggle("active-dot", active);
                    link.classList.toggle("text-primary", active);
                    link.classList.toggle("text-on-surface-variant", !active);
                });

                mobileNavLinks.forEach(link => {
                    const active = link.getAttribute("href") === `#${id}`;
                    link.classList.toggle("active-mobile-link", active);
                    link.classList.toggle("text-primary", active);
                    link.classList.toggle("text-on-surface-variant", !active);
                });
            });
        },
        { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach(section => navObserver.observe(section));

    /* -- Reveal animation on scroll -- */
    const revealItems = document.querySelectorAll("[data-reveal]");
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const delay = entry.target.dataset.revealDelay;
                if (delay) entry.target.style.transitionDelay = `${delay}ms`;

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    revealItems.forEach(item => revealObserver.observe(item));
});
