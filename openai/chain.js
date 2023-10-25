const { Pinecone } = require("@pinecone-database/pinecone");
const { VectorDBQAChain } = require("langchain/chains");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { OpenAI } = require("langchain/llms/openai");
const { PineconeStore } = require("langchain/vectorstores/pinecone");

const callChain = async (message) => {
  // Instancia o client do pinecone
  const pinecone = new Pinecone();

  // Define o index do pinecone
  const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);

  // Define o VectorStore para pesquisarmos os dados
  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    { pineconeIndex }
  );

  // Instancia o modelo que iremos utilizar, aqui podemos configurar o todas as opções de modelo como temperatura, qual modelos iremos utilizar gpt-4 ou gpt-3.5-turbo e afins
  const model = new OpenAI();

  const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
    k: 1,
    returnSourceDocuments: true,
  });
  const response = await chain.call({ query: message });
  return response;
};

exports.callChain = callChain;
