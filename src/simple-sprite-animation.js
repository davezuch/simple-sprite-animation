/*
 * simple-sprite-animation
 * https://github.com/ssklar/simple-sprite-animation
 *
 * Copyright (c) 2013 Sasha Sklar
 * Licensed under the MIT license.

 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */

/**
 * See (http://jquery.com/).
 * @name jQuery
 * @class 
 * See the jQuery Library  (http://jquery.com/) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 */

/**
 * See (http://jquery.com/)
 * @name fn
 * @class 
 * See the jQuery Library  (http://jquery.com/) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 * @memberOf jQuery
 */

/**
   * myAwesomePlugin - an awesome jQuery plugin. 
   *
   * @class myAwesomePlugin
   * @memberOf jQuery.fn
   */
;(function ( $, window, document, undefined ) {
    var pluginName = 'animateSprite',
        defaults = {
            autoplay: "true",
            repeat: "true",
            framerate: 30
        };

    /**
     * [Plugin description]
     * @param {[type]} element
     * @param {[type]} options
     */
    function Plugin( element, options ) {
        this.element = element;
        this.$element = $(element);
        this.data = this.$element.data();

        this.options = $.extend( {}, defaults, options, this.data);
        console.log("options", this.options);
        
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }

    /**
     * [init description]
     * @return {[type]}
     */
    Plugin.prototype.init = function () {
      this.frame = 0;
      this.height = this.$element.height();
      this.width = this.$element.width();

      this.$element.css({
        'background-image': 'url(' + this.data.src + ')'
      });

      if (this.options.autoplay) {
        this.play();
      }
    };

    /**
     * [getImageDimensions description]
     * @param  {[type]} src
     * @return {[type]}
     */
    Plugin.prototype.getImageDimensions = function( src ) {
      var t = new Image(); 
      t.src = src;
      return [t.width, t.height];
    };

    /**
     * This method starts the animation.
     * @return {[type]}
     */
    Plugin.prototype.play = function() {
      this.interval = window.setInterval($.proxy(this.onInterval, this), 100);
    };

    /**
     * Pauses the animation, does not reset the frame.
     * @return {[type]}
     */
    Plugin.prototype.pause = function() {
      window.clearInterval(this.interval);
    };

    /**
     * [onInterval description]
     * @return {[type]}
     */
    Plugin.prototype.onInterval = function() {
      this.frame++;

      if ((this.frame === this.options.frames) && !this.options.repeat) {
        window.clearInterval(this.interval);
        return;
      }

      this.frame = this.frame > this.options.frames ? 1 : this.frame;
      //console.log('frame', this.frame);
      var offset = this.frame * this.width;
      console.log("frame", this.frame, "offset", offset, "width", this.width);

      this.$element.css({
         'background-position': "-" + offset + 'px 0'
      });
    };

    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );