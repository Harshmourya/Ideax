const theme = document.getElementById('theme');
const output = document.getElementById('output');
const textCopy = document.getElementById('copy');
const generate = document.getElementById('generate');

generate.addEventListener("click", generateContent);
theme.addEventListener('click', turntheme);
textCopy.addEventListener('click',copyTextToClipboard);

// It is use to take all necessary values from frontend
async function generateContent() {
    const optionValue = document.getElementById('dropdown').value;
    const type = document.getElementById('types').value;
    main(promptMesaaage, optionValue, type);
}

// It is used for to generate output from gemini api
async function main(prompt, level, type) {
    console.log('Enter in main fuction');
    const apiKey = "Enter-Your-Gemini-ApiKey";
    url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    role: "user",
                    parts: [{ text: `${prompt} and the level is ${level} and  type is ${type}` }]
                }]
            })
        });
        // get resonse and parse it 
        const data = await response.json();

        // Getting Output of prompt from fetch 
        const promptAns = data?.candidates[0].content.parts[0].text;

        // output.style.color = 'black'
        output.innerText = `${promptAns}`;
        console.log(data?.candidates[0].content.parts[0].text);

    } catch (e) {
        console.log(`Error during gemini api is ${e}`);
    }
}


// this function is for turn off dark theme or turn on dark theme
function turntheme() {
    const body = document.body;
    const bulb = body.classList.contains('dark-mode');
    if (bulb) {
        body.classList.remove('dark-mode');
        textCopy.style.filter = "invert(100%)";

    } else {
        body.classList.add('dark-mode');
        textCopy.style.filter = "invert(0%)";

    }
}

// This Function is for copy Text from page and store it to some where
function copyTextToClipboard() {
    // Copy text with proper formate to clipboard
    navigator.clipboard.writeText(output.innerText);
    console.log(output.innerText);
    
}
// Generates a project description for a random company, customized by project type and detail level.
const promptMesaaage = `Create a description for a project related to a randomly generated company. Adjust the description based on the specified input:

Project Types:

Website:Define the website's objective, including the required pages (such as homepage, about page, product page, contact page, etc and features (like product catalog, user registration, search functionality). The design should reflect the company's core values (for example, reliability, creativity)
Logo: Generate a description for designing a logo, including aspects like typography, iconography, and color schemes.
Billboard: Generate a description for designing a billboard or large-format advertisement, focusing on layout, visual hierarchy, and bold design.
Illustrations: Generate a description for creating illustrations, including style, use cases (e.g., product illustrations, character designs), and color schemes.
Detail Levels:

Easy: Provide a short and simple description with minimal details.
Middle: Provide a moderately detailed description with key elements and design preferences.
Employee:Deliver a professional yet simple description, focusing on clear actionable details and how the design reflects the company’s purpose. Avoid overly technical jargon or excessive complexity.
Requirements: • Company Name: Generate a unique and random name for the company.
• Company Description: Briefly describe the company’s purpose, main products/services, target audience, and core values (e.g., trust, innovation, creativity).
• Job Description: Define what needs to be done, including the key elements and features of the project based on the selected type and detail level.
• Design Preferences: Specify design style (e.g., minimalist, vibrant, professional) and brand colors, if applicable. Include any unique aesthetic requirements (e.g., logo design for elegance, website with modern touch).
• Deadline: Set a realistic timeline for completion, adjusting based on the complexity of the task.

Output: The output should be tailored to the selected project type and detail level. For example:

Easy: Use short, simple sentences with minimal details for the selected task.
Middle: Provide moderate detail, explaining key features or design elements needed.
Employee: Include advanced insights and a detailed breakdown of the project, including how the design aligns with the company’s values and mission.
Ensure that each time the prompt is run, a new random company name, product offering, design preferences, and deadline are generated without using symbols like asterisks or hash marks. Instead, use • for better readability.
`;


