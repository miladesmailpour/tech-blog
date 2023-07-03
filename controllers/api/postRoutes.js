const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body
    });

    res.status(200).json(newPost);
  } 
  catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.update(
      {
        ...req.body
      },
      {
        where: {
          id: req.params.id
        },
      }
    );

    if (!postData) {
      res.status(404).json({ message: `post with id: ${req.params.id} NOT found.` });
      return;
    }

    res.status(200).json(postData);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id
      },
    });

    if (!postData) {
      res.status(404).json({ message: `post with id: ${req.params.id} NOT found.` });
      return;
    }

    res.status(200).json(postData);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ['id', 'title', 'description', 'date_created'],
      order: [['date_created', 'ASC']],
      include: [
        {
          model: User,
          attributes: ['name']
        },
        {
          model: Comment,
          attributes: ['id', 'text', 'date_created', 'post_id', 'user_id'],
          include: {
            model: User,
            attributes: ['name']
          }
        }
      ]
    });
    res.json(postData.reverse());
  } 
  catch (err) {
      res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'title', 'description', 'date_created'],
      include: [
        {
          model: User,
          attributes: ['name']
        },
        {
          model: Comment,
          attributes: ['id', 'text', 'date_created', 'post_id', 'user_id'],
          include: {
            model: User,
            attributes: ['name']
          }
        }
      ]
    });
    if (!postData) {
      res.status(404).json({ message: `post with id: ${req.params.id} NOT found.` });
      return;
    }

    res.json(postData);
  } 
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
