const pillContainer = document.getElementById("modalPillContainer");
const textInput = document.getElementById("pillCreator");

Array.from(document.querySelectorAll(".pill")).map((pill) => {
  pill.addEventListener("click", () => { pill.remove() })
})

// Function to create a pill element with the provided text
function createPill(text) {
  const pill = document.createElement("div");
	// Add event listener to remove the pill when clicked
  pill.addEventListener("click", () => {
    pill.remove();
  });
  pill.classList.add("pill", "pillx");
  pill.textContent = text;

  return pill;
}

// Event listener for key press in the input
textInput.addEventListener("keydown", (event) => {
  const key = event.key;

  // If space is pressed, create a pill with the current input value
  if (key === " ") {
    event.preventDefault(); // Prevent default space behavior (scrolling)
    
    const text = textInput.value.trim();
    if (text) {
      const pill = createPill(text);
      pillContainer.appendChild(pill);
    	//pillContainer.prepend(pill);
      textInput.value = ""; // Clear the input after creating pill
    }
  }

  // If backspace is pressed and input is empty, remove the last pill
  if (key === "Backspace" && textInput.value === "" && pillContainer.lastChild) {
    pillContainer.removeChild(pillContainer.lastChild);
  }
});
