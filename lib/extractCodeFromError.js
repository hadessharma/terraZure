export const extractErrorCode = (errorString) => {
  // Define a regular expression to match the "Code" and its value
  const codeRegex = /Code="([^"]+)"/;

  // Match the regex against the error string
  const match = errorString.match(codeRegex);

  // Check if a match is found
  if (match && match.length > 1) {
    // Extracted value is in the second capturing group
    return match[1];
  }

  // Return null if no match is found
  return null;
};
