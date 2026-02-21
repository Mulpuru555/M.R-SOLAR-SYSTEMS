/* ================= EMI CALCULATOR + PIE CHART ================= */

let emiChart;

function calculateEMI() {
    let P = parseFloat(document.getElementById("loanAmount").value);
    let R = parseFloat(document.getElementById("interestRate").value) / 12 / 100;
    let N = parseFloat(document.getElementById("loanTenure").value) * 12;

    if (!P || !R || !N) {
        document.getElementById("emiResult").innerText = "Please fill all fields.";
        return;
    }

    let EMI = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    let totalPayment = EMI * N;
    let totalInterest = totalPayment - P;

    document.getElementById("emiResult").innerText =
        "Monthly EMI: ₹" + EMI.toFixed(0);

    let ctx = document.getElementById("emiChart");

    if (emiChart) {
        emiChart.destroy();
    }

    emiChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Principal', 'Interest'],
            datasets: [{
                data: [P, totalInterest],
                backgroundColor: ['#0b1c2d', '#ff9800']
            }]
        }
    });
}


/* ================= SOLAR SAVINGS ================= */

function calculateSavings() {
    let bill = parseFloat(document.getElementById("monthlyBill").value);

    if (!bill) {
        document.getElementById("savingsResult").innerText = "Enter bill amount.";
        return;
    }

    let newBill = bill * 0.1;
    let savings = bill - newBill;

    document.getElementById("savingsResult").innerText =
        "Estimated Monthly Savings: ₹" + savings.toFixed(0);
}


/* ================= PAYBACK CALCULATOR ================= */

function calculatePayback() {
    let cost = parseFloat(document.getElementById("systemCost").value);
    let before = parseFloat(document.getElementById("beforeBill").value);
    let after = parseFloat(document.getElementById("afterBill").value);

    if (!cost || !before || !after) {
        document.getElementById("paybackResult").innerText = "Fill all fields.";
        return;
    }

    let monthlySavings = before - after;
    let annualSavings = monthlySavings * 12;
    let payback = (cost / annualSavings).toFixed(1);

    document.getElementById("paybackResult").innerText =
        "Annual Savings: ₹" + annualSavings.toFixed(0) +
        " | Payback Period: " + payback + " Years";
}


/* ================= COUNT ANIMATION ================= */

function animateCounters() {
    const counters = document.querySelectorAll('.count');

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const speed = 200;
        const increment = target / speed;

        let count = 0;

        const updateCount = () => {
            if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });
}

animateCounters();
