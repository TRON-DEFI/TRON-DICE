
conf = require('./lib/configLoader.js').conf;
tools = require('./lib/tools.js');
auction = require('./lib/auction.js');

tools.loadCtx(conf.auction.addr, conf.auction.owner.addr, conf.auction.owner.pk)
.then((ret)=>{
    auction.endRoutine(ret);
}, (err)=>{
    console.log("load auction contract FAILED: ${err}");
});