const Article = require('../models/Article');
const { Category } = require('../models/Category');
const { SubCategory } = require('../models/Category');
const { Group } = require('../models/Group');
const json = require('../dataa.json');
const axsub = require('../articleXsub.json');

const createArticle = async (req,res) => {

  const {name, reference, year, main, general} = req.body;
  const article =  {
    name,
    reference,
    year,
    main,
    general,
  }

  if(!name || !year || !reference) {
    res.status(422).json({error: 'Fill mandatory fields!'})
    return;
  }

  try {
    await Article.create(article);
    res.status(201).json({message: 'Article successfully stored!'});

  } catch (error) {
     res.status(500).json({error:error});
  }

}

const getArticleById = async (req,res) => {
  const id = req.params.id;
  try {

    const article = await Article.findOne({_id: id});
    const csData = await Group.find({articleID:id}).populate( {path:'subcategoryID', populate: { path: 'categoryID' }});
    if(!article){
      res.status(422).json({message: "Article wasn't found!"});
      return;
    }
    if(!csData){
      res.status(422).json({message: "There's no group data for this article"});
    }
    let articleFull = {
      article:article,
      categorys: [],
      subcategorys: []
    }

    csData.forEach(value => {
      articleFull.categorys.push(value.subcategoryID.categoryID.name);
      articleFull.subcategorys.push(value.subcategoryID.name);
    });
    console.log(articleFull);
    res.status(200).json(articleFull);

  } catch (error) {
     res.status(500).json({error:error});
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
    res.status(200).json(article);

  } catch (error) {
     res.status(500).json({error:error});
  }
}

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);

  } catch (error) {
     res.status(500).json({error:error});
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
    res.status(200).json(await Promise.all(articles));

  } catch (error) {
     res.status(500).json({error:error});
  }
}

const patchArticle = async (req,res) => {
  const id = req.params.id;
  const {name, reference, year, main, general} = req.body;
  const article =  {
    name,
    reference,
    year,
    main,
    general,
  }

  try {

    const updatedArticle = await Article.updateOne({ _id:id }, article);
    if ( updatedArticle.matchedCount === 0 ){
      res.status(422).json({message:"Article not found for update!"})
    }
    res.status(200).json(updatedArticle);

  } catch {
     res.status(500).json({error:error});
  }
}

const deleteArticle = async (req,res) => {
  const id = req.params.id;
  const article = await Article.findOne({_id: id});
  if(!article){
    res.status(422).json({message: "Article not found for delete!"});
    return;
  }
  try {
    await Article.deleteOne({_id:id});
    res.status(200).json({message:'Article removed successfully!'});

  } catch {
     res.status(500).json({error:error});
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
                  console.log(damn);
                }
              }
            }
          }
        }
      }
    }
  } )
  res.status(200).json(list);
}
module.exports.sendGroupToDatabase = sendGroupToDatabase;


module.exports.createArticle = createArticle;
module.exports.getArticleById = getArticleById;
module.exports.getArticleByName = getArticleByName;
module.exports.getArticlesBySubcategory = getArticlesBySubcategory ;
module.exports.getArticles = getArticles;
module.exports.patchArticle = patchArticle;
module.exports.deleteArticle = deleteArticle;

const testScratch = async (req,res) => {
  const frontData = req.body;
  // const list = frontData.map( async (objs) => {
  //   return await Group.find({
  //     $or: [ {subcategoryID:{$in:obj.category.selections}} ]
  //   })
  // } )

  const result = await Group.find({
      $or: [
      { subcategoryID:{$in:frontData[0]?.category.selections}},
      { subcategoryID:{$in:frontData[1]?.category.selections}},
      { subcategoryID:{$in:frontData[2]?.category.selections}},
      { subcategoryID:{$in:frontData[3]?.category.selections}},
      { subcategoryID:{$in:frontData[4]?.category.selections}},
      { subcategoryID:{$in:frontData[5]?.category.selections}},
      ]
  });
  console.log("START=====")
  console.log(result);
  console.log("END======")
  res.status(200).json(result);


}
module.exports.testScratch = testScratch;

const populateGroup = async ( req, res ) => {
  const list = req.body;
  // res.status(200).json(list);
  const populated = await Group.populate(list, 'articleID')
  if(populated){
    console.log(populated);
    res.status(200).json(populated);
  }
  // res.status(500).json({message:"Error"});
}

module.exports.populateGroup = populateGroup;


