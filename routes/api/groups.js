const express = require("express");
const router = express.Router();

// @route GET api/groups/test
// @desc Tests user route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Groups Reachable" }));

module.exports = router;
