document.addEventListener("click", (e) => {
    const ball = document.createElement("div");
    ball.classList.add("ball");
    document.body.appendChild(ball);
    let x = e.clientX - 12.5;
    let y = e.clientY - 12.5;
    ball.style.left = `${x}px`;
    ball.style.top = `${y}px`;

    let xSpeed = (Math.random() - 0.5) * 25; // horizontal speed
    let ySpeed = (Math.random() - 0.5) * 25; // vertical speed
    const spinSpeed = (Math.random() - 0.3) * 80; // degrees per frame

    const accelerationX = 1.011; // speed multiplier per frame
    const accelerationY = 1.029; // speed multiplier per frame

    function animate() {
        xSpeed *= accelerationX;
        ySpeed *= accelerationY;

        x += xSpeed;
        y += ySpeed;

        const rotate = spinSpeed * 6;

        ball.style.transform = `translate(${x - e.clientX + 12.5}px, ${y - e.clientY + 12.5}px) rotate(${rotate}deg)`;

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
            isHoveringInteractive = true;
            cursorBall.classList.add("cursor-racket");
        }
    });

    document.addEventListener("mouseout", (e) => {
        if (e.target.closest(interactiveSelectors)) {
            isHoveringInteractive = false;
            cursorBall.classList.remove("cursor-racket");
        }
    });
}

document.addEventListener("mousedown", () => {
    cursorBall.style.transform = `translate(-50%, -50%) scale(${isHoveringInteractive ? 1.2 : 1.5})`;
});
document.addEventListener("mouseup", () => {
    cursorBall.style.transform = `translate(-50%, -50%) scale(1)`;
});


