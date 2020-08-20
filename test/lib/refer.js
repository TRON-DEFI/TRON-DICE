TronWeb = require('tronweb');
conf = require('./configLoader.js').conf;


setGame = async(ret, game, ok = true) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.setGame(game, ok).send().then(
            (trxHash)=>{
                console.log(`setGame(${game}, ${ok}) done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`setGame(${game}, ${ok}) FAILED: ${err}`);
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
                console.log(`refer setDev(${addr}) done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`refer setDev(${addr}) FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

referrerDetail = async(ret, user) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.referrerDetail(user).send().then(
            (trxHash)=>{
                console.log(`referrerDetail(${user}) done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`referrerDetail(${referrerDetail}) FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

exports.setGame = setGame;
exports.referrerDetail = referrerDetail
exports.setDev = setDev;
