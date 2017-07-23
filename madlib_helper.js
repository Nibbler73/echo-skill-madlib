"use strict";
module.change_code = 1;
var _ = require("lodash");

function MadlibHelper(obj) {
  this.started = false;
  this.madlibIndex = 0;
  this.currentStep = 0;
  this.madlibs = [
    {
      title: "Ein kalter November Tag",
      template: "Es war ein ${adjective_1}, kalter November Tag."
      			+ " Ich wachte zu dem Geruch von ${type_of_bird} auf, gebraten in dem ${room_in_house}."
      			+ " Mein Freund sagte, \"Schau doch mal bitte, ob ${relative_name} ein neues ${noun_1} benötigt.\""
      			+ " Also habe ich ein Tablett voller mit ${a_liquid} gefüllter Gläser in das ${verb_ending_in_ing} Zimmer getragen.",
      steps: [
        {
          value: null,
          template_key: "adjective_1",
          prompt: "ein Adjektiv",
          help: "Sag ein Adjektiv um es zum Satz hinzuzufügen. Ein Adjektiv ist ein Eigenschaftswort das ein Wesen, ein Geschehen oder ein Ding, mit einem bestimmten Merkmal oder mit einer bestimmten Eigenschaft kennzeichnet. Zum Beispiel: ein faules Ei, ein bewölkter Tag. Oder ein großes, kaltes Glas Wasser. Welches Adjektiv möchtest Du?"
//          prompt: "an Adjective",
//          help: "Speak an adjective to add it to the madlib. An adjective is a word that modifies a noun (or pronoun) to make it more specific: a rotten egg, a cloudy day, or a tall, cool glass of water. What adjective would you like?"
        },
        {
          value: null,
          template_key: "type_of_bird",
          prompt: "eine Vogelart",
          help: "Sage mir eine Vogelart die ich zum Satz hinzuzufügen soll. Was für einen Vogel möchtest Du haben?",
//          prompt: "a Type of bird",
//          help: "Speak a type of bird to add it to the madlib. What type of bird would you like?",
        },
        {
          value: null,
          template_key: "room_in_house",
          prompt: "den Namen eines Zimmers in Deiner Wohnung",
          help: "Sage mir ein Zimmer aus Deiner Wohnung, oder aus der Wohnung von Freunden, das ich zu dem Satz. Welches Zimmer möchtest Du verwenden?",
//          prompt: "a name of Room in a house",
//          help: "Speak a name of a room in a house. What room in a house would you like?",
        },
        {
          value: null,
          template_key: "relative_name",
          prompt: "den Namen eines Verwandten",
          help: "Sage den Namen eines Verwandten für den Satz. Wessen Namen möchtest Du gerne verwenden?"
//          prompt: "a relative's name",
//          help: "Speak a relative's name to add it to the madlib. What relative's name would you like?"
        },
        {
          value: null,
          template_key: "noun_1",
          prompt: "ein Nomen",
          help: "Sage mir ein Nomen um es dem Satz hinzuzufügen. Ein Nomen ist ein Wort, das ein Ding oder ein Lebewesen bezeichnet. Welches Nomen möchtest Du verwenden?"
//          prompt: "a noun",
//          help: "Speak a noun to add it to the madlib. A noun is used to identify any of a class of people, places, or things. What noun would you like?"
        },
        {
          value: null,
          template_key: "a_liquid",
          prompt: "eine Flüssigkeit",
          help: "Sage eine Flüssigkeit die ich zum Satz hinzufügen soll. Zum Beispiel sind Wasser, Lava, Orangensaft, Olivenöl oder Milch alles Flüssigkeiten. Welche Flüssigkeit soll ich mir notieren?"
//          prompt: "a liquid",
//          help: "Speak a type of liquid to add it to the madlib. For example, kool-aid, lava, or orange juice are all liquids. What liquid do you want to add?"
        },
        {
          value: null,
          template_key: "verb_ending_in_ing",
          prompt: "ein Verb als Substantiv",
          help: "Sage ein Verb in der substantivierten Form für den Satz. Ein substantiviertes Verb ist ein Wort, das eine Tätigkeit oder ein Geschehen beschreibt als Nomen. Ein Tu-Wort als Sache. Laufen, Singen, Gehen, Berühren, sind Beispiele dafür. Welches substantivierte Verb sollen wir verwenden?"
//          prompt: "a verb ending in ing",
//          help: "Speak a verb ending in ing to add it to the madlib. Running, living, or singing are all examples. What verb ending in ing do you want to add?"
        }]
    }
  ];
  for (var prop in obj) this[prop] = obj[prop];
}

MadlibHelper.prototype.completed = function() {
  return this.currentStep === (this.currentMadlib().steps.length - 1);
};

MadlibHelper.prototype.getPrompt = function() {
  return this.getStep().prompt;
};

MadlibHelper.prototype.getStep = function() {
  return this.currentMadlib().steps[this.currentStep];
};

MadlibHelper.prototype.buildMadlib = function() {
  var currentMadlib = this.currentMadlib();
  var templateValues = _.reduce(currentMadlib.steps, function(accumulator, step) {
    accumulator[step.template_key] = step.value;
    return accumulator;
  }, {});
  var compiledTemplate = _.template(currentMadlib.template);
  return compiledTemplate(templateValues);
};


MadlibHelper.prototype.currentMadlib = function() {
  return this.madlibs[this.madlibIndex];
};

module.exports = MadlibHelper;