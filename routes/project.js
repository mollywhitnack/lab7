var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;
  console.log("EXPAND: " + projectID);
  models.Project
  .find({"_id": projectID})
  .exec(afterQuery);
  // query for the specific project and
  // call the following callback

  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log("Form Data:" + form_data);

  var model_data = {
  'title': form_data.project_title,
  'date': form_data.date,
  'summary': form_data.summary,
  'image': form_data.image_url,
  }
  //console.log("model data: " + model_data);

  var new_project = new models.Project(model_data);
  
  new_project.save(afterSaving);
  console.log("new project: " + new_project);
  function afterSaving(err){
    if(err){console.log("SAve Error: "+ err);
      res.send('OK');
      res.redirectc('/');
    }
  }

  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;
  console.log("delete : "+ projectID);
  models.Project
  .find({"_id": projectID})
  .remove()
  .exec(afterRemoving);

    function afterRemoving(err) {
    if(err) console.log("REMOVE ERROE: " + err);
    res.send();
  }
  // find the project and remove it
  // YOU MUST send an OK response w/ res.send();
}