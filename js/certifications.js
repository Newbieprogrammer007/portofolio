/* ==========================================================================
   File: certifications.js
   Tujuan: Mengelola preview hover desktop dan popup certificate image-only untuk desktop/mobile tanpa layout shift saat modal aktif.
   Dipakai oleh: index.html setelah render.js selesai merender kartu certification.
   Dependensi utama: data attribute certification dari render.js, css/styles.css.
   Fungsi public/utama: Inisialisasi preview certificate, buka/tutup modal certificate image-only, sinkronisasi posisi preview, dan kompensasi scrollbar body.
   Side effect penting: Menambah node overlay ke DOM, memasang event listener pointer/keyboard, toggle class body untuk lock scroll modal, dan menulis style inline body sementara.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const certTriggers = Array.from(document.querySelectorAll("[data-cert-trigger]"));
    if (!certTriggers.length) return;

    const prefersDesktopPreview = window.matchMedia("(hover: hover) and (pointer: fine)");
    const previewOffset = 28;

    const preview = document.createElement("div");
    preview.className = "cert-preview";
    preview.setAttribute("aria-hidden", "true");
    preview.innerHTML = `
        <div class="cert-preview-frame">
            <img src="" alt="" loading="lazy" />
        </div>
        <p class="cert-preview-label"></p>
    `;

    const modal = document.createElement("div");
    modal.className = "cert-modal";
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = `
        <div class="cert-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="cert-modal-title">
            <div class="cert-modal-dialog-inner">
                <button type="button" class="cert-modal-close" aria-label="Close certificate preview">
                    <span class="material-symbols-outlined" aria-hidden="true">close</span>
                </button>
                <img class="cert-modal-image" src="" alt="" loading="lazy" />
            </div>
            <span id="cert-modal-title" class="sr-only"></span>
        </div>
    `;

    document.body.append(preview, modal);

    const previewImage = preview.querySelector("img");
    const previewLabel = preview.querySelector(".cert-preview-label");
    const modalImage = modal.querySelector(".cert-modal-image");
    const modalTitle = modal.querySelector("#cert-modal-title");
    const modalClose = modal.querySelector(".cert-modal-close");
    const modalDialog = modal.querySelector(".cert-modal-dialog");
    const originalBodyPaddingRight = document.body.style.paddingRight;

    let activeTrigger = null;

    const lockBodyScroll = () => {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }
        document.body.classList.add("cert-modal-open");
    };

    const unlockBodyScroll = () => {
        document.body.classList.remove("cert-modal-open");
        document.body.style.paddingRight = originalBodyPaddingRight;
    };

    const updatePreviewContent = (trigger) => {
        previewImage.src = trigger.dataset.certImage;
        previewImage.alt = trigger.dataset.certImageAlt;
        previewLabel.textContent = trigger.dataset.certLabel;
    };

    const setPreviewPosition = (event) => {
        const previewRect = preview.getBoundingClientRect();
        const maxLeft = window.innerWidth - previewRect.width - 16;
        const maxTop = window.innerHeight - previewRect.height - 16;

        const left = Math.min(event.clientX + previewOffset, Math.max(16, maxLeft));
        const top = Math.min(event.clientY + previewOffset, Math.max(16, maxTop));

        preview.style.left = `${left}px`;
        preview.style.top = `${top}px`;
    };

    const openPreview = (trigger, event) => {
        if (!prefersDesktopPreview.matches) return;

        activeTrigger = trigger;
        updatePreviewContent(trigger);
        preview.classList.add("is-visible");
        preview.setAttribute("aria-hidden", "false");
        setPreviewPosition(event);
    };

    const closePreview = () => {
        activeTrigger = null;
        preview.classList.remove("is-visible");
        preview.setAttribute("aria-hidden", "true");
    };

    const openModal = (trigger) => {
        closePreview();
        modalImage.src = trigger.dataset.certImage;
        modalImage.alt = trigger.dataset.certImageAlt;
        modalTitle.textContent = trigger.dataset.certLabel;
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        lockBodyScroll();
    };

    const closeModal = () => {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        unlockBodyScroll();
    };

    certTriggers.forEach((trigger) => {
        trigger.addEventListener("mouseenter", (event) => openPreview(trigger, event));
        trigger.addEventListener("mousemove", (event) => {
            if (!activeTrigger || activeTrigger !== trigger || !prefersDesktopPreview.matches) return;
            setPreviewPosition(event);
        });
        trigger.addEventListener("mouseleave", closePreview);
        trigger.addEventListener("click", () => openModal(trigger));
    });

    modalClose.addEventListener("click", closeModal);
    modal.addEventListener("click", (event) => {
        if (event.target === modal) closeModal();
    });
    modalDialog.addEventListener("click", (event) => event.stopPropagation());

    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closePreview();
            if (modal.classList.contains("is-open")) closeModal();
        }
    });

    prefersDesktopPreview.addEventListener("change", () => {
        if (!prefersDesktopPreview.matches) closePreview();
    });
});
