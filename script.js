"use strict";
class ContentValidator {
    validate(data) {
        const errors = [];
        return {
            isValid: errors.length === 0,
            errors: errors.length ? errors : undefined,
        };
    }
}
const articleValidator = new ContentValidator();
const productValidator = new ContentValidator();
