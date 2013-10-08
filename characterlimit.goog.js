/**
 * The Google Closure version of this plugin.
 *
 * This module only takes a single element for instantiation.
 *
 * For usage, please consult the readme or the
 * jquery version of this.
 *
 * Note: This file probably won't see a lot of use, so please
 * check before using in production.
 *
 */

goog.provide('CharacterLimit');

goog.require('goog.dom');
goog.require('goog.dom.classlist');
goog.require('goog.dom.query');
goog.require('goog.events');
goog.require('goog.events.EventType');

/**
 * @constructor
 *
 */
 CharacterLimit = function(element, limit) {

 	this.$el = element;

 	// Use the limit count passed in, or get the character
    // limit from the data-attr, else use the default
    this.limit =  limit || parseInt(this.$el.getAttribute('data-character-limit'), 10) || 160;

    // Find the associated element where the
    // status-update should display
    var targetId = this.$el.getAttribute('data-id');
    this.$elStatus = goog.dom.query('[data-limit-status="'+targetId+'"]')[0];

    // The submit button
    // This will be disabled when the character count has passed the limit
    this.$elSubmitBtn = goog.dom.query('[data-limit-submit="'+targetId+'"]')[0];


    this.initEvents();

};


/**
 * InitEvents
 *
 */
CharacterLimit.prototype.initEvents = function () {

	if (this.$elStatus) {
        goog.events.listen(this.$el, goog.events.EventType.KEYUP, this.updateCounter.bind(this));
    }

};

/**
 * UpdateCounter
 *
 * Update the total chars remaining and disable the button if
 * we've gone too far.
 *
 */
CharacterLimit.prototype.updateCounter = function (evt) {

	var keycode = evt.keyCode || false,
        charCount = evt.target.value.length,
        charsRemain = this.limit - charCount;

    // We're updated with the current characters remaining
    this.$elStatus.innerHTML = charsRemain;

    if (charsRemain >= 0) {
        goog.dom.classlist.remove(this.$elStatus, 'error');
        goog.dom.setProperties(this.$elSubmitBtn, { disabled: false });
    } else {
    	goog.dom.classlist.add(this.$elStatus, 'error');
    	goog.dom.setProperties(this.$elSubmitBtn, { disabled: 'disabled' });
    }

};
