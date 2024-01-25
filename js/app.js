const keys = [
  [
    ["1", "!"],
    ["2", "@"],
    ["3", "#"],
    ["4", "$"],
    ["5", "%"],
    ["6", "&"],
    ["7", "/"],
    ["8", "("],
    ["9", ")"],
    ["0", "="],
    ["'", "¿"],
    ["?", "¡"],
  ], // First row of the keyboard 
  [
    ["q", "Q"],
    ["w", "W"],
    ["e", "E"],
    ["r", "R"],
    ["t", "T"],
    ["y", "Y"],
    ["u", "U"],
    ["i", "I"],
    ["o", "O"],
    ["p", "P"],
    ["´", "¨"],
    ["+", "*"],
  ], // Second row of the keyboard
  [
    ["Mayus", "MAYUS"],
    ["a", "A"],
    ["s", "S"],
    ["d", "D"],
    ["f", "F"],
    ["g", "G"],
    ["h", "H"],
    ["j", "J"],
    ["k", "K"],
    ["l", "L"],
    ["ñ", "Ñ"],
    ["{", "["],
    ["}", "]"],
  ], // Third row of the keyboard
  [
    ["Shift", "SHIFT"],
    ["<", ">"],
    ["z", "Z"],
    ["x", "X"],
    ["c", "C"],
    ["v", "V"],
    ["b", "B"],
    ["n", "N"],
    ["m", "M"],
    [",", ";"],
    [".", ":"],
    ["-", "_"],
  ], // Fourth row of the keyboard
  [
    ["Space", "SPACE"]
  ], // last row of the keyboard
];

let mayus = false;
let shift = false;
let current = false;

renderKeyboard();

// Function to draw the keyboard on screen
function renderKeyboard() {
  const keyboardContainer = document.querySelector('#keyboardContainer');
  let empty = `<div class="key-empty"></div>`;

  const layers = keys.map((layer) => {
    return layer.map((key) => {
      // Show keys depending on the special key pressed
      if (key[0] === "Shift") {
        return `<button class="key key-shift ${shift ? "activated" : ""}">${key[0]}</button>`;
      }
      if (key[0] === "Mayus") {
        return `<button class="key key-mayus ${mayus ? "activated" : ""}">${key[0]}</button>`;
      }
      if (key[0] === "Space") {
          return `<button class="key key-space"></button>`;
      }
      return `
      <button class="key key-normal">
          ${
              shift ? key[1]
              : mayus &&
              key[0].toLowerCase().charCodeAt(0) >= 97 &&
              key[0].toLowerCase().charCodeAt(0) <= 122
              ? key[1]
              : key[0]
          }
      </button>
      `;
    })
  });

  // Empty space is added to the beginning and end of rows
  layers[0].push(empty);
  layers[1].push(empty);

  const htmlLayers = layers.map((layer) => {
    return layer.join("");
  });

  keyboardContainer.innerHTML = "";

  htmlLayers.forEach((layer) => {
    keyboardContainer.innerHTML += `<div class="layer">${layer}</div>`;
  });

  document.querySelectorAll(".key").forEach((key) => {
    key.addEventListener("click", (e) => {
      if (current) {
        if (key.textContent === "Shift") {
          shift = !shift;
        } else if (key.textContent === "Mayus") {
          mayus = !mayus;
        } else if (key.textContent === "") {
          current.value += " ";
        } else {
          current.value += key.textContent.trim();
          if (shift) {
            shift = false;
          }
        }
        renderKeyboard();
        current.focus();
      }
    });
  });
}

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("focusin", (e) => {
    current = e.target;
  });
});