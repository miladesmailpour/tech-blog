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

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login'); // login view should be implement
});

router.get('/signup', (req, res) => {
  res.render('signup'); // signup view should be implement
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Comment,
          attributes: ['text', 'date_created', 'post_id', 'user_id'],
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
    if (!postData) {
      res.status(404).json({ message: `post with id: ${req.params.id} NOT found.` });
      return;
    }
    const post = postData.get({ plain: true });
    res.render('post', { ...post, logged_in: req.session.logged_in });  // post view should be implement
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Comment,
          attributes: ['comment_content', 'post_id', 'user_id', 'post_date'],
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
    if (!postData) {
      res.status(404).json({ message: `post with id: ${req.params.id} NOT found.` });
      return;
    }
    const post = postData.get({ plain: true });
    res.render('post', { ...post, logged_in: req.session.logged_in });
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ 
        model: Post 
      }],
    });
    const user = userData.get({ plain: true });
    res.render('profile', { ...user, logged_in: true }); // profile view should be implement
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/comment/:id', async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'title', 'description', 'date_created'],
      include: [
        {
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
    if (!postData) {
      res.status(404).json({ message: `post with id: ${req.params.id} NOT found.` });
      return;
    }
    const post = postData.get({ plain: true });
    res.render('comment', { post, logged_in: req.session.logged_in });
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
