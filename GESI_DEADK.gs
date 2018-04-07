// Exmaple CURL code: 
// ~$curl -i --compressed -X POST --header 'Content-Type: application/json' \
//  --header 'Accept: application/json' -d '["Kabin Hiness"]' \
//  'https://esi.tech.ccp.is/latest/universe/ids/?datasource=tranquility&language=en-us'
//

// MARK 1: -- Request by CURL command 
//
function setData_(search) {
  var url = 'https://esi.tech.ccp.is/latest/universe/ids/?datasource=tranquility&language=en-us';
  var d = '[ \"' + search + '"\]'
  var params = {
   'headers': {
     'Accept': 'application/json'
   },
   'method' : 'post',
   'contentType': 'application/json',
   'muteHttpExceptions': true,
   // Convert the JavaScript object to a JSON string.
   'payload' :  d
  };
  return params;
//  return UrlFetchApp.fetch(url, params);
};

// MARK 2: -- Request ESI of Cell Value, and Get response.
//
//
function getResponse(params) {
  var url = 'https://esi.tech.ccp.is/latest/universe/ids/?datasource=tranquility&language=en-us';
  var options = setData_(params);
  return UrlFetchApp.fetch(url, options);
};


// TEST: -- Value: 'Kate Vigor'. expect return header and JSON
//
//Logger.log(setData('Kate Vigor'));
Logger.log(getResponse('Kate Vigor'));


// MARK 3: -- Parse JSON data to sheet form

function importJSON(response) {
  var dataAll = JSON.parse(response.getContentText()); //
  var dataSet = dataAll; 
  var rows = [],
      data;

  for (i = 0; i < dataSet.length; i++) {
    data = dataSet[i];
    rows.push([data.id, data.name,data.email]); //Need ENDPOINT of ESI /universe/ids
  }

  dataRange = sheet.getRange(1, 1, rows.length, 3); // 3 Denotes total number of entites
  dataRange.setValues(rows);
}
