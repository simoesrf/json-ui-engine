class MaxLengthValidator {
    constructor(validator, maxLength) {
        this._message = `Should have a maximum of ${maxLength} characters.`;
        this._validator = validator;
        this._maxLength = maxLength;
        this._isInvalid = false;
    }

    validate(value) {
        this._isInvalid = (value && (value.length > this._maxLength));
        this._validator && this._validator.validate(value);
    }

    isInvalid() {
        return this._isInvalid || (this._validator && this._validator.isInvalid());
    }

    errors() {
        const other = (this._validator && this._validator.errors()) || [];
        return this._isInvalid ? [this._message, ...other] : other;
    }
}

export default MaxLengthValidator;