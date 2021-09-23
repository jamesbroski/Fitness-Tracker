const db = require("../models");

module.exports = function (app) {
  app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then((workout) => {
        res.json(workout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

  app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
      .then((workout) => {
        res.json(workout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

  app.post("/api/workouts/", async (req, res) => {
    try {
      const response = await db.Workout.create({ type: "workout" });
      res.json(response);
    } catch (err) {
      console.log("error occurred when creating a new workout: ", err);
    }
  });

  app.put("/api/workouts/:id", ({ body, params }, res) => {
    const workoutId = params;
    let savedExercises = [];

    db.Workout.find({ _id: workoutId })
      .then((dbWorkout) => {
        savedExercises = dbWorkout[0].exercises;
        res.json(dbWorkout[0].exercises);
        let allExercises = [...savedExercises, body];
        console.log(allExercises);
        updateWorkout(allExercises);
      })
      .catch((err) => {
        res.json(err);
      });

    function updateWorkout(exercises) {
      db.Workout.findByIdAndUpdate(
        workoutId,
        { exercises: exercises },
        function (err, doc) {
          if (err) {
            console.log(err);
          }
        }
      );
    }
  });
};

//AGGREGATE and SUM methods
// module.exports = function (app) {
//   app.get("/api/workouts", async (req, res) => {
//     try {
//       const newestWorkout = await db.Workout.aggregate([
//         {
//           $addFields: {
//             totalDuration: { $sum: "exercises.duration" },
//             totalWeight: { $sum: "exercises.weight" },
//             totalSets: { $sum: "exercises.sets" },
//             totalReps: { $sum: "exercises.reps" },
//             totalDistance: { $sum: "exercises.distance" },
//           },
//         },
//       ]);
//       console.log(newestWorkout);
//       res.json(newestWorkout);
//     } catch (error) {
//       console.log(error);
//     }
//   });

//   app.get("/api/workouts/range", async (req, res) => {
//     try {
//       const aggregateData = await db.Workout.aggregate([
//         {
//           $addFields: {
//             totalDuration: { $sum: "exercises.duration" },
//             totalWeight: { $sum: "exercises.weight" },
//             totalSets: { $sum: "exercises.sets" },
//             totalReps: { $sum: "exercises.reps" },
//             totalDistance: { $sum: "exercises.distance" },
//           },
//         },
//       ]);
//       res.json(aggregateData);
//     } catch (error) {
//       console.log(error);
//     }
//   });

//   app.post("/api/workouts", async (req, res) => {
//     try {
//       const newWorkout = await db.Workout.create(req.body);
//       res.json(newWorkout);
//     } catch (error) {
//       console.log(Erroe);
//     }
//   });

//   app.put("/api/workouts/:id", async (req, res) => {
//     try {
//       const updatedWorkout = await db.Workout.findOneAndUpdate(
//         { _id: req.params.id },
//         {
//           $push: {
//             exercises: req.body,
//           },
//         }
//       );
//       res.json(updatedWorkout);
//     } catch (error) {
//       console.log(error);
//     }
//   });
// };
