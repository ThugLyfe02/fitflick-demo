console.log("🔥 NEW FAL FILE LOADED");

import { fal } from "@fal-ai/client";

// Configure fal with your API key
fal.config({
  credentials: process.env.FAL_KEY,
});

export async function runTryOn(userImageUrl, garmentImageUrl) {
  try {
    const result = await fal.subscribe("fal-ai/idm-vton", {
      input: {
        human_image: userImageUrl,
        garment_image: garmentImageUrl,
      },
      logs: true,
      mode: "blocking",
    });

    console.log("✅ FULL FAL RESULT:", JSON.stringify(result, null, 2));

    // If result is missing expected output
    if (!result || !result.image || !result.image.url) {
      console.log("⚠️ Unexpected response structure:", result);
      throw new Error("Fal response missing image URL");
    }

    return result.image.url;

  } catch (err) {
    console.log("❌ FAL ERROR:", err);
    throw new Error("Fal API failed");
  }
}
