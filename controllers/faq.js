const FAQ = require("../models/Faq");
const translateText = require("../utils/translate");
const cache = require("../utils/cache");

// Fetch all FAQs with optional language translation
const getFAQs = async (req, res) => {
  try {
    const lang = req.query.lang || "en";
    const cacheKey = `faqs_${lang}`;

    // Check cache
    const cachedData = await cache.get(cacheKey);
    if (cachedData) return res.json(JSON.parse(cachedData));

    // Fetch from DB
    const faqs = await FAQ.find();
    const translatedFaqs = faqs.map((faq) => ({
      _id: faq._id,
      ...faq.getTranslation(lang),
    }));

    // Store in cache
    await cache.set(cacheKey, JSON.stringify(translatedFaqs), 3600);

    res.json(translatedFaqs);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Add a new FAQ with auto-translation
const addFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    // Auto-translate
    const translations = {
      hi: {
        question: await translateText(question, "hi"),
        answer: await translateText(answer, "hi"),
      },
      bn: {
        question: await translateText(question, "bn"),
        answer: await translateText(answer, "bn"),
      },
    };

    const faq = new FAQ({ question, answer, translations });
    await faq.save();

    res.status(201).json(faq);
  } catch (error) {
    res.status(500).json({ message: "Failed to create FAQ", error: error.message });
  }
};

// Delete FAQ by ID
const deleteFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    await FAQ.findByIdAndDelete(id);
    res.json({ message: "FAQ deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete FAQ", error: error.message });
  }
};

module.exports = { getFAQs, addFAQ, deleteFAQ };
