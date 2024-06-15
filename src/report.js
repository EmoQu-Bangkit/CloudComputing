// report.js
const dbPromise = require("../database/db.js");
const { nanoid } = require("nanoid");

class Report {
  constructor(userId, timeStamp, dating, eating, entertainment, selfCare, sleep, study, traveling, work, workout, predictedDayCondition, predictedDayLabel, positive, negative, netral) {
    this.id = nanoid(16);
    this.userId = userId;
    this.timeStamp = timeStamp;
    this.dating = dating;
    this.eating = eating;
    this.entertainment = entertainment;
    this.selfCare = selfCare;
    this.sleep = sleep;
    this.study = study;
    this.traveling = traveling;
    this.work = work;
    this.workout = workout;
    this.predictedDayCondition = predictedDayCondition;
    this.predictedDayLabel = predictedDayLabel;
    this.positive = positive;
    this.negative = negative;
    this.netral = netral;
  }

  static async get(userId, reportId) {
    const { db } = await dbPromise;
    const doc = await db.collection("users").doc(userId).collection("reports").doc(reportId).get();
    if (!doc.exists) {
      return null;
    }
    return doc.data();
  }

  static async list(userId) {
    const { db } = await dbPromise;
    const snapshot = await db.collection("users").doc(userId).collection("reports").get();
    return snapshot.docs.map(doc => doc.data());
  }

  async save() {
    const { db } = await dbPromise;
    await db.collection("users").doc(this.userId).collection("reports").doc(this.id).set({
      id: this.id,
      userId: this.userId,
      timeStamp: this.timeStamp,
      dating: this.dating,
      eating: this.eating,
      entertainment: this.entertainment,
      selfCare: this.selfCare,
      sleep: this.sleep,
      study: this.study,
      traveling: this.traveling,
      work: this.work,
      workout: this.workout,
      predictedDayCondition: this.predictedDayCondition,
      predictedDayLabel: this.predictedDayLabel,
      positive: this.positive,
      negative: this.negative,
      netral: this.netral,
    });
    return this;
  }
}

module.exports = Report;
