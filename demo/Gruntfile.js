/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    sprite: {
      dist: {
        // Sprite files to read in
        src: ['./img/frames/*.png'],

        // Location to output spritesheet
        destImg: 'img/sprite.png',

        // don't need the CSS, but it's required
        destCSS: 'dummy.css',

        // OPTIONAL: Specify algorithm (top-down, left-right, diagonal, alt-diagonal)
        algorithm: 'left-right'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-ssa-smith');

  //console.log(grunt.spritesmith);
  
  // Default task.
  grunt.registerTask('default', 'sprite');
};