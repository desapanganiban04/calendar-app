import { startCase, toLower } from "lodash";

export default function validate(values) {
  let errors = {};
  for (var key in values) {
    if (values.hasOwnProperty(key)) {
      if (!values[key]) {
        errors[key] = `${startCase(toLower(key))} is required.`;
      }
    }
  }

  return errors;
}
