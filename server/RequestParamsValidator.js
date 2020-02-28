module.exports.RequestParamsValidator = class RequestParamsValidator {
  validateFields(validationPairs, objectData) {
    validationPairs.forEach(([key, type]) => {
      if (typeof objectData[key] !== type) {
        throw new Error(`${key} - is not a ${type}`);
      }
    });
  }
};
