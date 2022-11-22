const Article = require('../models/Article');
const { Category } = require('../models/Category');
const { SubCategory } = require('../models/Category');
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
    if(!article){
      res.status(422).json({message: "Article wasn't found!"});
      return;
    }
    res.status(200).json(article);

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
  axsub.map( async (article) => {
    try {
      // const articleData = await Article.findOne({name:article.name})
      const subCategoryData = await SubCategory.findOne({name:article.c1});
      // console.log(articleData._id);
      if(subCategoryData){

        console.log(subCategoryData);
      }

    } catch (err) {
      // res.status(500).json({error:err});
    }
  } )
}
module.exports.sendGroupToDatabase = sendGroupToDatabase;


module.exports.createArticle = createArticle;
module.exports.getArticleById = getArticleById;
module.exports.getArticleByName = getArticleByName;
module.exports.getArticles = getArticles;
module.exports.patchArticle = patchArticle;
module.exports.deleteArticle = deleteArticle;
