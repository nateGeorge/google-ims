# google-images

Provides a method in Node.js for searching Google Images.

## Installation

```
$ npm install google-ims --save
```


## Usage

**Note**: You'll need to [set up your own Google Custom Search Engine](#set-up-google-custom-search-engine) to search for images.

[See Google's page on CSE parameters for more info on the options.](https://developers.google.com/custom-search/json-api/v1/reference/cse/list)
Example of using all available current options:

```js
'use strict' // need this for 'let' to work

const googleIms = require('google-ims');

let client = googleIms('CSEID', 'APIKEY');

client.search('sheep', {
	// no options are required, this demonstrates use of all available one in the package
	page: 2, // 10 results per page
	size: 'large', // can be: icon, small, medium, large, xlarge, xxlarge, huge
	safe: 'off', // high, medium, off
	imgType: 'face', // clipart, face, lineart, news, photo
	colorType: 'mono', // color, gray, mono
	domColor: 'black', // black, blue, brown, gray, green, pink, purple, teal, white, yellow
	dateRestrict: 'y[2]', // only show results from the last 2 years, can be d[#], w[#], m[#], y[#] for days, weeks, etc
	fileType: 'png',
	gl: 'NZ', // country code for results, New Zealand in this case, http://www.spoonfork.org/isocodes.html
	googlehost: 'google.co.nz', // google domain to use, in this case New Zealand
	num: 1; // number of results per page, default 10
	
}).then(function (images) {
	images.forEach(function(i, e, a) {
		console.log(images)
	});
});

/* results will look like this

*/

```

## Set up Google Custom Search Engine

You need to sign up for Google Custom Search Engine.
Here are the steps you need to do:

### 1. Create a Google Custom Search Engine

You can do this here: [https://cse.google.com/cse](https://cse.google.com/cse).

Do not specify any sites to search but instead use the "Restrict Pages using Schema.org Types" under the "Advanced options".
For the most inclusive set, use the Schema: `Thing`. Make a note of the CSE ID.

### 2. Enable Image Search

In your search engine settings, enable "Image search":

<img src="media/screenshot.png" width="408" />

### 3. Set up a Google Custom Search Engine API

Register a new app and enable Google Custom Search Engine API here: [Google Developers Console](https://console.developers.google.com).
Make a note of the API key.


## Tests

```
$ npm test
```


## License

MIT

## Origin

Originally from https://github.com/vdemedes/google-images, but I wanted to add in some functionality that vdemedes didn't want to.
