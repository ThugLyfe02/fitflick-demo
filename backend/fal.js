import { fal } from "@fal-ai/client";

fal.config({
  credentials: process.env.FAL_KEY,
});

export async function runTryOn(userImageUrl, garmentImageUrl) {
  const result = await fal.subscribe("fal-ai/idm-vton", {
    input: {
      human_image: userImageUrl,
      garment_image: garmentImageUrl,
    },
    logs: true,
    mode: "blocking"
  });

  console.log("FAL RESPONSE:", result);

  if (!result?.image?.url) {
    throw new Error(JSON.stringify(result));
  }

  return result.image.url;
}
