TronWeb = require('tronweb');
conf = require('./configLoader.js').conf;

exports.diceEventListener = async(ret) => {
    ret.ctx.Play().watch((err, result) => {
        if (err) {
            // console.error('FAILED dice.Play:', err);
            return;
        }
        console.log(`dice.Play:${JSON.stringify(result)}`);
    }).catch((err)=>{
        // console.log("catch watch err for dice.Play:", err);
        delete err;
    });

    ret.ctx.Lose().watch((err, result) => {
        if (err) {
            // console.error('FAILED dice.Lose:', err);
            return;
        }
        console.log(`dice.Lose:${JSON.stringify(result)}`);
    }).catch((err)=>{
        // console.log("catch watch err for dice.Lose:", err);
        delete err;
    });

    ret.ctx.Win().watch((err, result) => {
        if (err) {
            // console.error('FAILED dice.Win:', err);
            return;
        }
        console.log(`dice.Win:${JSON.stringify(result)}`);
    }).catch((err)=>{
        // console.log("catch watch err for dice.Win:", err);
        delete err;
    });
};


diceDraw = async(ret, interval = 1500) => {
    timer = setInterval(()=>{
        ret.ctx.index().call().then(
        (indexRet)=>{
            let curIdx = indexRet[0];
            let resultIdx = indexRet[1];
            let gap = curIdx - resultIdx;
            console.log(`current index:${curIdx}, result index:${resultIdx}, gap:${gap}`);
            if (0 == gap) return;

            for (; gap > 0; gap--) {
                rand = Math.floor((Math.random()*100)+1);
                ret.ctx.draw(rand, curIdx-gap).send().then(
                (trxHash)=> {
                    // TODO: check trxHash, if draw failed()
                },
                (err)=>{
                    // TODO: check trxHash, if draw failed()
                });
            }
        },
        (err) => {
            console.log(err);
        });
    }, interval);

    return {
        timer: timer,
        stop: function() {
            clearInterval(timer);
        }
    };
};

setDev = async(ret, addr) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.setDev(addr).send().then(
            (trxHash)=>{
                console.log(`dice setDev(${addr}) done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`dice setDev FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

play = async(ret, player, playerPK, amount, point, referrer, up = false) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.play(point, referrer, up).send({callValue: amount}).then(
            (trxHash)=>{
                console.log(`dice play(player:${player}, amount:${amount}, point:${point}, referrer:${referrer}, up:${up}) done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`dice play FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

index = async(ret) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.index().call().then(
            (indexRet)=>{
                console.log(`dice index() get: ${indexRet}`);
                a(indexRet);
            },
            (err)=>{
                console.log(`dice index FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

info = async(ret, idx) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.info(idx).call().then(
            (infoRet)=>{
                console.log(`dice info(${idx}) get: ${infoRet}`);
                a(indexRet);
            },
            (err)=>{
                console.log(`dice info(${idx}) FAILED: ${err}`);
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
                console.log(`dice setMineIF(${addr}) done! TrxHash:${trxInfo}`);
                a(trxInfo);
            },
            (err)=>{
                console.log(`dice setMineIF(${addr}) FAILED: ${err}`);
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
                console.log(`dice setRankIF(${addr}) done! TrxHash:${trxInfo}`);
                a(trxInfo);
            },
            (err)=>{
                console.log(`dice setRankIF(${addr}) FAILED: ${err}`);
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
                console.log(`dice setReferIF(${addr}) done! TrxHash:${trxInfo}`);
                a(trxInfo);
            },
            (err)=>{
                console.log(`dice setReferIF(${addr}) FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
}

initDividePool = async(ret, addr) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.setDividePoolAddr(addr).send().then(
            (trxInfo)=>{
                console.log(`dice setDividePoolAddr(${addr}) done! TrxHash:${trxInfo}`);
                a(trxInfo);
            },
            (err)=>{
                console.log(`dice setDividePoolAddr(${addr}) FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
}

// addDivider = async(ret, addr) => {
//     return new Promise((a, b) => {
//         try {
//             ret.ctx.addDivider(addr).send().then(
//             (trxInfo)=>{
//                 console.log(`dice setReferIF(${addr}) done! TrxHash:${trxInfo}`);
//                 a(trxInfo);
//             },
//             (err)=>{
//                 console.log(`dice setReferIF(${addr}) FAILED: ${err}`);
//             });
//         } catch(err) {
//             b(err);
//         }
//     });
// } 


setDevRate = async(ret, val) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.setDevRate(val).send().then(
            (trxInfo)=>{
                console.log(`dice setDevRate(${val}) done! TrxHash:${trxInfo}`);
                a(trxInfo);
            },
            (err)=>{
                console.log(`dice setDevRate(${val}) FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

setRefRate = async(ret, val) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.setRefRate(val).send().then(
            (trxInfo)=>{
                console.log(`dice setRefRate(${val}) done! TrxHash:${trxInfo}`);
                a(trxInfo);
            },
            (err)=>{
                console.log(`dice setRefRate(${val}) FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

setRankRate = async(ret, val) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.setRankRate(val).send().then(
            (trxInfo)=>{
                console.log(`dice setRankRate(${val}) done! TrxHash:${trxInfo}`);
                a(trxInfo);
            },
            (err)=>{
                console.log(`dice setRankRate(${val}) FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

setDivideRate = async(ret, val) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.setDivideRate(val).send().then(
            (trxInfo)=>{
                console.log(`dice setDivideRate(${val}) done! TrxHash:${trxInfo}`);
                a(trxInfo);
            },
            (err)=>{
                console.log(`dice setDivideRate(${val}) FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

exports.diceDraw = diceDraw;
exports.setDev = setDev;
exports.play = play;
exports.index = index;
exports.info = info;
exports.initMinerCtx = initMinerCtx;
exports.initRankCtx = initRankCtx;
exports.initReferCtx = initReferCtx;
exports.initDividePool = initDividePool;

exports.setDevRate = setDevRate;
exports.setRefRate = setRefRate;
exports.setRankRate = setRankRate;
exports.setDivideRate = setDivideRate;