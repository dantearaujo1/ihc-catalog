const Article = require('../models/Article');
const { Category } = require('../models/Category');
const { SubCategory } = require('../models/Category');
const { Group } = require('../models/Group');
const json = require('../dataa.json');
const axsub = require('../articleXsub.json');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const createArticle = async (req,res) => {

  const {name, reference, year, main, general, subs} = req.body;
  const article =  {
    name,
    reference,
    year,
    main,
    general,
  }

  if(!name || !year ) {
    return res.status(422).json({error: 'Fill mandatory fields!'})
  }

  try {
    const art = await Article.create(article);
    if(art){
      subs.map(async (value, index) => {
        if(value !== ''){
          const group = await Group.create({articleID:art._id, subcategoryID:value});
          if( !group ){
            await Article.deleteOne({_id:art._id});
            return res.status(422).json({message: 'Error Storing Group, But article created and than deleted'});
          }
        }

      } );
      return res.status(201).json({data:art, message: 'Article successfully stored!'});
    }
    return res.status(422).json({error: 'Could not create any article'})

  } catch (error) {
     return res.status(500).json({error:error});
  }

}

const getArticleById = async (req,res) => {
  const id = req.params.id;
  try {

    const article = await Article.findOne({_id: id});
    const csData = await Group.find({articleID:id}).populate( {path:'subcategoryID', populate: { path: 'categoryID' }});
    if(!article){
      return res.status(422).json({message: "Article wasn't found!"});
      return;
    }
    if(!csData){
      return res.status(422).json({message: "There's no group data for this article"});
    }
    let articleFull = {
      Article:article,
      Categorys: [],
      Subcategorys: []
    }

    csData.forEach(value => {
      articleFull.Categorys.push(value.subcategoryID.categoryID.name);
      articleFull.Subcategorys.push(value.subcategoryID.name);
    });
    return res.status(200).json(articleFull);

  } catch (error) {
     return res.status(500).json({error:error});
  }
}
const getArticleByName = async (req,res) => {
  const name = req.params.name;
  try {

    const article = await Article.findOne({name: name});
    if(!article){
      res.status(422).json({message: "Article wasn't found!"});
      return;
    }
    return res.status(200).json(article);

  } catch (error) {
     return res.status(500).json({error:error});
  }
}

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    return res.status(200).json(articles);

  } catch (error) {
     return res.status(500).json({error:error});
  }
}
// This return the articles with name and categorys
const getArticlesBySubcategory = async (req, res) => {
  const subID = req.params.sid;

  try {
    const groups = await Group.find({subcategoryID:subID});
    const articles = groups.map( async (group) => {
      const article = await Article.findOne({_id:group.articleID})
      const subcategory = await SubCategory.findOne({_id:group.subcategoryID});
      const category = await Category.findOne({_id:subcategory.categoryID})
      if(article && subcategory){
        const obj = {Article:article,Category:category,Subcategory:subcategory};
        return (obj);
      }
    } )
    return res.status(200).json(await Promise.all(articles));

  } catch (error) {
     return res.status(500).json({error:error});
  }
}
const getArticlesBySubcategoryName = async (req, res) => {
  const subName = req.params.sname;

  try {
    const sub = await SubCategory.findOne({name:subName});
    if(!sub){
      res.status(422).json({message: "There's no subcategory with this name!"});
      return;
    }
    const groups = await Group.find({subcategoryID:sub._id});
    const articles = groups.map( async (group) => {
      const article = await Article.findOne({_id:group.articleID})
      const category = await Category.findOne({_id:sub.categoryID})
      if(article && category){
        const obj = {Article:article,Category:category,Subcategory:sub};
        return (obj);
      }
    } )
    return res.status(200).json(await Promise.all(articles));

  } catch (error) {
     return res.status(500).json({error:error});
  }
}

const patchArticle = async (req,res) => {
  const {_id, name, reference, year, main, general, subs, olds} = req.body;
  const article =  {
    name,
    reference,
    year,
    main,
    general,
  }

  try {

    const updatedArticle = await Article.updateOne({ _id:_id }, article);
    if ( updatedArticle.matchedCount === 0 ){
      return res.status(422).json({message:"Article not found for update!"})
    }
    const updateGroups = async (id, subs, olds) => {
      for (let index = 0; index < subs.length; index++) {
        const sub = subs[index];
        const old = olds[index];
        if( sub !== old  && old !== ''){
          const group = await Group.updateOne({articleID:id,subcategoryID:old},{subcategoryID:sub});
          if(!group){
            console.log(group);
          }
          else{
            console.log("Didn't found group");
          }
        }
        if( sub !== old  && old === ''){
          const group = await Group.create({articleID:id,subcategoryID:sub});
          if(group){
            console.log(group);
          }
          else{
            console.log("Couldn't create a group");
          }
        }
      }
    }
    await updateGroups(_id, subs, olds);
    return res.status(200).json({data:updatedArticle, message:"Article has been updated!"});

  } catch (err){
     return res.status(500).json({error:err});
  }
}

// Needs to delete every GROUP that contains the article id
// in the field articleID of group
const deleteArticle = async (req,res) => {
  const { id } = req.body

  try {
    const article = await Article.findOne({_id: id});
    if(!article){
      res.status(422).json({message: "Article not found for delete!"});
      return;
    }
    await Article.deleteOne({_id:id});
    const count = await Group.deleteMany({articleID:id})
    return res.status(200).json({message:'Article removed successfully!', referencesCountDeleted: count});

  } catch (err){
     return res.status(500).json({error:err});
  }
}

// Send Local data to the database
// const sendToDatabase =  () => {
//   json.complete_detailed_list.map(async  (item) => {
//     const {ux_instruments, reference, year, main_ideia, general_procedure} = item;
//     const article = {
//       name:ux_instruments,
//       reference,
//       year,
//       main:main_ideia,
//       general:general_procedure,
//     }
//
//     try {
//       await Article.create(article);
//       console.log('Article successfully stored');
//     } catch (error){
//       console.log ('Not added with sendToDatabase');
//       console.log (error);
//     }
//
//   });
// }
// module.exports.sendToDatabase = sendToDatabase;

const sendGroupToDatabase = (req, res) => {
  const list = axsub.filter( async (a) => {
    // WARN: HERE WE HAVE A PROBLEM
    // THERE IS ARTICLES WITH "NO NAME INFORMED"
    const article = await Article.findOne({name:a.name.trim()})
    if (article){
      // console.log(article._id);
      const c1 = await SubCategory.findOne({name:a.c1.trim()});
      if (c1) {
        const c2 = await SubCategory.findOne({name:a.c2.trim()});
        if (c2) {
          const c3 = await SubCategory.findOne({name:a.c3.trim()});
          if (c3) {
            const c4 = await SubCategory.findOne({name:a.c4.trim()});
            if (c4) {
              const c5 = await SubCategory.findOne({name:a.c5.trim()});
              if (c5) {
                const c6 = await SubCategory.findOne({name:a.c6.trim()});
                if (c6){

                  const damn = {
                    articleID:article._id,
                    cat1subID:c1._id,
                    cat2subID:c2._id,
                    cat3subID:c3._id,
                    cat4subID:c4._id,
                    cat5subID:c5._id,
                    cat6subID:c6._id,
                  }
                  await Group.create({
                    articleID:damn.articleID,
                    subcategoryID:damn.cat1subID,
                  })
                  await Group.create({
                    articleID:damn.articleID,
                    subcategoryID:damn.cat2subID,
                  })
                  await Group.create({
                    articleID:damn.articleID,
                    subcategoryID:damn.cat3subID,
                  })
                  await Group.create({
                    articleID:damn.articleID,
                    subcategoryID:damn.cat4subID,
                  })
                  await Group.create({
                    articleID:damn.articleID,
                    subcategoryID:damn.cat5subID,
                  })
                  await Group.create({
                    articleID:damn.articleID,
                    subcategoryID:damn.cat6subID,
                  })
                }
              }
            }
          }
        }
      }
    }
  } )
  return res.status(200).json(list);
}

const searchBySubcategories = async (req,res) => {
  const frontData = req.body;

  let transformedData = []
  for (let index = 0; index < frontData.length; index++) {
    const categoryObject = frontData[index];
    for (let idx = 0; idx < categoryObject.category.selections.length; idx++) {
      const selection = categoryObject.category.selections[idx];
      transformedData.push(ObjectId(selection._id));

    }
  }

  // Everyone OR OPERATOR
  const result = await Group.aggregate([
    {
      $match: {
          subcategoryID: {$in: transformedData},
      },
    },
    {
      $group: {
        _id:"$articleID",
        subcategories:{ $push:"$subcategoryID" },
        matches: {$sum: 1},
      }
    },
    {
      $sort: {
        matches: -1,
        _id:1,
      }
    },
    {
      $lookup: {
        from: "articles",
        localField: "_id",
        foreignField: "_id",
        as:"data",
      }
    },
  ]);

  if(!result){
    return res.status(422).json({message:"There's not Group found with these subcategories"});
  }
  return res.status(200).json(result);
}

const searchBySubcategories2 = async (req,res) => {
  const frontData = req.body;
  const testfunc = async (index) => {
    return await Group.find({
      $or: [
        { subcategoryID:{$in:frontData[index].category.selections}},
      ]
    });
  }
  const array = await frontData.map( (value, index) => {
    return testfunc(index);
  } )

  const data = await Promise.all(array);

  const result = await Group.find({
    $and:[

    ]
  })
  return res.status(200).json(data);
}

const populateGroup = async ( req, res ) => {
  const list = req.body;
  console.log(list);
  // res.status(200).json(list);
  const populated = await Group.populate(list, 'articleID')
  if(populated){
    return res.status(200).json(populated);
  }
  return res.status(500).json({message:"Error"});
}

const getArticleWithSubcategories = async (req, res) => {
  const id = req.params.id;
  const results = await Group.find({articleID: id}).sort({articleID: 1, subcategoryID: 1});

  console.log(results);
  res.status(200).json(results);
}

const getArticleFullData = async (req, res) => {
  const id = req.params.id;
  const ID = ObjectId(id);
  // const results = await Group.find({articleID: id}).populate({path:'articleID'}).populate({path:'subcategoryID', populate:{path:'categoryID'}})
  //
  // res.status(200).json(results);
  const results = await Group.aggregate([
    {
      $match:{
        articleID: ID
      }
    },
    {
      $lookup:{
        from:'articles',
        localField:'articleID',
        foreignField:'_id',
        as:'articleData'
      }
    },
    {
      $lookup:{
        from:'subcategories',
        localField:'subcategoryID',
        foreignField:'_id',
        as:'subcategoryData'
      }
    },
    {
      $unwind:"$articleData"
    },
    {
      $unwind:"$subcategoryData"
    },
    {
      $sort:{
        "subcategoryData.categoryID": 1
      }
    },
    {
      $project:{ _id: 0, articleID: 0, subcategoryID: 0, __v: 0 }
    },
    {
      $group: {
        _id:"$articleData._id",
        data: { $first:"$articleData" },
        subcategories:{ $push:"$subcategoryData" },
      }
    },
    {
      $lookup:{
        from:'categories',
        localField:'subcategories.categoryID',
        foreignField:'_id',
        as:'categories'
      }
    },
    {
      $sort:{
        "categories._id": 1,
      }
    },
  ])
  res.status(200).json(results);
}

module.exports.createArticle = createArticle;
module.exports.getArticleById = getArticleById;
module.exports.getArticleByName = getArticleByName;
module.exports.getArticlesBySubcategory = getArticlesBySubcategory;
module.exports.getArticlesBySubcategoryName = getArticlesBySubcategoryName;
module.exports.getArticles = getArticles;
module.exports.patchArticle = patchArticle;
module.exports.deleteArticle = deleteArticle;
module.exports.populateGroup = populateGroup;
module.exports.searchBySubcategories = searchBySubcategories ;
module.exports.sendGroupToDatabase = sendGroupToDatabase;
module.exports.getArticleWithSubcategories = getArticleWithSubcategories;
module.exports.getArticleFullData = getArticleFullData;

