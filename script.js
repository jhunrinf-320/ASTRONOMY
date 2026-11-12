
// ==========================================
// 1. INTRO SCREEN
// ==========================================

const intro = document.getElementById("intro");

document.getElementById("enterBtn").addEventListener("click", () => {
  intro.classList.add("hidden");
});


// ==========================================
// 2. MOBILE NAVIGATION
// ==========================================

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

menuButton.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});


// ==========================================
// 3. SCROLL PROGRESS
// ==========================================

window.addEventListener("scroll", () => {
  const total =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress = total > 0
    ? (window.scrollY / total) * 100
    : 0;

  document.getElementById("progress").style.width =
    progress + "%";
}, { passive: true });


// ==========================================
// 4. ANIMATED STARFIELD
// ==========================================

const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let stars = [];
let canvasWidth = 0;
let canvasHeight = 0;

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);

  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;

  canvas.width = canvasWidth * ratio;
  canvas.height = canvasHeight * ratio;

  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  stars = Array.from({ length: 180 }, () => ({
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    radius: Math.random() * 1.4 + .2,
    alpha: Math.random() * .8 + .2,
    speed: Math.random() * .006 + .001
  }));
}

function drawStars() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  stars.forEach(star => {
    star.alpha += star.speed;

    if (star.alpha > 1 || star.alpha < .2) {
      star.speed *= -1;
    }

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

    ctx.fillStyle =
      `rgba(230,230,255,${star.alpha})`;

    ctx.fill();
  });

  requestAnimationFrame(drawStars);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
drawStars();


// ==========================================
// 5. PLANET EXPLORER
// ==========================================

const planetFacts = {
  Mercury:
    "Mercury is the smallest planet and the closest to the Sun. A year there lasts only 88 Earth days.",

  Venus:
    "Venus is the hottest planet in our solar system. Its thick atmosphere traps heat in an intense greenhouse effect.",

  Earth:
    "Earth is the only world we currently know to support life. Its oceans cover about 71% of its surface.",

  Mars:
    "Mars is a cold desert world with giant volcanoes and ancient river valleys. Scientists are searching for signs of past life.",

  Jupiter:
    "Jupiter is the largest planet. Its Great Red Spot is a gigantic storm that has been observed for centuries.",

  Saturn:
    "Saturn's beautiful rings are made mostly of countless pieces of ice and rock.",

  Uranus:
    "Uranus rotates almost on its side, making its seasons very unusual. It is an ice giant with a blue-green color.",

  Neptune:
    "Neptune is a distant ice giant with incredibly powerful winds. It takes about 165 Earth years to orbit the Sun."
};

document.querySelectorAll(".planet-card").forEach(card => {
  card.addEventListener("click", () => {

    document.querySelectorAll(".planet-card").forEach(item => {
      item.classList.remove("active");
    });

    card.classList.add("active");

    const name = card.dataset.planet;

    document.getElementById("planetTitle").textContent = name;

    document.getElementById("planetDescription").textContent =
      planetFacts[name];

  });
});


// ==========================================
// 6. CONSTELLATION EXPLORER
// ==========================================

const constellations = {

  "Orion": {
    description:
      "Orion is one of the most recognizable constellations. Its three aligned belt stars make it easy to spot.",

    points: [
      [100,75], [165,110], [220,70],
      [185,190], [260,220], [300,140]
    ],

    lines: [
      [0,1], [1,2], [1,3], [3,4], [4,5]
    ]
  },

  "Ursa Major": {
    description:
      "Ursa Major means Great Bear. Its seven-star Big Dipper pattern has helped people find directions in the night sky.",

    points: [
      [80,90], [140,65], [205,75],
      [265,115], [300,185], [225,205], [155,175]
    ],

    lines: [
      [0,1], [1,2], [2,3], [3,4],
      [4,5], [5,6], [6,0]
    ]
  },

  "Cassiopeia": {
    description:
      "Cassiopeia is known for its distinctive W shape. It is named after a queen in Greek mythology.",

    points: [
      [65,115], [130,195], [200,90],
      [270,190], [335,105]
    ],

    lines: [
      [0,1], [1,2], [2,3], [3,4]
    ]
  },

  "Your Star": {
    description:
      "This little star pattern is dedicated to you. Like the stars above, may you always find your own way to shine.",

    points: [
      [95,150], [145,75], [200,150],
      [255,75], [310,150], [200,225]
    ],

    lines: [
      [0,1], [1,2], [2,3],
      [3,4], [4,5], [5,0], [1,3]
    ]
  }

};

function drawConstellation(name) {
  const data = constellations[name];

  const lines = document.getElementById("starLines");
  const points = document.getElementById("starPoints");

  lines.innerHTML = "";
  points.innerHTML = "";

  data.lines.forEach(([a, b]) => {

    const line = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );

    line.setAttribute("x1", data.points[a][0]);
    line.setAttribute("y1", data.points[a][1]);
    line.setAttribute("x2", data.points[b][0]);
    line.setAttribute("y2", data.points[b][1]);
    line.setAttribute("class", "star-line");

    lines.appendChild(line);
  });

  data.points.forEach(([x, y], index) => {

    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );

    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", index % 2 === 0 ? 6 : 4);
    circle.setAttribute("class", "star-point");

    points.appendChild(circle);
  });

  document.getElementById("constellationInfo").textContent =
    data.description;
}

document.querySelectorAll(".constellation-option").forEach(button => {

  button.addEventListener("click", () => {

    document.querySelectorAll(".constellation-option").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    drawConstellation(button.dataset.constellation);

  });

});


// ==========================================
// 7. MOON PHASE EXPLORER
// ==========================================

const phases = [
  [
    "New Moon",
    "The Moon's illuminated side faces away from Earth."
  ],
  [
    "Waxing Crescent",
    "A small illuminated crescent becomes visible."
  ],
  [
    "First Quarter",
    "Half of the Moon's visible face is illuminated."
  ],
  [
    "Waxing Gibbous",
    "More than half is illuminated as the Full Moon approaches."
  ],
  [
    "Full Moon",
    "The entire visible face of the Moon is illuminated."
  ],
  [
    "Waning Gibbous",
    "The illuminated portion begins to decrease."
  ],
  [
    "Last Quarter",
    "Half of the visible face is illuminated again."
  ],
  [
    "Waning Crescent",
    "A thin crescent remains before the next New Moon."
  ]
];

const moonSlider = document.getElementById("moonSlider");
const moonShadow = document.getElementById("moonShadow");

function updateMoon() {
  const phase = Number(moonSlider.value);

  document.getElementById("moonName").textContent =
    phases[phase][0];

  document.getElementById("moonDescription").textContent =
    phases[phase][1];

  const offsets = [
    0,
    -85,
    -50,
    -15,
    100,
    15,
    50,
    85
  ];

  moonShadow.style.transform =
    `translateX(${offsets[phase]}%)`;
}

moonSlider.addEventListener("input", updateMoon);
updateMoon();


// ==========================================
// 8. SHOOTING STAR WISH
// ==========================================

const wishes = [
  "May your dreams always find their way to the stars. ✨",
  "May you always have a reason to look forward to tomorrow. 🌙",
  "Never stop being curious about the universe and everything in it. ✦",
  "May your brightest days be still ahead of you. 💫",
  "May every new adventure bring you something beautiful. 🌌"
];

document.getElementById("wishBtn").addEventListener("click", () => {

  const star = document.createElement("div");

  star.className = "shooting-star";

  document.body.appendChild(star);

  setTimeout(() => {
    star.remove();
  }, 1400);

  const randomWish =
    wishes[Math.floor(Math.random() * wishes.length)];

  document.getElementById("wishResult").textContent =
    randomWish;

});


// ==========================================
// 9. SECRET MESSAGE
// ==========================================

let secretClicks = 0;

document.getElementById("secretStar").addEventListener("click", () => {

  secretClicks++;

  if (secretClicks >= 3) {

    document.getElementById("secretMessage")
      .classList.add("show");

    secretClicks = 0;

  }

});


// ==========================================
// 10. SCROLL REVEAL ANIMATIONS
// ==========================================

const observer = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      entry.target.classList.add("visible");

      observer.unobserve(entry.target);

    }

  });

}, {
  threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(element => {
  observer.observe(element);
});


// ==========================================
// 11. FINAL SURPRISE
// ==========================================

const finalSection = document.getElementById("ending");

const finalSurprise =
  document.getElementById("finalSurprise");

const surpriseContent =
  document.getElementById("surpriseContent");

const surpriseReveal =
  document.getElementById("surpriseReveal");

let surpriseOpened = false;

function openSurprise() {
  if (surpriseOpened) return;

  surpriseOpened = true;

  finalSurprise.classList.add("active");
  document.body.classList.add("no-scroll");
}

function closeSurprise() {
  finalSurprise.classList.remove("active");
  document.body.classList.remove("no-scroll");
}

const endingObserver = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if (entry.isIntersecting && !surpriseOpened) {

      endingObserver.unobserve(finalSection);

      setTimeout(() => {
        openSurprise();
      }, 1800);

    }

  });

}, {
  threshold: 0.5
});

endingObserver.observe(finalSection);


// Reveal the final message.

document.getElementById("revealSurprise")
  .addEventListener("click", () => {

    surpriseContent.style.display = "none";

    surpriseReveal.classList.add("show");

  });


// Return to the website.

document.getElementById("skipSurprise")
  .addEventListener("click", () => {

    closeSurprise();

  });


// Replay the universe from the beginning.

document.getElementById("replaySurprise")
  .addEventListener("click", () => {

    closeSurprise();

    surpriseContent.style.display = "block";

    surpriseReveal.classList.remove("show");

    surpriseOpened = false;

    endingObserver.observe(finalSection);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });
