document.addEventListener("DOMContentLoaded", () => {

    // ============================================
    // LANGUAGE SWITCHER
    // ============================================
    let currentLang = localStorage.getItem('language') || 'id';
    
    const langToggle = document.getElementById("langToggle");
    const langToggleMobile = document.getElementById("langToggleMobile");
    const currentFlag = document.getElementById("currentFlag");
    const currentLangText = document.getElementById("currentLang");
    const currentFlagMobile = document.getElementById("currentFlagMobile");
    const currentLangMobile = document.getElementById("currentLangMobile");
    
    // Set initial language
    setLanguage(currentLang);
    
    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('language', lang);
        
        // Update flag and text
        if (lang === 'id') {
            currentFlag.textContent = '🇮🇩';
            currentLangText.textContent = 'ID';
            currentFlagMobile.textContent = '🇮🇩';
            currentLangMobile.textContent = 'ID';
        } else {
            currentFlag.textContent = '🇬🇧';
            currentLangText.textContent = 'EN';
            currentFlagMobile.textContent = '🇬🇧';
            currentLangMobile.textContent = 'EN';
        }
        
        // Update all elements with data-lang attribute
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (translations[lang] && translations[lang][key]) {
                // Fade out animation
                gsap.to(element, {
                    opacity: 0,
                    y: -10,
                    duration: 0.2,
                    ease: "power2.in",
                    onComplete: () => {
                        element.textContent = translations[lang][key];
                        // Fade in animation
                        gsap.to(element, {
                            opacity: 1,
                            y: 0,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                    }
                });
            }
        });
        
        // Update placeholder attributes
        document.querySelectorAll('[data-lang-placeholder]').forEach(element => {
            const key = element.getAttribute('data-lang-placeholder');
            if (translations[lang] && translations[lang][key]) {
                element.setAttribute('placeholder', translations[lang][key]);
            }
        });
    }
    
    function toggleLanguage() {
        const newLang = currentLang === 'id' ? 'en' : 'id';
        setLanguage(newLang);
    }
    
    langToggle.addEventListener('click', toggleLanguage);
    langToggleMobile.addEventListener('click', toggleLanguage);

    // ============================================
    // HERO ANIMATIONS
    // ============================================
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

    // 4. Internal Image Parallax (Polish)
    const destImages = document.querySelectorAll(".dest-img");
    destImages.forEach(img => {
        gsap.to(img, {
            y: "10%", // Move image down slightly inside container
            ease: "none",
            scrollTrigger: {
                trigger: img.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // 5. Floating Particles Animation
    gsap.to(".float-particle", {
        y: -50,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: {
            each: 0.5,
            from: "random"
        }
    });

    // CONTACT SECTION
    gsap.from(".contact-card", {
        scrollTrigger: {
            trigger: "#kontak",
            start: "top 70%",
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
    });

    // Form Submit Animation
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.addEventListener("click", () => {
        const span = submitBtn.querySelector("span");
        const svg = submitBtn.querySelector("svg");

        // Fly away icon
        gsap.to(svg, {
            x: 50,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => {
                gsap.set(svg, { x: -50 });
                span.innerText = translations[currentLang]['contact_success'];
                submitBtn.classList.add("bg-teal-400", "text-black");
                submitBtn.classList.remove("bg-white", "text-gray-900");

                // Return icon
                gsap.to(svg, {
                    x: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        });
    });

    // FOOTER REVEAL
    gsap.from("footer div", {
        scrollTrigger: {
            trigger: "footer",
            start: "top 90%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out"
    });

    // AI CHATBOT INTEGRATION
    const toggleChat = document.getElementById("toggleChat");
    const chatWindow = document.getElementById("chatWindow");
    const closeChat = document.getElementById("closeChat");
    const chatForm = document.getElementById("chatForm");
    const chatInput = document.getElementById("chatInput");
    const chatMessages = document.getElementById("chatMessages");
    const chips = document.querySelectorAll(".chat-chip");

    let isChatOpen = false;

    // Toggle Chat
    function toggleChatWidget() {
        isChatOpen = !isChatOpen;
        if (isChatOpen) {
            chatWindow.style.display = "flex";
            // Small delay to allow display:flex to apply before opacity transition
            setTimeout(() => {
                chatWindow.classList.remove("opacity-0", "translate-y-10", "scale-95");
                chatWindow.classList.add("opacity-100", "translate-y-0", "scale-100");
                chatInput.focus();
            }, 10);
            toggleChat.classList.add("scale-0", "opacity-0");
        } else {
            chatWindow.classList.remove("opacity-100", "translate-y-0", "scale-100");
            chatWindow.classList.add("opacity-0", "translate-y-10", "scale-95");
            setTimeout(() => {
                chatWindow.style.display = "none";
            }, 300);
            toggleChat.classList.remove("scale-0", "opacity-0");
        }
    }

    toggleChat.addEventListener("click", toggleChatWidget);
    closeChat.addEventListener("click", toggleChatWidget);

    // Manual Chat Logic (Offline/Rule-Based)

    function addMessage(text, sender) {
        const div = document.createElement("div");
        div.className = "flex gap-3 " + (sender === "user" ? "flex-row-reverse" : "");

        const avatar = sender === "ai"
            ? `<div class="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-xs font-bold shrink-0">AI</div>`
            : `<div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold shrink-0">U</div>`;

        const bubbleStyle = sender === "ai"
            ? "bg-white/10 border border-white/10 text-gray-800 backdrop-blur-sm rounded-tl-none"
            : "bg-teal-500 text-white rounded-tr-none shadow-md";

        div.innerHTML = `
            ${avatar}
            <div class="${bubbleStyle} p-3 rounded-2xl text-sm max-w-[85%] self-start leading-relaxed">
                ${text}
            </div>
        `;

        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTyping() {
        const div = document.createElement("div");
        div.id = "typingIndicator";
        div.className = "flex gap-3";
        div.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-xs font-bold shrink-0">AI</div>
            <div class="bg-white/10 border border-white/10 p-3 rounded-2xl rounded-tl-none backdrop-blur-sm flex gap-1 items-center h-10">
                <span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                <span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                <span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
            </div>
        `;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function removeTyping() {
        const typing = document.getElementById("typingIndicator");
        if (typing) typing.remove();
    }

    const KNOWLEDGE_BASE = {
        "halo": "Halo! Selamat datang di Eksplorasi Nusantara. Mau liburan ke mana kali ini? 🌿",
        "hai": "Hai! Ada yang bisa saya bantu?",
        "pagi": "Selamat pagi! Semangat untuk petualangan baru?",
        "siang": "Selamat siang! Sudah punya rencana liburan?",
        "malam": "Selamat malam! Waktu yang tepat untuk merencanakan perjalanan esok hari.",
        "bali": "Bali adalah 'Pulau Dewata' yang terkenal dengan pantainya (Kuta, Seminyak, Nusa Penida), budayanya yang kental, dan kuliner seperti Ayam Betutu. Waktu terbaik ke sana adalah April-Oktober!",
        "prambanan": "Candi Prambanan adalah kompleks candi Hindu terbesar di Indonesia yang dibangun pada abad ke-9. Lokasinya di Yogyakarta. Jangan lewatkan sendratari Ramayana di malam hari!",
        "raja ampat": "Raja Ampat di Papua Barat adalah surga penyelam dunia! Terkenal dengan gugusan pulau karst Wayag dan Piaynemo. Pastikan membawa perlengkapan snorkeling!",
        "destinasi": "Kami merekomendasikan 3 destinasi utama: 1. Candi Prambanan (Budaya), 2. Raja Ampat (Alam Bawah Laut), 3. Nusa Penida, Bali (Pantai & Tebing).",
        "tips": "Tips travel dari kami: 1. Pesan tiket jauh-jauh hari. 2. Bawa uang tunai secukupnya. 3. Hormati adat istiadat setempat. 4. Jangan lupa sunscreen!",
        "kuliner": "Wajib coba: Gudeg di Jogja, Babi Guling/Ayam Betutu di Bali, dan Papeda di Papua (Raja Ampat).",
        "terima kasih": "Sama-sama! Semoga harimu menyenangkan. Jangan ragu bertanya lagi ya! 😊",
    };

    async function generateResponse(prompt) {
        // Simulate thinking delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const lowerPrompt = prompt.toLowerCase();

        // Simple keyword matching
        for (const [key, answer] of Object.entries(KNOWLEDGE_BASE)) {
            if (lowerPrompt.includes(key)) {
                return answer;
            }
        }

        // Default Fallback
        return "Maaf, saya masih belajar. Coba tanya tentang 'Bali', 'Prambanan', 'Raja Ampat', 'Tips', atau 'Kuliner'. 😊";
    }

    async function handleSend(e) {
        e.preventDefault();
        const text = chatInput.value.trim();
        if (!text) return;

        // User Message
        addMessage(text, "user");
        chatInput.value = "";

        // AI Response
        showTyping();
        const aiResponse = await generateResponse(text);
        removeTyping();
        addMessage(aiResponse, "ai");
    }

    chatForm.addEventListener("submit", handleSend);

    // Quick Chips Logic
    chips.forEach(chip => {
        chip.addEventListener("click", () => {
            chatInput.value = chip.innerText;
            handleSend({ preventDefault: () => { } });
        });
    });

});
