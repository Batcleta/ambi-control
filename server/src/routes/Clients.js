const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");

const clientsController = require("../controllers/Clients");

router.post("/", validateToken, clientsController.store);
router.get("/", validateToken, clientsController.findAll);
router.get("/:id", validateToken, clientsController.findOne);
router.put("/update/:id", validateToken, clientsController.update);
router.delete("/delete/:id", validateToken, clientsController.delete);

module.exports = router;
