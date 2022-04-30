const router = require("express").Router();
const Report = require("../model/Report");
const Aggregate = require("../model/Aggregate");
const { validateReport } = require("../validation");

router.post("/", async (req, res) => {
  const { error } = validateReport(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const {
    userID,
    marketID,
    marketName,
    cmdtyID,
    marketType,
    cmdtyName,
    priceUnit,
    convFctr,
    price,
  } = req.body.reportDetails;

  const newReport = new Report({
    userID,
    marketID,
    marketName,
    cmdtyID,
    marketType,
    cmdtyName,
    priceUnit,
    convFctr,
    price,
  });

  const now = new Date();
  const todayMidNight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  try {
    const reportExistFromUser = await Report.findOne({
      marketID,
      cmdtyID,
      userID,
      created: { $gte: todayMidNight },
    });
    if (reportExistFromUser)
      return res.json({ status: "failed", msg: "Report already exists" });

    const savedReport = await newReport.save();

    const getAllReportOfProduce = await Report.find({
      marketID,
      cmdtyID,
      created: { $gte: todayMidNight },
    });
    const contributingUsers = getAllReportOfProduce.map((report) => {
      return report.userID;
    });
    const priceArrOfCmdty = getAllReportOfProduce.map((report) => {
      return report.price / report.convFctr;
    });
    const avgPrice =
      priceArrOfCmdty.reduce((a, b) => a + b) / getAllReportOfProduce.length;

    const newAggreate = new Aggregate({
      cmdtyName,
      marketID,
      marketName,
      users: contributingUsers,
      priceUnit: "Kg",
      price: avgPrice,
    });
    const savedAggregate = await newAggreate.save();

    res.json({
      status: "success",
      reportID: savedAggregate._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", msg: "Server error" });
  }
});

router.get("/reportID/:id", async (req, res) => {
  try {
    const aggregated = await Aggregate.findById(req.params.id);
    res.json(aggregated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
