

> Input module for [Listr](https://github.com/SamVerschueren/listr)


## Install

```
$ npm install --save listr-input
```


## Usage

```js
const Listr = require('listr');
const inquirer = require('listr-inquirer');

const list = new Listr([
	{
		title: 'Retrieving data',
		task: (ctx, task) => inquirer([
			{
                type: 'confirm',
                name: 'continue',
                message: 'Do you want to continue?'
            }
		], function (answers) {
			if (false === answers.continue) {
				task.skip('Skipped')
			}
		})
	}
]);

list.run();
```


## API

### input(questions, done)

Returns an Observable which asks given set of questions.

#### questions

Type: `array`

https://github.com/SBoudrias/Inquirer.js/#question

### done

Type: `function`

Function that will be invoked when the user has answered the questions


## License

MIT © Original code from [listr-input](https://github.com/SamVerschueren/listr-input) by  [Sam Verschueren](https://github.com/SamVerschueren)
