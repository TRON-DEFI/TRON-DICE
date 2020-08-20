TronWeb = require('tronweb');
conf = require('./configLoader.js').conf;

exports.RingEventListener = async(ret) => {
    ret.ctx.RingLottory().watch((err, result) => {
        if (err) {
            // console.error('FAILED ring.Play:', err);
            return;
        }
        console.log(`ring.RingLottory:${JSON.stringify(result)}`);
    }).catch((err)=>{
        // console.log("catch watch err for ring.Play:", err);
        delete err;
    });

    ret.ctx.RingDraw().watch((err, result) => {
        if (err) {
            // console.error('FAILED ring.Lose:', err);
            return;
        }
        console.log(`ring.RingDraw:${JSON.stringify(result)}`);
    }).catch((err)=>{
        // console.log("catch watch err for ring.Lose:", err);
        delete err;
    });

    ret.ctx.RingWin().watch((err, result) => {
        if (err) {
            // console.error('FAILED ring.Lose:', err);
            return;
        }
        console.log(`ring.RingWin:${JSON.stringify(result)}`);
    }).catch((err)=>{
        // console.log("catch watch err for ring.Lose:", err);
        delete err;
    });

    ret.ctx.RingFinish().watch((err, result) => {
        if (err) {
            // console.error('FAILED ring.Win:', err);
            return;
        }
        console.log(`ring.RingFinish:${JSON.stringify(result)}`);
    }).catch((err)=>{
        // console.log("catch watch err for ring.Win:", err);
        delete err;
    });

    ret.ctx.RingStart().watch((err, result) => {
        if (err) {
            // console.error('FAILED ring.Win:', err);
            return;
        }
        console.log(`ring.RingStart:${JSON.stringify(result)}`);
    }).catch((err)=>{
        // console.log("catch watch err for ring.Win:", err);
        delete err;
    });
};

configSet = async(ret,poolRate=10,developerRate=6,marketRate=4,referRate=5,rankRate=5,rewardRate=70) => {
    return new Promise((a, b) => {
        try {
            setDeveloper(ret, conf.hash.dev.addr);
            setMarketing(ret,conf.hash.market.addr);
            setPool(ret,conf.hash.rewardPool.addr);
            setReferIF(ret,conf.refer.addr);
            setRankIF(ret,conf.ranking.addr);
            setMineIF(ret,conf.miner.addr);
            setRate(poolRate,developerRate,marketRate,referRate,rankRate,rewardRate);
            
        } catch(err) {
            b(err);
        }
    });
};
exports.startTimeOut = async(ret,interval=3000) => {
    return new Promise((a, b) => {
        timer = setTimeout(()=>{
            try {
                ret.ctx.start().send({callValue: 0}).then(
                (trxHash)=>{
                    console.log(`ring start() done, TrxHash: ${trxHash}`);
                    a(trxHash);
                },
                (err)=>{
                    console.log(`ring start FAILED: ${err}`);
                });
            } catch(err) {
                b(err);
            }
        }, interval);
    });
};
start = async(ret) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.start().send({callValue: 0}).then(
            (trxHash)=>{
                console.log(`ring start() done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`ring start FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};


buy = async(ret, reffer, color,amount) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.buy(reffer,color).send({callValue: amount}).then(
            (trxHash)=>{
                console.log(`ring buy(reffer:${reffer}, amount:${amount}, color:${color}) done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`ring buy FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};


draw = async(ret, interval = 18000, maxNum) => {
    return new Promise((a, b) => {
        timer = setTimeout(()=>{
            var max = maxNum;
            var min = 0;
            var Range = max - min;   
            var rand = Math.random();   
            var number = min + Math.round(rand * Range);
            ret.ctx.draw(number).send().then(
                (trxHash)=> {
                    console.log(`draw calling random ${number}- trxHash: ${trxHash}`)
                        // TODO: check trxHash, if draw failed()
                    a(trxHash);
                },
                (err)=>{
                    console.log(`draw calling err: ${err}`)
                        // TODO: check trxHash, if draw failed()
                    b(err);
            });
        }, interval);
    });
};

getWinNumbers = async(ret,startBetID,endBetID) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.getWinNumbers(startBetID,endBetID).call().then(
            (result)=>{
                console.log(`ring getWinNumbers() get: ${result}`);
                var arr = result.toString().split(",").map(function (val) {  
                    return String(val);  
                  }); 
                a({
                    winNumbers: arr[0],
                    winColors: arr[1]
                });
            },
            (err)=>{
                console.log(`ring getWinNumbers FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

getBetInfo = async(ret,betID) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.bets_(betID).call().then(
            (result)=>{

                console.log(`ring getBetInfo() get: ${JSON.stringify(result)}`);
                var arr = JSON.parse(JSON.stringify(result));
                a({                    
                    totalReceived:  parseInt(arr.totalReceived._hex),
                    totalProfile:   parseInt(arr.totalProfile._hex),
                    totalLose:      parseInt(arr.totalLose._hex),
                    totalReward:    parseInt(arr.totalReward._hex),
                    winNumber:      parseInt(arr.winNumber._hex),
                    winColor:       parseInt(arr.winColor._hex),
                    startTime:      parseInt(arr.startTime._hex),
                    endTime:        parseInt(arr.endTime._hex)
                });
            },
            (err)=>{
                console.log(`ring getBetInfo FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

getPlayer = async(ret,betID,color) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.getPlayer(betID,color).call().then(
            (result)=>{
                console.log(`ring getPlayer() get: ${result}`);
                a(result);
            },
            (err)=>{
                console.log(`ring getPlayer FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

//彩环数组
colorNumbers = async(ret,i) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.colorNumbers(i).call().then(
            (result)=>{
                console.log(`ring colorNumbers() get: ${result}`);
                a(result);
            },
            (err)=>{
                console.log(`ring colorNumbers FAILED: ${err}`);
            });

        } catch(err) {
            b(err);
        }
    });
};

//彩环色号枚举
colors = async(ret,i) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.colors(i).call().then(
            (result)=>{
                console.log(`ring colors() get: ${result}`);
                a(result);
            },
            (err)=>{
                console.log(`ring colors FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

//查询当前期结束时间
endTime = async(ret) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.endTime_().call().then(
            (result)=>{
                console.log(`ring endTime() get: ${result}`);
                a(result);
            },
            (err)=>{
                console.log(`ring endTime FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

//查询当前期数
currentBet = async(ret) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.currentBet().call().then(
            (result)=>{
                console.log(`ring currentBet() get: ${result}`);
                a(result);
            },
            (err)=>{
                console.log(`ring currentBet FAILED: ${err}`);
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
                console.log(`ring state() get: ${result}`);
                a(result);
            },
            (err)=>{
                console.log(`ring state FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};


//游戏开始以来(从第一期开始到当前)的参与人次
totalPlayCount = async(ret) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.totalPlayCount().call().then(
            (result)=>{
                console.log(`ring totalPlayCount() get: ${result}`);
                a(result);
            },
            (err)=>{
                console.log(`ring totalPlayCount FAILED: ${err}`);
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
                console.log(`ring totalReceive() get: ${result}`);
                a(result);
            },
            (err)=>{
                console.log(`ring totalReceive FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};


poolAddr = async(ret) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.poolAddr().call().then(
            (result)=>{
                console.log(`ring poolAddr() get: ${result}`);
                a(result);
            },
            (err)=>{
                console.log(`ring poolAddr FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};
developer = async(ret) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.developer().call().then(
            (result)=>{
                console.log(`ring developer() get: ${result}`);
                a(result);
            },
            (err)=>{
                console.log(`ring developer FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};
mineCtx = async(ret) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.mineCtx().call().then(
            (result)=>{
                console.log(`ring mineCtx() get: ${result}`);
                a(result);
            },
            (err)=>{
                console.log(`ring mineCtx FAILED: ${err}`);
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
                console.log(`ring referCtx() get: ${result}`);
                a(result);
            },
            (err)=>{
                console.log(`ring referCtx FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};
rankCtx = async(ret) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.rankCtx().call().then(
            (result)=>{
                console.log(`ring rankCtx() get: ${result}`);
                a(result);
            },
            (err)=>{
                console.log(`ring rankCtx FAILED: ${err}`);
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
                console.log(`ring setMineIF(${addr}) done! TrxHash:${trxInfo}`);
                a(trxInfo);
            },
            (err)=>{
                console.log(`ring setMineIF(${addr}) FAILED: ${err}`);
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
                console.log(`ring setRankIF(${addr}) done! TrxHash:${trxInfo}`);
                a(trxInfo);
            },
            (err)=>{
                console.log(`ring setRankIF(${addr}) FAILED: ${err}`);
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
                console.log(`ring setReferIF(${addr}) done! TrxHash:${trxInfo}`);
                a(trxInfo);
            },
            (err)=>{
                console.log(`ring setReferIF(${addr}) FAILED: ${err}`);
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
                console.log(`ring setDeveloper(${addr}) done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`ring setDeveloper FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};
setMarketing = async(ret, addr) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.setMarket(addr).send().then(
            (trxHash)=>{
                console.log(`ring setMarketing(${addr}) done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`ring setMarketing FAILED: ${err}`);
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
                console.log(`ring setPool(${addr}) done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`ring setPool FAILED: ${err}`);
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
                console.log(`ring setRate(${addr}) done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`ring setRate FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

initColor = async(ret) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.initColor().send().then(
            (trxHash)=>{
                console.log(`ring initColor() done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`ring initColor FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

initColorInfo = async(ret, mutisArr, maxArr) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.initColorInfo(mutisArr,maxArr).send().then(
            (trxHash)=>{
                console.log(`ring initColorInfo(${mutisArr},${maxArr}) done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`ring initColorInfo FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

initColorNumbers = async(ret, colorArr) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.initColorNumbers(colorArr).send().then(
            (trxHash)=>{
                console.log(`ring initColorNumbers(${colorArr}) done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`ring initColorNumbers FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

exports.buy = buy;
exports.draw = draw;
exports.getWinNumbers = getWinNumbers;
exports.getPlayer =getPlayer;
exports.colorNumbers=colorNumbers;
exports.colors=colors;
exports.currentBet=currentBet;
exports.state=state;
exports.endTime=endTime;
exports.totalPlayCount=totalPlayCount;
exports.totalReceive=totalReceive;
exports.getBetInfo=getBetInfo;
exports.poolAddr=poolAddr;
exports.developer=developer;
exports.mineCtx=mineCtx;
exports.referCtx=referCtx;
exports.rankCtx=rankCtx;

exports.setDev = setDev;
exports.setMarketing=setMarketing;
exports.setPool=setPool;
exports.setRate=setRate
exports.initMinerCtx = initMinerCtx;
exports.initRankCtx = initRankCtx;
exports.initReferCtx = initReferCtx;
exports.initColor = initColor;
exports.initColorInfo = initColorInfo;
exports.initColorNumbers = initColorNumbers;
exports.start = start;


