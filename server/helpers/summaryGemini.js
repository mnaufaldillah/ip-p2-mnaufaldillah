const { GoogleGenerativeAI } = require("@google/generative-ai");

const gemini = async (phone1, phone2) => {
    // Access your API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const prompt = `Craft an 250-words summary for this article. Emphasizing the key points of the article and make it concise `
      
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
}

module.exports;