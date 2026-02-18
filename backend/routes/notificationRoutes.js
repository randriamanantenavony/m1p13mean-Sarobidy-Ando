const express = require('express');
const router = express.Router();
const { getNotificationsByShop } = require('../controllers/notificationController');

router.get('/shop/:shopId', async (req, res) => {
  try {
    const { shopId } = req.params;
    const notifs = await getNotificationsByShop(shopId);
    res.status(200).json(notifs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
