var assert = require("assert");

var dfa = require("../dfa");

describe("dfa", function () {
    var definition, automaton;

    function create() {
        return dfa.create(definition);
    }

    beforeEach(function () {
        definition = {
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

        automaton = create();
    });

    describe("create()", function () {
        

        it("should create a DFA with a correct definition", function () {
            assert.ok(create());
        });

        it("should throw an error if definition is missing", function () {
            assert.throws(function () {
                dfa.create(null);
            });
            assert.throws(function () {
                dfa.create(undefined);
            });
        });

        it("should throw an error if start is missing", function () {
            delete definition.start;
            assert.throws(create);
        });

        it("should throw an error if finals is missing", function () {
            delete definition.finals;
            assert.throws(create);
        });

        it("should throw an error if no final states are listed", function () {
            definition.finals = [];
            assert.throws(create);
        });

        it("should throw an error if states is missing", function () {
            delete definition.states;
            assert.throws(create);
        });

        it("should throw an error if no definition for start is specified", function () {
            definition.start = "missing";
            assert.throws(create);
        });

        it("should throw an error if no definition for a final state is specified", function () {
            definition.finals.push("missing");
            assert.throws(create);
        });

        it("should throw an error if a states recognizes strings instead of chars", function () {
            definition.states.START.abc = "SB";
            assert.throws(create);
        });

        it("should throw an error if a states wants to jump to an undefined state", function () {
            definition.states.START.a = "missing";
            assert.throws(create);
        });
    });

    describe("automaton", function () {
        it("should throw an error if input is not a string", function () {
            assert.throws(function () {
                automaton.accept(null);
            });
            assert.throws(function () {
                automaton.accept(undefined);
            });
            assert.throws(function () {
                automaton.accept({});
            });
            assert.throws(function () {
                automaton.accept([]);
            });
            assert.throws(function () {
                automaton.accept(function () {});
            });
        });

        it("should respect the definition", function () {
            assert.equal(automaton.accept(""), false);
            assert.equal(automaton.accept("ab"), true);
            assert.equal(automaton.accept("abc"), false);
            assert.equal(automaton.accept("aba"), false);
            assert.equal(automaton.accept("abab"), true);
        });
    });
});