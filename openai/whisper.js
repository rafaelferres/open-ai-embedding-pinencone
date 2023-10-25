const {
  OpenAIWhisperAudio,
} = require("langchain/document_loaders/fs/openai_whisper_audio");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
/**
 * Gera documentos splitados do audio
 * @param {*} filePath Caminho do audio .mp3
 */
const generateDocuments = async (filePath) => {
  //Gera o text splitter
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 600,
    chunkOverlap: 60,
  });

  // Carrega o arquivo mp3
  const loader = new OpenAIWhisperAudio(filePath);

  // Gera o transcribe já splitado
  const docs = await loader.loadAndSplit(splitter);

  return docs;
};

exports.generateDocuments = generateDocuments;
