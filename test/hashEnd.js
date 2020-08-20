
conf = require('./lib/configLoader.js').conf;
tools = require('./lib/tools.js');
hash = require('./lib/hash.js');
// load dice
tools.loadCtx(conf.hashx.addr, conf.hashx.owner.addr, conf.hashx.owner.pk)
.then((ret)=>{

    checkEnd = async() => {
        threshold = await hash.endThreshold(ret);
        termID = await hash.termID(ret);
        termInfo = await hash.termInfo(ret, termID);
        console.log(JSON.stringify(termInfo));
        console.log(`totalAmount:${termInfo.totalAmount}, maxNumber:${termInfo.maxNumber}; Can end now:${termInfo.totalAmount.toNumber() > threshold}`);
        a = termInfo.totalAmount;
        console.log(a.toNumber());
        if (termInfo.totalAmount >= threshold) {
            trxHash = await hash.end(ret);
            console.log(`end term:${termID}, threshold:${threshold}, amount:${termInfo.totalAmount}, trxHash:${trxHash}`);
        }
    }

    checkEnd();

    result = async() => {
        // info = await hash.termResult(ret, 1);
        // console.log(JSON.stringify(info));

        curBlock = await ret.tron.trx.getCurrentBlock();
        console.log(curBlock);
        console.log(curBlock.block_header.raw_data.number);
    }

    result();

}, (err)=>{
    console.log("init dice FAILED: ${err}");
});
