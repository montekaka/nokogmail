const {google} = require('googleapis');

const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */

const authorize = (token, callback) => {
  const oAuth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, "urn:ietf:wg:oauth:2.0:oob");
  oAuth2Client.setCredentials(token);
  callback(oAuth2Client);
}

const listLabels = (auth) => {  
  const gmail = google.gmail({version: 'v1', auth});
  // console.log(gmail.users.labels)
  gmail.users.labels.list({
    userId: 'me',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const labels = res.data.labels;
    if (labels.length) {
      console.log('Labels:');
      labels.forEach((label) => {
        console.log(`- ${label.name}`);
      });
    } else {
      console.log('No labels found.');
    }
  });
}

module.exports = {
  authorize: authorize,
  listLabels: listLabels
};
