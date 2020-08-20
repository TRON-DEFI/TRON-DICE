conf = require('./lib/configLoader.js').conf;
tools = require('./lib/tools.js');
dice = require('./lib/dice.js');
refer = require('./lib/refer.js');
ranking = require('./lib/ranking.js');
auction = require('./lib/auction.js');
miner = require('./lib/miner.js');
hash = require('./lib/hash.js');
ring = require('./lib/ring.js');

// init token & miner
tools.loadCtx(conf.miner.addr, conf.miner.owner.addr, conf.miner.owner.pk).then((ret)=>{
    return new Promise((a, b) => {
        try {
            // miner.addMiner(ret, conf.dice.addr);
            // miner.addMiner(ret, conf.hashx.addr);
            miner.addMiner(ret, conf.rainbow.addr);

            a(ret);
        } catch(err) {
            b(err);
        }
    });
}, (err)=>{});

// init rank
tools.loadCtx(conf.ranking.addr, conf.ranking.owner.addr, conf.ranking.owner.pk).then((ret)=>{
    return new Promise((a, b) => {
        try {
            // ranking.setGame(ret, conf.dice.addr, true);
            // ranking.setGame(ret, conf.hashx.addr, true);
            ranking.setGame(ret, conf.rainbow.addr,true);
            // ranking.setGame(ret, conf.ranking.owner.addr,true);
            // ranking.setDev(ret,conf.ranking.owner.addr);
            // ranking.rankStart(ret);

            a(ret);
        } catch(err) {
            b(err);
        }
    });
}, (err)=>{});

// init refer
tools.loadCtx(conf.refer.addr, conf.refer.owner.addr, conf.refer.owner.pk).then((ret)=>{
    return new Promise((a, b) => {
        try {
            // refer.setGame(ret, conf.dice.addr, true);
            // refer.setGame(ret, conf.hashx.addr, true);
            refer.setGame(ret, conf.rainbow.addr, true);

            a(ret);
        } catch(err) {
            b(err);
        }
    });
}, (err)=>{});

tools.loadCtx(conf.rainbow.addr, conf.rainbow.dev.addr, conf.rainbow.dev.pk)
.then((ret)=>{
    return new Promise((a,b)=>{
        try{
            ring.initMinerCtx(ret, conf.miner.addr);
            ring.initRankCtx(ret, conf.ranking.addr);
            ring.initReferCtx(ret, conf.refer.addr);

            ring.initColor(ret);
            var mutiArr = [2,3,5,50]; //没个色段的倍率
            var maxArr = [20000000000,10000000000,5000000000,500000000];//每个色段每轮次最大投注额
            ring.initColorInfo(ret,mutiArr,maxArr);
            var colors = [];//如果为空，则使用默认规则
            ring.initColorNumbers(ret,colors);

            ring.start(ret);

        } catch(err) {
            b(err);
        }
    });
}, (err)=>{
    console.log("init dice FAILED: ${err}");
});
