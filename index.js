const theme = document.getElementById("theme");
const output = document.getElementById("output");
const textCopy = document.getElementById("copy");
const generate = document.getElementById("generate");
const dropdownMenu = document.getElementById("dropdown");

generate.addEventListener("click", generateContent);
theme.addEventListener("click", turntheme);
textCopy.addEventListener("click", copyTextToClipboard);
dropdownMenu.addEventListener("change", (dets) => updateTypes(dets));

// It is use to take all necessary values from frontend
function generateContent() {
  const role = document.getElementById("dropdown").value;
  const type = document.getElementById("types").value;
  const difficulty = document.getElementById("difficulty").value;
  if (role !== "role" && type !== "selector") main(difficulty, role, type);
}

// It is used for to generate output from gemini api
async function main(difficulty, role, type) {
  const apiKey = "AIzaSyBU4AcZZHKrj9mzh7Db1HDRF12TadHyWHo";
  url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Generate a random ${type} project description for ${role} which has a ${difficulty} difficulty. The project description should contain the following points: 
                1. Company name and industry
                2. Project name
                3. Project description
                5. Project duration

                Make sure that the company name and industry are always different.
                `,
              },
            ],
          },
        ],
      }),
    });
    // get resonse and parse it
    const data = await response.json();

    // Getting Output of prompt from fetch
    const promptAns = data?.candidates[0].content.parts[0].text;

    // output.style.color = 'black'
    output.innerText = `${promptAns}`;
  } catch (e) {
    console.log(`Error connecting to gemini ${e}`);
  }
}

// this function is for turn off dark theme or turn on dark theme
function turntheme() {
  const body = document.body;
  const bulb = body.classList.contains("dark-mode");
  if (bulb) {
    body.classList.remove("dark-mode");
    textCopy.style.filter = "invert(100%)";
  } else {
    body.classList.add("dark-mode");
    textCopy.style.filter = "invert(0%)";
  }
}

// This Function is for copy Text from page and store it to some where
function copyTextToClipboard() {
  // Copy text with proper formate to clipboard
  navigator.clipboard.writeText(output.innerText);
}

// Update the types based on dropdown selection
function updateTypes(dets) {
  var types = [
    `<option value="selector" class="options" selected>Select one option</option>`,

    `<option value="selector" class="options" selected>Select one option</option>
                    <option class="options" value="logo">Logo</option>
                    <option class="options" value="poster">Poster</option>
                    <option class="options" value="billboard">Billboard</option>
                    <option class="options" value="illustrations">Illustrations</option>
                    <option class="options" value="brand identity">Brand Identity</option>`,

    `<option value="selector" class="options" selected>Select one option</option>
                    <option class="options" value="web developer">Web Developer</option>
                    <option class="options" value="AiMl">AIML</option>
                    <option class="options" value="android developer">Android Developer</option>
                    <option class="options" value="software developer">Software Developer</option>`,
  ];

  document.getElementById("types").innerHTML =
    types[dropdownMenu.selectedIndex];
}
