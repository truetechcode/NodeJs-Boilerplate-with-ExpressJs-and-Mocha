const protected = (data) => {
  const { ['password']: deletedKey, ...withOutPassword } = data;
  return withOutPassword;
}

const cleanParams = (params) => {
  let cleanedParams = {};
  Object.keys(params).forEach((prop) => {
    if (params[prop]) { cleanedParams[prop] = params[prop]; }
  });
  return cleanedParams;
};

const filterByDepartment = (array, dept) => {
  return array.filter(item => item.department == dept)
}

module.exports = { protected, cleanParams, filterByDepartment }