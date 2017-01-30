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

		define(['jquery'], factory);

	} else if (typeof exports === 'object') {

		module.exports = factory(require('jquery'));

	} else {

		root.returnExports = factory(root.jQuery);
	}

} (this, function (jQuery) {


	/*=======================================================
	Message field class
	Description: show, hide form fields errors
	=======================================================*/

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
				}
			}
		}
	};


	/*=======================================================
	Message state class
	Description: show, hide form state
	=======================================================*/

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


	/*=======================================================
	Message factory class
	Description: show, hide messages by types
	---------------------------------------------------------
	@types 		array (it can be `state`, `field` or `float`)
	=======================================================*/

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


	var Minimal = {};

	Minimal.Message = MessageFactory;

	return Minimal;
}));