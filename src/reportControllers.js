// reportControllers.js
const Report = require('./report');

const createReport = async (req, res) => {
  try {
    const { timeStamp, dating, eating, entertainment, selfCare, sleep, study, traveling, work, workout, predictedDayCondition, predictedDayLabel, positive, negative, netral } = req.body;
    const userId = req.user.id;  // Get userId from the token

    if (!timeStamp || dating === undefined || eating === undefined || entertainment === undefined || selfCare === undefined || sleep === undefined || study === undefined || traveling === undefined || work === undefined || workout === undefined || predictedDayCondition === undefined || predictedDayLabel === undefined || positive === undefined || negative === undefined || netral === undefined) {
      return res.status(400).send({
        error: true,
        message: 'All fields are required'
      });
    }

    const report = new Report(userId, timeStamp, dating, eating, entertainment, selfCare, sleep, study, traveling, work, workout, predictedDayCondition, predictedDayLabel, positive, negative, netral);
    await report.save();

    return res.status(201).send({
      error: false,
      message: 'Report created successfully',
      id: report.id  // Return only the id
    });
  } catch (error) {
    console.error("Error creating report:", error.message);
    return res.status(500).send({
      error: true,
      message: 'Internal server error'
    });
  }
};

const getReport = async (req, res) => {
  try {
    const { reportId } = req.params;
    const userId = req.user.id;  // Get userId from the token
    const report = await Report.get(userId, reportId);
    if (!report) {
      return res.status(404).send({
        error: true,
        message: 'Report not found'
      });
    }
    const { timeStamp, dating, eating, entertainment, selfCare, sleep, study, traveling, work, workout, predictedDayCondition, predictedDayLabel, positive, negative, netral } = report;
    return res.send({
      error: false,
      report: {
        timeStamp,
        dating,
        eating,
        entertainment,
        selfCare,
        sleep,
        study,
        traveling,
        work,
        workout,
        predictedDayCondition,
        predictedDayLabel,
        positive,
        negative,
        netral
      }
    });
  } catch (error) {
    console.error("Error fetching report:", error.message);
    return res.status(500).send({
      error: true,
      message: 'Internal server error'
    });
  }
};

const listReports = async (req, res) => {
  try {
    const userId = req.user.id;  // Get userId from the token
    const reports = await Report.list(userId);
    return res.send({
      error: false,
      reports
    });
  } catch (error) {
    console.error("Error listing reports:", error.message);
    return res.status(500).send({
      error: true,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  createReport,
  getReport,
  listReports
};
