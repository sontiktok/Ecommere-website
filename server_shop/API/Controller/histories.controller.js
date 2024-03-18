const Histories = require("../../Model/histories.model");

module.exports.index = async (req, res) => {
  const idUser = req.query.idUser;

  const histories = await Histories.find({ idUser: idUser });
  res.json(histories);
};

module.exports.detail = async (req, res) => {
  const id = req.params.id;

  const histories = await Histories.findOne({ _id: id });

  res.json(histories);
};

module.exports.changeStatus = async (req, res) => {
  const id = req.params.id;

  const histories = await Histories.findOne({ _id: id });
  if (histories.delivery === "chờ xác nhận") {
    histories.delivery = "đã xác nhận";
  } else if (histories.delivery === "đã xác nhận") {
    histories.delivery = "đang giao";
  } else if (histories.delivery === "đang giao") {
    histories.delivery = "đã giao";
    histories.status = true;
  }
  await histories.save({ new: true });
  res.json(histories);
};

module.exports.history = async (req, res) => {
  const histories = await Histories.find();

  res.json(histories);
};
