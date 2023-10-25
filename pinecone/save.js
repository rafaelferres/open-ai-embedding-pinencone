const { Pinecone } = require("@pinecone-database/pinecone");
const { PineconeStore } = require("langchain/vectorstores/pinecone");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");

/**
 * Salva os documentos no pinecone
 * @param {*} output documentos
 */
const savePinecone = async (output) => {
  // Instancia o client do pinecone
  const client = new Pinecone();

  // Define o index do pinecone
  const pineconeIndex = client.Index(process.env.PINECONE_INDEX);

  // Instancia a clase de Embeddings da OpenAI
  const embeddings = new OpenAIEmbeddings();

  // Gera os embeddings e após salva no pinecone no index que foi informado
  await PineconeStore.fromDocuments(output, embeddings, {
    pineconeIndex,
  });
};

exports.savePinecone = savePinecone;
