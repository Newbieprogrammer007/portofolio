/* ==========================================================================
   File: render.js
   Tujuan: Merender konten dinamis portfolio dari `SITE_DATA` ke section HTML.
   Dipakai oleh: index.html saat DOM selesai dimuat.
   Dependensi utama: data.js, markup id target di index.html, Material Symbols classes.
   Fungsi public/utama: Render stats, hero tags, experience, skills, certifications, dan contact links.
   Side effect penting: Menulis DOM, mengisi href eksternal, tidak ada DB/file I/O.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* -- Helpers -- */
    const $ = (id) => document.getElementById(id);

    /* ------------------------------------------------------------------ */
    /* 1. STATS                                                           */
    /* ------------------------------------------------------------------ */
    const statsGrid = $("stats-grid");
    if (statsGrid) {
        statsGrid.innerHTML = SITE_DATA.stats.map((s, i) => `
            <div class="p-8 bg-surface rounded-lg luxury-shadow elegant-card ${i === SITE_DATA.stats.length - 1 ? "col-span-2" : ""}" data-reveal="up" data-reveal-delay="${i * 100}">
                <div class="text-display-sm font-display-sm text-primary mb-2">${s.value}</div>
                <div class="font-label-md text-label-md uppercase tracking-wider text-outline">${s.label}</div>
            </div>
        `).join("");
    }

    /* ------------------------------------------------------------------ */
    /* 2. HERO TAGS                                                       */
    /* ------------------------------------------------------------------ */
    const tagsContainer = $("hero-tags");
    if (tagsContainer) {
        tagsContainer.innerHTML = SITE_DATA.tags.map(tag => `
            <span class="px-4 py-2 bg-secondary-container rounded-full text-label-md font-label-md text-on-secondary-container">${tag}</span>
        `).join("");
    }

    /* ------------------------------------------------------------------ */
    /* 3. EXPERIENCE                                                      */
    /* ------------------------------------------------------------------ */
    const expContainer = $("experience-list");
    if (expContainer) {
        expContainer.innerHTML = SITE_DATA.experience.map(job => `
            <div class="grid md:grid-cols-12 gap-8 relative" data-reveal="up">
                <div class="md:col-span-4">
                    <h3 class="font-headline-md text-headline-md">${job.company}</h3>
                    <p class="font-label-md text-label-md text-on-surface-variant mb-1">${job.role}</p>
                    <p class="font-caption text-caption text-outline mb-2">${job.location}</p>
                    <p class="font-caption text-caption text-outline">${job.period}</p>
                </div>
                <div class="md:col-span-8 space-y-4 border-l border-outline-variant/30 pl-8 md:pl-12">
                    <ul class="space-y-4 font-body-md text-body-md text-on-surface-variant">
                        ${job.items.map(item => `
                            <li class="flex gap-4">
                                <span class="material-symbols-outlined text-tertiary-fixed-dim">check_circle</span>
                                ${item}
                            </li>
                        `).join("")}
                    </ul>
                </div>
            </div>
        `).join("");
    }

    /* ------------------------------------------------------------------ */
    /* 4. SKILLS                                                          */
    /* ------------------------------------------------------------------ */
    const networkList = $("skill-network");
    if (networkList) {
        const items = SITE_DATA.skills.network;
        networkList.innerHTML = items.map((item, i) => `
            <li class="pb-2 ${i < items.length - 1 ? "border-b border-outline-variant/20" : ""}">${item}</li>
        `).join("");
    }

    const renderTags = (id, key) => {
        const el = $(id);
        if (el) {
            el.innerHTML = SITE_DATA.skills[key].map(tag => `
                <span class="px-3 py-1 border border-outline-variant rounded-full text-caption">${tag}</span>
            `).join("");
        }
    };
    renderTags("skill-sysadmin", "sysadmin");
    renderTags("skill-enterprise", "enterprise");

    const secGrid = $("skill-security");
    if (secGrid) {
        secGrid.innerHTML = SITE_DATA.skills.security.map(item => `
            <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></span> ${item}
            </div>
        `).join("");
    }

    /* ------------------------------------------------------------------ */
    /* 5. CERTIFICATIONS                                                  */
    /* ------------------------------------------------------------------ */
    const certGrid = $("cert-grid");
    if (certGrid) {
        certGrid.innerHTML = SITE_DATA.certifications.map(cert => cert.url ? `
            <a href="${cert.url}" target="_blank" rel="noreferrer" class="group block p-6 bg-surface border border-outline-variant/30 rounded-lg hover:border-primary focus-visible:border-primary transition-colors text-center elegant-card" data-reveal="up">
                <div class="w-12 h-12 bg-surface-container-high rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-on-primary transition-all">
                    <span class="material-symbols-outlined">${cert.icon}</span>
                </div>
                <p class="font-label-md text-label-md">${cert.label}</p>
                <p class="mt-3 text-caption text-outline opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                    Click for more detail
                </p>
            </a>
        ` : `
            <div class="group p-6 bg-surface border border-outline-variant/30 rounded-lg hover:border-primary transition-colors text-center elegant-card" data-reveal="up">
                <div class="w-12 h-12 bg-surface-container-high rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-on-primary transition-all">
                    <span class="material-symbols-outlined">${cert.icon}</span>
                </div>
                <p class="font-label-md text-label-md">${cert.label}</p>
            </div>
        `).join("");
    }

    /* ------------------------------------------------------------------ */
    /* 6. CONTACT                                                         */
    /* ------------------------------------------------------------------ */
    document.querySelectorAll("[data-site-name]").forEach(el => el.textContent = SITE_DATA.name);
    document.querySelectorAll("[data-site-role]").forEach(el => el.textContent = SITE_DATA.role);

    const emailLink = $("contact-email");
    if (emailLink) emailLink.href = `mailto:${SITE_DATA.email}`;

    const footerEmailLink = $("contact-email-footer");
    if (footerEmailLink) footerEmailLink.href = `mailto:${SITE_DATA.email}`;

    const linkedinLinks = document.querySelectorAll("[data-link='linkedin']");
    linkedinLinks.forEach(el => el.href = SITE_DATA.socials.linkedin);

    const waLink = $("contact-wa");
    if (waLink) waLink.href = SITE_DATA.socials.whatsapp;

    const cvLink = $("contact-cv");
    if (cvLink) cvLink.href = SITE_DATA.socials.cv;

    const ghLinks = document.querySelectorAll("[data-link='github']");
    ghLinks.forEach(el => el.href = SITE_DATA.socials.github);
});
