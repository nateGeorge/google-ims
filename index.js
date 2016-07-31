'use strict';

/**
 * Dependencies
 */

var got = require('got');


/**
 * Google Images Client
 */

function Client (id, apiKey) {
	if (!(this instanceof Client)) {
		return new Client(id, apiKey);
	}

	this.endpoint = 'https://www.googleapis.com';
	this.apiKey = apiKey;
	this.id = id;
}

Client.prototype.search = function (query, options) {
	if (!query) {
		throw new TypeError('Expected a query');
	}

	return got(this.endpoint + '/customsearch/v1', {
		query: this._buildOptions(query, options),
		json: true
	}).then(this._buildResponse).catch(error => {
        console.log(error.response.body);
        //=> 'Internal server error ...' 
    });
};

Client.prototype._buildOptions = function (query, options) {
	if (!options) {
		options = {};
	}

	var result = {
		q: query.replace(/\s/g, '+'),
		searchType: 'image',
		cx: this.id,
		key: this.apiKey
	};

	if (options.page) {
		// defaults to 10 results per query
		// starts at index 1
		// 'page 2' would start at index 11
		if (options.num) {
			result.start = options.num*(options.page-1)+1;
		}
		else {
			// default of 10 results per page
			result.start = 10*(options.page-1)+1;
		}
	}

	if (options.size) {
		result.imgSize = options.size;
	}
	
	if (options.safe) {
		result.safe = options.safe;
	}
	
	if (options.filter) {
		// 1 = filter duplicates, 0 = don't filter
		result.filter = options.filter;
	}
	
	if (options.imgType) {
		result.imgType = options.imgType;
	}
	
	if (options.colorType) {
		result.imgColorType = options.colorType;
	}
	
	if (options.domColor) {
		result.imgDominantColor = options.domColor;
	}
	
	if (options.dateRestrict) {
		result.dateRestrict = options.dateRestrict;
	}
	
	if (options.fileType) {
		result.fileType = options.fileType;
	}
	
	if (options.gl) {
		result.gl = options.gl;
	}
	
	if (options.googlehost) {
		result.googlehost = options.googlehost;
	}
	
	if (options.num) {
		result.num = options.num;
	}

	return result;
};

Client.prototype._buildResponse = function (res) {
	return res.body.items.map(function (item) {
		return {
			type: item.mime,
			width: item.image.width,
			height: item.image.height,
			size: item.image.byteSize,
			url: item.link,
			thumbnail: {
				url: item.image.thumbnailLink,
				width: item.image.thumbnailWidth,
				height: item.image.thumbnailHeight
			}
		};
	});
};


/**
 * Expose client
 */

module.exports = Client;
