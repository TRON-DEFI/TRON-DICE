TronWeb = require('tronweb');
conf = require('./configLoader.js').conf;


addMiner = async(ret, game, priceRate = 100, devRate = 10) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.addMiner(game, priceRate, devRate).send().then(
            (trxHash)=>{
                console.log(`addMiner(game:${game}, priceRate:${priceRate}, devRate:${devRate}) done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`addMiner FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};


setDev = async(ret, addr) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.setDev(addr).send().then(
            (trxHash)=>{
                console.log(`token setDev(${addr}) done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`token setDev FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

setMinePrice = async(ret, priceRate = 100) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.setMinePrice(game, priceRate).send().then(
            (trxHash)=>{
                console.log(`setMinePrice(${priceRate}) done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`setMinePrice FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};


setMineDevRate = async(ret, devRate = 10) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.setMineDevRate(game, devRate).send().then(
            (trxHash)=>{
                console.log(`setMineDevRate(${devRate}) done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`setMineDevRate FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

startDivide = async(ret) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.startDivide().send().then(
            (trxHash)=>{
                console.log(`startDivide() done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`startDivide FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};


endDivide = async(ret) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.endDivide().send().then(
            (trxHash)=>{
                console.log(`endDivide() done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`endDivide FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

divide = async(ret, num = 10) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.divide(num).send().then(
            (trxHash)=>{
                console.log(`divide() done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`divide FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

divideInfo = async(ret) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.divideInfo().call().then(
            (info)=>{
                a(info);
            },
            (err)=>{
                console.log(`divideInfo FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

divideTermInfo = async(ret, id) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.divideTermInfo(id).call().then(
            (info)=>{
                a(info);
            },
            (err)=>{
                console.log(`divideTermInfo FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

divideTermID = async(ret) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.divideTermID().call().then(
            (info)=>{
                a(info);
            },
            (err)=>{
                console.log(`divideTermID FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

maxUID = async(ret) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.maxUID().call().then(
            (info)=>{
                a(info);
            },
            (err)=>{
                console.log(`maxUID FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

totalLock = async(ret) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.totalLock().call().then(
            (info)=>{
                a(info);
            },
            (err)=>{
                console.log(`totalLock FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

divideRate = async(ret) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.divideRate().call().then(
            (info)=>{
                a(info);
            },
            (err)=>{
                console.log(`divideRate FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};



exports.addMiner = addMiner;
exports.setMinePrice = setMinePrice;
exports.setMineDevRate = setMineDevRate;
exports.setDev = setDev;

exports.startDivide = startDivide;
exports.divide = divide;
exports.endDivide = endDivide;
exports.divideInfo = divideInfo;
exports.divideTermInfo = divideTermInfo;
exports.divideTermID = divideTermID;
exports.maxUID = maxUID;
exports.totalLock = totalLock;
exports.divideRate = divideRate;

lockedAmount = async(ret, addr) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.lockedAmount(addr).call().then(
            (info)=>{
                console.log(`lockedAmount(${addr}) is:[${info}]`);
                a(info);
            },
            (err)=>{
                console.log(`lockedAmount FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

unlockTime = async(ret, addr) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.unlockTime(addr).call().then(
            (info)=>{
                console.log(`unlockTime(${addr}) is:[${info}]`);
                a(info);
            },
            (err)=>{
                console.log(`unlockTime FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

balanceOf = async(ret, addr) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.balanceOf(addr).call().then(
            (info)=>{
                console.log(`balanceOf(${addr}) is:[${info}]`);
                a(info);
            },
            (err)=>{
                console.log(`unlockTime FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

mineAmount = async(ret) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.mineAmount().call().then(
            (info)=>{
                console.log(`mineAmount() is:[${info}]`);
                a(info);
            },
            (err)=>{
                console.log(`mineAmount FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

mineCount = async(ret) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.mineCount().call().then(
            (info)=>{
                console.log(`mineCount() is:[${info}]`);
                a(info);
            },
            (err)=>{
                console.log(`mineCount FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};


exports.lockedAmount = lockedAmount;
exports.unlockTime = unlockTime;
exports.balanceOf = balanceOf;
exports.mineAmount = mineAmount;
exports.mineCount = mineCount;