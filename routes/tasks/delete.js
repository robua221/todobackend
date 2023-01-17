const Task = require("../../models/Task");
module.exports = {
  deleteTask: (req, res, next) => {
    Task.deleteOne({ _id: req.params.id, creator: req.userData.userId })
      .then((result) => {
        console.log(result);
        if (result.n > 0)
          res.json({
            status: {
              message: "updated successfully",
              code: 500,
            },
          });
        else {
          res.status(401).json({
            status: {
              message: "auth failed",
              code: 401,
            },
          });
        }
      })
      .catch((e) => {
        res.status(500).json({
          status: {
            message: e.message,
            code: 500,
          },
        });
      });
  },
};
