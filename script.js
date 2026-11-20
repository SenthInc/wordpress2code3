(() => {
  "use strict";

  // ---------- Config ----------
  const CONFIG = {
    formEndpoint: "", // e.g. a Formspree / Vercel function URL; empty = demo mode (opens WhatsApp)
    defaultWhatsApp: "94778147389",
  };

  // ---------- Translations (English / Tamil) ----------
  const T = {
    en: {
      skip: "Skip to content",
      fb_title: "Our other Facebook pages", fb_sub: "Follow our other pages for updates.", fb_visit: "Visit page", social_label: "Follow us",
      companySub: "Real Estate (Pvt) Ltd",
      nav_projects: "Projects", nav_services: "Services", nav_team: "Contact us",
      nav_office: "Our office", nav_about: "About", nav_faq: "FAQ", nav_visit: "Visit us",
      hero_eyebrow: "Jaffna, Sri Lanka · Since 2019",
      hero_title: "Building and developing property in Jaffna",
      hero_lead: "Land development, custom homes and property projects across Jaffna and surrounding areas.",
      hero_btn_projects: "View our projects", hero_btn_wa: "Chat on WhatsApp",
      call_title: "Call us directly",
      person_jeyam: "Jeyam", person_siva: "Siva", person_satheesh: "Satheesh",
      stat_est: "Established", stat_days: "Days a week open", stat_services: "Core services",
      stat_local_val: "Jaffna", stat_local: "Local expertise",
      projects_title: "Our projects", projects_sub: "Photos from our land development and project sites in Jaffna.",
      services_title: "What we do", services_sub: "From first plot to finished home.",
      svc1_t: "Land development", svc1_d: "Planning and developing land projects across Jaffna and nearby areas.",
      svc2_t: "Custom home construction", svc2_d: "From plan to handover. Build the home you want on land you choose.",
      svc3_t: "Commercial property", svc3_d: "Shops, offices and showrooms designed for local businesses.",
      process_title: "How it works", process_sub: "Four simple steps from your first call to handover.",
      step1_t: "Talk to us", step1_d: "Call or WhatsApp any member of our team.",
      step2_t: "Site visit and plan", step2_d: "We look at the land and agree on a plan together.",
      step3_t: "Build and develop", step3_d: "We carry out the work with clear updates along the way.",
      step4_t: "Handover", step4_d: "You receive the finished project, ready to use.",
      team_title: "Talk to our team", team_sub: "Choose the person you would like to speak with.",
      btn_call: "Call", btn_wa_short: "WhatsApp",
      office_title: "Our office", office_sub: "Visit us at Raja Street, Jaffna.",
      about_title: "About Jeyam Real Estate (Pvt) Ltd",
      about_p1: "Jeyam Real Estate (Pvt) Ltd has been working in Jaffna since 2019, with projects in land development, custom home construction and commercial property.",
      about_p2: "We keep communication clear and the process straightforward, from the first meeting to the final handover.",
      about_li1: "Local knowledge of Jaffna", about_li2: "Clear planning and honest timelines", about_li3: "Available 7 days a week",
      facts_title: "Quick facts", facts_loc: "Location", facts_loc_v: "151/4 Raja St, Jaffna 40170",
      facts_hours: "Hours", facts_hours_v: "Mon – Sun, 8:00 AM – 6:00 PM", facts_web: "Website",
      faq_title: "Frequently asked questions",
      faq1_q: "Can you build on land I already own?", faq1_a: "Yes. Contact us with your land details and we will advise on the next steps.",
      faq2_q: "Where do you work?", faq2_a: "Jaffna and the surrounding areas.",
      faq3_q: "What are your office hours?", faq3_a: "Monday to Sunday, 8:00 AM to 6:00 PM.",
      faq4_q: "How do I start?", faq4_a: "Call or WhatsApp any member of our team, or send us a message below.",
      visit_title: "Visit us", directions: "Get directions",
      contact_title: "Get in touch", contact_sub: "Ask about a project, or tell us what you have in mind.",
      label_phone: "Phone / WhatsApp",
      form_name: "Full name", form_phone: "Phone / WhatsApp", form_interest: "I am interested in",
      form_other: "Other", form_message: "Message", form_send: "Send message",
      err_name: "Please enter your name.", err_phone: "Enter a valid phone number.", err_message: "Please write a short message.",
      form_fix: "Please fix the highlighted fields.", form_sending: "Sending...",
      form_thanks: "Thank you! We will contact you shortly.",
      form_error: "Sorry, something went wrong. Please call or WhatsApp us directly.",
      modal_btn: "Ask about our projects", modal_wa_msg: "Hello, I would like to know more about your project",
      footer_rights: "Jeyam Real Estate (Pvt) Ltd, Jaffna. All rights reserved.", back_top: "Back to top",
      wa_default_msg: "Hello Jeyam Real Estate, I would like to know more about your projects.",
      wa_float: "WhatsApp", wa_contact_msg: "Hello, I would like to speak with",
      theme_dark: "Dark mode", theme_light: "Light mode", lang_btn: "தமிழ்",
      caption_aerial: "Aerial view of the land and homes in Jaffna",
      caption_boards1: "Project display boards along the road",
      caption_boards2: "Project display boards beside the road",
      caption_boards3: "Project display boards on the roadside",
      caption_sign: "Jeyam Real Estate sign in the office",
      caption_office1: "Waiting area", caption_office2: "Office and filing",
      caption_office3: "Desk and filing shelves", caption_office4: "Office desk",
      caption_office5: "Office with printer", caption_office6: "Office with filing cabinets",
    },
    ta: {
      skip: "ஹார்வுக்கு செல்லவும்",
      fb_title: "எங்கள் மற்ற முகநூல் பக்கங்கள்", fb_sub: "மேலும் புதுப்பிப்புகளுக்கு எங்கள் மற்ற பக்கங்களைப் பின்தொடருங்கள்.", fb_visit: "பக்கத்தைப் பாருங்கள்", social_label: "எங்களைப் பின்தொடருங்கள்",
      companySub: "ரிஒல் எஸ்டேட் (தனியார்) லிமிடெட்",
      nav_projects: "திட்டங்கள்", nav_services: "சேவைகள்",
      nav_team: "தொடர்பு கொள்க", nav_office: "எங்கள் அலுவலகம்",
      nav_about: "எங்களை பற்றி", nav_faq: "கேள்விகள்", nav_visit: "வருகை",
      hero_eyebrow: "யாழ்ப்பாணம், இலங்கை · 2019 முதல்",
      hero_title: "யாழ்ப்பாணத்தில் நில மேம்பாடு மற்றும் வீடு கட்டுமானம்",
      hero_lead: "யாழ்ப்பாணம் மற்றும் அதன் சுற்றுப்புறங்களில் நில மேமார்ப்பு, தனிப்பயன் வீடுகள் மற்றும் சொத்துத் திட்டங்கள்.",
      hero_btn_projects: "எங்கள் திட்டங்களைப் பார்க்கவும்",
      hero_btn_wa: "வாட்ச்அப்பில் பேசுங்கள்",
      call_title: "நேரடியாக எங்களை அழைக்கவும்",
      person_jeyam: "ஜெயம்", person_siva: "சிவா", person_satheesh: "சதீஷ்",
      stat_est: "நிறுவப்பட்டது", stat_days: "வாரத்தில் திறந்திருக்கும் நாட்கள்",
      stat_services: "முக்கிய சேவைகள்", stat_local_val: "யாழ்ப்பாணம்", stat_local: "உள்ளூர் அனுபவம்",
      projects_title: "எங்கள் திட்டங்கள்",
      projects_sub: "யாழ்ப்பாணத்தில் எங்கள் நில மேமார்ப்பு மற்றும் திட்ட தளங்களின் புகைப்படங்கள்.",
      services_title: "நாங்கள் செய்வது",
      services_sub: "முதல் நிலத்திலிருந்து முடிந்த வீடு வரை.",
      svc1_t: "நில மேமார்ப்பு",
      svc1_d: "யாழ்ப்பாணம் மற்றும் அணைத்து நில திட்டங்களையும் மேமார்ப்பும் திட்டமிடுதல்.",
      svc2_t: "தனிப்பயன் வீட்டு கட்டுமானம்",
      svc2_d: "திட்டமிடலிலிருந்து ஒப்படைப் வரை. நீங்கள் தேர்ந்தெடுத்த நிலத்தில் நீங்கள் விரும்பும் வீடு.",
      svc3_t: "வணிக சொத்து",
      svc3_d: "உள்ளூர் வணிகர்களுக்கான கடைகள், அலுவலகங்கள் மற்றும் காட்சிஅறைகள்.",
      process_title: "இது எப்படி செயல்படுகிறது",
      process_sub: "முதல் அழைப்பிலிருந்து ஒப்படைப் வரை நான்கு எளிய படிகள்.",
      step1_t: "எங்களிடம் பேசுங்கள்", step1_d: "எங்கள் குழுவில் எவரையும் அழைக்கவும் அல்லது வாட்ச்அப் செய்யவும்.",
      step2_t: "இடம் பார்வையிட்டு திட்டமிடல்", step2_d: "நாங்கள் நிலத்தை பார்வையிட்டு ஒன்றாக தீர்மானிக்கிறோம்.",
      step3_t: "கட்டுதல் மற்றும் மேமார்ப்பு", step3_d: "வேலை நடக்கும்போது தெளிவான புதுப்பிப்புகள்டன் நாங்கள் வேலையை ஸெய்கிறோம்.",
      step4_t: "ஒப்படைப்பு", step4_d: "பயன்படுத்த திட்டம் உங்களுக்கு கிடைக்கும்.",
      team_title: "எங்கள் குழுவுடன் பேசுங்கள்",
      team_sub: "நீங்கள் பேச விரும்பும் நபரை தேர்ந்தெடுங்கள்.",
      btn_call: "அழைக்க", btn_wa_short: "வாட்ச்அப்",
      office_title: "எங்கள் அலுவலகம்",
      office_sub: "யாழ்ப்பாணம், இராச வீதியில் எங்களை பார்வையிடுங்கள்.",
      about_title: "ஜெயம் ரிஒல் எஸ்டேட் (தனியார்) லிமிடெட் பற்றி",
      about_p1: "ஜெயம் ரிஒல் எஸ்டேட் (தனியார்) லிமிடெட் 2019 முதல் யாழ்ப்பாணத்தில் பணியாறுகிறது. நில மேமார்ப்பு, தனிப்பயன் வீட்டு கட்டுமானம் மற்றும் வணிக சொத்து திட்டங்கள் எங்கள் பணி.",
      about_p2: "தொடர்புகள் தெளிவாகவும், நடைமுறை எளிமையாகவும் இருக்க வேண்டும் என்று நாங்கள் உறுதி செய்கிறோம்.",
      about_li1: "யாழ்ப்பாணத்தின் உள்ளூர் அறிவு",
      about_li2: "தெளிவான திட்டமிடல், நேர்மையான காலக்கெவு",
      about_li3: "வாரத்தில் 7 நாட்களும் கிடைக்கும்",
      facts_title: "விரைவான தகவல்கள்", facts_loc: "இடம்",
      facts_loc_v: "151/4 இராச வீதி (Raja St), யாழ்ப்பாணம் (அஞ்சல் குறியீடு: 40170)",
      facts_hours: "நேரம்", facts_hours_v: "திங்கள் – ஞாயிறு, காலை 8:00 – மாலை 6:00",
      facts_web: "இணையதளம்",
      faq_title: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
      faq1_q: "நான் ஏற்கனவே வைத்திருக்கும் நிலத்தில் வீடு கட்டுவீர்களா?",
      faq1_a: "ஆம். உங்கள் நில விவரங்களுடன் எங்களை தொடர்பு கொள்ளுங்கள், அடுத்த படிகளை நாங்கள் ஆலோசிப்போம்.",
      faq2_q: "நீங்கள் எந்த பகுதிகளில் பணியாறுகிறீர்கள்?",
      faq2_a: "யாழ்ப்பாணம் மற்றும் அதை சுற்றியுள்ள பகுதிகளில்.",
      faq3_q: "அலுவலக நேரம் என்ன?",
      faq3_a: "திங்கள் முதல் ஞாயிறு வரை, காலை 8:00 முதல் மாலை 6:00 வரை.",
      faq4_q: "நான் எப்படி தொடங்குவது?",
      faq4_a: "எங்கள் குழுவில் எவரையும் அழைக்கவும் அல்லது வாட்ச்அப் செய்யவும், அல்லது கீழே ஒரு செய்தி அனுப்பவும்.",
      visit_title: "எங்களை பார்வையிடுங்கள்", directions: "வழிகாட்டல் பெறுங்கள்",
      contact_title: "எங்களை தொடர்பு கொள்ளுங்கள்",
      contact_sub: "ஒரு திட்டம் பற்றி கேளுங்கள், அல்லது உங்கள் நோக்க்வை சொல்லுங்கள்.",
      label_phone: "தொலைபேசி / வாட்ச்அப்",
      form_name: "முழு பெயர்", form_phone: "தொலைபேசி / வாட்ச்அப்",
      form_interest: "நான் ஆர்வமாக உள்ளேன்",
      form_other: "மற்றவை", form_message: "செய்தி", form_send: "செய்தியை அனுப்பு",
      err_name: "தயவுசெய்து உங்கள் பெயரை உள்ளிடவும்.",
      err_phone: "சரியான தொலைபேசி எண்ணை உள்ளிடவும்.",
      err_message: "ஒரு சிறிய செய்தியை எழுதவும்.",
      form_fix: "குறிப்பிடப்பட்ட புலங்களை சரிசெய்யவும்.",
      form_sending: "அனுப்பப்படுகிறது...",
      form_thanks: "நன்றி! விரைவில் எங்கள் தொடர்பு கொள்வோம்.",
      form_error: "மன்னிக்கவும், ஏதோ தவறானது. நேரில் அழைக்கவும் வாட்ச்அப் செய்யவும்.",
      modal_btn: "எங்கள் திட்டங்கள் பற்றி கேளுங்கள்",
      modal_wa_msg: "வணக்கம், உங்கள் திட்டம் பற்றி தெரிந்து கொள்ள விரும்புகிறேன்",
      footer_rights: "ஜெயம் ரிஒல் எஸ்டேட் (தனியார்) லிமிடெட், யாழ்ப்பாணம். எல்லா உரிமைகளும் பாதுகாக்கப்பட்டவை.",
      back_top: "மேலே செல்லுங்கள்",
      wa_default_msg: "வணக்கம் ஜெயம் ரிஒல் எஸ்டேட், உங்கள் திட்டங்கள் பற்றி தெரிந்து கொள்ள விரும்புகிறேன்.",
      wa_float: "வாட்ச்அப்", wa_contact_msg: "வணக்கம், நான் பேச விரும்புகிறேன்",
      theme_dark: "இருள் முறை", theme_light: "ஒளி முறை",
      lang_btn: "English",
      caption_aerial: "யாழ்ப்பாணத்தில் நிலம் மற்றும் வீடுகளின் வான்வழிக் காட்சி",
      caption_boards1: "சாலையில் திட்ட பலகைகள்",
      caption_boards2: "சாலையை ஒட்டிய திட்ட பலகைகள்",
      caption_boards3: "சாலையோர திட்ட பலகைகள்",
      caption_sign: "அலுவலகத்தில் ஜெயம் ரிஒல் எஸ்டேட் பலகை",
      caption_office1: "காத்திருக்கும் இடம்", caption_office2: "அலுவலகம் மற்றும் கோப்புகள்",
      caption_office3: "மேசை மற்றும் கோப்பு அலமாரிகள்",
      caption_office4: "அலுவலக மேசை", caption_office5: "அச்சிட்டர் உள்ள அலுவலகம்",
      caption_office6: "கோப்பு அலமாரிகள் உள்ள அலுவலகம்",
    },
  };

  // Photos from the company's own pictures. Captions describe only what is shown.
  const PROJECT_PHOTOS = [
    { src: "images/aerial.jpg", alt: "Aerial view of land and houses in Jaffna", cap: "caption_aerial" },
    { src: "images/boards-1.jpg", alt: "Project display boards along a road in Jaffna", cap: "caption_boards1" },
    { src: "images/boards-2.jpg", alt: "Project display boards beside a road", cap: "caption_boards2" },
    { src: "images/boards-3.jpg", alt: "Project display boards along a roadside wall", cap: "caption_boards3" },
  ];
  const OFFICE_PHOTOS = [
    { src: "images/sign-indoor.jpg", alt: "Jeyam Real Estate sign in the office", cap: "caption_sign" },
    { src: "images/office-1.jpg", alt: "Office waiting area with blue chairs", cap: "caption_office1" },
    { src: "images/office-2.jpg", alt: "Office with desks and filing cabinets", cap: "caption_office2" },
    { src: "images/office-3.jpg", alt: "Office desk with a computer and file shelves", cap: "caption_office3" },
    { src: "images/office-4.jpg", alt: "Office with a wooden desk and chairs", cap: "caption_office4" },
    { src: "images/office-5.jpg", alt: "Office with printer and wooden desk", cap: "caption_office5" },
    { src: "images/office-6.jpg", alt: "Office with filing cabinets and a desk", cap: "caption_office6" },
  ];

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ---------- Language ----------
  let lang = "en";
  try { const saved = localStorage.getItem("jeyam-lang"); if (saved === "ta" || saved === "en") lang = saved; } catch { /* storage unavailable */ }
  const t = (key) => (T[lang][key] ?? T.en[key] ?? key);

  const waLink = (number, text) =>
    `https://wa.me/${number}?text=${encodeURIComponent(text || t("wa_default_msg"))}`;

  function applyStaticText() {
    document.documentElement.lang = lang;
    document.documentElement.dir = "ltr";
    $$("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $("#langToggle").textContent = t("lang_btn");
    $("#langToggle").setAttribute("aria-label", lang === "en" ? "Switch to Tamil" : "Switch to English");
    $("#floatWhatsApp").textContent = t("wa_float");
    $("#floatWhatsApp").setAttribute("aria-label", t("wa_float"));
    $("#heroWhatsApp").href = waLink(CONFIG.defaultWhatsApp);
    $("#floatWhatsApp").href = waLink(CONFIG.defaultWhatsApp);
    $("#waSocial") && ($("#waSocial").href = waLink(CONFIG.defaultWhatsApp));
    $$(".btn-wa[data-wa]").forEach((a) => {
      a.href = waLink(a.dataset.wa, t("wa_contact_msg") + " " + a.closest(".team-card").querySelector("h3").textContent + ".");
    });
    syncThemeLabel();
    buildGallery($("#projectGallery"), PROJECT_PHOTOS);
    buildGallery($("#officeGallery"), OFFICE_PHOTOS);
    $$(".faq details").forEach((d) => d.removeAttribute("open"));
  }

  $("#langToggle").addEventListener("click", () => {
    lang = lang === "en" ? "ta" : "en";
    try { localStorage.setItem("jeyam-lang", lang); } catch { /* storage unavailable */ }
    applyStaticText();
  });

  // ---------- Header: shadow on scroll + mobile menu ----------
  const header = $("#siteHeader");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const toggle = $("#menuToggle");
  const nav = $("#mainNav");
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("open", open);
  });
  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("open");
    }
  });

  // ---------- Dark mode ----------
  const themeBtn = $("#themeToggle");
  const root = document.documentElement;
  const prefersDark = () => matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = (() => { try { return localStorage.getItem("jeyam-theme"); } catch { return null; } })();
  if (savedTheme) root.setAttribute("data-theme", savedTheme);
  const currentTheme = () => root.getAttribute("data-theme") || (prefersDark() ? "dark" : "light");
  function syncThemeLabel() { themeBtn.textContent = currentTheme() === "dark" ? t("theme_light") : t("theme_dark"); }
  themeBtn.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("jeyam-theme", next); } catch { /* storage unavailable */ }
    syncThemeLabel();
  });

  // ---------- Galleries & lightbox ----------
  let lastFocus = null;
  const modal = $("#modal");
  let currentPhoto = null;

  function buildGallery(container, photos) {
    container.innerHTML = "";
    photos.forEach((p, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "gallery-item";
      btn.style.animationDelay = `${i * 60}ms`;
      const img = document.createElement("img");
      img.src = p.src;
      img.alt = p.alt;
      img.loading = "lazy";
      img.decoding = "async";
      const cap = document.createElement("span");
      cap.className = "gallery-caption";
      cap.textContent = t(p.cap);
      btn.setAttribute("aria-label", `${t("projects_title")}: ${t(p.cap)}`);
      btn.append(img, cap);
      btn.addEventListener("click", () => openModal(p));
      container.appendChild(btn);
    });
  }

  function openModal(p) {
    lastFocus = document.activeElement;
    currentPhoto = p;
    const img = $("#modalImg");
    img.src = p.src;
    img.alt = p.alt;
    $("#modalCaption").textContent = t(p.cap);
    $("#modalWhatsApp").href = waLink(CONFIG.defaultWhatsApp, `${t("modal_wa_msg")} "${t(p.cap)}".`);
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    $("#modalClose").focus();
  }

  function closeModal() {
    modal.hidden = true;
    $("#modalImg").src = "";
    currentPhoto = null;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  $("#modalClose").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

  // ---------- Counters ----------
  const counters = $$("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.count);
        const start = performance.now();
        const step = (now) => {
          const p = Math.min((now - start) / 900, 1);
          el.textContent = Math.round(target * p);
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach((c) => io.observe(c));
  } else {
    counters.forEach((c) => (c.textContent = c.dataset.count));
  }

  // ---------- Contact form ----------
  const form = $("#contactForm");
  const status = $("#formStatus");
  const rules = {
    cName: (v) => (v.trim().length >= 2 ? "" : t("err_name")),
    cPhone: (v) => (/^\+?[0-9\s-]{9,15}$/.test(v.trim()) ? "" : t("err_phone")),
    cMessage: (v) => (v.trim().length >= 5 ? "" : t("err_message")),
  };

  function validateField(id) {
    const input = document.getElementById(id);
    const msg = rules[id](input.value);
    input.closest(".field").classList.toggle("invalid", !!msg);
    input.setAttribute("aria-invalid", String(!!msg));
    $(`[data-error-for="${id}"]`).textContent = msg;
    return !msg;
  }

  Object.keys(rules).forEach((id) => {
    document.getElementById(id).addEventListener("blur", () => validateField(id));
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const ok = Object.keys(rules).map(validateField).every(Boolean);
    if (!ok) { status.textContent = t("form_fix"); return; }

    const data = Object.fromEntries(new FormData(form).entries());
    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    status.textContent = t("form_sending");

    try {
      if (CONFIG.formEndpoint) {
        const res = await fetch(CONFIG.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Request failed");
      } else {
        // Demo mode: no backend configured yet, so open WhatsApp with the message instead.
        window.open(waLink(CONFIG.defaultWhatsApp, `Name: ${data.name}\nPhone: ${data.phone}\nInterest: ${data.interest}\n${data.message}`), "_blank", "noopener");
      }
      status.textContent = t("form_thanks");
      form.reset();
    } catch {
      status.textContent = t("form_error");
    } finally {
      btn.disabled = false;
    }
  });

  // ---------- Init ----------
  $("#year").textContent = new Date().getFullYear();
  applyStaticText();
})();
