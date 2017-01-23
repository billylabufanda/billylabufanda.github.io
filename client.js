var userData = {
  name: "Chuck Norris",
  profileURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/M101_hires_STScI-PRC2006-10a.jpg/1280px-M101_hires_STScI-PRC2006-10a.jpg",
  email: "chucknorris@hotmail.com"
  //     savedInternships:
}

async function onSuccess(googleUser) {

  /** Base scope **/

  console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  var profile = googleUser.getBasicProfile();
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
  userData.name = profile.getName()
  userData.profileURL = profile.getImageUrl()
  userData.email = profile.getEmail()
  console.log("Name: hi this is a bad test " + userData.name)

  await loadSheetsApi().then(withSheetApi);

  console.log("rendering tindernship")
  try {
    window.renderTindernship()
  } catch (error) {
    console.log("Bummer: " + error)
  }

  gapi.client.request({
    path: "https://sheets.googleapis.com/v4/spreadsheets/1KEq57KSQhrpC41ZNUk7_gip3dgc0KiI1qrHlFQrh_hY",
    method: "GET",
    // paramsobject: {
    //   "ranges": "1234"
    // }
  }).then(spreadsheet => {
    // spreadsheet is a spreadsheet
    console.log(JSON.stringify(spreadsheet))
  })
}

/**
 * Load Sheets API client library.
 */
function loadSheetsApi() {
  var discoveryUrl = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
  return gapi.client.load(discoveryUrl)
}

function withSheetApi() {
  return gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    range: 'Class Data!A2:E',
  }).then(function (response) {
    var range = response.result;
    if (range.values.length > 0) {
      for (i = 0; i < range.values.length; i++) {
        console.log(JSON.stringify(row))
      }
    }
  })
}

function onFailure(error) {
  console.log(error);
}

function goGoGoogle() {
  gapi.signin2.render('google-signin-button', {
    'scope': "profile email https://www.googleapis.com/auth/spreadsheets",
    'width': 240,
    'height': 25,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSuccess,
    'onfailure': onFailure
  });
}
