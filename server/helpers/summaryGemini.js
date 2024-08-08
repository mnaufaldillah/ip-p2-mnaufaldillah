const { GoogleGenerativeAI } = require("@google/generative-ai");

const summaryGemini = async (articleLink) => {
    // Access your API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const prompt = `Craft a summary for this article. Emphasizing the key points of the article and make it concise. 
    The summary word's length must be between 200 to 250 words.
    Here's the link: 
    ${articleLink}`
      
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    // console.log(text);

    // text = JSON.parse(text);

    return text;
}

module.exports = summaryGemini;