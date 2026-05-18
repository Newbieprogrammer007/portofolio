/* ==========================================================================
   File: hero-tagline.js
   Tujuan: Mengelola animasi hero tagline inline yang mengganti tag aktif beserta outro sesuai referensi text-cycle tanpa layout shift saat copy membungkus.
   Dipakai oleh: index.html setelah data.js tersedia dan markup hero selesai dimuat.
   Dependensi utama: SITE_DATA.tags, SITE_DATA.taglineIntro, SITE_DATA.taglineOutros, markup hero di index.html, css/styles.css.
   Fungsi public/utama: Inisialisasi hero tagline, mengukur lebar kata aktif, mengunci tinggi tagline maksimum, mengganti tag/outro periodik, dan menghormati reduced motion.
   Side effect penting: Menulis text hero ke DOM, menambah node ukur tersembunyi, membuat timer interval, menjalankan Web Animations API pada tag aktif dan outro, serta menulis min-height inline sementara.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const taglineRoot = document.querySelector("[data-hero-tagline]");
    const taglineIntro = document.querySelector("[data-hero-tagline-intro]");
    const taglineWordWrap = document.querySelector("[data-hero-tagline-word-wrap]");
    const taglineTag = document.querySelector("[data-hero-tagline-tag]");
    const taglineCopy = document.querySelector("[data-hero-tagline-copy]");
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const words = Array.isArray(SITE_DATA.tags) ? SITE_DATA.tags : [];
    const outros = SITE_DATA.taglineOutros || {};
    if (!taglineRoot || !taglineIntro || !taglineWordWrap || !taglineTag || !taglineCopy || words.length === 0) return;

    const cycleDelay = 3000;
    const enterDuration = 420;
    const exitDuration = 300;
    const swapDelay = 170;
    let activeIndex = 0;

    taglineIntro.textContent = SITE_DATA.taglineIntro || "";

    const measureContainer = document.createElement("div");
    measureContainer.className = "hero-tagline-measure";
    measureContainer.setAttribute("aria-hidden", "true");
    measureContainer.innerHTML = words.map((word) => `
        <span class="hero-tagline-tag">${word}</span>
    `).join("");
    taglineWordWrap.appendChild(measureContainer);

    const heightMeasure = document.createElement("div");
    heightMeasure.setAttribute("aria-hidden", "true");
    heightMeasure.style.position = "absolute";
    heightMeasure.style.inset = "0 auto auto 0";
    heightMeasure.style.width = "100%";
    heightMeasure.style.visibility = "hidden";
    heightMeasure.style.pointerEvents = "none";
    taglineRoot.style.position = "relative";
    taglineRoot.appendChild(heightMeasure);

    const measureItems = Array.from(measureContainer.children);
    const getWordWidth = (index) => {
        const target = measureItems[index];
        if (!target) return 0;

        const buffer = window.innerWidth <= 767 ? 24 : 12;
        return target.getBoundingClientRect().width + buffer;
    };

    const setWord = (index) => {
        taglineTag.textContent = words[index];
        taglineCopy.textContent = outros[words[index]] || "";
    };

    const setWordWidth = (index) => {
        const width = getWordWidth(index);
        if (!width) return;
        taglineWordWrap.style.width = `${width}px`;
    };

    const syncTaglineHeight = () => {
        let maxHeight = 0;
        heightMeasure.style.width = `${taglineRoot.clientWidth}px`;

        words.forEach((word, index) => {
            heightMeasure.innerHTML = `
                <span class="hero-tagline-content">
                    <span class="hero-tagline-intro">${SITE_DATA.taglineIntro || ""}</span>
                    <span class="hero-tagline-word-wrap" style="width:${getWordWidth(index)}px;">
                        <span class="hero-tagline-tag">${word}</span>
                    </span>
                    <span class="hero-tagline-copy">${outros[word] || ""}</span>
                </span>
            `;

            maxHeight = Math.max(maxHeight, heightMeasure.getBoundingClientRect().height);
        });

        taglineRoot.style.minHeight = `${Math.ceil(maxHeight)}px`;
    };

    const animateToNextWord = (nextIndex) => {
        taglineTag.animate(
            [
                { transform: "translateY(0)", opacity: 1, filter: "blur(0px)" },
                { transform: "translateY(20px)", opacity: 0, filter: "blur(8px)" },
            ],
            {
                duration: exitDuration,
                easing: "cubic-bezier(0.4, 0, 1, 1)",
                fill: "forwards",
            }
        );

        taglineCopy.animate(
            [
                { transform: "translateY(0)", opacity: 1, filter: "blur(0px)" },
                { transform: "translateY(10px)", opacity: 0, filter: "blur(6px)" },
            ],
            {
                duration: exitDuration,
                easing: "cubic-bezier(0.4, 0, 1, 1)",
                fill: "forwards",
            }
        );

        window.setTimeout(() => {
            activeIndex = nextIndex;
            setWord(activeIndex);
            setWordWidth(activeIndex);

            taglineTag.animate(
                [
                    { transform: "translateY(-20px)", opacity: 0, filter: "blur(8px)" },
                    { transform: "translateY(0)", opacity: 1, filter: "blur(0px)" },
                ],
                {
                    duration: enterDuration,
                    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                    fill: "both",
                }
            );

            taglineCopy.animate(
                [
                    { transform: "translateY(-8px)", opacity: 0, filter: "blur(6px)" },
                    { transform: "translateY(0)", opacity: 1, filter: "blur(0px)" },
                ],
                {
                    duration: enterDuration,
                    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                    fill: "both",
                }
            );
        }, swapDelay);
    };

    setWord(activeIndex);
    setWordWidth(activeIndex);
    syncTaglineHeight();

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
            setWordWidth(activeIndex);
            syncTaglineHeight();
        });
    }

    window.addEventListener("resize", () => {
        setWordWidth(activeIndex);
        syncTaglineHeight();
    });

    if (reduceMotionQuery.matches || words.length === 1) return;

    window.setInterval(() => {
        const nextIndex = (activeIndex + 1) % words.length;
        animateToNextWord(nextIndex);
    }, cycleDelay);
});
