/* =========================================================
   MOMENTUM — consultation availability (local configuration)
   There is no scheduling backend yet: this file is the single
   source of truth for when a consultation can be requested.
   js/consultation.js reads it to build the date and time
   options — edit ONLY this file to change availability.

   Requested slots are never auto-confirmed; Momentum reviews
   every request and confirms each appointment personally.
   ========================================================= */

const MOMENTUM_AVAILABILITY = {
  /* Display label + IANA zone used for "today" calculations,
     so availability is correct for visitors in any timezone. */
  timezoneLabel: "East Africa Time (UTC+3)",
  ianaTimezone: "Africa/Nairobi",

  /* Earliest bookable day is (today + minNoticeDays); requests
     are accepted up to maxAdvanceDays ahead. */
  minNoticeDays: 1,
  maxAdvanceDays: 60,

  /* 0 = Sunday … 6 = Saturday. Shown to visitors via the label. */
  workingDays: [1, 2, 3, 4, 5],
  workingDaysLabel: "Monday to Friday",

  /* Requestable start times (24h, EAT). */
  dailySlots: ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00"],

  /* One-off exceptions, e.g. holidays: ["2026-12-25"] */
  blockedDates: [],

  /* Per-date blocked start times, e.g. { "2026-08-03": ["09:00", "10:00"] } */
  blockedSlots: {},
};
