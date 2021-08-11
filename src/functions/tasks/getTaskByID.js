const taskModel = require('../../models/task')
const status_codes = require('../../utils/status_code/status_codes')

const getTaskByID = async (req, res) => {
  taskModel.findOne({
      where: {
          id: req.query.id
      }
  }).then(r => {
      return res.status(status_codes.SUCCESS).json(r)
  }).catch(() => {
      return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
          error: "Something went wrong"
      })
  })
}

module.exports = getTaskByID
