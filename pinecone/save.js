const { Pinecone } = require("@pinecone-database/pinecone");
const { PineconeStore } = require("langchain/vectorstores/pinecone");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");

/**
 * Salva os documentos no pinecone
 * @param {*} output documentos
 */
const savePinecone = async (output) => {
  const client = new Pinecone();

  const pineconeIndex = client.Index(process.env.PINECONE_INDEX);

  const embeddings = new OpenAIEmbeddings();

  await PineconeStore.fromDocuments(output, embeddings, {
    pineconeIndex,
  });
};

exports.savePinecone = savePinecone;
