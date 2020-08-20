
TronWeb = require('tronweb');
conf = require('./lib/configLoader.js').conf;

tools = require('./lib/tools.js');
dice = require('./lib/dice.js');


// load dice
tools.loadCtx(conf.dice.addr, conf.dice.owner.addr, conf.dice.owner.pk)
.then((ret)=>{
    return new Promise((a,b)=>{
        try{
            // pk = "254fdb747ba0d98c77e6b20e55dbdef937c8b8973549a262c773d325bd2d91d9"
            // addr = "TDPSMyxeaVwM1J4auHvkZRDKSeApqHDPmN"
            // timer = setInterval(()=>{
            //     dice.play(ret, addr, pk, 100*1000000, 50, 0);
            // }, 3000);

            // setTimeout(()=>{
            //     clearInterval(timer);
            // }, 10000);

            // dice.rankStart(ret);
            // dice.currentRankID(ret);
            // dice.getRankData(ret, 1);

            // rates = [35, 20, 15, 10, 7, 4, 3, 2, 2, 2];
            // addrs = [
            //     "0x4cE3d493FF199c88F85868BC802dC63244DEB737",
            //     "0xB2Ee82cFF4a22FF3042B4653Ca8af783b70E327C",
            //     "0xd3F0E1b1BaCc6A3Cea77C4fCce22eD92Cb0E0c7f"];
            // dice.setRankResult(ret, 1, addrs, rates)

             dice.play(ret, conf.dice.owner.addr, conf.dice.owner.pk, 1000*1000000, 10, conf.ranking.owner.addr);

            a(ret);
        } catch(err) {
            b(err);
        }
    });
}, (err)=>{
    console.log("init dice FAILED: ${err}");
});
