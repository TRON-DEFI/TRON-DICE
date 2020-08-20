TronWeb = require('tronweb');
conf = require('./configLoader.js').conf;

setDev = async(ret, addr, val=1) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.addAdminAccount(addr, val).send().then(
            (trxHash)=>{
                console.log(`roi addAdminAccount(${addr}, ${val}) done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`roi addAdminAccount FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

initMinerCtx = async(ret, addr) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.setMineIF(addr).send().then(
            (trxInfo)=>{
                console.log(`roi setMineIF(${addr}) done! TrxHash:${trxInfo}`);
                a(trxInfo);
            },
            (err)=>{
                console.log(`roi setMineIF(${addr}) FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
}

initReferCtx = async(ret, addr) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.setReferIF(addr).send().then(
            (trxInfo)=>{
                console.log(`roi setReferIF(${addr}) done! TrxHash:${trxInfo}`);
                a(trxInfo);
            },
            (err)=>{
                console.log(`roi setReferIF(${addr}) FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
}

mineCtx = async(ret) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.mineCtx().call().then(
            (result)=>{
                console.log(`roi mineCtx() get: ${result}`);
                a(result);
            },
            (err)=>{
                console.log(`roi mineCtx FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};
referCtx = async(ret) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.referCtx().call().then(
            (result)=>{
                console.log(`roi referCtx() get: ${result}`);
                a(result);
            },
            (err)=>{
                console.log(`roi referCtx FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

invest = async(ret,referAddr,amount) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.invest(referAddr).send({callValue:amount}).then(
            (result)=>{
                console.log(`roi invest() get: ${result}`);
                a(result);
            },
            (err)=>{
                console.log(`roi invest FAILED: ${err}`);
            });
        } catch(err) {
            console.log(`roi invest FAILED: ${err}`);
            b(err);

        }
    });
};


exports.setDev = setDev;
exports.initMinerCtx = initMinerCtx;
exports.initReferCtx = initReferCtx;
exports.mineCtx = mineCtx;
exports.referCtx = referCtx;
exports.invest = invest;
