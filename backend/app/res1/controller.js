const path = require("path"),
  rootDir = path.dirname(process.mainModule.filename),
  { validationResult } = require("express-validator"),
  querys = require("./querys");

exports.getAll = async (req, res, next) => {
  try {
    res.send(await querys.findAll());
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.newElement = async (req, res, next) => {
  {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        const error = new Error("Error de validación.");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
      }

      let answer = await querys.newElement(req.body);
      if (answer !== null) {
        res.status(201).json(answer);
        return;
      }

      const error = new Error("El add es inválido");
      error.statusCode = 400;
      throw error;
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
};

exports.getElement = async (req, res, next) => {
  try {
    let body=await querys.findOne(req.params.id);
    console.log(req.params.id,body);
    res.send(body);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.updateElement = async (req, res, next) => {
  {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        const error = new Error("Error de validación.");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
      }

      let answer = await querys.updateElement(
        req.params.id,
        req.body
      );

      if (answer !== null) {
        res.status(200).json(answer);
        return;
      }

      const error = new Error("El update es inválido");
      error.statusCode = 400;
      throw error;
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
};

exports.deleteElement = async (req, res, next) => {
  {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        const error = new Error("Error de validación.");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
      }

      let answer = await querys.deleteElement(
        req.params.id
      );
      if (answer !== null) {
        res.status(200).json(answer);
        return;
      }

      const error = new Error("El borrado es válido");
      error.statusCode = 400;
      throw error;
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
};