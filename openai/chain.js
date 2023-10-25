const { Pinecone } = require("@pinecone-database/pinecone");
const { VectorDBQAChain } = require("langchain/chains");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { OpenAI } = require("langchain/llms/openai");
const { PineconeStore } = require("langchain/vectorstores/pinecone");

const callChain = async (message) => {
  const pinecone = new Pinecone();

  const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);

  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    { pineconeIndex }
  );

  const model = new OpenAI();
  const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
    k: 1,
    returnSourceDocuments: true,
  });
  const response = await chain.call({ query: message });
  return response;
};

exports.callChain = callChain;
