Minimal package
=========================

*By Evgeniy Somkin*

*Licensed under the MIT license: http://opensource.org/licenses/MIT*

Overview
--------

This package include classes, that makes messages showing more simply. 
The examples are the best way to learn how to use it, but here it is 
in a nutshell

```javascript

if (!this.message) {

	this.message = new Minimal.Message(['state', 'field', 'float',]);
}

this.message.show({

	state: {

		view: this,
		text: 'Something happend..',
	},
	field: {

		view: this,
		messages: errors,
	},
	float: {

		messages: errors,
		type: 'info',
	},
});

this.message.hide();

```

Change Log
----------

0.0.2
- added factory class & form class
- refactoring
- added state class
- added float class