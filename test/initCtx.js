
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
            miner.setDev(ret, conf.miner.dev.addr);
            miner.addMiner(ret, conf.dice.addr);
            miner.addMiner(ret, conf.hashx.addr);
            miner.addMiner(ret, conf.rainbow.addr);

            miner.divideTermID(ret).then((id)=>{
                if (id.toNumber() == 0) {
                    miner.startDivide(ret);
                }
            }, (err)=>{
                console.log(`miner get divideTermID failed:${err}`);
            });


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
            ranking.setGame(ret, conf.dice.addr, true);
            ranking.setGame(ret, conf.hashx.addr, true);
            ranking.setGame(ret, conf.rainbow.addr,true);
            ranking.setGame(ret, conf.ranking.owner.addr,true);
            ranking.setDev(ret,conf.ranking.owner.addr);
            ranking.rankStart(ret);

            a(ret);
        } catch(err) {
            b(err);
        }
    });
}, (err)=>{});
// tools.loadCtx(conf.ranking.addr, conf.ranking.owner.addr, conf.ranking.owner.pk).then((ret)=>{
//     return new Promise((a, b) => {
//         try {
//             ranking.setGame(ret, conf.dice.addr, true);
//             ranking.setGame(ret, conf.hashx.addr, true);
//             ranking.setGame(ret, conf.rainbow.addr,true);
//             //ranking.setDev(ret, conf.ranking.dev.addr);

//             a(ret);
//         } catch(err) {
//             b(err);
//         }
//     });
// }, (err)=>{});

// init refer
tools.loadCtx(conf.refer.addr, conf.refer.owner.addr, conf.refer.owner.pk).then((ret)=>{
    return new Promise((a, b) => {
        try {
            refer.setDev(ret, conf.refer.dev.addr);
            refer.setGame(ret, conf.dice.addr, true);
            refer.setGame(ret, conf.hashx.addr, true);
            refer.setGame(ret, conf.rainbow.addr, true);

            a(ret);
        } catch(err) {
            b(err);
        }
    });
}, (err)=>{});

// init dice
tools.loadCtx(conf.dice.addr, conf.dice.owner.addr, conf.dice.owner.pk)
.then((ret)=>{
    return new Promise((a,b)=>{
        try{
            dice.setDev(ret, conf.dice.dev.addr);
            dice.initMinerCtx(ret, conf.miner.addr);
            dice.initRankCtx(ret, conf.ranking.addr);
            dice.initReferCtx(ret, conf.refer.addr);
            dice.initDividePool(ret, conf.miner.addr);

        } catch(err) {
            b(err);
        }
    });
}, (err)=>{
    console.log("init dice FAILED: ${err}");
});

// init hashx
tools.loadCtx(conf.hashx.addr, conf.hashx.owner.addr, conf.hashx.owner.pk)
.then((ret)=>{
    return new Promise((a,b)=>{
        try{
            hash.setDev(ret, conf.hashx.dev.addr);
            hash.initMinerCtx(ret, conf.miner.addr);
            hash.initRankCtx(ret, conf.ranking.addr);
            hash.initReferCtx(ret, conf.refer.addr);
            hash.initDividePool(ret, conf.miner.addr);

        } catch(err) {
            b(err);
        }
    });
}, (err)=>{
    console.log("init dice FAILED: ${err}");
});


// init ring
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

tools.loadCtx(conf.rainbow.addr, conf.rainbow.dev.addr, conf.rainbow.dev.pk)
.then((ret)=>{
    return new Promise((a,b)=>{
        try{
            ring.initMinerCtx(ret, conf.miner.addr);
            ring.initRankCtx(ret, conf.ranking.addr);
            ring.initReferCtx(ret, conf.refer.addr);
            ring.setPool(ret,conf.miner.addr);

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
