// fungstion cointroler req : data dari user, res : balasan dari server
const index = (req, res) => {
  res.render("index", { title: "Express" });
};

module.exports = { index };
