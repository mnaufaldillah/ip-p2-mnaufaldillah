const { GoogleGenerativeAI } = require("@google/generative-ai");

const predictionGemini = async () => {
    // Access your API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const prompt = "Write a story about an AI and magic"
      
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    console.log(text);
}

module.exports;