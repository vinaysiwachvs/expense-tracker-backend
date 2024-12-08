import z from 'zod';

export interface FieldError {
    key: string;
    message: string;
    errorCode: string;
}

export default class ValidationErrors extends Error {
    private fieldErrors: FieldError[];

    constructor(message = 'Validation errors') {
        super(message);
        this.fieldErrors = [];
    }

    addError(key: string, message: string, errorCode: string) {
        this.fieldErrors.push({ key, message, errorCode });
    }

    toString() {
        return JSON.stringify(this.fieldErrors);
    }

    hasErrors() {
        return this.fieldErrors.length > 0;
    }
}

export function validateFields(
    validations: { key: string; schema: z.ZodType<any, any>; value: any }[],
): ValidationErrors {
    const errors = new ValidationErrors();
    validations.forEach(({ key, schema, value }) => {
        try {
            schema.parse(value);
        } catch (error: any) {
            const validationError = error.errors[0];
            errors.addError(key, validationError.message, validationError.code);
        }
    });
    return errors;
}

export const checkAndThrowError = (errors: ValidationErrors) => {
    if (errors.hasErrors()) {
        throw errors;
    }
};
