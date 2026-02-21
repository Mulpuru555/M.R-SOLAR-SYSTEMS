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

const counters = document.querySelectorAll('.count');
counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 100;
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 20);
        } else {
            counter.innerText = target;
        }
    };
    updateCount();
});
