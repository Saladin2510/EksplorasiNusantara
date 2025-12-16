document.addEventListener("DOMContentLoaded", () => {

    const heroTl = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });

    heroTl
        .from(".hero-title", {
            y: 60,
            opacity: 0,
            duration: 1.2
        })
        .from(".hero-subtitle", {
            y: 40,
            opacity: 0,
            duration: 0.9
        }, "-=0.8") // 🔥 overlap
        .from(".hero-btn", {
            y: 20,
            opacity: 0,
            duration: 0.7,
            clearProps: "all"
        }, "-=0.6"); // 🔥 muncul cepat

    // NAVBAR INTERACTION
    const header = document.getElementById("header");
    const mobileBtn = document.getElementById("mobileMenuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    // Scroll Effect
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("bg-black/50");
            header.classList.remove("bg-white/10");
        } else {
            header.classList.add("bg-white/10");
            header.classList.remove("bg-black/50");
        }
    });

    // Mobile Menu Toggle
    mobileBtn.addEventListener("click", () => {
        const isHidden = mobileMenu.classList.contains("hidden");
        if (isHidden) {
            mobileMenu.classList.remove("hidden");
            gsap.from("#mobileMenu", {
                y: -20,
                opacity: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        } else {
            mobileMenu.classList.add("hidden");
        }
    });

    // Close menu when clicking link
    mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
        });
    });

    // SMART ACTIVE LINK HIGHLIGHTER
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    const observerOptions = {
        threshold: 0.3 // Updated threshold for better detection
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");

                // Only update if we have a valid ID
                if (id) {
                    navLinks.forEach(link => {
                        // Reset all links
                        link.classList.remove("border-b-2", "border-teal-300", "text-teal-200");
                        link.classList.add("text-white/90");

                        // Activate current link
                        if (link.getAttribute("href") === `#${id}`) {
                            link.classList.remove("text-white/90");
                            link.classList.add("border-b-2", "border-teal-300", "text-teal-200");
                        }
                    });
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if (section.getAttribute('id')) {
            observer.observe(section);
        }
    });


    // ABOUT SECTION
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".about-text", {
        scrollTrigger: {
            trigger: "#about",
            start: "top 70%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".about-image", {
        scrollTrigger: {
            trigger: "#about",
            start: "top 70%",
        },
        x: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
    });

    // DESTINASI SECTION
    gsap.from(".destinasi-header", {
        scrollTrigger: {
            trigger: "#destinasi",
            start: "top 70%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".destinasi-item", {
        scrollTrigger: {
            trigger: ".destinasi-item",
            start: "top 75%",
        },
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.3
    });

    // CONTACT SECTION
    gsap.from(".contact-header", {
        scrollTrigger: {
            trigger: "#kontak",
            start: "top 70%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".contact-form", {
        scrollTrigger: {
            trigger: "#kontak",
            start: "top 65%",
        },
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
    });

    gsap.from(".contact-illustration", {
        scrollTrigger: {
            trigger: "#kontak",
            start: "top 65%",
        },
        x: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.3
    });


});
