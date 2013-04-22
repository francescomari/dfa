module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            main: {
                src: ["dfa.js"]
            },
            test: {
                src: ["test/*.js"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");

    grunt.registerTask("test", ["jshint"]);
};
