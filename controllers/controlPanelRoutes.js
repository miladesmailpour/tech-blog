const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
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
        res.render('userPost', { posts, logged_in: req.session.logged_in }); // userPost view must implement
    } 
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/edit/:id', withAuth, async (req, res) => {
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
        const post = postData.get({ plain: true });
        res.render('edit', { post, logged_in: true }); // edit must implement
    } 
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/new', (req, res) => {
    res.render('post'); // post must implement
});

module.exports = router;