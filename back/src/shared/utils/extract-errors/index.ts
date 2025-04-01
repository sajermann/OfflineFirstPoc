import { ValidationError } from 'class-validator';

type Error = {
  property: string;
  errors: string[];
};

export function extractErrors(errors: ValidationError[]) {
  const errorsFormated: Error[] = [];
  for (const error of errors) {
    errorsFormated.push({
      property: error.property,
      errors: [...Object.values(error.constraints)],
    });
  }
  return errorsFormated;
}
