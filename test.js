const athena = require('athena').connect();
const sugar = require('sugar').connect();

sugar.status.on('ready',()=>{
  sugar.utility.ping()
  .on('done', (response) => {
    console.log(response);
  })
  .on('error', (response)=>{
    console.log('Error');
    console.log(response);
  });
})
