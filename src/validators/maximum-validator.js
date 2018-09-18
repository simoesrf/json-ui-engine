class MaximumValidator {
    constructor(validator, maximum) {
        this._message = `Should be less than ${maximum}.`;
        this._validator = validator;
        this._maximum = maximum;
        this._isInvalid = false;
    }

    validate(value) {
        this._isInvalid = value && (value < this._maximum);
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

export default MaximumValidator;