import DefaultValidator from "./default-validator";
import MaxLengthValidator from "./max-length-validator";
import MinLengthValidator from "./min-length-validator";
import MaximumValidator from "./maximum-validator";
import MinimumValidator from "./minimum-validator";

const create = (schema) => {
    let validator = new DefaultValidator();

    if (schema.maxLength) {
        validator = new MaxLengthValidator(validator, schema.maxLength)
    }

    if (schema.minLength) {
        validator = new MinLengthValidator(validator, schema.minLength)
    }

    if (schema.maximum) {
        validator = new MaximumValidator(validator, schema.maximum)
    }

    if (schema.minimum) {
        validator = new MinimumValidator(validator, schema.minimum)
    }

    return validator;
}

export default { create };