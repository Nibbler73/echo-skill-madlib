"use strict";
module.change_code = 1;
var _ = require("lodash");

function MadlibHelper(obj) {
  this.started = false;
  this.madlibIndex = -1;
  this.currentStep = 0;
  this.madlibs = [
    {
      title: "Ein kalter November Tag",
      template: "Es war ein ${adjective_1}er, kalter November Tag."
      			+ " Ich wachte zu dem Geruch von gebratenem ${type_of_bird} auf. Der Geruch kam aus der Richtung ${room_in_house}."
      			+ " Meine Mama sagte, \"Schau doch mal bitte, ob ${relative_name} ein neues ${noun_1} benötigt.\""
      			+ " Also habe ich ein Tablett voller mit ${a_liquid} gefüllter Gläser in das ${verb_ending_in_ing} Zimmer getragen.",
      steps: [
        {
          value: null,
          template_key: "adjective_1",
          prompt: "ein Adjektiv",
          help: "Sag ein Adjektiv um es zum Satz hinzuzufügen. Ein Adjektiv ist ein Eigenschaftswort das ein Wesen, ein Geschehen oder ein Ding, mit einem bestimmten Merkmal oder mit einer bestimmten Eigenschaft kennzeichnet. Zum Beispiel: ein faules Ei, ein bewölkter Tag. Oder ein großes, kaltes Glas Wasser. Welches Adjektiv möchtest Du?"
        },
        {
          value: null,
          template_key: "type_of_bird",
          prompt: "eine Vogelart",
          help: "Sage mir eine Vogelart die ich zum Satz hinzuzufügen soll. Was für einen Vogel möchtest Du haben?",
        },
        {
          value: null,
          template_key: "room_in_house",
          prompt: "den Namen eines Zimmers in Deiner Wohnung",
          help: "Sage mir ein Zimmer aus Deiner Wohnung, oder aus der Wohnung von Freunden, das ich zu dem Satz. Welches Zimmer möchtest Du verwenden?",
        },
        {
          value: null,
          template_key: "relative_name",
          prompt: "den Namen eines Verwandten",
          help: "Sage den Namen eines Verwandten für den Satz. Wessen Namen möchtest Du gerne verwenden?"
        },
        {
          value: null,
          template_key: "noun_1",
          prompt: "ein Nomen",
          help: "Sage mir ein Nomen um es dem Satz hinzuzufügen. Ein Nomen ist ein Wort, das ein Ding oder ein Lebewesen bezeichnet. Welches Nomen möchtest Du verwenden?"
        },
        {
          value: null,
          template_key: "a_liquid",
          prompt: "eine Flüssigkeit",
          help: "Sage eine Flüssigkeit die ich zum Satz hinzufügen soll. Zum Beispiel sind Wasser, Lava, Orangensaft, Olivenöl oder Milch alles Flüssigkeiten. Welche Flüssigkeit soll ich mir notieren?"
        },
        {
          value: null,
          template_key: "verb_ending_in_ing",
          prompt: "ein Verb als Substantiv",
          help: "Sage ein Verb in der substantivierten Form für den Satz. Ein substantiviertes Verb ist ein Wort, das eine Tätigkeit oder ein Geschehen beschreibt als Nomen. Ein Tu-Wort als Sache. Laufen, Singen, Gehen, Berühren, sind Beispiele dafür. Welches substantivierte Verb sollen wir verwenden?"
        }]
    },
    {
      title: "Heute machen wir einen Ausflug",
      template: "Ich stand vor meinem Schrank und wählte aus: ${kleidung_plural_1}, ${kleidung_plural_1}, ${kleidung_plural_1}, eine Zahnbürste und ein Handtuch."
              + " Das sollte genügen, denn ich ziehe immer nur ${kleidung_plural_1} an. So bin ich eben."
              + " Unser Gepäck wog über ${zahl_70_bis_900} Kilogramm!"
              + " Als alles verstaut war, fuhren wir los. Wir trällerten gemeinsam lautstark \"${lied_1}\"."
              + " Ich guckte aus dem Fenster."
              + " Da huschte ${tier_mit_artikel} über die Straße, mitten in der zweiten Strophe."
              + " Meine Mutter schrie: \"Guckt mal, ${tier_mit_artikel}!\"",
      steps: [
        {
          value: null,
          template_key: "kleidung_plural_1",
          prompt: "ein Kleidungsstück im Plural",
          help: "Sag ein Kleidungsstück im Plural um es zum Satz hinzuzufügen. Zum Beispiel: Schuhe, Röcke, Hosen oder Mützen. Welches Kleidungsstück im Plural möchtest Du?"
        },
        {
          value: null,
          template_key: "tier_mit_artikel",
          prompt: "ein Tier mit unbestimmtem Artikel",
          help: "Sage mir ein Tier mit unbestimmtem Artikel das ich zum Satz hinzuzufügen soll. Zum Beispiel: ein Löve, eine Giraffe, ein Elefant. Was für ein Tier mit unbestimmtem Artikel möchtest Du haben?"
        },
        {
          value: null,
          template_key: "zahl_70_bis_900",
          prompt: "eine Zahl zwischen 70 und 900",
          help: "Sage mir eine Zahl zwischen 70 und 900, die ich zu dem Satz hinzufügen kann. Welche Zahl zwischen 70 und 900 möchtest Du verwenden?"
        },
        {
          value: null,
          template_key: "lied_1",
          prompt: "den Titel eines Liedes",
          help: "Sage den Namen eines Liedes für den Satz. Wessen Namen möchtest Du gerne verwenden?"
        }]
    },
    {
      title: "Der Kunst-Report: \"Die Große Kunst\"",
      template: "Mit ${dein_name} ist ein großer und bedeutender Künstler nach ${stadt_1} gekommen."
      + " Das ${nomen_plural_1}museum zeigt erstmalig die Ausstellung \"${nomen_1}\" mit der ${dein_name} zu Anerkennung und Weltruhm gelangte."
      + " Das Außergewöhnliche der Werke von ${dein_name} ist der ${adjektiv_1}e Stil und die ${adjektiv_2}e Farbgebung der Bilder."
      + " \"Mein Werk ${nomen_1} ${orts_angabe_1} ebnete den Weg für meine internationale Künstler-Karriere\", so ${dein_name} gegenüber unserer Zeitung. "
      + " Vergleiche mit ${kuenstler_1} und ${kuenstler_2} sind durchaus angebracht und keinesfalls übertrieben.",
      steps: [
        {
          value: null,
          template_key: "dein_name",
          prompt: "Deinen Namen",
          help: "Sag Deinen Namen um ihn zum Satz hinzuzufügen. Welchen Namen möchtest Du?"
        },
        {
          value: null,
          template_key: "stadt_1",
          prompt: "DeineStadt",
          help: "Sag DeineStadt um ihn zum Satz hinzuzufügen. WelcheStadt möchtest Du?"
        },
        {
          value: null,
          template_key: "nomen_plural_1",
          prompt: "ein Nomen im Plural",
          help: "Sage mir ein Nomen im Plural um es dem Satz hinzuzufügen. Ein Nomen ist ein Wort, das ein Ding oder ein Lebewesen bezeichnet. Zum Beispiel: Türen, Flugzeuge oder Nashörner. Welches Nomen im Plural möchtest Du verwenden?"
        },
        {
          value: null,
          template_key: "nomen_1",
          prompt: "ein weiteres Nomen",
          help: "Sage mir ein Nomen um es dem Satz hinzuzufügen. Ein Nomen ist ein Wort, das ein Ding oder ein Lebewesen bezeichnet. Zum Beispiel: Giraffe, Hamster oder Auto. Welches Nomen möchtest Du verwenden?"
        },
        {
          value: null,
          template_key: "adjektiv_1",
          prompt: "Ein Adjektiv",
          help: "Sag ein Adjektiv um es zum Satz hinzuzufügen. Ein Adjektiv ist ein Eigenschaftswort das ein Wesen, ein Geschehen oder ein Ding, mit einem bestimmten Merkmal oder mit einer bestimmten Eigenschaft kennzeichnet. Zum Beispiel: faul, warm oder grün. Welches Adjektiv möchtest Du?"
        },
        {
          value: null,
          template_key: "adjektiv_2",
          prompt: "Ein weiteres Adjektiv",
          help: "Sag ein Adjektiv um es zum Satz hinzuzufügen. Ein Adjektiv ist ein Eigenschaftswort das ein Wesen, ein Geschehen oder ein Ding, mit einem bestimmten Merkmal oder mit einer bestimmten Eigenschaft kennzeichnet. Zum Beispiel: groß, bunt oder dick. Welches Adjektiv möchtest Du?"
        },
        {
          value: null,
          template_key: "kuenstler_1",
          prompt: "den Namen eines Künstlers oder eines Stars",
          help: "Sage mir den Namen eines Künstlers oder eines Stars um ihn dem Satz hinzuzufügen. Zum Beispiel Mozart, Elsa oder Lady Gaga. Welchen Namen eines Künstlers oder Stars möchtest Du verwenden?"
        },
        {
          value: null,
          template_key: "kuenstler_2",
          prompt: "noch einen Künstler oder Star",
          help: "Sage mir den Namen eines Künstlers oder eines Stars um ihn dem Satz hinzuzufügen. Zum Beispiel Mozart, Elsa oder Lady Gaga. Welchen Namen eines Künstlers oder Stars möchtest Du verwenden?"
        },
        {
          value: null,
          template_key: "orts_angabe_1",
          prompt: "eine Ortsangabe (z.B. \"in der Küche\")",
          help: "Sage eine Ortsangabe für den Satz. Zum Beispiel im Flughafen, auf einer Insel, in Köln oder in der Küche. Welche Ortsangabe möchtest Du gerne verwenden?"
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
  if(this.madlibIndex < 0) {
    this.madlibIndex = Math.floor( Math.random() * this.madlibs.length );
  }
  console.log('this.madlibIndex: ' + this.madlibIndex);
  return this.madlibs[this.madlibIndex];
};

module.exports = MadlibHelper;