import { ZodError, ZodIssue } from 'zod';

interface SimplifiedZodIssue {
    path: string;
    message: string;
    code: string;
}

export default class ZodValidationError extends Error {
    public errors: SimplifiedZodIssue[];

    constructor(errors: ZodError['errors']) {
        super('Validation failed');
        this.name = 'ValidationError';
        this.errors = this.simplifyErrors(errors);
    }

    private simplifyError(error: ZodIssue): SimplifiedZodIssue {
        const { path, message, code } = error;
        return {
            path: path.join('.'),
            message,
            code,
        };
    }

    private simplifyErrors(errors: ZodIssue[]): SimplifiedZodIssue[] {
        const seenPaths = new Set<string>();
        const simplifiedErrors: SimplifiedZodIssue[] = [];

        errors.forEach((error) => {
            const simplifiedError = this.simplifyError(error);
            if (!seenPaths.has(simplifiedError.path)) {
                seenPaths.add(simplifiedError.path);
                simplifiedErrors.push(simplifiedError);
            }
        });

        return simplifiedErrors;
    }
}
