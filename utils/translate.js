const { Translate } = require("@google-cloud/translate").v2;
const translate = new Translate();

async function translateText(text, targetLang) {
  try {
    const [translated] = await translate.translate(text, targetLang);
    return translated;
  } catch (error) {
    console.error(`Translation error for ${targetLang}:`, error);
    return text; // Falls back to original text
  }
}

module.exports = translateText;
