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
	=======================================================*/

	/*
	var MessageFloat = function () {

		var _default = {

			position: 'fixed',
			type: 'danger',
			placement: {

				from: 'top',
				align: 'center',
			},
			offset: 0,
			spacing: 0,
			delay: 5000,
			timer: 1000,
			allow_dismiss: false,
			newest_on_top: true,
		};

		var _msgs;
		var _opts;

		var _opt = function (options) {

			var options = options || {};
			options.float = options.float || {};

			_msgs = options.float.messages || {};
			_opts = options.float;
		};

		var _mrg = function () {

			var options = {};

			for (var property in _default) {

				var value = _default[property];

				if (property in _opts) {

					value = _opts[property]
				}

				options[property] = value;
			}

			return options;
		};

		this.show = function (options) {

			_opt(options);

			for (var property in _msgs) {

				$.notify({

					message: _msgs[property],
					
				}, _mrg());
			}
		}

		this.hide = function () {

			// Noop
		}
	};
	*/

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
		delay: 5000,
		timer: 1000,
		allow_dismiss: false,
		newest_on_top: true,
	};

	MessageFloat._msgs;
	MessageFloat._opts;

	MessageFloat._opt = function (options) {

		var options = options || {};
		options.float = options.float || {};

		this._msgs = options.float.messages || {};
		this._opts = options.float;
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
	Description: show, hide form fields messages
	---------------------------------------------------------
	Depends on Bootstrap Notify 
	https://github.com/mouse0270/bootstrap-notify
	=======================================================*/

	/*
	var MessageField = function () {

		var _default = {

			selector: 	'.alert',
			template: 	'<div class="alert hidden"/>',
			classes: 	'alert-danger',
		};

		var _view;
		var _msgs;
		var _opts;

		var _opt = function (options) {

			var options = options || {};
			options.field = options.field || {};

			_view = options.field.view || null;
			_msgs = options.field.messages || {};
			_opts = options.field;
		};

		var _cls = function () {

			if ('classes' in _opts) {

				return _opts.classes;
			}

			return _default.classes;
		};

		var _new = function (field) {

			var $field = _view.$el.find('[name="' + field + '"]');

			$field.after($(_default.template));

			return $field.next();
		};

		var _get = function (field) {

			return _view.$el.find('[name="' + field + '"]').next(_default.selector);
		};

		var _chk = function () {

			if (!_view) {

				console.error('Option `view` is not defined in MessageField check');
				return false;
			}

			return true;
		};

		this.show = function (options) {

			_opt(options);

			if (!_chk()) {

				return;
			}

			for (var property in _msgs) {

				var $message = _get(property);

				if (!$message.length) {

					$message = _new(property);
				}

				$message.text(_msgs[property][0]);
				$message.addClass(_cls());

				if ($message.hasClass('hidden')) {

					$message.removeClass('hidden');
				}

				var $parent = $message.parent();

				if (!$parent.hasClass('has-error')) {

					$parent.addClass('has-error');
				}

				if (!this.messages) {

					this.messages = [];
				}

				this.messages.push($message);
			}
		}

		this.hide = function () {

			if (this.messages
				&& this.messages.length) {

				for (var i = 0, count = this.messages.length; i < count; i ++) {

					var $message = this.messages.shift();
					$message.addClass('hidden');

					var $parent = $message.parent();
					$parent.removeClass('has-error');
				}
			}
		}
	};
	*/

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
		options.field = options.field || {};

		this._view = options.field.view || null;
		this._msgs = options.field.messages || {};
		this._opts = options.field;
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

	/*
	var MessageState = function () {

		var _default = {

			selector: 	'.alert',
			template: 	'<div class="alert hidden"/>',
			classes: 	'alert-danger',
		};

		var _view;
		var _text;
		var _opts;

		var _opt = function (options) {

			var options = options || {};
			options.state = options.state || {};

			_view = options.state.view || null;
			_text = options.state.text || '';
			_opts = options.state;
		};

		var _cls = function () {

			if ('classes' in _opts) {

				return _opts.classes;
			}

			return _default.classes;
		};

		var _new = function () {

			var $form = _view.$el.find('form');

			$form.before($(_default.template));

			return $form.prev();
		};

		var _get = function () {

			return _view.$el.find('form').prev(_default.selector);
		};

		var _chk = function () {

			if (!_view) {

				console.error('Option `view` is not defined in MessageState check');
				return false;
			}

			return true;
		};

		this.show = function (options) {

			_opt(options);

			if (!_chk()) {

				return;
			}

			$message = _get();

			if (!$message.length) {

				$message = _new();
			}

			$message.text(_text);
			$message.addClass(_cls());

			if ($message.hasClass('hidden')) {

				$message.removeClass('hidden');
			}

			this.message = $message;
		}

		this.hide = function () {

			this.message.addClass('hidden');
		}
	};
	*/

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
		options.state = options.state || {};

		this._view = options.state.view || null;
		this._text = options.state.text || '';
		this._opts = options.state;
	};

	MessageState._cls = function () {

		if ('classes' in this._opts) {

			return this._opts.classes;
		}

		return this._default.classes;
	};

	MessageState._new = function () {

		var $form = this._view.$el.find('form');

		$form.before($(this._default.template));

		return $form.prev();
	};

	MessageState._get = function () {

		return this._view.$el.find('form').prev(this._default.selector);
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

		this.message.addClass('hidden');
	}


	/*=======================================================
	Message factory class
	Description: show, hide messages by types
	---------------------------------------------------------
	@types 		array (can be `state`, `field` or `float`)
	=======================================================*/

	/*
	var MessageFactory = function (types) {

		var _types 		= types || [];
		var _instances 	= {}; 

		var _emp = function (object) {

			for (var property in object) {

				if (object.hasOwnProperty(property)) return false;
			}

			return true;
		};

		var _new = function (type) {

			var instance = null;

			switch (type) {

				case 'state':
					instance = new MessageState();
				break;

				case 'field':
					instance = new MessageField();
				break;

				case 'float':
					instance = new MessageFloat();
				break;
			}

			_instances[type] = instance;

			return _instances[type];
		};

		var _get = function (type) {

			if (_instances.hasOwnProperty(type)) {

				return _instances[type];
			}

			return _new(type);
		};

		var _chk = function () {

			if (!_types.length) {

				console.error('Option `types`is not defined in MessageFactory constructor');
				return false;
			}

			return true;
		};

		this.show = function (options) {

			if (!_chk()) {

				return;
			}

			if (!_emp(_instances)) {

				this.hide();
			}

			for (var i = 0, count = _types.length; i < count; i ++) {

				var messageobj = _get(_types[i]);
				messageobj.show(options);
			}
		}

		this.hide = function () {

			for (var property in _instances) {

				var messageobj = _instances[property];
				messageobj.hide();
			}
		}
	};
	*/

	var MessageFactory = function () {

	};

	MessageFactory._types = [];
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

	MessageFactory._chk = function (types) {

		if (!(Object.prototype.toString.call(types) === '[object Array]')) {

			console.error('Option `types` must by an array');
			return false;
		}

		if (!types.length) {

			console.error('Option `types` cannot be empty');
			return false;
		}

		return true;
	};

	MessageFactory.show = function (types, options) {

		if (!this._chk(types)) {

			return;	
		}

		this._types = types;

		if (!this._emp(this._instances)) {

			this.hide();
		}

		for (var i = 0, count = this._types.length; i < count; i ++) {

			var message = this._get(this._types[i]);
			
			message.show(options);
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
	Description: get, set locale by url
	=======================================================*/

	var Locale = function () {

	};

	Locale._default = {

		locales: [

			'en',
			'ch',
		],
		fallback: 'en',
	};

	Locale._locale = null;

	Locale._prs = function (url) {

		if (!url) {

			return new URI();
		}

		return new URI(url);
	};

	Locale._chk = function (locale) {

		if (!locale) {

			console.error('Option `locale` cannot be empty');
			return false;
		}

		if (!(this._default.locales.indexOf(locale) + 1)) {

			console.error('Option `locale` value is not defined in default locales');
			return false;
		}

		return true;
	};

	Locale.get = function (url) {

		if (!url
			&& this._locale) {

			return this._locale;
		}

		var uri = this._prs(url);
		var part = uri.segment(0);

		if (this._default.locales.indexOf(part) + 1) {

			this._locale = part;
			
		} else {

			this._locale = this._default.fallback;
		}

		return this._locale;
	};

	Locale.set = function (locale, url) {

		if (!this._chk(locale)) {

			return;
		}

		this._locale = locale;

		var uri = this._prs(url);
		var part = uri.segment(0);

		if (this._locale != this._default.fallback) {

			if (this._default.locales.indexOf(part) + 1) {

				uri.segment(0, this._locale);

			} else {

				var segment = uri.segment();
				segment.unshift(this._locale);

				uri.segment(segment);
			}

		} else {

			if (this._default.locales.indexOf(part) + 1) {

				var segment = uri.segment();
				segment.shift();

				uri.segment(segment);
			}
		}

		location.href = uri.toString();
	};


	var Minimal = {};

	Minimal.Message = MessageFactory;
	Minimal.Loading = Loading;
	Minimal.Locale 	= Locale;

	return Minimal;
}));