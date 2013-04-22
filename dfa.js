exports.create = function (definition) {
    var error;

    function validate() {
        var i, name, character, destination;

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

        if (definition.start in definition.states === false) {
            return "The initial state has no definition";
        }

        // Definition of every final state must be specified

        for (i = 0; i < definition.finals.length; i++) {
            if (definition.finals[i] in definition.states === false) {
                return "Final state '" + definition.finals[i] + "' has no definition";
            }
        }

        for (name in definition.states) {
            for (character in definition.states[name]) {

                // Each state must process one character at a time

                if (character.length !== 1) {
                    return "Invalid character '" + character + "' for state '" + name + "'";
                }

                destination = definition.states[name][character];

                // The destination for each state must have a definition

                if (destination in definition.states === false) {
                    return "State '" + name + "' wants to jump to non-existing state '" + destination + "'";
                }
            }
        }

        return null;
    }

    error = validate();

    if (error) {
        throw new Error(error);
    }

    return {
        accept: function (s) {
            var i, current;

            if (typeof s !== "string") {
                throw new Error("Input is not a string");
            }

            current = definition.start;

            // During the process, current can be undefined because of unrecognized character
            // for the current state. We can stop the loop as soon as current becomes undefined.

            for (i = 0; i < s.length && current; i++) {
                current = definition.states[current][s[i]];
            }

            return definition.finals.indexOf(current) !== -1;
        }
    };
}