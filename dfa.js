"use strict";

function validate(definition) {
    var error;

    function forEachFinal(f) {
        var i, result;

        for (i = 0; i < definition.finals.length; i += 1) {
            result = f(definition.finals[i]);

            if (result) {
                return result;
            }
        }
    }

    function forEachTransition(f) {
        var state, character, destination, result;

        for (state in definition.states) {
            if (definition.states.hasOwnProperty(state)) {
                for (character in definition.states[state]) {
                    if (definition.states[state].hasOwnProperty(character)) {
                        destination = definition.states[state][character];

                        result = f(state, character, destination);

                        if (result) {
                            return result;
                        }
                    }
                }
            }
        }
    }

    function isStateUndefined(name) {
        return definition.states.hasOwnProperty(name) === false;
    }

    // Definition is mandatory

    if (!definition) {
        return "Invalid definition";
    }

    // Start state is mandatory

    if (!definition.start) {
        return "Start state not specified";
    }

    // Final states are mandatory

    if (!definition.finals) {
        return "Final states not specified";
    }

    // At least one final state must be specified

    if (definition.finals.length === 0) {
        return "No final states listed";
    }

    // Definition of states must be specified

    if (!definition.states) {
        return "No states specified";
    }

    // Definition of start state must be specified

    if (isStateUndefined(definition.start)) {
        return "The initial state has no definition";
    }

    // Definition of every final state must be specified

    error = forEachFinal(function (f) {
        if (isStateUndefined(f)) {
            return "Final state '" + f + "' has no definition";
        }
    });

    if (error) {
        return error;
    }

    // Each state must process one character at a time and the destination must have a 
    // definition

    error = forEachTransition(function (state, character, destination) {
        if (character.length !== 1) {
            return "Invalid character '" + character + "' for state '" + state + "'";
        }

        if (isStateUndefined(destination)) {
            return "State '" + state + "' has a non-existing destination '" + destination + "'";
        }
    });

    if (error) {
        return error;
    }
}

exports.create = function (definition) {
    var error;

    error = validate(definition);

    if (error) {
        throw new Error(error);
    }

    return {
        accept: function (s) {
            var current, i;

            if (typeof s !== "string") {
                throw new Error("Input is not a string");
            }

            current = definition.start;

            // During the process, current can be undefined because of unrecognized character
            // for the current state. We can stop the loop as soon as current becomes undefined.

            for (i = 0; i < s.length && current; i += 1) {
                current = definition.states[current][s[i]];
            }

            return definition.finals.indexOf(current) !== -1;
        }
    };
};
