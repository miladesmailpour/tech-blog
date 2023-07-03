const router = require('express').Router();
const { Post, Comment, User } = require('../models');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ['id', 'title', 'description', 'date_created'],
      include: [{
          model: Comment,
          attributes: ['id', 'text', 'date_created', 'post_id', 'user_id'],
          include: {
            model: User,
            attributes: ['name']
          }
        },
        {
          model: User,
          attributes: ['name']
        }
      ]
    });
    const posts = postData.map(post => post.get({ plain: true }));
    res.render('homepage', { posts, logged_in: req.session.logged_in }); // homepage view should be implement
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
