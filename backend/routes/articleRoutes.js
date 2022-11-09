const router = require('express').Router();
const Article = require('../models/Article');

// Adding an article to database
// TODO: we need to add a group to the article and their categories
// TODO: we need to add main idea property and general procedure
router.post('/', async (req,res) => {

  const {name,reference,year,type} = req.body;
  const article =  {
    name,
    reference,
    year,
    type
  }

  if(!name) {
    res.status(422).json({error: 'O nome é obrigatório'})
    return;
  }

  try {
    await Article.create(article);

    res.status(201).json({message: 'Artigo inserido com sucesso'});

  } catch (error) {
     res.status(500).json({error:error});
  }

});

// Recieving all articles stored
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);

  } catch (error) {
     res.status(500).json({error:error});
  }
})

// Recieving an article by id
router.get('/:id', async (req,res) => {
  const id = req.params.id;
  try {

    const article = await Article.findOne({_id: id});
    if(!article){
      res.status(422).json({message: "O usuários não foi encontrado"});
      return;
    }
    res.status(200).json(article);

  } catch {
     res.status(500).json({error:error});
  }
})

// Updating our articles data (PUT -- Update all the article, PATCH update part of an article)
router.patch('/:id', async (req,res) => {
  const id = req.params.id;
  const {name,reference,year,type} = req.body;
  const article =  {
    name, reference, year, type
  }

  try {

    const updatedArticle = await Article.updateOne({ _id:id } ,article);
    if ( updatedArticle.matchedCount === 0 ){
      res.status(422).json({message:"Usuário não encontrado!"})
    }
    res.status(200).json(updatedArticle);

  } catch {
     res.status(500).json({error:error});
  }
})

// Delete an article by id
router.delete('/:id', async (req,res) => {
  const id = req.params.id;
  const article = await Article.findOne({_id: id});
  if(!article){
    res.status(422).json({message: "O usuários não foi encontrado!"});
    return;
  }
  try {
    await Article.deleteOne({_id:id});
    res.status(200).json({message:'Usuário removido com sucesso!'});

  } catch {
     res.status(500).json({error:error});
  }
})
module.exports = router;
