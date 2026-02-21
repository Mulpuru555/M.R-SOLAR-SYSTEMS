// ================= EMI CALCULATOR =================

let emiChart;

function calculateEMI() {

    let P = parseFloat(document.getElementById("loanAmount").value);
    let annualRate = parseFloat(document.getElementById("interestRate").value);
    let years = parseFloat(document.getElementById("loanTenure").value);

    if (!P || !annualRate || !years) {
        document.getElementById("emiResult").innerText = "Please fill all fields.";
        return;
    }

    let R = annualRate / 12 / 100;
    let N = years * 12;

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


// ================= PAYBACK CALCULATOR =================

function calculatePayback() {

    let cost = parseFloat(document.getElementById("systemCost").value);
    let before = parseFloat(document.getElementById("beforeBill").value);
    let after = parseFloat(document.getElementById("afterBill").value);

    if (!cost || !before || !after) {
        document.getElementById("paybackResult").innerText = "Please fill all fields.";
        return;
    }

    let monthlySavings = before - after;

    if (monthlySavings <= 0) {
        document.getElementById("paybackResult").innerText =
            "Monthly savings must be greater than zero.";
        return;
    }

    let annualSavings = monthlySavings * 12;
    let payback = (cost / annualSavings).toFixed(1);

    document.getElementById("paybackResult").innerText =
        "Annual Savings: ₹" + annualSavings.toFixed(0) +
        " | Payback Period: " + payback + " Years";
}


// ================= WHATSAPP SERVICE REQUEST =================

function sendWhatsApp() {

    let name = document.getElementById("name").value;
    let mobile = document.getElementById("mobile").value;
    let location = document.getElementById("locationInput").value;
    let type = document.getElementById("serviceType").value;

    if (!name || !mobile || !location) {
        alert("Please fill all fields.");
        return;
    }

    let message = `Service Request:%0A
Name: ${name}%0A
Mobile: ${mobile}%0A
Location: ${location}%0A
Type: ${type}`;

    let whatsappURL = `https://wa.me/919154777773?text=${message}`;

    window.open(whatsappURL, "_blank");
}
