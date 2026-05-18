/* ==========================================================================
   File: data.js
   Tujuan: Menyimpan seluruh konten portfolio yang dirender ke UI, termasuk metadata certification dan copy hero animated tagline per tag.
   Dipakai oleh: render.js, hero-tagline.js, certifications.js, dan markup di index.html saat halaman dimuat.
   Dependensi utama: index.html, render.js, hero-tagline.js, certifications.js.
   Fungsi public/utama: Mengekspos konstanta global `SITE_DATA`.
   Side effect penting: Tidak ada I/O; perubahan data langsung mengubah konten UI, hero animated tagline per tag, dan aset certification yang dipanggil browser.
   ========================================================================== */

const SITE_DATA = {

    /* -- Owner info -- */
    name:     "Dimas Robby Candra",
    role:     "IT Support Specialist",
    email:    "personal.dimascandra@gmail.com",
    status:   "Ready for new challenges",

    /* -- Quick stats -- */
    stats: [
        { value: "2+",  label: "Years Experience" },
        { value: "4",   label: "Companies" },
        { value: "400+", label: "Devices Managed" },
    ],

    /* -- Hero tags -- */
    tags: ["IT Support", "O365 Admin", "Network Troubleshooter", "System Engineer"],
    taglineIntro: "Focused on",
    taglineOutros: {
        "IT Support": "for responsive troubleshooting, stable workplace systems, and productive day-to-day operations.",
        "O365 Admin": "for controlled access, smooth collaboration, and reliable Microsoft 365 operations.",
        "Network Troubleshooter": "for stable connectivity, faster incident recovery, and lower operational disruption.",
        "System Engineer": "for practical infrastructure design, secure system workflows, and efficient service delivery.",
    },

    /* -- Work experience -- */
    experience: [
        {
            company:  "Solusi247",
            role:     "IT Helpdesk",
            location: "Jakarta",
            period:   "May 2024 - Present",
            items: [
                "Software/hardware troubleshooting and maintenance.",
                "Managing vulnerability ticketing and security mitigation.",
                "Enforcing security through strict whitelist management.",
                "NOC assistance and network health monitoring.",
                "Mail server configuration and user access management.",
            ],
        },
        {
            company:  "Dekoruma",
            role:     "IT Support Intern",
            location: "Jakarta",
            period:   "Mar 2024 - May 2024",
            items: [
                "Conducted precise recording and tracking of IT assets.",
                "Managed communication with external vendors for hardware procurement.",
                "Oversaw account creation and onboarding permissions for new employees.",
                "Processed documentation for hardware returns and receipts.",
            ],
        },
        {
            company:  "Mindreach Consulting",
            role:     "IT Support",
            location: "Jakarta",
            period:   "Mar 2023 - Oct 2023",
            items: [
                "CCTV system maintenance and technical troubleshooting.",
                "Diagnosed and resolved network and server infrastructure issues.",
                "Delivered day-to-day hardware and software support for consultants.",
            ],
        },
        {
            company:  "Packet System Indonesia",
            role:     "IT Support",
            location: "Jakarta",
            period:   "Oct 2021 - Oct 2022",
            items: [
                "Managed automated server backup routines and data integrity checks.",
                "Administered Active Directory and O365 environment for enterprise users.",
                "Implemented security layers with DUO mobile multi-factor authentication setup.",
                "Provided comprehensive hardware and software technical support.",
            ],
        },
    ],

    /* -- Skills -- */
    skills: {
        network: ["DNS / DHCP Management", "FTP Server Administration", "Switch & Router Troubleshooting", "Monitoring & NOC Support"],
        sysadmin: ["Active Directory", "Windows Server", "VirtualBox"],
        enterprise: ["Microsoft 365", "Ticketing Systems", "Hardware Repair"],
        security: ["Whitelist Policy", "Vulnerability Management", "Access Control", "NOC Coordination"],
    },

    /* -- Certifications -- */
    certifications: [
        { icon: "verified", label: "CCNA", image: "./assets/CCNA.jpg", imageAlt: "CCNA certificate preview" },
        { icon: "support_agent", label: "Technical Support Fundamental", image: "./assets/Coursera.jpg", imageAlt: "Technical Support Fundamental certificate preview" },
        { icon: "psychology", label: "AI Fundamental", image: "./assets/Dicoding Dasar AI.jpg", imageAlt: "AI Fundamental certificate preview" },
        { icon: "analytics", label: "Data Science Basic", image: "./assets/Dicoding Dasar Data Science.jpg", imageAlt: "Data Science Basic certificate preview" },
    ],

    /* -- Social links -- */
    socials: {
        linkedin: "https://www.linkedin.com/in/dimasrobbycandra/",
        github:   "#",
        whatsapp: "https://wa.me/083879040566",
        cv:       "./assets/dimas-robby-candra-resume.pdf",
    },
};
