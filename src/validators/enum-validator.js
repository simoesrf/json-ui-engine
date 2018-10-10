class EnumValidator {
  constructor(validator, options) {
    this._message = `The only available options are ${options}`;
    this._validator = validator;
    this._options = options;
    this._isInvalid = false;
  }

  validate(value) {
    this._isInvalid = value && !this._options.includes(value);
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

export default EnumValidator;
