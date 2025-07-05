const { Router } = require('express');
const createAdmin = require('../scripts/createAdmin');

const router = Router();

// Proteger con query secret; configura SETUP_SECRET en Render.
router.get('/createAdmin', async (req, res) => {
    const expected = process.env.SETUP_SECRET;
    if (expected && req.query.secret !== expected) {
        return res.status(403).send('Forbidden');
    }
    try {
        const msg = await createAdmin();
        res.send(msg);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router; 