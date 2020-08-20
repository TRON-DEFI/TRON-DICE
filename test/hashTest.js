
conf = require('./lib/configLoader.js').conf;
tools = require('./lib/tools.js');
hash = require('./lib/hash.js');

tools.loadCtx(conf.hashx.addr, conf.hashx.owner.addr, conf.hashx.owner.pk)
.then((ret)=>{
    getTermInfo = async()=> {
        termID = await hash.termID(ret);
        if (termID > 1) {
            termInfo = await hash.termInfo(ret, termID-1);
            console.log(JSON.stringify(termInfo));
            console.log(`totalAmount:${termInfo.totalAmount}, maxNumber:${termInfo.maxNumber}`);

            termResult = await hash.termResult(ret, termID-1);
            console.log(JSON.stringify(termResult));
        }
    }

    play = () => {
        hash.play(ret, conf.hashx.owner.addr, conf.hashx.owner.pk, 1000*1000000, "TAMCNz6xsA1KYGNMsJV8nMjFiP4it1cmbN");
    }
    play();
    return;

}, (err)=>{
    console.log("init dice FAILED: ${err}");
});
