
TronWeb = require('tronweb');
conf = require('./lib/configLoader.js').conf;
tools = require('./lib/tools.js');


if (process.argv.length == 3) {
    trxHash = process.argv[2];
    tools.getTrxInfo(trxHash)
    .then(
        (trxInfo)=>{
            console.log(`${JSON.stringify(trxInfo)}`);
        }, (err)=>{
            console.log(`get trxInfo [${trxHash}] FAILED: ${err}`);
        });
} else {
    console.log(`usage: node ${process.argv[1]} TrxHash`);
}
