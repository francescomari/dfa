var dfa = require("../dfa");

function create(definition) {
    return dfa.create(definition);
}

function callCreate(definition) {
    return function () {
        return create(definition);
    };
}

module.exports = {
    setUp: function (done) {
        this.definition = {
            start: "START",

            finals: ["SB"],

            states: {
                START: {
                    "a": "SA"
                },
                SA: {
                    "b": "SB"
                },
                SB: {
                    "a": "SA"
                }
            }
        };

        done();
    },

    testCorrectDefinition: function (test) {
         test.ok(create(this.definition));
         test.done();
    },

    testMissingDefinition: function (test) {
        test.throws(callCreate(null));
        test.throws(callCreate(undefined));
        test.done();
    },

    testMissingStart: function (test) {
        delete this.definition.start;
        test.throws(callCreate(this.definition));
        test.done();
    },

    testMissingFinals: function (test) {
        delete this.definition.finals;
        test.throws(callCreate(this.definition));
        test.done();
    },

    testEmptyFinals: function (test) {
        this.definition.finals = [];
        test.throws(callCreate(this.definition));
        test.done();
    },

    testMissingStates: function (test) {
        delete this.definition.states;
        test.throws(callCreate(this.definition));
        test.done();
    },

    testMissingStartDefinition: function (test) {
        this.definition.start = "missing";
        test.throws(callCreate(this.definition));
        test.done();
    },

    testMissingFinalDefinition: function (test) {
        this.definition.finals.push("missing");
        test.throws(callCreate(this.definition));
        test.done();
    },

    testMultipleChars: function (test) {
        this.definition.states.START.abc = "SB";
        test.throws(callCreate(this.definition));
        test.done();
    },

    testMissingDestinationStateDefinition: function (test) {
        this.definition.states.START.a = "missing";
        test.throws(callCreate(this.definition));
        test.done();
    }
};
