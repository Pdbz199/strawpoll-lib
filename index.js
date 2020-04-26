const requestify = require('requestify')
const URL = "https://www.strawpoll.me/api/v2/polls"

// GETTING POLL

/** 
 * @param {number} pollID Numeric ID associated with the poll you want to GET.
 * @returns {Promise.<object>} Promise that will attempt to get a JSON Object based on schema at https://github.com/strawpoll/strawpoll/wiki/API.
 */
async function getPoll(pollID) {
    let response = await requestify.get(`${URL}/${pollID}`)
    return response.getBody()
}

/** 
 * @param {number} pollID Numeric ID associated with the poll from which you want the title.
 * @returns {Promise.<string>} Promise that will attempt to get the poll's title question.
 */
async function getTitle(pollID) {
    let res = await getPoll(pollID)
    return res.title
}

/** 
 * @param {number} pollID Numeric ID associated with the poll from which you want the options.
 * @returns {Promise.<Array.<string>>} Promise that will attempt to get the poll's options.
 */
async function getOptions(pollID) {
    let res = await getPoll(pollID)
    return res.options
}

/** 
 * @param {number} pollID Numeric ID associated with the poll from which you want the results.
 * @returns {Promise.<object>} Promise that will attempt to get a JSON Object that associates poll options with number of votes.
 */
async function getResults(pollID) {
    let results = {}
    let res = await getPoll(pollID)
    for (let i = 0; i < res.options.length; i++) {
        results[res.options[i]] = res.votes[i]
    }
    return results
}

/** 
 * @param {number} pollID Numeric ID associated with the poll from which you want the results.
 * @returns {Promise.<string>} Promise that will attempt to get the URL of the poll.
 */
async function getURL(pollID) {
    let res = await getPoll(pollID)
    return `https://www.strawpoll.me/${res.id}`
}

// CREATING POLL

/**
 * @param {object} options JSON Object based on schema at https://github.com/strawpoll/strawpoll/wiki/API.
 * @returns {Promise.<object>} Promise that will attempt to get a JSON Object based on schema at https://github.com/strawpoll/strawpoll/wiki/API.
 */
async function buildPoll(options) {
    let response = await requestify.post(`${URL}`, options)
    return response.getBody()
}

/**
 * @param {string} title The question that the poll is asking.
 * @param {Array.<string>} options An array of strings to represent the options for the poll in the given order.
 * @param {boolean} multi true if the poll can accept multiple votes from one user, false (or not present) otherwise.
 * @param {string} dupcheck How to handle checking for duplicate votes. Acceptable values: normal (default), permissive and disabled.
 * @param {boolean} captcha true if the poll requires users to pass a CAPTCHA to vote, false (or not present) otherwise.
 * @returns {Promise.<object>} Promise that will attempt to get a JSON Object based on schema at https://github.com/strawpoll/strawpoll/wiki/API.
 */
async function createPoll(title, options, multi=false, dupcheck="normal", captcha=false) {
    let poll = {
        "title": title,
        "options": options,
        "multi": multi,
        "dupcheck": dupcheck,
        "captcha": captcha
    }
    return await buildPoll(poll)
}

// EXPORTS

module.exports.getPoll = getPoll
module.exports.getTitle = getTitle
module.exports.getOptions = getOptions
module.exports.getResults = getResults
module.exports.getURL = getURL
module.exports.createPoll = createPoll