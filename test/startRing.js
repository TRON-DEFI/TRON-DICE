
conf = require('./lib/configLoader.js').conf;
tools = require('./lib/tools.js');
dice = require('./lib/dice.js');
refer = require('./lib/refer.js');
ranking = require('./lib/ranking.js');
auction = require('./lib/auction.js');
miner = require('./lib/miner.js');
hash = require('./lib/hash.js');
ring = require('./lib/ring.js');

tools.loadCtx(conf.rainbow.addr, conf.rainbow.dev.addr, conf.rainbow.dev.pk)
.then((ret)=>{
    return new Promise((a,b)=>{
        try{

            ring.start(ret);

        } catch(err) {
            b(err);
        }
    });
}, (err)=>{
    console.log("init dice FAILED: ${err}");
});
