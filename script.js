// Cycle the word in the hero heading.
const words = ["websites", "interfaces", "features", "products"];
let wordIndex = 0;
const cycleWord = document.getElementById("cycleWord");

setInterval(function () {
  wordIndex = (wordIndex + 1) % words.length;
  cycleWord.style.opacity = 0;

  setTimeout(function () {
    cycleWord.textContent = words[wordIndex];
    cycleWord.style.opacity = 1;
  }, 180);
}, 2400);

// Show the mouse position inside the hero section.
const hero = document.getElementById("hero");
const coordReadout = document.getElementById("coordReadout");

hero.addEventListener("mousemove", function (event) {
  const heroPosition = hero.getBoundingClientRect();
  const x = Math.round(event.clientX - heroPosition.left);
  const y = Math.round(event.clientY - heroPosition.top);
  coordReadout.textContent = "x: " + x + ", y: " + y;
});

// Highlight the navigation link for the section currently on screen.
const sections = document.querySelectorAll("main section[id]");
const layerLinks = document.querySelectorAll(".layer-link");

function updateActiveSection() {
  let currentSection = sections[0];

  sections.forEach(function (section) {
    if (window.scrollY >= section.offsetTop - 200) {
      currentSection = section;
    }
  });

  layerLinks.forEach(function (link) {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === "#" + currentSection.id
    );
  });
}

window.addEventListener("scroll", updateActiveSection);
updateActiveSection();

// Prepare each skill bar for its animation.
const skillFills = document.querySelectorAll(".skill-fill");
skillFills.forEach(function (fill) {
  const width = fill.getAttribute("style").match(/width:\s*[^;]+/)[0].split(":")[1];
  fill.style.setProperty("--skill-level", width);
  fill.style.removeProperty("width");
});

let skillsAnimated = false;
const aboutSection = document.getElementById("about");

function showSkillFills() {
  if (skillsAnimated) {
    return;
  }

  skillFills.forEach(function (fill) {
    fill.classList.add("is-visible");
  });

  skillsAnimated = true;
}

function checkSkillSection() {
  const aboutPosition = aboutSection.getBoundingClientRect();

  if (aboutPosition.top < window.innerHeight && aboutPosition.bottom > 0) {
    showSkillFills();
  }
}

window.addEventListener("scroll", checkSkillSection);
checkSkillSection();

  

  //  Work filter 
  const tabs = document.querySelectorAll('.tab-btn');
  const items = document.querySelectorAll('.proj-item');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      items.forEach(item => {
        item.style.display = (filter === 'all' || item.dataset.cat === filter) ? '' : 'none';
      });
    });
  });

  //  Contact form (Formspree, no page reload) 
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  if(contactForm){
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      formStatus.textContent = 'Sending…';
      try {
        const res = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });
        if(res.ok){
          formStatus.textContent = 'Message sent — We will Catch You soon Buddy😉';
          contactForm.reset();
        } else {
          formStatus.textContent = 'Something went wrong — try email instead.';
        }
      } catch (err) {
        formStatus.textContent = 'Something went wrong — try email instead.';
      }
    });
  }