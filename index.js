'use strict';
module.change_code = 1;
var _ = require('lodash');
var Skill = require('alexa-app');
var MADLIB_BUILDER_SESSION_KEY = 'MADLIB_BUILDER_SESSION_KEY';
var skillService = new Skill.app('madlibbuilder');
var MadlibHelper = require('./madlib_helper');
var DatabaseHelper = require('./database_helper');
var databaseHelper = new DatabaseHelper();
skillService.pre = function(request, response, type) {
  databaseHelper.createMadlibsTable();
};
var getMadlibHelper = function(madlibHelperData) {
  if (madlibHelperData === undefined) {
    madlibHelperData = {};
  }
  return new MadlibHelper(madlibHelperData);
};
var cancelIntentFunction = function(req, res) {
  res.say('Goodbye!').shouldEndSession(true);
};

skillService.intent('AMAZON.CancelIntent', {}, cancelIntentFunction);
skillService.intent('AMAZON.StopIntent', {}, cancelIntentFunction);
var getMadlibHelperFromRequest = function(request) {
  var madlibHelperData = request.session(MADLIB_BUILDER_SESSION_KEY);
  return getMadlibHelper(madlibHelperData);
};
var madlibIntentFunction = function(madlibHelper, request, response) {
  var stepValue = request.slot('STEPVALUE');
  madlibHelper.started = true;
  if (stepValue !== undefined) {
    madlibHelper.getStep().value = stepValue;
  }
  if (madlibHelper.completed()) {
    var completedMadlib = madlibHelper.buildMadlib();
    response.card(madlibHelper.currentMadlib().title, completedMadlib);
    response.say(completedMadlib);
    response.shouldEndSession(true);
  } else {
    if (stepValue !== undefined) {
      madlibHelper.currentStep++;
    }
    response.say('Gib mir ' + madlibHelper.getPrompt());
    response.reprompt('Ich konnte nichts hören. Gib mir ' + madlibHelper.getPrompt() + ' um weiterzumachen.');
    response.shouldEndSession(false);
  }
  response.session(MADLIB_BUILDER_SESSION_KEY, madlibHelper);
  response.send();
};

skillService.launch(function(request, response) {
  var prompt = 'Willkommen zum verrückten Satz.' +
    ' Um einen neuen Satz zu bauen, sage neuer Satz.';		// neuer Satz
  response.say(prompt).shouldEndSession(false);
});

skillService.intent('AMAZON.HelpIntent', {},
  function(request, response) {
    var madlibHelper = getMadlibHelper(request);
    var help = 'Willkommen zum verrückten Satz.' +
      ' Um einen neuen Satz zu bauen, sage neuer Satz.' +
      ' Du kannst auch Stop oder Abbrechen sagen um mit dem Spiel aufzuhören.';
    if (madlibHelper.started) {
      help = madlibHelper.getStep().help;
    }
    response.say(help).shouldEndSession(false);
  });

skillService.intent('loadMadlibIntent', {
  'utterances': ['{lade|setze|das} {|ein|eine|die|den|das} {|letzte} {Satz|Spiel} {|fort|fortsetzen}']
},
  function(request, response) {
    var userId = request.userId;
    databaseHelper.readMadlibData(userId).then(function(loadedMadlibHelper) {
      return madlibIntentFunction(loadedMadlibHelper, request, response);
    });
    return false;
  });

skillService.intent('madlibIntent', {
  'slots': {
    'STEPVALUE': 'STEPVALUES'
  },
  'utterances': ['{neues|neuer|neue|starte|erzeuge|beginne|baue} {|ein|eine|die|den|das} {|neues|neuen} {Satz|Spiel}',
    '{-|STEPVALUE}'
  ]
},
  function(request, response) {
    madlibIntentFunction(getMadlibHelperFromRequest(request), request,
      response);
  }
);

skillService.intent('saveMadlibIntent', {
  'utterances': ['{speichere|sichere|merke} {|dir|mir} {|ein|eine|die|den|das|mein|meine} {Satz|Spiel}']
},
  function(request, response) {
    var userId = request.userId;
    var madlibHelper = getMadlibHelperFromRequest(request);
    databaseHelper.storeMadlibData(userId, madlibHelper).then(
      function(result) {
        return result;
      }).catch(function(error) {});
    response.say(
      'Ich habe mir Deinen Satz bis hierher gemerkt.'
    );
    response.shouldEndSession(true).send();
    return false;
  }
);

module.exports = skillService;