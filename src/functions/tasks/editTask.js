const taskModel = require('../../models/task')
const status_codes = require('../../utils/status_code/status_codes')

const updateTask = async (req, res) => {
  taskModel.update(req.body, {
      where: {
          id: req.query.id
      }
  }).then(() => {
      return res.status(status_codes.SUCCESS).json({
          message: 'Successfully updated task'
      })
  }).catch(() => {
      return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
          error: "Something went wrong"
      })
  })

}

module.exports = updateTask
