
conf = require('./lib/configLoader.js').conf;
tools = require('./lib/tools.js');
hash = require('./lib/hash.js');

// load dice
tools.loadCtx(conf.hashx.addr, conf.hashx.owner.addr, conf.hashx.owner.pk)
.then((ret)=>{
    return new Promise((a,b)=>{
        try {
            hash.EventListener(ret);
            a(ret);
        } catch(err) {
            b(ret);
        }
    });
}, (err)=>{
    console.log("init hash FAILED: ${err}");
});
