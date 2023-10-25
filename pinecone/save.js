const { Pinecone } = require("@pinecone-database/pinecone");
const { PineconeStore } = require("langchain/vectorstores/pinecone");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");

const savePinecone = async (output) => {
  const client = new Pinecone();
  console.log({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENVIRONMENT,
    index: process.env.PINECONE_INDEX,
  });

  const pineconeIndex = client.Index(process.env.PINECONE_INDEX);

  const embeddings = new OpenAIEmbeddings();

  await PineconeStore.fromDocuments(output, embeddings, {
    pineconeIndex,
  });
};

exports.savePinecone = savePinecone;
