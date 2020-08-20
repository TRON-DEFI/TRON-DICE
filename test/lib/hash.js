TronWeb = require('tronweb');
conf = require('./configLoader.js').conf;

exports.EventListener = async(ret) => {
    ret.ctx.LuckLottory().watch((err, result) => {
        if (err) {
            // console.error('FAILED dice.Play:', err);
            return;
        }
        console.log(`hash.LuckLottory:${JSON.stringify(result)}`);
    }).catch((err)=>{
        // console.log("catch watch err for dice.Play:", err);
        delete err;
    });

    ret.ctx.Draw().watch((err, result) => {
        if (err) {
            // console.error('FAILED dice.Lose:', err);
            return;
        }
        console.log(`hash.Draw:${JSON.stringify(result)}`);
    }).catch((err)=>{
        // console.log("catch watch err for dice.Lose:", err);
        delete err;
    });

    ret.ctx.TermEnd().watch((err, result) => {
        if (err) {
            // console.error('FAILED dice.Win:', err);
            return;
        }
        console.log(`hash.TermEnd:${JSON.stringify(result)}`);
    }).catch((err)=>{
        // console.log("catch watch err for dice.Win:", err);
        delete err;
    });
};

play = async(ret, player, playerPK, amount, referrer) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.buy(referrer).send({callValue: amount}).then(
            (trxHash)=>{
                console.log(`hash play(player:${player}, amount:${amount}, referrer:${referrer}) done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`hash play FAILED: ${err}`);
                b(err);
            }).catch((err)=>{
                console.log(`hash play FAILED: ${err}`);
                b(err);
            });
        } catch(err) {
            console.log(`hash play FAILED: ${err}`);
            b(err);
        }
    });
};

end = async(ret) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.end().send().then(
            (trxHash)=>{
                console.log(`hash end() done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`hash end FAILED: ${err}`);
                b(err);
            }).catch((err)=>{
                console.log(`hash end FAILED: ${err}`);
                b(err);
            });
        } catch(err) {
            console.log(`hash end FAILED: ${err}`);
            b(err);
        }
    });
};

draw = async(ret, id) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.draw(id).send().then(
            (trxHash)=>{
                console.log(`hash draw(${id}) done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`hash draw FAILED: ${err}`);
                b(err);
            }).catch((err)=>{
                console.log(`hash draw FAILED: ${err}`);
                b(err);
            });
        } catch(err) {
            console.log(`hash draw FAILED: ${err}`);
            b(err);
        }
    });
};

setDev = async(ret, addr) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.setDev(addr).send().then(
            (trxHash)=>{
                console.log(`hash setDev(${addr}) done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`hash setDev FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

termID = async(ret) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.termID().call().then(
            (id)=>{
                console.log(`hash termID() get: ${id}`);
                a(id);
            },
            (err)=>{
                console.log(`hash termID FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

termInfo = async(ret, id) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.termInfo(id).call().then(
            (info)=>{
                console.log(`hash termInfo(${id}) get: ${info}`);
                a(info);
            },
            (err)=>{
                console.log(`hash termInfo(${id}) FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

termResult = async(ret, id) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.getTermResult(id).call().then(
            (result)=>{
                console.log(`hash getTermResult(${id}) get: ${result}`);
                a(result);
            },
            (err)=>{
                console.log(`hash getTermResult(${id}) FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

endThreshold = async(ret) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.endThreshold().call().then(
            (val)=>{
                console.log(`hash endThreshold() get: ${val}`);
                a(val);
            },
            (err)=>{
                console.log(`hash endThreshold() FAILED: ${err}`);
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
                console.log(`hash setMineIF(${addr}) done! TrxHash:${trxInfo}`);
                a(trxInfo);
            },
            (err)=>{
                console.log(`hash setMineIF(${addr}) FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
}

initRankCtx = async(ret, addr) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.setRankIF(addr).send().then(
            (trxInfo)=>{
                console.log(`hash setRankIF(${addr}) done! TrxHash:${trxInfo}`);
                a(trxInfo);
            },
            (err)=>{
                console.log(`hash setRankIF(${addr}) FAILED: ${err}`);
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
                console.log(`hash setReferIF(${addr}) done! TrxHash:${trxInfo}`);
                a(trxInfo);
            },
            (err)=>{
                console.log(`hash setReferIF(${addr}) FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
}

initDividePool = async(ret, addr) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.setDividePool(addr).send().then(
            (trxInfo)=>{
                console.log(`hash setDividePool(${addr}) done! TrxHash:${trxInfo}`);
                a(trxInfo);
            },
            (err)=>{
                console.log(`hash setDividePool(${addr}) FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
}

exports.play = play;
exports.end = end;
exports.draw = draw;
exports.setDev = setDev;
exports.termID = termID;
exports.termInfo = termInfo;
exports.termResult = termResult;
exports.endThreshold = endThreshold;
exports.initMinerCtx = initMinerCtx;
exports.initRankCtx = initRankCtx;
exports.initReferCtx = initReferCtx;
exports.initDividePool = initDividePool;
