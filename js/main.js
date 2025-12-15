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

    // STICKY HEADER
    const header = document.getElementById("header");

    header.classList.add("header-light");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("header-dark");
            header.classList.remove("header-light");
        } else {
            header.classList.add("header-light");
            header.classList.remove("header-dark");
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


});
