class MinimumValidator {
    constructor(validator, minimum) {
        this._message = `Should be bigger than ${minimum}.`;
        this._validator = validator;
        this._minimum = minimum;
        this._isInvalid = false;
    }

    validate(value) {
        this._isInvalid = value && (value > this._minimum);
        this._validator.validate(value);
    }

    isInvalid() {
        return this._isInvalid || (this._validator && this._validator.isInvalid());
    }

    errors() {
        const other = (this._validator && this._validator.errors()) || [];
        return this._isInvalid ? [this._message, ...other] : other;
    }
}

export default MinimumValidator;