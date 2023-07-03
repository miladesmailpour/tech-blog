const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const profileRoutes = require('./controlPanelRoutes');

router.use('/', homeRoutes);
router.use('/cpanel', profileRoutes);
router.use('/api', apiRoutes);

module.exports = router;
