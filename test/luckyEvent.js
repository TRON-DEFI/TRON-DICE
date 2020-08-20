
conf = require('./lib/configLoader.js').conf;
tools = require('./lib/tools.js');
lucky = require('./lib/luckyhash2.js');

// load dice
tools.loadCtx(conf.hash.addr, conf.hash.owner.addr, conf.hash.owner.pk)
.then((ret)=>{
    return new Promise((a,b)=>{
        try {
            lucky.luckeyhashEventListener(ret);
            a(ret);
        } catch(err) {
            b(ret);
        }
    });
}, (err)=>{
    console.log("init lucky hash FAILED: ${err}");
});
