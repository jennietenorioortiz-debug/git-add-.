exports.handler = async (event) => {
    try {
        if (event.httpMethod !== "POST") {
            return { statusCode: 405, body: "Method Not Allowed" };
        }

        const { company, industry, goal, audience, budget, timeline } =
            JSON.parse(event.body);

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: "You are an expert marketing strategist.",
                    },
                    {
                        role: "user",
                        content: `
Create a detailed marketing plan.

Company: ${company}
Industry: ${industry}
Goal: ${goal}
Audience: ${audience}
Budget: $${budget}
Timeline: ${timeline}
`,
                    },
                ],
                temperature: 0.7,
            }),
        });

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify({
                plan: data.choices[0].message.content,
            }),
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        };
    }
};
