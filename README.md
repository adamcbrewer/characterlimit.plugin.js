# characterlimit.jquery.js

Set a character limit on any input/textarea, disabling form submission when exceeded the maximum number.

### Example usage:

The HTML:
``` html
	<textarea data-id="example" data-character-limit="160" class="js-characterlimit"></textarea>
    <span class="character-count" data-limit-status="example">160</span>
    <button type="submit" data-limit-submit="example">Submit</button>
```

…and the javascript:
``` js
	$('.js-characterlimit').characterlimit(/* optional limit */);
```
