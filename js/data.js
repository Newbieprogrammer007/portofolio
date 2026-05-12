/* ==========================================================================
   File: data.js
   Tujuan: Menyimpan seluruh konten portfolio yang dirender ke UI.
   Dipakai oleh: render.js dan markup di index.html saat halaman dimuat.
   Dependensi utama: index.html, render.js.
   Fungsi public/utama: Mengekspos konstanta global `SITE_DATA`.
   Side effect penting: Tidak ada I/O; perubahan data langsung mengubah konten UI.
   ========================================================================== */

const SITE_DATA = {

    /* -- Owner info -- */
    name:     "Dimas Robby Candra",
    role:     "IT Support Specialist",
    tagline:  "Building reliable systems, secure operations, and efficient workplace technology. Expertly navigating the intersection of IT Support and Infrastructure management.",
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
        { icon: "verified", label: "CCNA" },
        // { icon: "terminal", label: "IT Essentials" },
        { icon: "support_agent", label: "Technical Support Fundamental", url: "https://coursera.org/share/51adfcdbe4e6c70ce41f3b1a12b4c25e" },
        { icon: "psychology", label: "AI Fundamental", url: "https://www.dicoding.com/certificates/NVP7JN0ROXR0" },
        { icon: "analytics", label: "Data Science Basic", url: "https://www.dicoding.com/certificates/N9ZO2V0GRPG5" },
    ],

    /* -- Social links -- */
    socials: {
        linkedin: "https://www.linkedin.com/in/dimasrobbycandra/",
        github:   "#",
        whatsapp: "https://wa.me/083879040566",
        cv:       "./assets/dimas-robby-candra-resume.pdf",
    },
};
