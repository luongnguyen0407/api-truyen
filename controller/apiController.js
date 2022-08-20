const urlNew = "https://truyen.tangthuvien.vn/tong-hop?ord=new&ctg=4&limit=60";
const axios = require("axios");
const cheerio = require("cheerio");
const getNew = async (req, res) => {
  try {
    const { data } = await axios(urlNew);
    const $ = cheerio.load(data);
    const dataReturn = [];
    const limit = Number(req.query.limit);
    $(".book-img-text > ul > li", data).each(function () {
      const name = $(this).find(".book-mid-info > h4 > a").text();
      let urlDetail = $(this).find(".book-img-box > a").attr("href");
      const urlImg = $(this).find(".book-img-box > a > img").attr("src");
      urlDetail =
        "http://localhost:5000/api/getDetail/" +
        urlDetail.split("https://truyen.tangthuvien.vn/doc-truyen/")[1];
      const author = $(this).find(".book-mid-info > .author > .name").text();
      dataReturn.push({
        name,
        urlDetail,
        urlImg,
        author,
      });
    });
    if (limit && limit > 0 && typeof limit == "number") {
      return res.status(200).json({
        status: true,
        data: dataReturn.slice(0, limit),
      });
    } else {
      res.status(200).json({
        status: true,
        data: dataReturn,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Sever error",
    });
  }
};

const urlMain = "https://truyen.tangthuvien.vn/doc-truyen/khu-thi-dao-nhan";

const getDetail = async (req, res) => {
  console.log(req.params);
  res.send("ok");
};

module.exports = { getNew, getDetail };
