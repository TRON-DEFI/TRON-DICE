TronWeb = require('tronweb');
conf = require('./configLoader.js').conf;

exports.luckeyhashEventListener = async(ret) => {
    ret.ctx.LuckLottory().watch((err, result) => {
        if (err) {
            // console.error('FAILED lucy.Play:', err);
            return;
        }
        console.log(`lucy.Play:${JSON.stringify(result)}`);
    }).catch((err)=>{
        // console.log("catch watch err for lucy.Play:", err);
        delete err;
    });

    ret.ctx.LuckDraw().watch((err, result) => {
        if (err) {
            // console.error('FAILED lucy.Lose:', err);
            return;
        }
        console.log(`lucy.Lose:${JSON.stringify(result)}`);
    }).catch((err)=>{
        // console.log("catch watch err for lucy.Lose:", err);
        delete err;
    });

    ret.ctx.LuckFinish().watch((err, result) => {
        if (err) {
            // console.error('FAILED lucy.Win:', err);
            return;
        }
        console.log(`lucy.Win:${JSON.stringify(result)}`);
    }).catch((err)=>{
        // console.log("catch watch err for lucy.Win:", err);
        delete err;
    });

    ret.ctx.LuckStart().watch((err, result) => {
        if (err) {
            // console.error('FAILED lucy.Win:', err);
            return;
        }
        console.log(`lucy.Win:${JSON.stringify(result)}`);
    }).catch((err)=>{
        // console.log("catch watch err for lucy.Win:", err);
        delete err;
    });
};

configSet = async(ret,poolRate=10,developerRate=6,marketRate=4,referRate=5,rankRate=5) => {
    return new Promise((a, b) => {
        try {
            setDeveloper(ret, conf.hash.dev.addr);
            setMarketing(ret,conf.hash.market.addr);
            setPool(ret,conf.hash.rewardPool.addr);
            setReferIF(ret,conf.refer.addr);
            setRankIF(ret,conf.ranking.addr);
            setMineIF(ret,conf.miner.addr);
            var rewardRate=100-poolRate-developerRate-marketRate-referRate-rankRate;
            if (rewardRate>=0){
                setRate(poolRate,developerRate,marketRate,referRate,rankRate,rewardRate);
            }else{
                console.log(`set rate err:rewardRate=${rewardRate}`)
            }
            
        } catch(err) {
            b(err);
        }
    });
};


buy = async(ret, referer,amount) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.buy(referer).send({callValue: amount}).then(
            (trxHash)=>{
                console.log(`lucky play(player:${player}, amount:${amount}, point:${point}, referrer:${referrer}, up:${up}) done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`lucky play FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

draw = async(ret) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.draw().send().then(
            (trxHash)=>{
                console.log(`lucy draw() get: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`lucy draw FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

getTermNumberOwner = async(ret,number,termID) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.getTermNumberOwner(number,termID).call().then(
            (address)=>{
                console.log(`lucy getTermNumberOwner() get: ${address}`);
                a(address);
            },
            (err)=>{
                console.log(`lucy getTermNumberOwner FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

getTermUserNumbers = async(ret,addr,termID) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.getTermUserNumbers(addr,termID).call().then(
            (result)=>{
                console.log(`lucy getTermUserNumbers() get: ${result}`);
                a(result);
            },
            (err)=>{
                console.log(`lucy getTermUserNumbers FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

getTermResult = async(ret,termID) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.getTermResult(termID).call().then(
            (result)=>{
                console.log(`lucy getTermResult() get: ${result}`);
                a(result);
            },
            (err)=>{
                console.log(`lucy getTermResult FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

terms = async(ret,termID) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.terms(termID).call().then(
            (result)=>{
                console.log(`lucy terms() get: ${result}`);
                a(result);
            },
            (err)=>{
                console.log(`lucy terms FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

//查询当前期数
currentTerm = async(ret) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.currentTerm().call().then(
            (result)=>{
                console.log(`lucy currentTerm() get: ${result}`);
                a(result);
            },
            (err)=>{
                console.log(`lucy currentTerm FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};
//当前游戏状态
state = async(ret) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.state().call().then(
            (result)=>{
                console.log(`lucy state() get: ${result}`);
                a(result);
            },
            (err)=>{
                console.log(`lucy state FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};
//当期游戏卖出彩票数
number = async(ret) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.number_().call().then(
            (result)=>{
                console.log(`lucy number_() get: ${result}`);
                a(result);
            },
            (err)=>{
                console.log(`lucy number FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

//当期游戏总奖金
totalReward = async(ret) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.totalReward_().call().then(
            (result)=>{
                console.log(`lucy totalReward_() get: ${result}`);
                a(result);
            },
            (err)=>{
                console.log(`lucy totalReward_ FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

//游戏开始以来(从第一期开始到当前)的参与人次
playCnt = async(ret) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.playCnt().call().then(
            (result)=>{
                console.log(`lucy playCnt() get: ${result}`);
                a(result);
            },
            (err)=>{
                console.log(`lucy playCnt FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

//游戏开始以来(从第一期开始到当前)的总流水
totalReceive = async(ret) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.totalReceive().call().then(
            (result)=>{
                console.log(`lucy totalReceive() get: ${result}`);
                a(result);
            },
            (err)=>{
                console.log(`lucy totalReceive FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

//------------set method---------------------
initMinerCtx = async(ret, addr) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.setMineIF(addr).send().then(
            (trxInfo)=>{
                console.log(`lucy setMineIF(${addr}) done! TrxHash:${trxInfo}`);
                a(trxInfo);
            },
            (err)=>{
                console.log(`lucy setMineIF(${addr}) FAILED: ${err}`);
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
                console.log(`lucy setRankIF(${addr}) done! TrxHash:${trxInfo}`);
                a(trxInfo);
            },
            (err)=>{
                console.log(`lucy setRankIF(${addr}) FAILED: ${err}`);
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
                console.log(`lucy setReferIF(${addr}) done! TrxHash:${trxInfo}`);
                a(trxInfo);
            },
            (err)=>{
                console.log(`lucy setReferIF(${addr}) FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
}


setDev = async(ret, addr) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.setDeveloper(addr).send().then(
            (trxHash)=>{
                console.log(`lucky setDeveloper(${addr}) done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`lucky setDeveloper FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};
setMarketing = async(ret, addr) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.setMarketing(addr).send().then(
            (trxHash)=>{
                console.log(`lucky setMarketing(${addr}) done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`lucky setMarketing FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};
setPool = async(ret, addr) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.setPool(addr).send().then(
            (trxHash)=>{
                console.log(`lucky setPool(${addr}) done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`lucky setPool FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

setRate = async(ret,  poolRate, developerRate, marketRate, referRate, rankRate, rewardRate) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.setRate(poolRate, developerRate, marketRate, referRate, rankRate, rewardRate).send().then(
            (trxHash)=>{
                console.log(`lucky setRate(${addr}) done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`lucky setRate FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

exports.buy = buy;
exports.draw = draw;

exports.getTermResult = getTermResult;
exports.getTermUserNumbers =getTermUserNumbers;
exports.getTermNumberOwner=getTermNumberOwner;
exports.terms=terms;
exports.state=state;
exports.currentTerm=currentTerm;
exports.number=number;
exports.totalReward=totalReward;
exports.playCnt=playCnt;
exports.totalReceive=totalReceive;

exports.setDev = setDev;
exports.setMarketing=setMarketing;
exports.setPool=setPool;
exports.setRate=setRate
exports.initMinerCtx = initMinerCtx;
exports.initRankCtx = initRankCtx;
exports.initReferCtx = initReferCtx;



