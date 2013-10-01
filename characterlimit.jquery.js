/**
 * Input/textarea character counter
 *
 * Call the method on any jQuery node/nodelist, with an optional first
 * parameter as the charater limit. If no limit is specifed, the data-attr
 * will be used, otherwise falling back to a predefined limit.
 *
 * @param  DOMnode el the element(s) to enable character counting on
 * @return jquery executable
 * @author Adam Brewer
 *
 */
(function($){
    $.characterlimit = function(el, limit, options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object
        base.$el.data("characterlimit", base);

        base.init = function(){

            // Use the limit count passed in, or get the character
            // limit from the data-attr, else use the default
            base.limit =  limit || parseInt(base.$el.data('character-limit'), 10) || 160;

            // Not in use
            // base.options = $.extend({},$.characterlimit.defaultOptions, options);

            // Find the associated element where the
            // status-update should display
            var targetId = base.$el.data('id');
            base.$elStatus = $('[data-limit-status="'+targetId+'"]');

            // The submit button
            // This will be disabled when the character count
            // has passed the limit
            base.$submitBtn = $('[data-limit-submit="'+targetId+'"]');

            _events();

            base.$el.trigger('keyup');
        };

        function _events () {

            // only allow status updates if we have a status
            // element to inject our result in to
            if ( base.$elStatus.length ) {
                base.$el.on('keyup', function (evt) {
                    var keycode = evt.keyCode || false,
                        charCount = this.value.length,
                        charsRemain = base.limit - charCount;
                    if ( charsRemain >= 0 ) {
                        // base.$elStatus.removeClass('error').html(charsRemain + ' characters left');
                        base.$elStatus.removeClass('error').html(charsRemain);
                        base.$submitBtn.attr('disabled', false);
                    } else {
                        // base.$elStatus.addClass('error').html('Whoops! '+ Math.abs(charsRemain) +' characters too many');
                        base.$elStatus.addClass('error').html(charsRemain);
                        base.$submitBtn.attr('disabled', 'disabled');
                    }
                });
            }

            // Only needed for throttling the character count
            /*
            base.$el.on('keydown', function (evt) {
                var charCount = this.value.length,
                    keycode = evt.keyCode || false;
                // still allow backspacing :)
                if ( keycode !== 8 && charCount >= base.limit ) {
                    evt.preventDefault();
                    return;
                }
            });
            */
        };

        base.init();
    };

    // Not in use
    // $.characterlimit.defaultOptions = {};

    $.fn.characterlimit = function(limit, options){
        return this.each(function(){
            (new $.characterlimit(this, limit, options));
        });
    };

})(jQuery);
