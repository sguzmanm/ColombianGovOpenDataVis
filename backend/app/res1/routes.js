const express = require("express"),
  path = require("path"),
  rootDir = path.dirname(process.mainModule.filename),
  elementController = require("./controller"),
  { validate } = require("./validator");

const handlerExceptions = require(path.join(
  rootDir,
  "util/errors",
  "handlerException"
));
const router = express.Router();

router.get(
  "/",
  handlerExceptions(elementController.getAll)
);

router.post(
  "/",
  handlerExceptions(elementController.newElement)
);

/*
router.post(
  "/",
  validate("schedule"),
  handlerExceptions(elementController.newElement)
);
*/

router.get(
  "/:id/",
  handlerExceptions(elementController.getElement)
);

router.put(
  "/:id/",
  handlerExceptions(elementController.updateElement)
);

router.delete(
  "/:id/",
  handlerExceptions(elementController.deleteElement)
);

module.exports = router;
