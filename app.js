// Listen for submit

document
  .getElementById('loan-form')
  .addEventListener('submit', calculateResults);

// Calculate Results
function calculateResults(e) {
  // UI Vars
  const UIamount = document.getElementById('amount');
  const UIinterest = document.getElementById('interest');
  const UIyears = document.getElementById('years');
  const UImonthlyPayment = document.getElementById('monthly-payment');
  const UItotalPayment = document.getElementById('total-payment');
  const UItotalInterest = document.getElementById('total-interest');

  const principle = parseFloat(UIamount.value);
  const calculatedInterest = parseFloat(UIinterest.value) / 100 / 12;
  const calculatedPayments = parseFloat(UIyears.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principle * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    UImonthlyPayment.value = monthly.toFixed(2);
    UItotalPayment.value = (monthly * calculatedPayments).toFixed(2);
    UItotalInterest.value = (monthly * calculatedPayments - principle).toFixed(
      2
    );
  } else {
    showError('Please check your numbers');
  }

  // Because this is a form submit, we want to
  // prevent a default behavior
  e.preventDefault();
}

// Show Error
function showError(error) {
  const errorDiv = document.createElement('div');

  // Get elemets(to add div error above them)
  // we need div with class='card' and we need
  // h1 becuase we want to show an error above of it
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add class
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear Error
function clearError() {
  document.querySelector('.alert').remove();
}
