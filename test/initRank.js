
conf = require('./lib/configLoader.js').conf;
tools = require('./lib/tools.js');
dice = require('./lib/dice.js');
refer = require('./lib/refer.js');
ranking = require('./lib/ranking.js');
auction = require('./lib/auction.js');
miner = require('./lib/miner.js');
hash = require('./lib/hash.js');
ring = require('./lib/ring.js');


tools.loadCtx(conf.ranking.addr, conf.ranking.owner.addr, conf.ranking.owner.pk).then((ret)=>{
    return new Promise((a, b) => {
        try {
            ranking.setGame(ret, conf.dice.addr, true);
            ranking.setGame(ret, conf.hashx.addr, true);
            ranking.setGame(ret, conf.rainbow.addr,true);
            ranking.setGame(ret, conf.miner.addr,true);
            ranking.setDev(ret,conf.ranking.dev.addr);
            ranking.rankStart(ret);

            a(ret);
        } catch(err) {
            b(err);
        }
    });
}, (err)=>{});
