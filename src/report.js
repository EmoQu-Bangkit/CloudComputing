// report.js
const dbPromise = require("../database/db.js");
const { nanoid } = require("nanoid");
const moment = require("moment-timezone");

class Report {
  constructor(userId, dating, eating, entertainment, selfCare, sleep, study, traveling, work, workout) {
    this.id = nanoid(16);
    this.userId = userId;
    this.timeStamp = moment().tz("Asia/Jakarta").format('YYYY-MM-DD');  // Generate timeStamp based on Jakarta timezone
    this.dating = Number(dating);
    this.eating = Number(eating);
    this.entertainment = Number(entertainment);
    this.selfCare = Number(selfCare);
    this.sleep = Number(sleep);
    this.study = Number(study);
    this.traveling = Number(traveling);
    this.work = Number(work);
    this.workout = Number(workout);
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
      workout: this.workout
    });
    return this;
  }

  static async update(userId, reportId, updates) {
    const { db } = await dbPromise;
    await db.collection("users").doc(userId).collection("reports").doc(reportId).update({
      ...updates,
      positive: updates.positive !== undefined ? Number(updates.positive) : undefined,
      negative: updates.negative !== undefined ? Number(updates.negative) : undefined,
      netral: updates.netral !== undefined ? Number(updates.netral) : undefined
    });
  }
}

module.exports = Report;
