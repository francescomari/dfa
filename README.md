# Deterministic Finite Automaton

This is a [Deterministic Finite Automaton (DFA)](http://en.wikipedia.org/wiki/Deterministic_finite_automaton) written in JavaScript.

## Define the DFA

The DFA can be defined by a JavaScript object containing the name of the initial state, the name of final states and a definition of every state. For each state you must specify what happens when a character is recognized by the DFA (i.e. which state the automaton should move to).

The following example is a definition for a DFA who recognizes non-empty strings composed by lowercase `a` and `b` in the form of `ab`, `abab`, `ababab`, etc.

```javascript
var definition = {
    // Specify the initial state
    start: "START",
    // Specify the final state(s)
    finals: ["SB"],
    // Define states
    states: {
        // If we recognize character "a" we jump to state "SA"
        START: {
            "a": "SA"
        },
        // If we recognize character "b" we jump to state "SB"
        SA: {
            "b": "SB"
        },
        // The automaton can stop in "SB", because the state is final, or
        // it can jumb back to "SA" if he recognizes an "a"
        SB: {
            "a": "SA"
        }
    }
};
```

## Create the DFA

The DFA is created by invoking the `create()` method of the `dfa` module. This method requires the definition of the DFA specified as a JavaScript object.

```javascript
var automaton = require("dfa").create(definition);
```

Creating a DFA with a non-valid definition will throw an `Error` with a hopefully meaningful error message.

## Use the DFA

A DFA can only recognize if a string of characters is valid based on the definition it was built with. To recognize a string of characters use the `accept()` method.

```javascript
automaton.accept("");        // -> false, the empty string is not recognized
automaton.accept("ab");      // -> true
automaton.accept("abc");     // -> false, "c" not recognized
automaton.accept("aba");     // -> false, "SA" is not a final state
automaton.accept("abab");    // -> true
```

The DFA will throw an error if anything but a string is passed to the `accept()` method.