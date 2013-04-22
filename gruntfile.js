module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            main: ["dfa.js"],
            test: ["test/*.js"]
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");

    grunt.registerTask("test", ["jshint"]);
};
