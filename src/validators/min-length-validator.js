class MinLengthValidator {
    constructor(validator, minLength) {
        this._message = `Should have at least ${minLength} characters.`;
        this._validator = validator;
        this._minLength = minLength;
        this._isInvalid = false;
    }

    validate(value) {
        this._isInvalid = (value && (value.length < this._minLength));
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

export default MinLengthValidator;