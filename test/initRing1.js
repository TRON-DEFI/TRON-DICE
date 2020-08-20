
conf = require('./lib/configLoader.js').conf;
tools = require('./lib/tools.js');
dice = require('./lib/dice.js');
refer = require('./lib/refer.js');
ranking = require('./lib/ranking.js');
auction = require('./lib/auction.js');
miner = require('./lib/miner.js');
hash = require('./lib/hash.js');
ring = require('./lib/ring.js');


tools.loadCtx(conf.rainbow.addr, conf.rainbow.owner.addr, conf.rainbow.owner.pk)
.then((ret)=>{
    return new Promise((a,b)=>{
        try{
            ring.setDev(ret, conf.rainbow.dev.addr);
            ring.setPool(ret, conf.miner.addr);
            //ring.setMarketing(ret, conf.rainbow.market.addr);

        } catch(err) {
            b(err);
        }
    });
}, (err)=>{
    console.log("init ring FAILED: ${err}");
});
