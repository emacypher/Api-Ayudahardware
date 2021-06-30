const sequelize = require('sequelize');
const { Post } = require('../models/index.js');

module.exports = {
    getPostByid: function (id) {
        return Post.findByPk(id)
    },
    deletePost: function (id) {
        let timeDeleted = new Date().toISOString().slice(0, 19).replace('T', ' ');

        return Post.update({ deletedAt: timeDeleted }, {
            where: {
                id
            }
        });
    },
    read: function(){
        return Post
        .findAll({
            attributes: ['post_title', 'post_text', 'status', 'userId']
        })
    },
    create: function({post_title, post_text, status, userId}){
        return Post
        .create({
            post_title,
            post_text,
            status,
            userId
        })
        .then(res => res)
    },
    updateChanges: function(postId, changes){
        return Post
        .update(
            changes, 
            { where: { id: postId } }
        )
        .then(() => this.getPostByid(postId))
    },
}