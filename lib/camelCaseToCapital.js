export default function camelCaseToCapitalizeWithSpace(inputString) {
  // Add a space before each capital letter and then capitalize the first letter
  let result = inputString.replace(/([A-Z])/g, " $1").trim();

  // Capitalize the first letter of the result
  result = result.charAt(0).toUpperCase() + result.slice(1);

  return result;
}
