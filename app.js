function btnSendMassageOnAction() {

    const myHeaders = new Headers();
    myHeaders.append("Cookie", "application/json");
    myHeaders.append("Content-Type", "application/json");

    let userInput = document.getElementById("txtUserInput").value;

    document.getElementById("txtUserInput").value = "";
    document.getElementById("respondArea").value = "";

    const raw = JSON.stringify({
        "contents": [
            {
                "parts": [
                    {
                        "text": userInput
                    }
                ]
            }
        ]
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    const API_KEY = "API_KEY";

    fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=" + API_KEY, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            let markdownText = result.candidates[0].content.parts[0].text;
            let html = marked.parse(markdownText);
            document.getElementById("respondArea").innerHTML = html;
        })
        .catch((error) => console.error(error));
}
