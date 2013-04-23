"use strict";

var dfa = require("../dfa");

var automaton = dfa.create({
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
});

function accept(s) {
    return automaton.accept(s);
}

function callAccept(s) {
    return function () {
        return accept(s);
    };
}

module.exports = {
    testNonStringInput: function (test) {
        test.throws(callAccept(null));
        test.throws(callAccept(undefined));
        test.throws(callAccept({}));
        test.throws(callAccept([]));
        test.throws(callAccept(function () {}));
        test.done();
    },

    testDefinitionRespected: function (test) {
        test.equal(accept(""), false);
        test.equal(accept("ab"), true);
        test.equal(accept("abc"), false);
        test.equal(accept("aba"), false);
        test.equal(accept("abab"), true);
        test.done();
    }
};
