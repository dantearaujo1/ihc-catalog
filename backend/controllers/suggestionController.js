const Suggestion = require('../models/Suggestion');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const createSuggestion = async (req,res) => {
  const {name, email, link, description} = req.body;
  const suggestion =  {
    name,
    email,
    link,
    description,
    status:'Not checked',
    sentDate: Date.now,
  }

  if(!name || !email || !link || !description ) {
    return res.status(422).json({error: 'Fill mandatory fields!'})
  }

  try {
    const sug = await Suggestion.create();
    if(sug){
      return res.status(201).json({data:sug, message: 'Suggestion has been sent!'});
    }
    return res.status(422).json({error: 'Error sending suggestion'})

  } catch (error) {
     return res.status(500).json({error:error});
  }
}

const approveSuggestion = async (req,res) => {
  const {id, name, email, link, description} = req.body;
  const suggestion =  {
    name,
    email,
    link,
    description,
    status:'Approved',
    updatedAt: Date.now,
  }


  try {
    const sug = await Suggestion.updateOne({_id:id},{status:suggestion.status});
    if(sug){
      return res.status(201).json({data:sug, message: 'Suggestion approved'});
    }
    return res.status(422).json({error: 'Error approving suggestion'})

  } catch (error) {
     return res.status(500).json({error:error});
  }
}
const disapproveSuggestion = async (req,res) => {
  const {id, name, email, link, description} = req.body;
  const suggestion =  {
    name,
    email,
    link,
    description,
    status:'Disapproved',
    updatedAt: Date.now,
  }


  try {
    const sug = await Suggestion.updateOne({_id:id},{status:suggestion.status});
    if(sug){
      return res.status(201).json({data:sug, message: 'Suggestion disapproved!'});
    }
    return res.status(422).json({error: 'Error disapproving a suggestion'})

  } catch (error) {
     return res.status(500).json({error:error});
  }
}

const getAllSuggestions =  async (req,res) =>   {
  try{
    const suggestions = await Suggestion.find({});
    if(!suggestions){
      return res.status(422).json({message: "We couldn't found any suggestion in database"});
    }
    return res.status(202).json(suggestions);

  } catch (err){
     return res.status(500).json({error:err});
  }

}

const createOne = async (req,res) => {
  const suggestion = {
    name:"Dante",
    email:"rock80_10@hotmail.com",
    link:"https://github.com/dantearaujo1/",
    description:"Hello World",
  }
  try{
    const sug = await Suggestion.create(suggestion)
  } catch (err) {

     return res.status(500).json({error:err});
  }
}


module.exports.getAllSuggestions = getAllSuggestions;
module.exports.createSuggestion = createSuggestion;
module.exports.disapproveSuggestion = disapproveSuggestion;
module.exports.approveSuggestion = approveSuggestion;
module.exports.createOne = createOne;
