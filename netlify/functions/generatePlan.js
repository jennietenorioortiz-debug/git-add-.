export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { company, industry, goal, audience, budget, timeline } =
      JSON.parse(event.body);

    const prompt = `
Create a detailed marketing plan.

Company: ${company}
Industry: ${industry}
Goal: ${goal}
Audience: ${audience}
Budget: ${budget}
Timeline: ${timeline}

Include:
- Strategy overview
- Recommended channels
- Budget allocation
- KPIs
- Timeline breakdown
`;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: prompt
      })
    });

    const data = await response.json();

    // ✅ THIS is the correct place to read text
    const outputText =
      data.output_text ||
      "No marketing plan was generated.";

    return {
      statusCode: 200,
      body: JSON.stringify({ plan: outputText })
    };

  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}

}


