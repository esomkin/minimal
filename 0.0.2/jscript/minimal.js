/*==========================================================================

@package	Minimal
@author 	Evgeniy Somkin <esomkin@gmail.com>
@license: 	MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

========================================================================= */

(function (root, factory) {

	if (typeof define === 'function' && define.amd) {

		define(['jquery', 'bootstrap.notify', 'uri', ], factory);

	} else if (typeof exports === 'object') {

		module.exports = factory(require('jquery'), require('bootstrap.notify'), require('uri'));

	} else {

		root.returnExports = factory(root.jQuery, root.bootstrapNotify, root.URI);
	}

} (this, function (jQuery, bootstrapNotify, URI) {


	/*=======================================================
	Message float class
	Description: show, hide float messages
	---------------------------------------------------------
	Depends on Bootstrap Notify 
	https://github.com/mouse0270/bootstrap-notify
	=======================================================*/

	var MessageFloat = function () {

	};

	MessageFloat._default = {

		position: 'fixed',
		type: 'danger',
		placement: {

			from: 'top',
			align: 'center',
		},
		offset: 0,
		spacing: 0,
		delay: 3000,
		timer: 1000,
		allow_dismiss: false,
		newest_on_top: true,
	};

	MessageFloat._msgs;
	MessageFloat._opts;

	MessageFloat._opt = function (options) {

		var options = options || {};

		this._msgs = options.messages || {};
		this._opts = options;
	};

	MessageFloat._mrg = function () {

		var options = {};

		for (var property in this._default) {

			var value = this._default[property];

			if (property in this._opts) {

				value = this._opts[property]
			}

			options[property] = value;
		}

		return options;
	};

	MessageFloat.show = function (options) {

		this._opt(options);

		for (var property in this._msgs) {

			$.notify({

				message: this._msgs[property],
					
			}, this._mrg());
		}
	}

	MessageFloat.hide = function () {

		// Noop
	}


	/*=======================================================
	Message field class
	Description: show, hide form field messages
	=======================================================*/

	var MessageField = function () {

	};

	MessageField._default = {

		selector: 	'.alert',
		template: 	'<div class="alert hidden"/>',
		classes: 	'alert-danger',
	};

	MessageField._view;
	MessageField._msgs;
	MessageField._opts;

	MessageField.messages = [];

	MessageField._opt = function (options) {

		var options = options || {};

		this._view = options.view || null;
		this._msgs = options.messages || {};
		this._opts = options;
	};

	MessageField._cls = function () {

		if ('classes' in this._opts) {

			return this._opts.classes;
		}

		return this._default.classes;
	};

	MessageField._new = function (field) {

		var $field = this._view.$el.find('[name="' + field + '"]');

		$field.after($(this._default.template));

		return $field.next();
	};

	MessageField._get = function (field) {

		return this._view.$el.find('[name="' + field + '"]').next(this._default.selector);
	};

	MessageField._chk = function () {

		if (!this._view) {

			console.error('Option `view` is not defined');
			return false;
		}

		return true;
	};

	MessageField.show = function (options) {

		this._opt(options);

		if (!this._chk()) {

			return;
		}

		for (var property in this._msgs) {

			var $message = this._get(property);

			if (!$message.length) {

				$message = this._new(property);
			}

			$message.text(this._msgs[property][0]);
			$message.addClass(this._cls());

			if ($message.hasClass('hidden')) {

				$message.removeClass('hidden');
			}

			var $parent = $message.parent();

			if (!$parent.hasClass('has-error')) {

				$parent.addClass('has-error');
			}

			this.messages.push($message);
		}
	};

	MessageField.hide = function () {

		if (this.messages
			&& this.messages.length) {

			for (var i = 0, count = this.messages.length; i < count; i ++) {

				var $message = this.messages.shift();
				$message.addClass('hidden');

				var $parent = $message.parent();
				$parent.removeClass('has-error');
			}
		}
	};


	/*=======================================================
	Message state class
	Description: show, hide form state messages
	=======================================================*/

	var MessageState = function () {

	};

	MessageState._default = {

		selector: 	'.alert',
		template: 	'<div class="alert hidden"/>',
		classes: 	'alert-danger',
	};

	MessageState._view;
	MessageState._text;
	MessageState._opts;

	MessageState.message;

	MessageState._opt = function (options) {

		var options = options || {};

		this._view = options.view || null;
		this._text = options.text || '';
		this._opts = options;
	};

	MessageState._cls = function () {

		if ('classes' in this._opts) {

			return this._opts.classes;
		}

		return this._default.classes;
	};

	MessageState._new = function () {

		var $form = this._view.$el.find('form');

		$form.prepend($(this._default.template));

		return $form.children(this._default.selector);
	};

	MessageState._get = function () {

		return this._view.$el.find('form').children(this._default.selector);
	};

	MessageState._chk = function () {

		if (!this._view) {

			console.error('Option `view` is not defined');
			return false;
		}

		return true;
	};

	MessageState.show = function (options) {

		this._opt(options);

		if (!this._chk()) {

			return;
		}

		$message = this._get();

		if (!$message.length) {

			$message = this._new();
		}

		$message.text(this._text);
		$message.addClass(this._cls());

		if ($message.hasClass('hidden')) {

			$message.removeClass('hidden');
		}

		this.message = $message;
	}

	MessageState.hide = function () {

		var _class = this._opts.classes || this._default.classes;

		this.message.addClass('hidden');
		this.message.removeClass(_class);
	}


	/*=======================================================
	Message factory class
	Description: show, hide messages by type
	=======================================================*/

	var MessageFactory = function () {

	};

	MessageFactory._default = {

		type: [

			'state',
			'field',
			'float',
		],
	};

	MessageFactory._instances = {};

	MessageFactory._emp = function (object) {

		for (var property in object) {

			if (object.hasOwnProperty(property)) return false;
		}

		return true;
	};

	MessageFactory._new = function (type) {

		var instance = null;

		switch (type) {

			case 'state':
				instance = MessageState;
			break;

			case 'field':
				instance = MessageField;
			break;

			case 'float':
				instance = MessageFloat;
			break;
		}

		this._instances[type] = instance;

		return this._instances[type];
	};

	MessageFactory._get = function (type) {

		if (this._instances.hasOwnProperty(type)) {

			return this._instances[type];
		}
		
		return this._new(type);
	};

	MessageFactory._chk = function (options) {

		if ((typeof(options) !== 'object')
			|| (options === null)) {

			console.error('Option `Options` must be an object');
			return false;
		}

		if (this._emp(options)) {

			console.error('Option `Options` cannot be empty');
			return false;
		}

		for (var key in options) {

			if (!(this._default.type.indexOf(key) + 1)) {

				console.error('Option `' + key + '` is not a message type');
				return false;	
			}
		}

		return true;
	};

	MessageFactory.show = function (options) {

		if (!this._chk(options)) {

			return;	
		}

		if (!this._emp(this._instances)) {

			this.hide();
		}

		for (var key in options) {

			var message = this._get(key);

			message.show(options[key]);
		}
	};

	MessageFactory.hide = function () {

		for (var property in this._instances) {

			var message = this._instances[property];
			
			message.hide();
		}
	};
	

	/*=======================================================
	Loading class
	Description: show, hide load indicator
	=======================================================*/

	var Loading = function () {

	};

	Loading._default = {

		selector: '.component-load',
		delay: 500,
	};

	Loading._timer = null;

	Loading._get = function () {

		return $(this._default.selector);
	};

	Loading.toggle = function () {

		var $load = this._get();

		if (this._timer) {

			clearTimeout(this._timer);
			this._timer = null;

			if (!$load.hasClass('hidden')) {

				$load.toggleClass('hidden');
			}

			return;
		}

		if ($load.hasClass('hidden')) {

			this._timer = setTimeout(function () {

				$load.toggleClass('hidden');

			}, this._default.delay);
		}
	};


	/*=======================================================
	Locale class
	Description: get, set locale
	=======================================================*/

	var Locale = function () {

	};

	Locale._default = {

		locales: [

			'en',
			'ch',
			'jp',
		],
		fallback: 'en',
	};

	Locale._locale = null;

	Locale._chk = function (locale) {

		if (!locale) {

			console.error('Option `locale` cannot be empty');
			return false;
		}

		if (!(this._default.locales.indexOf(locale) + 1)) {

			console.error('Locale `' + locale + '` is not defined');
			return false;
		}

		return true;
	};

	Locale.lcs = function () {

		return this._default.locales;
	};

	Locale.flb = function () {

		return this._default.fallback;
	};

	Locale.get = function (url) {

		if (!url
			&& this._locale) {

			return this._locale;
		}

		var uri = Url._prs(url);
		var part = uri.segment(0);

		if (this._default.locales.indexOf(part) + 1) {

			return this._locale = part;
		}

		return this._locale = this._default.fallback;
	};


	/*=======================================================
	Url class
	Description: get, set, redirect & url locale
	=======================================================*/

	var Url = function () {

	};

	Url._default = {

	};

	Url._prs = function (url) {

		if (!url) {

			return new URI();
		}

		return new URI(url);
	};

	Url.get = function () {

		return location.href;
	};

	Url.asn = function (url) {

		return location.assign(url);
	};

	Url.rdr = function (url) {

		return location.replace(url);
	};

	Url.lcl = function (locale, url) {

		if (!locale) {

			locale = Locale.get();
		}

		locale = locale.toLowerCase();

		if (!Locale._chk(locale)) {

			return;
		}

		var uri = this._prs(url);
		var segment = uri.segment();
		var locales = Locale.lcs();
		var fallback = Locale.flb();

		if (!(locales.indexOf(segment[0]) + 1)) {

			if (locale != fallback) {

				segment.unshift(locale);
				uri.segment(segment);
			}

			return uri.toString();	
		}

		if (locale == fallback) {
				
			segment.shift();
			uri.segment(segment);

			return uri.toString();
		}

		uri.segment(0, locale);

		return uri.toString();
	};


	/*=======================================================
	Storage class
	Description: class to store values by store key
	=======================================================*/

	var Storage = function () {

	};

	Storage._default = {

		volume: {

			master: 'master',
		},
	};

	Storage._volume = null;
	Storage._storage = {};

	Storage.vlm = function (volume) {

		if (volume) {

			return volume;
		}

		if (this._volume) {

			return this._volume;
		}

		return this._default.volume.master;
	};

	Storage.clr = function () {

		this._volume = this._default.volume.master;
		this._storage = {};
	};

	Storage.crt = function (volume) {

		this._storage[volume] = {};
	};

	Storage.chg = function (volume) {

		if (!(volume in this._storage)) {

			this.crt(volume);
		}

		this._volume = volume;

		return this._storage[this._volume];
	};

	Storage.has = function (key) {

		return this.get(key);
	};

	Storage.get = function (volume, key) {

		volume = this.vlm(volume);

		var _volume = this.chg(volume);

		if (!(key in _volume)) {

			return false;
		}

		return _volume[key];
	};

	Storage.set = function (volume, key, value) {

		volume = this.vlm(volume);

		var _volume = this.chg(volume);

		_volume[key] = value;
	};

	Storage.rmv = function (volume, key) {

		volume = this.vlm(volume);

		var _volume = this.chg(volume);

		delete _volume[key];
	};


	/*=======================================================
	Util class
	Description: some utilites
	=======================================================*/

	var Util = function () {

	};


	var Minimal = {};

	Minimal.Message = MessageFactory;
	Minimal.Loading = Loading;
	Minimal.Locale = Locale;
	Minimal.Url = Url;
	Minimal.Storage = Storage;
	Minimal.Util = Util;

	return Minimal;
}));