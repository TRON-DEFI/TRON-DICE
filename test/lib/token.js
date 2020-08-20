
TronWeb = require('tronweb');
conf = require('./configLoader.js').conf;

tools = require('./tools.js');

exports.authorize = async(ret, addr, on, msg) => {
    return new Promise((a, b)=>{
        try {
            ret.ctx.authorize(addr, on).send().then(
            (trxHash) => {
                console.log(`authorize ${msg} TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err) => {
                console.log(`authorize ${msg} FAILED: ${err}`);
                b(err);
            });
        } catch(err) {
            console.log(`authorize ${msg} FAILED: ${err}`);
            b(err);
        }
    });
};

exports.approve = async(ret, addr, amount) => {
    return new Promise((a,b)=>{
        try {
            ret.ctx.approve(addr, amount).send().then(
            (trxHash) => {
                console.log(`approve(${addr}, ${amount}) TrxHash:${trxHash}`);
                a(trxHash);
            },
            (err) => {
                console.log(`FAILED: approve(address:${addr}, amount:${amount}): ${err}`);
                b(err);
            });
        } catch(err) {
            console.log(`FAILED call token.ctx.amount(address:${addr}, amount:${amount}): ${err}`);
            b(err);
        }
    });
};