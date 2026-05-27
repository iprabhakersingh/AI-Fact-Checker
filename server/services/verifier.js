const axios = require("axios");

async function verifyClaim(claim) {

    try {

        // Tavily Search

        const tavilyResponse = await axios.post(
            "https://api.tavily.com/search",
            {
                query: claim,
                search_depth: "advanced",
                max_results: 3
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.TAVILY_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const results = tavilyResponse.data.results || [];

        if (!results.length) {

            return {
                status: "False",
                actualData: "No evidence found",
                evidence: "#",
                confidence: "90%",
                reason: "No trusted sources found"
            };

        }

        const evidenceText = results
            .map(result => result.content)
            .join("\n");

        // DeepSeek via OpenRouter

        const aiResponse = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "deepseek/deepseek-chat",

                messages: [
                    {
                        role: "user",
                        content: `
Compare this claim against the evidence.

Claim:
${claim}

Evidence:
${evidenceText}

Return ONLY valid JSON:

{
  "status": "Verified" | "Inaccurate" | "False",
  "correctFact": "Correct factual statement",
  "confidence": "0-100%",
  "reason": "Short explanation"
}
`
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const rawText =
            aiResponse.data.choices[0].message.content;

        console.log(rawText);

        const cleaned = rawText
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const parsed = JSON.parse(cleaned);

        return {

            status: parsed.status,

            actualData: parsed.correctFact,

            confidence: parsed.confidence,

            reason: parsed.reason,

            evidence: results[0].url

        };

    } catch (error) {

        console.log(
            error.response?.data || error.message
        );

        return {

            status: "False",

            actualData: "Verification failed",

            evidence: "#",

            confidence: "0%",

            reason: "System could not verify claim"

        };

    }

}

module.exports = verifyClaim;