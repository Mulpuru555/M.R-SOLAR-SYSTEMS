const canvas = document.getElementById("energyCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for (let i = 0; i < 60; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,183,3,0.5)";
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(animate);
}
animate();

function calculateEMI() {
    let P = parseFloat(document.getElementById("loanAmount").value);
    let rate = parseFloat(document.getElementById("interestRate").value);
    let years = parseFloat(document.getElementById("loanTenure").value);
    if (!P || !rate || !years) return;
    let R = rate / 12 / 100;
    let N = years * 12;
    let EMI = (P * R * Math.pow(1 + R, N)) /
              (Math.pow(1 + R, N) - 1);
    document.getElementById("emiResult").innerText =
        "Monthly EMI: ₹ " + EMI.toFixed(2);
}

function calculateSavings() {
    let bill = parseFloat(document.getElementById("monthlyBill").value);
    if (!bill) return;
    let savings = bill * 12 * 25;
    document.getElementById("savingsResult").innerText =
        "Estimated 25-Year Savings: ₹ " + savings.toFixed(2);
}
