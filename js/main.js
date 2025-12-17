document.addEventListener("DOMContentLoaded", () => {

    const heroTl = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });

    // PARALLAX EFFECT
    gsap.to("#heroVideo", {
        scrollTrigger: {
            trigger: "#home",
            start: "top top",
            end: "bottom top",
            scrub: true
        },
        y: 150, // Move video slower than content
        scale: 1.1 // Subtle scale for depth
    });

    // TEXT REVEAL ANIMATION
    heroTl
        .from(".hero-title span", {
            y: 100,
            opacity: 0,
            duration: 1.5,
            stagger: 0.15,
            ease: "power4.out"
        })
        .from(".hero-subtitle", {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        }, "-=1")
        .from(".hero-btn", {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)"
        }, "-=0.8");

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

    const aboutTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#about",
            start: "top 75%",
        }
    });

    // 1. Text Reveal
    aboutTl.from(".about-text > *", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
    });

    // 2. Image Mask Reveal
    aboutTl.to(".about-image-mask", {
        scaleX: 0,
        duration: 1.2,
        ease: "power4.inOut"
    }, "-=0.6");

    // 3. Image Zoom Out (Inside mask)
    aboutTl.from(".about-img", {
        scale: 1.3,
        duration: 1.2,
        ease: "power4.inOut"
    }, "<");

    // 4. Parallax Effect (Scrub)
    gsap.utils.toArray("[data-speed]").forEach(layer => {
        const speed = layer.getAttribute("data-speed");
        gsap.to(layer, {
            y: (i, target) => (1 - parseFloat(speed)) * 100, // Move based on speed diff
            ease: "none",
            scrollTrigger: {
                trigger: "#about",
                start: "top bottom",
                end: "bottom top",
                scrub: 0
            }
        });
    });

    // DESTINASI SECTION

    // 1. Path Drawing
    const path = document.querySelector("#explorationPath");
    const pathLength = path.getTotalLength();

    // Set initial dash attributes for drawing effect
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
            trigger: ".space-y-40", // The wrapper of items
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1
        }
    });

    // 2. Header Reveal
    gsap.from(".destinasi-header", {
        scrollTrigger: {
            trigger: "#destinasi",
            start: "top 75%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    // 3. Items Reveal (Parallax & Fade)
    const items = document.querySelectorAll(".destinasi-item");

    items.forEach((item, index) => {
        // Alternate slide direction
        const xOffset = index % 2 === 0 ? 50 : -50;

        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
            },
            x: xOffset,
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
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
