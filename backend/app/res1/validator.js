const { body } = require("express-validator");
exports.validate = method => {
  switch (method) {
    case "general": {
      return [
        body("title", "Su horario debe tener un nombre definido")
          .exists()
          .not()
          .isEmpty()
          .withMessage("El formato del título no es válido"),
      ];
    }
    case "custom": {
      return [
        body("collegeEvents").custom(events => {
          let errMsg = validateCustom(events);
          if (errMsg) {
            return Promise.reject(errMsg);
          }
          return Promise.resolve("OK");
        })
      ];
    }
  }
};

const validateCustom = data => {
  if(data)
    return "OK"
  return "ERR"
};
