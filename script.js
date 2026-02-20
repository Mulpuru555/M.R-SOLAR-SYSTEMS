// EMI
function calculateEMI() {
    let cost = parseFloat(document.getElementById("systemCost").value);
    let subsidy = parseFloat(document.getElementById("subsidyAmount").value);
    let rate = parseFloat(document.getElementById("interestRate").value);
    let years = parseFloat(document.getElementById("loanTenure").value);

    let loanAmount = cost - subsidy;
    let R = rate / 12 / 100;
    let N = years * 12;

    let EMI = (loanAmount * R * Math.pow(1 + R, N)) /
              (Math.pow(1 + R, N) - 1);

    if (EMI) {
        document.getElementById("emiResult").innerHTML =
        "Loan After Subsidy: ₹ " + loanAmount.toFixed(2) +
        "<br>Monthly EMI: ₹ " + EMI.toFixed(2);
    }
}

// Savings
function calculateSavings() {
    let bill = parseFloat(document.getElementById("monthlyBill").value);
    if (bill) {
        let savings = bill * 12 * 25;
        document.getElementById("savingsResult").innerText =
        "Estimated 25-Year Savings: ₹ " + savings.toFixed(2);
    }
}

// Counter Animation
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

// Scroll Reveal
function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add("active");
        }
    });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
