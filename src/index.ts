const sharp = require("sharp");

const img =
  "https://images.pexels.com/photos/4815143/pexels-photo-4815143.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260";



(async function () {
  try {
     const info = await sharp(img).png().toBuffer();
     fs.writeFile("./test.png");
    console.log(info);
  } catch (err) {
    console.log({ error: err instanceof Error ? err.message : "Failed to do something exceptional" });
  }
})();
