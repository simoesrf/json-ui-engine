import DefaultValidator from "./default-validator";
import MaxLengthValidator from "./max-length-validator";
import MinLengthValidator from "./min-length-validator";
import MaximumValidator from "./maximum-validator";
import MinimumValidator from "./minimum-validator";
import EnumValidator from "./enum-validator";

const create = (schema, errorsList) => {
  let validator = new DefaultValidator(errorsList);

  if (schema.maxLength) {
    validator = new MaxLengthValidator(validator, schema.maxLength);
  }

  if (schema.minLength) {
    validator = new MinLengthValidator(validator, schema.minLength);
  }

  if (schema.maximum) {
    validator = new MaximumValidator(validator, schema.maximum);
  }

  if (schema.minimum) {
    validator = new MinimumValidator(validator, schema.minimum);
  }

  if (schema.enum) {
    validator = new EnumValidator(validator, schema.enum);
  }

  return validator;
};

// class JsonSchemaValidatorFactory {
//     constructor(errorsReport) {
//         this._errorsReport = errorsReport;
//     }

//     create(schema, fieldName) {
//         const errors = this._errorsReport.getErrors(fieldName);
//         let validator = new DefaultValidator(errors);

//         if (schema.maxLength) {
//             validator = new MaxLengthValidator(validator, schema.maxLength)
//         }

//         if (schema.minLength) {
//             validator = new MinLengthValidator(validator, schema.minLength)
//         }

//         if (schema.maximum) {
//             validator = new MaximumValidator(validator, schema.maximum)
//         }

//         if (schema.minimum) {
//             validator = new MinimumValidator(validator, schema.minimum)
//         }

//         return validator;
//     }
// }

export default { create };
