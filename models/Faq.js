const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
    {
        question: { type: String, required: true },
        answer: { type: String, required: true },
        translations: {
            questionHi: { type: String }, // Hindi
            questionBn: { type: String }, // Bengali
            questionEs: { type: String }, // Spanish
            answerHi: { type: String },
            answerBn: { type: String },
            answerEs: { type: String },
        },
    },
    { timestamps: true }
);

faqSchema.methods.getTranslation = function (lang) {
    return this.translations[lang] || { question: this.question, answer: this.answer };
};

const FAQ = mongoose.model("Faq", faqSchema);
module.exports = FAQ;
