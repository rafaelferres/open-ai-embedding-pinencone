const { generateDocuments } = require("./openai/whisper.js");
const dotenv = require("dotenv");
const { savePinecone } = require("./pinecone/save.js");
const { callChain } = require("./openai/chain.js");

dotenv.config();
(async () => {
  // Converte o mp3 para texto e gera os documentos
  const documents = await generateDocuments("./test.mp3");
  //Salva os documentos no pinecone
  await savePinecone(documents);
  //Retorna a resposta para o prompt "O que são números quanticos?"
  console.log((await callChain("O que são números quanticos?")).text);
})();
