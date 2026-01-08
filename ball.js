document.documentElement.classList.replace("no-js", "js");

document.addEventListener("click", (e) => {
    const ball = document.createElement("div");
    ball.classList.add("ball");
    document.body.appendChild(ball);
    let x = e.clientX - 12.5;
    let y = e.clientY - 12.5;
    ball.style.left = `${x}px`;
    ball.style.top = `${y}px`;
    const randomSpeed = () => {
        const sign = Math.random() < 0.5 ? -1 : 1; // negative oder positive Range
        const min = 0.5;
        const max = 0.8;
        return sign * (min + Math.random() * (max - min));
    }

    const speedDistribution = Math.random()
    let xSpeed = speedDistribution * 30 * randomSpeed();
    let ySpeed = (1 - speedDistribution) * 30 * randomSpeed();

    console.log(ySpeed, xSpeed)
    const randomSign = Math.random() < 0.5 ? -1 : 1;
    let zSpeed = 1.0;

    const accelerationX = 1.02;
    const accelerationY = 1.02;
    const accelerationZ = 0.01 * randomSign;
    function animate() {
        xSpeed *= accelerationX;
        ySpeed *= accelerationY;
        zSpeed += accelerationZ;
        x += xSpeed;
        y += ySpeed;


        ball.style.transform = `translate(${x - e.clientX + 12.5}px, ${y - e.clientY + 12.5}px) scale(${zSpeed})`;

        const rect = ball.getBoundingClientRect();
        if (rect.top > window.innerHeight || rect.bottom < 0 || rect.left > window.innerWidth || rect.right < 0) {
            ball.remove();
        } else {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
});


const cursorBall = document.createElement("div");
const isTouchDevice =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
    cursorBall.classList.add("ball");
    document.body.appendChild(cursorBall);
    document.addEventListener("mousemove", (e) => {
        cursorBall.style.left = `${e.clientX}px`;
        cursorBall.style.top = `${e.clientY}px`;
    });
}

const interactiveSelectors = "a, button, input, textarea, select, label";
if (!isTouchDevice) {
    document.addEventListener("mouseover", (e) => {
        if (e.target.closest(interactiveSelectors)) {
            cursorBall.classList.add("cursor-racket");
        }
    });

    document.addEventListener("mouseout", (e) => {
        if (e.target.closest(interactiveSelectors)) {
            cursorBall.classList.remove("cursor-racket");
        }
    });
}

document.addEventListener("mousedown", () => {
    cursorBall.style.transform = `translate(-50%, -50%) scale(1.2)`;
    cursorBall.style.opacity = `80%`;
    if (cursorBall.classList.contains("cursor-racket")) {
        cursorBall.style.transform = "rotateX(-60deg) rotateY(10deg)";;
        console.log("rotete")
    }

});
document.addEventListener("mouseup", () => {
    cursorBall.style.transform = `translate(-50%, -50%) scale(1)`;
    cursorBall.style.opacity = `100%`;



});


document.addEventListener("DOMContentLoaded", () => {
    const heroBg = document.querySelector(".hero-bg"); // dein div hat keine ID

    if (!heroBg) return; // Sicherheit

    document.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30; // max ±10px
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        heroBg.style.transform = `scale(1.1) translate(${x}px, ${y}px)`;
    });
});