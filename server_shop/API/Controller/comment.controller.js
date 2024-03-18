const Comment = require("../../Model/comment.model");
const Histories = require("../../Model/histories.model");

module.exports.index = async (req, res) => {
  const idProduct = req.query.idProduct;

  const comment_product = await Comment.find({ idProduct: idProduct });

  res.json(comment_product);
};

module.exports.send = async (req, res) => {
  // Lấy query idProduct
  const idProduct = req.body.idProduct;

  // Lấy query idUser
  const idUser = req.body.idUser;
  const history = await Histories.findOne({
    idUser,
    idProduct,
    status: "đã giao",
  });

  if (!history) {
    res.status(400).send("Bạn chưa mua sản phẩm này!");
    return;
  }
  console.log("ddd", history.cart);
  if (!history.cart.includes(idProduct)) {
    res.status(400).send("Sản phẩm này không có trong giỏ hàng của bạn!");
    return;
  }

  // Lấy query fullname
  const fullname = req.body.fullname;

  // Lấy query content
  const content = req.body.content;

  // Lấy query star
  const star = parseInt(req.body.star);

  let arrayStar = [];

  // Tạo array cho star
  for (let i = 0; i < star; i++) {
    arrayStar.push("fas fa-star text-warning");
  }

  let star1 = "";
  let star2 = "";
  let star3 = "";
  let star4 = "";
  let star5 = "";

  // Bắt đầu gán vào star
  for (let i = 0; i < arrayStar.length; i++) {
    if (i === 0) {
      star1 = arrayStar[i];
    }
    if (i === 1) {
      star2 = arrayStar[i];
    }
    if (i === 2) {
      star3 = arrayStar[i];
    }
    if (i === 3) {
      star4 = arrayStar[i];
    }
    if (i === 4) {
      star5 = arrayStar[i];
    }
  }

  const data = {
    idProduct: idProduct,
    idUser: idUser,
    fullname: fullname,
    content: content,
    star1: star1,
    star2: star2,
    star3: star3,
    star4: star4,
    star5: star5,
  };

  Comment.insertMany(data);

  res.send("Thanh Cong");
};
