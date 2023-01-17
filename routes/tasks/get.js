const Task = require("../../models/Task");
module.exports = {
  getById: (req, res, next) => {
    Task.findById(req.params.id)
      .then((task) => {
        res.json({
          status: {
            message: "successful",
          },
          data: task,
        });
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

  getAll: (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.currentpage;
    const taskQuery = Task.find();
    if (pageSize && currentPage > -1) {
      taskQuery.skip(pageSize * currentPage).limit(pageSize);
    }

    taskQuery
      .then(async (tasks) => {
        res.json({
          status: {
            message: "successful",
          },
          data: tasks,
          totalCount: await Task.count(),
        });
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
