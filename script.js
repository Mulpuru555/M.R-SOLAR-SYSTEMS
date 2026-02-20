function calculateEMI() {
    let P = document.getElementById("loan").value;
    let r = document.getElementById("interest").value / 100 / 12;
    let n = document.getElementById("years").value * 12;

    let EMI = (P * r * Math.pow(1 + r, n)) /
              (Math.pow(1 + r, n) - 1);

    document.getElementById("emi-result").innerHTML =
        "Monthly EMI: ₹" + EMI.toFixed(2);
}
