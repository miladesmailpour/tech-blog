const router = require('express').Router();
const {Comment}  = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({});
        res.json(commentData);
    } 
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(commentData);
    } 
    catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    if (req.session) {
        try {
            const commentData = await Comment.create({
                ...req.body
            });
            res.json(commentData);
        } 
        catch (err) {
            res.status(400).json(err);
        }
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!commentData) {
            res.status(404).json({ message: `comment with id: ${req.params.id} NOT found.` });
            return;
        }
        res.json(commentData);
    } 
    catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;