# Strawpoll-lib

npm package for the [strawpoll](https://www.strawpoll.me) API

## Installation

Use [npm](https://www.npmjs.com/) to install strawpoll-lib.

```bash
npm i strawpoll-lib --save
```

## Usage

Get Poll Information
```Node.js
const strawpoll = require('strawpoll-lib')

let pollID = 1
strawpoll.getPoll(pollID).then(res => {
	console.log(res)
})
```

Create Poll
```Node.js
const strawpoll = require('strawpoll-lib')

strawpoll.createPoll("Question?", ["Yes", "No"]).then(res => {
	console.log(res)
	console.log(strawpoll.getURL(res.id))
})
```

## Functions

Getting Poll Information
```Node.js
getPoll(pollID) // returns a Promise that will attempt to get a JSON Object based on schema at https://github.com/strawpoll/strawpoll/wiki/API.

getTitle(pollID) // returns a Promise that will attempt to get the poll's title question.

getOptions(pollID) // returns a Promise that will attempt to get the poll's options.

getResults(pollID) // returns a Promise that will attempt to get a JSON Object that associates poll options with number of votes.

getURL(pollID) // returns the URL of the poll.
```

Creating A Poll
```Node.js
createPoll(title, options, multi=false, dupcheck="normal", captcha=false) // returns a Promise that will attempt to get a JSON Object based on schema at https://github.com/strawpoll/strawpoll/wiki/API.
```

## License
[MIT](https://choosealicense.com/licenses/mit/)