// reportControllers.js
const Report = require('./report');

const createReport = async (req, res) => {
  try {
    const { dating, eating, entertainment, selfCare, sleep, study, traveling, work, workout } = req.body;
    const userId = req.user.id;  // Get userId from the token

    if (dating === undefined || eating === undefined || entertainment === undefined || selfCare === undefined || sleep === undefined || study === undefined || traveling === undefined || work === undefined || workout === undefined) {
      return res.status(400).send({
        error: true,
        message: 'All fields are required'
      });
    }

    const report = new Report(userId, Number(dating), Number(eating), Number(entertainment), Number(selfCare), Number(sleep), Number(study), Number(traveling), Number(work), Number(workout));
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
      message: 'Report fetched successfully',
      report: {
        time,
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
      message: 'Reports fetched successfully',
      reports: reports.map(report => ({
        id: report.id,
        time: report.time,
        timeStamp: report.timeStamp,
        dating: report.dating,
        eating: report.eating,
        entertainment: report.entertainment,
        selfCare: report.selfCare,
        sleep: report.sleep,
        study: report.study,
        traveling: report.traveling,
        work: report.work,
        workout: report.workout,
        predictedDayCondition: report.predictedDayCondition,
        predictedDayLabel: report.predictedDayLabel,
        positive: report.positive,
        negative: report.negative,
        netral: report.netral
      }))
    });
  } catch (error) {
    console.error("Error listing reports:", error.message);
    return res.status(500).send({
      error: true,
      message: 'Internal server error'
    });
  }
};

const updateReport = async (req, res) => {
  try {
    const { reportId } = req.params;
    const userId = req.user.id;  // Get userId from the token
    const updates = req.body;

    const allowedUpdates = ['predictedDayCondition', 'predictedDayLabel', 'positive', 'negative', 'netral'];
    const isValidOperation = Object.keys(updates).every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).send({
        error: true,
        message: 'Invalid updates!'
      });
    }

    await Report.update(userId, reportId, updates);
    return res.send({
      error: false,
      message: 'Report updated successfully'
    });
  } catch (error) {
    console.error("Error updating report:", error.message);
    return res.status(500).send({
      error: true,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  createReport,
  getReport,
  listReports,
  updateReport
};
