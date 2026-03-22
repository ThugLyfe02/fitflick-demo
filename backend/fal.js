import fetch from "node-fetch";

const FAL_KEY = process.env.FAL_KEY;

export async function runTryOn(userImageUrl, garmentImageUrl) {
  const response = await fetch("https://fal.run/fal-ai/idm-vton", {
    method: "POST",
    headers: {
      "Authorization": `Key ${FAL_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      human_image: userImageUrl,
      garment_image: garmentImageUrl
    })
  });

  const result = await response.json();

  console.log("FAL RESPONSE:", result);

  if (!result?.image?.url) {
    throw new Error(JSON.stringify(result));
  }

  return result.image.url;
}
