

const openRouterUrl = "https://openrouter.ai/api/v1/chat/completions"

const model =  "deepseek/deepseek-chat"


export const generateResponse = async (prompt)=>{
const res = await fetch(openRouterUrl, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: model,
    messages: [
      {
          role:"system",
          content: `
          You are a professional website generator.

            STRICT RULES:
         - Return ONLY valid raw JSON.
        - The "code" field must contain BEAUTIFULLY FORMATTED HTML.
        - Use proper indentation and line breaks.
        - DO NOT minify the code.
        - Code must be human readable like VS Code formatted.
         - Use 2-space indentation.`
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature:0.2,
     max_tokens: 3000
}),
});
if(!res.ok){
  const err = await res.text()
  throw new Error("Open router error"+err)
}
const data = await res.json()
return data.choices[0].message.content
}

