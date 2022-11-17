const json = require('./dataa.json')
const list = json.complete_detailed_list;

const getDistinctValues = (data , category) => {

  const arrayOfQualities = data.flatMap( (item, index) => {
    const result = item[category].trim().toLowerCase();
    if (result != '-'){
      return  result;
    }
    return [];
  } )

  const setOfValue = new Set(arrayOfQualities);
  const uniqueArray = [...setOfValue];
  return uniqueArray;
}

const createObject = (categoryName, list) => {
  return list.map( (subCategoryName) => {
    jobj = {
      categoryName: categoryName,
      name: subCategoryName,
    }
    return jobj;
  })
}


// console.log(createObject('Quality UX', getDistinctValues(list,'ux-quality')));
// console.log(createObject('Target Users', getDistinctValues(list,'type_of_approach')));

// console.log(getDistinctValues(list,'type_of_approach'));
// console.log(getDistinctValues(list,'application_domain'));
// console.log(getDistinctValues(list,'type_of_instrument'));
// console.log(getDistinctValues(list,'target_users_'));
// console.log(getDistincValues(list,'framework'));
