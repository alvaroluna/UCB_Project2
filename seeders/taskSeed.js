//Export Task bulk create
module.exports = [
  // Task info
  { volunteerId: 2, task: 1, date: "2020-05-11", seniorId: 1, completed: false, specialInstr:  "Has Wheelchair, ring twice" },
  { task: 2, date: "2020-05-13", seniorId: 2, completed: false },
  { volunteerId: 2, task: 3, date: "2020-05-15", seniorId: 3, completed: true },
  { task: 2, date: "2020-05-15", seniorId: 1, completed: false },
  { task: 3, date: "2020-05-15", seniorId: 2, completed: false },
  { task: 1, date: "2020-05-20", seniorId: 3, completed: false },
  { volunteerId: 2, task: 2, date: "2020-05-22", seniorId: 3, completed: false },
  { task: 1, date: "2020-05-26", seniorId: 3, completed: false },
];

//Template
// { task: 1, date: "2020-05-11", completed: false }
