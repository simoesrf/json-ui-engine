class DefaultValidator {
    constructor(errors = []) {
        this._errors = errors;
        this._hasErrors = !!errors.length;
    }

    validate(value) { }

    isInvalid() { return this._hasErrors }

    errors() { return this._errors; }
}

export default DefaultValidator;



{

}