document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("salaryForm");
  const salaryInput = document.getElementById("salaryInput");

  removeError(salaryInput);

  if (form) {
    form.addEventListener("submit", (event) => {
      console.log("Form submitted");

      // Define validation rules
      const rules = [
        { check: isNotEmpty, message: "Input cannot be empty" },
        { check: isNotLetter, message: "Input cannot contain letters" },
        { check: isNumber, message: "Please enter a valid number" },
        { check: isPositiveNumber, message: "Input must be a positive number" },
      ];

      const isValid = validateInput(salaryInput, rules);

      if (!isValid) {
        console.log("Form is invalid");
        event.preventDefault();
      } 
    });
  }
});

// Validate if the input is a number
function isNumber(value) {
  return !isNaN(value) && !isNaN(parseFloat(value));
}
function isNotLetter(value) {
  return !/^[a-zA-Z]+$/.test(value);
}
function isPositiveNumber(value) {
  return parseFloat(value) > 0;
}

// Validate if the input is not empty
function isNotEmpty(value) {
  return value.trim() !== "";
}

// Show error message with custom message
function showError(input, message) {
  removeError(input);
  const errorDiv = document.createElement("div");
  input.classList.add("is-invalid");
  errorDiv.className = "invalid-tooltip";
  errorDiv.innerText = message;
  input.parentNode.appendChild(errorDiv);
  setTimeout(() => {
    errorDiv.remove();
    input.classList.remove("is-invalid");
  }, 3000);
}

// Remove error message
function removeError(input) {
  const errorDiv = input.parentNode.querySelector(".error");
  if (errorDiv) {
    errorDiv.remove();
  }
}

// Validate input with rules
function validateInput(input, rules) {
  for (const rule of rules) {
    if (!rule.check(input.value)) {
      showError(input, rule.message);
      return false;
    }
  }
  removeError(input);
  return true;
}
