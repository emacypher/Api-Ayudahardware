var express = require('express');
var router = express.Router();
/* Function of BD */
const user = require('../controllers/user.js')

router.get('/', async (req, res, next) => {
  const userList = await user.read();
  return res.status(200).json(userList);
});

router.delete('/:id', async (req, res) => {
  let { id } = req.params;

  try {
    let checkUser = await user.getUserById(id);

    if (checkUser) {

      if (checkUser.dataValues.deletedAt != null) return res.status(400).json({ error: `User with id: ${id} doesn't exists` });

      await user.deleteUser(id);

      return res.status(200).json({ message: `User with id: ${id} deleted successfully` });
    }

    return res.status(400).json({ error: `User with id: ${id} doesn't exists` });
  } catch (err) {
    res.status(400).json({ error: err });
  }

});

router.put('/update', async(req,res,next)=>{
    user.updateChanges(req.body.id, req.body)
    .then(r => res.send(r))
    .catch(next)
})
module.exports = router;