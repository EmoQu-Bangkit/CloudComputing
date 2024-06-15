// activity.js
const dbPromise = require("../database/db.js");
const { nanoid } = require("nanoid");
const dayjs = require("dayjs");

class Activity {
  constructor(userId, quality, activities, duration, notes) {
    this.id = nanoid(16);
    this.userId = userId;
    this.quality = quality;
    this.activities = activities;
    this.duration = duration;
    this.notes = notes;
    this.time_stamp = dayjs().format('YYYY-MM-DD');
  }

  static async get(userId, activityId) {
    const { db } = await dbPromise;
    const doc = await db.collection("users").doc(userId).collection("activities").doc(activityId).get();
    if (!doc.exists) {
      return null;
    }
    return doc.data();
  }

  static async list(userId) {
    const { db } = await dbPromise;
    const snapshot = await db.collection("users").doc(userId).collection("activities").get();
    return snapshot.docs.map(doc => doc.data());
  }

  async save() {
    const { db } = await dbPromise;
    await db.collection("users").doc(this.userId).collection("activities").doc(this.id).set({
      id: this.id,
      userId: this.userId,
      quality: this.quality,
      activities: this.activities,
      duration: this.duration,
      notes: this.notes,
      time_stamp: this.time_stamp,
    });
    return this;
  }

  static async update(userId, activityId, updates) {
    const { db } = await dbPromise;
    await db.collection("users").doc(userId).collection("activities").doc(activityId).update(updates);
  }

  static async delete(userId, activityId) {
    const { db } = await dbPromise;
    await db.collection("users").doc(userId).collection("activities").doc(activityId).delete();
  }
}

module.exports = Activity;