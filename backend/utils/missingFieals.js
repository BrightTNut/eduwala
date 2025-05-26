// utils/validateFields.js
export function findMissingFields(dataObject, requiredFields) {
  const missingFields = [];

  requiredFields.forEach((field) => {
    const value = dataObject[field];

    // Check if the value is undefined, null, or an empty string
    if (
      value === undefined ||
      value === null ||
      (typeof value === "string" && value.trim() === "")
    ) {
      missingFields.push(field);
    }
  });

  return missingFields;
}
