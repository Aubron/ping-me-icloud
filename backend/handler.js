'use strict';
const iCloud = require('@folk-org/apple-icloud');

const createiCloudAsync = async (username,password) => {
  return new Promise((resolve,reject) => {
    const myCloud = new iCloud({},username,password);
    myCloud.on('ready',() => {
      resolve(myCloud);
    })
  })
}


module.exports.ping = async event => {
  var username = process.env.ICLOUD_USERNAME; // Your apple id
  var password = process.env.ICLOUD_PASSWORD; // Your password
  let body = JSON.parse(event.body);
  let secrets = process.env.SECRETS.split(',');

  if (secrets.indexOf(body.secret) !== -1) {
    const myCloud = await createiCloudAsync(username,password);
    await myCloud.FindMe.playSound(process.env.ICLOUD_DEVICE_ID)
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Message successfully sent.',
          input: event,
        },
        null,
        2
      ),
    };
  }
  
  return {
    statusCode: 401,
    body: JSON.stringify(
      {
        message: 'Unauthorized',
        input: event,
      },
      null,
      2
    ),
  };
}
