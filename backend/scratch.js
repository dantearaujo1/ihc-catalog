const json = require('./dataa.json');
const fs = require('fs');
const list = json.complete_detailed_list;
const Categories = ['ux-quality','type_of_approach', 'application_domain', 'type_of_instrument', 'target_users_', 'framework'];

// Try to sanitize categories values to be distinct
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

// Creates an object with name and a random color from a list
const createCategory = (list) => {
  const categories = [];
  const categoryString = '';
  list.map( (value) => {
    const category = {
      name:value.split('_').reduce((categoryString, word, i) => { return (categoryString + ' ' + word) }).trim(),
      color:'#' + Math.floor(Math.random()*16777215).toString(16)
    }
    categories.push(category);

  } )
  return categories;
}

// Correct string with "-" instead of " "
const adjustCategory = (array) => {
  const correct = '';
  return array.map((item) => { return item.name.split('-').reduce((correct,word,i) => { return (correct + ' ' + word)}) });
}

// Make first Letter of any word Capitalized
// must recieve an array of strings
const capitalizeCategories = (array) => {
  const capitalized = '';
  return array.map( (category) => { return category.split(' ').reduce((capitalized,word,i) => { return (capitalized[0].toUpperCase() + capitalized.slice(1) + ' ' + word[0].toUpperCase() + word.slice(1)) }) } );
}



const objectCategories = createCategory(Categories);
const noUndescoreCategories = adjustCategory(objectCategories);
const capitalizedCategories = capitalizeCategories(noUndescoreCategories);
const allCombinations = Categories.map( (category) => {
  const result = capitalizedCategories.map( (capitalized) => {
      const result2 = createObject(capitalized,getDistinctValues(list,category));
      return result2;
  } );
  return result;
})

// Get all subcategories based on a list of Categories
// Must have the correct order from Categories list
const getSubCategoriesByIndex = (index) => {
  return allCombinations.map((value) => {  return value[index]; })[index];
}


const allSubCategoriesObjects = Categories.map( (value,index) => { return getSubCategoriesByIndex(index);  } );


// console.log(getDistinctValues(list,'ux-quality'))
// console.log(allSubCategoriesObjects[0]);

const sanitezed = Categories.map( (value, index) => { return allSubCategoriesObjects[index] } )
const jsonSanitezed = JSON.stringify(sanitezed);

// console.log(sanitezed.map((value, index) => {
//  return value.length;
// }));
// Creating a file with sanitized data
// fs.writeFile('sanitized_data.json', jsonSanitezed, (err,result) => { if(err) console.log(result) });

// Trying to create Group Object
// console.log(capitalizedCategories.sort());
const articleXsub = list.map(
  ( article ) => {
    return {
      name:article.ux_instruments,
      c1:article.type_of_instrument,
      c2:article.type_of_approach,
      c3:article.application_domain,
      c4:article['ux-quality'],
      c5:article.target_users_,
      c6:article.framework,
    }
  })

console.log(allSubCategoriesObjects);

const articleXsubJSON = JSON.stringify(articleXsub);
// fs.writeFile('articleXsub.json', articleXsubJSON, (err,result) => { if(err) console.log(result) });

// c1 type of instrument
// c2 type of approach
// c3 application domain
// c4 ux quality
// c5 target users
// c6 framework


