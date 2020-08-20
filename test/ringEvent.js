
conf = require('./lib/configLoader.js').conf;
tools = require('./lib/tools.js');
ring = require('./lib/ring.js');

// load dice
tools.loadCtx(conf.rainbow.addr, conf.rainbow.dev.addr, conf.rainbow.dev.pk)
.then((ret)=>{
    return new Promise((a,b)=>{
        try {
            ring.RingEventListener(ret);
            a(ret);
        } catch(err) {
            b(ret);
        }
    });
}, (err)=>{
    console.log("init ring FAILED: ${err}");
});
