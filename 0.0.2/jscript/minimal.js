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


	/*===========================================
	Message dummy class
	===========================================*/

	var MessageDummy = function MessageDummy () {

		this.show = function () {}
		this.hide = function () {}
	};


	/*===========================================
	Message form class
	Description: class for showing input errors
	---------------------------------------------
	@view 		Marionette.View
	===========================================*/

	var MessageForm = function MessageForm (view) {

		var _class 		= 'alert';
		var _template 	= $('<div class="alert alert-danger"/>');

		var _view = view;

		var _getField = function (field) {

			return _view.$el.find('[name="' + field + '"]');
		}

		var _getMessage = function (field) {

			var $message = _getField(field).next('.' + _class);

			if ($message.length) {

				return $message;
			}

			return false;	
		}

		var _createMessage = function (field) {

			_getField(field).after(_template);

			return _getMessage(field);
		}

		this.show = function (field, text) {

			this.field 	= field;
			this.text 	= text;

			var $message = _getMessage(this.field);

			if (!$message) {

				$message = _createMessage(this.field);
			}

			$message.text(this.text);

			if ($message.hasClass('hidden')) {

				$message.removeClass('hidden');
			}
		}

		this.hide = function () {

			var $message = _getMessage(this.field);

			$message.addClass('hidden');				
		}
	};


	/*===========================================
	Message factory class
	Description: show, hide messages by type
	---------------------------------------------
	@type 		string (one of `form`, `state`)
	@options 	array (depends on type)
	===========================================*/

	var MessageFactory = function MessageFactory (type, options) {

		var _messages = [];

		this.type 		= type;
		this.options 	= options || {}; 

		this.getMessageObject = function () {

			switch (this.type) {

				case 'form':

					if (!('view' in this.options)) {

						console.error('`View` option is not defined');
						return new MessageDummy();
					}

					return new MessageForm(this.options.view);

				break;
			} 
		}

		this.show = function (messages) {

			if (_messages.length) {

				this.hide();
			}

			for (var key in messages) {

				if (!messages.hasOwnProperty(key)) continue;

				var messageObj = this.getMessageObject();
				messageObj.show(key, messages[key][0]);

				_messages.push(messageObj);
			}
		}

		this.hide = function () {

			if (!_messages.length) {

				return;
			}

			for (var i = 0, count = _messages.length; i < count; i ++) {

				var messageObj = _messages.shift();
				messageObj.hide();
			}
		}
	};

	var Minimal = {};

	Minimal.Message = MessageFactory;

	return Minimal;
}));