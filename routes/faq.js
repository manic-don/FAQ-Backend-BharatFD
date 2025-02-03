const express = require("express");
const { getFAQs, addFAQ, deleteFAQ } = require("../controllers/faq");

const router = express.Router();

router.get("/", getFAQs);
router.post("/", addFAQ);
router.delete("/:id", deleteFAQ);

module.exports = router;
