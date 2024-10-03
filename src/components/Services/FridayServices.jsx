export const queryFriday =async(text)=> {
    const apiKey = "AIzaSyDjMah3Fz2a-KW01TIOSaIY9CsFKiBj6ms"; // Replace with your actual API key
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    const data = {
      contents: [
        {
          parts: [
            {
              text: text,
            },
          ],
        },
      ],
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);  // Inspect the API's response
      // console.log(result.candidates[0].content.parts[0].text);

      if (
        result.candidates[0].content.parts[0].text &&
        result.candidates[0].content.parts[0].text.length > 0
      ) {
        let content = result.candidates[0].content.parts[0].text;
        console.log(content);
        return content
          .replaceAll(/\\n/g, "\n")
          .replaceAll(/```/g, "")
          .replaceAll(/\\/g, "")
          .replaceAll(/`/g, "");
      } else {
        return "No response from Gemini AI.";
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return "Sorry, I could not get a response from Friday.";
    }
  }