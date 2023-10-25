const { generateDocuments } = require("./openai/whisper.js");
const dotenv = require("dotenv");
const { savePinecone } = require("./pinecone/save.js");
const { callChain } = require("./openai/chain.js");

dotenv.config();
(async () => {
  const documents = await generateDocuments("./test.mp3");
  await savePinecone(documents);
  console.log((await callChain("O que são números quanticos?")).text);
})();
