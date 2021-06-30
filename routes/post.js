const express = require('express');
const router = express.Router();
const post = require('../controllers/post.js')

router.get('/', async(req,res)=>{
    const postList = await post.read();
    return res.status(200).json(postList);
})


router.post('/', async(req, res, next)=>{
    post.create(req.body)
    .then(r => res.status(200).send(r))
    .catch(next)
})

router.put('/update', async(req,res, next)=>{
    post.updateChanges(req.body.id, req.body)
    .then(r => res.send(r))
    .catch(err => console.log(err))
})

router.delete('/:id', async(req,res)=>{
    let { id } = req.params;

    try {
      let checkPost = await post.getPostByid(id);
  
      if (checkPost) {
  
        if (checkPost.dataValues.deletedAt != null) return res.status(400).json({ error: `Post with id: ${id} doesn't exists` });
  
        await post.deletePost(id);
  
        return res.status(200).json({ message: `Post with id: ${id} deleted successfully` });
      }
  
      return res.status(400).json({ error: `Post with id: ${id} doesn't exists` });
    } catch (err) {
      res.status(400).json({ error: err });
    }
})

module.exports = router;