const newsletterForm = document.getElementById("newsletter-form");
const emailInput = document.getElementById("email-input");

const handleSubmitMsg = (e) => {
  e.preventDefault();

  if (emailInput.value) {
    console.log("Thanks for subscribing!");
  } else {
    console.log("Nope");
  }
};

newsletterForm.addEventListener("submit", handleSubmitMsg);
