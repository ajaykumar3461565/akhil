const pages = [...document.querySelectorAll(".page")];
const heartButton = document.getElementById("heartButton");
const toLovePage = document.getElementById("toLovePage");
const toMemoryPage = document.getElementById("toMemoryPage");
const centerBurst = document.getElementById("centerBurst");
const typingLines = [...document.querySelectorAll(".typing-line")];
const heartsLayer = document.getElementById("heartsLayer");
const confettiLayer = document.getElementById("confettiLayer");
const letterHearts = document.getElementById("letterHearts");
const memoryHearts = document.getElementById("memoryHearts");
const sunflowerRain = document.getElementById("sunflowerRain");
const sunFollower = document.getElementById("sunFollower");
const loveSong = document.getElementById("loveSong");
const musicStatus = document.getElementById("musicStatus");
const memoryPhoto = document.getElementById("memoryPhoto");
const memoryPage = document.getElementById("page4");

let activePage = 0;
let typingStarted = false;
let finaleStarted = false;
let sunX = window.innerWidth * 0.5;
let sunY = window.innerHeight * 0.22;
let sunTargetX = sunX;
let sunTargetY = sunY;

function showPage(index) {
  pages.forEach((page, pageIndex) => {
    page.classList.toggle("active", pageIndex === index);
  });

  activePage = index;

  if (index === 2 && !typingStarted) {
    typingStarted = true;
    launchCenterBurst();
    startTypingSequence();
  }

  if (index === 3 && !finaleStarted) {
    finaleStarted = true;
    launchCenterBurst();
    startFinale();
  }
}

function nextPage() {
  if (activePage < pages.length - 1) {
    showPage(activePage + 1);
  }
}

function createFloatingHeart() {
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = "❤";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${12 + Math.random() * 26}px`;
  heart.style.animationDuration = `${8 + Math.random() * 8}s`;
  heart.style.animationDelay = `${Math.random() * 3}s`;
  heart.style.setProperty("--drift", `${-40 + Math.random() * 80}px`);
  heartsLayer.appendChild(heart);

  window.setTimeout(() => {
    heart.remove();
  }, 17000);
}

function seedHearts() {
  for (let i = 0; i < 18; i += 1) {
    window.setTimeout(createFloatingHeart, i * 350);
  }

  window.setInterval(createFloatingHeart, 700);
}

function createLetterHeart() {
  const heart = document.createElement("span");
  heart.className = "letter-float";
  heart.textContent = Math.random() > 0.35 ? "❤" : "💖";
  heart.style.left = `${6 + Math.random() * 88}%`;
  heart.style.animationDuration = `${5.5 + Math.random() * 3.5}s`;
  heart.style.animationDelay = `${Math.random() * 0.4}s`;
  heart.style.setProperty("--float-x", `${-24 + Math.random() * 48}px`);
  letterHearts.appendChild(heart);

  window.setTimeout(() => {
    heart.remove();
  }, 9500);
}

function createMemoryHeart() {
  const heart = document.createElement("span");
  heart.className = "memory-float";
  heart.textContent = Math.random() > 0.3 ? "❤" : "💗";
  heart.style.left = `${4 + Math.random() * 92}%`;
  heart.style.animationDuration = `${5 + Math.random() * 3}s`;
  heart.style.animationDelay = `${Math.random() * 0.25}s`;
  heart.style.setProperty("--float-x", `${-34 + Math.random() * 68}px`);
  memoryHearts.appendChild(heart);

  window.setTimeout(() => {
    heart.remove();
  }, 9200);
}

function createSunflowerDrop() {
  const sunflower = document.createElement("span");
  sunflower.className = "sunflower-drop";
  sunflower.textContent = "🌻";
  sunflower.style.left = `${Math.random() * 100}%`;
  sunflower.style.fontSize = `${22 + Math.random() * 30}px`;
  sunflower.style.animationDuration = `${4.6 + Math.random() * 3.2}s`;
  sunflower.style.animationDelay = `${Math.random() * 0.2}s`;
  sunflower.style.setProperty("--drift-x", `${-60 + Math.random() * 120}px`);
  sunflower.style.setProperty("--rotate", `${-120 + Math.random() * 240}deg`);
  sunflowerRain.appendChild(sunflower);

  window.setTimeout(() => {
    sunflower.remove();
  }, 8600);
}

function seedLetterHearts() {
  for (let i = 0; i < 18; i += 1) {
    window.setTimeout(createLetterHeart, i * 220);
  }

  window.setInterval(createLetterHeart, 420);
}

function seedMemoryHearts() {
  for (let i = 0; i < 22; i += 1) {
    window.setTimeout(createMemoryHeart, i * 170);
  }

  window.setInterval(createMemoryHeart, 320);
}

function seedSunflowers() {
  for (let i = 0; i < 30; i += 1) {
    window.setTimeout(createSunflowerDrop, i * 110);
  }

  window.setInterval(createSunflowerDrop, 180);
}

function typeLine(line, text, speed = 55) {
  return new Promise((resolve) => {
    line.classList.add("visible", "typing");
    let charIndex = 0;

    const typer = window.setInterval(() => {
      line.textContent = text.slice(0, charIndex + 1);
      charIndex += 1;

      if (charIndex >= text.length) {
        window.clearInterval(typer);
        line.classList.remove("typing");
        resolve();
      }
    }, speed);
  });
}

async function startTypingSequence() {
  for (const line of typingLines) {
    const text = line.dataset.text || "";
    await typeLine(line, text, 55);
    await new Promise((resolve) => window.setTimeout(resolve, 300));
  }
}

function launchCenterBurst() {
  for (let i = 0; i < 22; i += 1) {
    const heart = document.createElement("span");
    heart.className = "burst-heart";
    heart.textContent = i % 3 === 0 ? "❤" : "♥";
    const angle = Math.random() * Math.PI * 2;
    const distance = 80 + Math.random() * 180;
    heart.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
    heart.style.setProperty("--y", `${Math.sin(angle) * distance}px`);
    heart.style.setProperty("--r", `${-120 + Math.random() * 240}deg`);
    heart.style.animationDelay = `${Math.random() * 0.15}s`;
    centerBurst.appendChild(heart);

    window.setTimeout(() => heart.remove(), 1700);
  }
}

function createConfettiPiece() {
  const confetti = document.createElement("span");
  confetti.className = "confetti";
  confetti.style.left = `${Math.random() * 100}%`;
  confetti.style.background = [
    "#ff6f91",
    "#ffd86f",
    "#ffffff",
    "#ff3f5f",
    "#ffc4d1"
  ][Math.floor(Math.random() * 5)];
  confetti.style.animationDuration = `${4 + Math.random() * 3}s`;
  confetti.style.setProperty("--x", `${-120 + Math.random() * 240}px`);
  confetti.style.transform = `rotate(${Math.random() * 180}deg)`;
  confettiLayer.appendChild(confetti);

  window.setTimeout(() => confetti.remove(), 7500);
}

function setSunTarget(clientX, clientY) {
  const rect = memoryPage.getBoundingClientRect();
  sunTargetX = clientX - rect.left;
  sunTargetY = clientY - rect.top;
}

function animateSunFollower() {
  sunX += (sunTargetX - sunX) * 0.08;
  sunY += (sunTargetY - sunY) * 0.08;
  sunFollower.style.transform = `translate(${sunX - sunFollower.offsetWidth / 2}px, ${sunY - sunFollower.offsetHeight / 2}px)`;
  window.requestAnimationFrame(animateSunFollower);
}

function startFinale() {
  for (let i = 0; i < 45; i += 1) {
    window.setTimeout(createConfettiPiece, i * 120);
  }

  window.setInterval(createConfettiPiece, 420);
  tryAutoplay();
}

async function tryAutoplay() {
  try {
    await loveSong.play();
    musicStatus.textContent = "Playing your romantic song. You can pause or resume it anytime.";
  } catch (error) {
    musicStatus.textContent = "Tap play to start your song. Some browsers block autoplay until a user interaction.";
  }
}

function setPhotoFallback() {
  const placeholderSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#ffe3ec"/>
          <stop offset="100%" stop-color="#fff6df"/>
        </linearGradient>
      </defs>
      <rect width="600" height="800" rx="40" fill="url(#bg)"/>
      <g fill="none" stroke="#ff8bae" stroke-width="10" opacity="0.55">
        <path d="M210 218c0-34 28-62 62-62 20 0 38 10 50 25 12-15 30-25 50-25 34 0 62 28 62 62 0 79-112 151-112 151S210 297 210 218Z" fill="#ffd8e5" stroke="#ff88aa"/>
      </g>
      <text x="300" y="470" text-anchor="middle" fill="#9d1f46" font-size="40" font-family="Georgia, serif">Add Ani's Photo Here</text>
    </svg>`;
  memoryPhoto.src = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(placeholderSvg)}`;
}

heartButton.addEventListener("click", () => {
  heartButton.classList.add("clicked");
  launchCenterBurst();
  window.setTimeout(nextPage, 900);
}, { once: true });

toLovePage.addEventListener("click", nextPage);
toMemoryPage.addEventListener("click", nextPage);

memoryPage.addEventListener("pointermove", (event) => {
  setSunTarget(event.clientX, event.clientY);
});

memoryPage.addEventListener("pointerdown", (event) => {
  setSunTarget(event.clientX, event.clientY);
});

memoryPage.addEventListener("touchmove", (event) => {
  const touch = event.touches[0];
  if (touch) {
    setSunTarget(touch.clientX, touch.clientY);
  }
}, { passive: true });

memoryPhoto.addEventListener("error", setPhotoFallback, { once: true });
loveSong.addEventListener("error", () => {
  musicStatus.textContent = "Make sure your music file is correctly placed.";
}, { once: true });

seedHearts();
seedLetterHearts();
seedMemoryHearts();
seedSunflowers();
animateSunFollower();

