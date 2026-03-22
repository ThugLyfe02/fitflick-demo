async function tryOn() {
  const userImage = document.getElementById("userImage").value;
  const garmentImage = document.getElementById("garmentImage").value;

  document.getElementById("loading").innerText = "Generating...";

  const response = await fetch("http://localhost:3000/try-on", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ userImage, garmentImage })
  });

  const data = await response.json();

  document.getElementById("output").src = data.output;
  document.getElementById("loading").innerText = "";
}

async function retry() {
  const response = await fetch("http://localhost:3000/retry", {
    method: "POST"
  });

  const data = await response.json();

  document.getElementById("output").src = data.output;
}
