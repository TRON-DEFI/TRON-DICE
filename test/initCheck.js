conf = require('./lib/configLoader.js').conf;
tools = require('./lib/tools.js');
dice = require('./lib/dice.js');
refer = require('./lib/refer.js');
ranking = require('./lib/ranking.js');
auction = require('./lib/auction.js');
miner = require('./lib/miner.js');
hash = require('./lib/hash.js');
ring = require('./lib/ring.js');
checkin = require('./lib/checkin.js')

//init checkin
tools.loadCtx(conf.checkin.addr, conf.checkin.owner.addr, conf.checkin.owner.pk)
.then((ret)=>{
    return new Promise((a,b)=>{
        try{
            checkin.setWhiteList(ret, conf.rainbow.addr,true);
            checkin.setWhiteList(ret, conf.dice.addr,true);
            checkin.setWhiteList(ret, conf.hashx.addr,true);
            checkin.setWhiteList(ret, conf.miner.addr,true);


        } catch(err) {
            b(err);
        }
    });
}, (err)=>{
    console.log("init check FAILED: ${err}");
});
