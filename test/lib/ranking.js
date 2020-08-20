TronWeb = require('tronweb');
conf = require('./configLoader.js').conf;

exports.setDev = async(ret, addr) => {
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

exports.setGame = async(ret, game, ok = true) => {
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

// exports.setWhiteList = async(ret, addr, allow) => {
//     return new Promise((a, b) => {
//         try {
//             ret.ctx.setPrivilege(addr,allow).send().then(
//             (trxHash)=>{
//                 console.log(`dice setWhiteList(${addr}) done, TrxHash: ${trxHash}`);
//                 a(trxHash);
//             },
//             (err)=>{
//                 console.log(`dice setWhiteList FAILED: ${err}`);
//             });
//         } catch(err) {
//             b(err);
//         }
//     });
// };

exports.rankStart = async(ret) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.rankStart().send().then(
            (trxHash)=>{
                console.log(`dice rankStart() done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`dice rankStart FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

currentRankID = async(ret) => {
    return new Promise((a, b)=>{
        try{
            ret.ctx.getCurrentRank().call().then((rankID)=>{
                console.log(`randID:${JSON.stringify(rankID)}`);
                a(rankID.rankID);
            }, (err)=> {
                b(err);
            });
        } catch (err) {
            b(err);
        }
    });
};
gameID = async(ret) => {
    return new Promise((a, b)=>{
        try{
            ret.ctx.gameID().call().then((gameID)=>{
                console.log(`gameID:${gameID}`);
                a(gameID);
            }, (err)=> {
                b(err);
            });
        } catch (err) {
            b(err);
        }
    });
};
income = async(ret) => {
    return new Promise((a, b)=>{
        try{
            ret.ctx.income().call().then((income)=>{
                console.log(`income:${income}`);
                a(income);
            }, (err)=> {
                b(err);
            });
        } catch (err) {
            b(err);
        }
    });
};

exports.ranking = async(ret, player, amount) => {
    return new Promise((a, b)=>{
        try{
            ret.ctx.ranking(player,amount).send({callValue: amount}).then((trxHash)=>{ 
                console.log(`play trxHash:${trxHash}`);
                a(trxHash);
            }, (err)=>{
                console.log(err);
            });
        } catch (err) {
            console.log(err);
            b(err);
        }
    });
};


getRankData = async(ret, rankID, start = 1, end = 10) => {
    return new Promise((a, b)=>{
        try{
            ret.ctx.getRankData(rankID, start, end).call().then((rankData)=>{
                 console.log(`rankData:${JSON.stringify(rankData)}`);
                rankData.rankID = rankID;
                rankData.start = start;
                rankData.end = end;
                a({
                    raw: rankData,
                    id: rankID,
                    start: start,
                    end: end,
                    totalPrice: parseInt(rankData[3]._hex,16),
                    len: rankData[1].length
                });
            }, (err)=>{
                console.log(err);
            });
        } catch (err) {
            b(err);
        }
    });
};

setRankResult = async(ret, rankID, adds, rates) => {
    return new Promise((a, b)=>{
        try{
            ret.ctx.setRankResult(rankID, adds, rates).send().then((trxHash)=>{
                console.log(`setRankResult trxHash:${trxHash}`);
                a(trxHash);
            }, (err)=>{
                console.log(err);
            });
        } catch (err) {
            b(err);
        }
    });
};

getRankResult = async(ret, rankID) => {
    return new Promise((a, b)=>{
        try{
            ret.ctx.getRankResult(rankID).call().then((result)=>{
                console.log(`getRankResult result:${result}`);
                a(result);
            }, (err)=>{
                console.log(err);
            });
        } catch (err) {
            b(err);
        }
    });
};

getRankDataAll = async(ret, rankID) => {
    return new Promise((a,b)=>{
        try{
            data = [];
            sortFunc = (i, j) => {
                if (null == i) return false;
                if (null == j) return false;
                return j.amount - i.amount;
            };

            // currentRankID(ret).then((rankID)=>{
                getRankData(ret, rankID, 1, 100).then((rankData)=>{
                    ps = [];
                    rankLen = rankData.raw[0];
                    console.log(`rank data len:${rankLen}, ret data len:${rankData.raw[1].length}`);
                    console.log(`start:${rankData.start}, end:${rankData.end}`);
                    console.log(`rankData:${JSON.stringify(rankData)}-${rankData.totalPrice}`);
                    for (i = rankData.start-1, j=0; j < rankData.len; i++, j++) {
                        data[i]={
                            addr:rankData.raw[1][j],
                            amount:rankData.raw[2][j]
                        };
                    }
                    if (data.length < rankLen) {
                        gap = rankLen - data.length
                        for (i = rankData.len+1; i <= rankLen; i = i+100) {
                            console.log(`getRankData(${rankID}, ${i}, ${i+100})\n`)
                            ps.push(getRankData(ret, rankID, i, i+100));
                        }
                    }


                    Promise.all(ps).then((vals)=>{
                        console.log(`all-->vals len:${vals.length}, data len:${data.length}`);
                        vals.forEach((item, idx)=>{
                            // console.log(`item ${idx}, len:${item.len}, start:${item.start}, end:${item.end}, data len:${data.length}\n\n${JSON.stringify(item)}\n`);
                            for (i = item.start-1, j=0; j < item.len; i++, j++) {
                                data[i]={
                                    addr:item.raw[1][j],
                                    amount:item.raw[2][j]
                                };
                            }
                            // console.log(`after-->item ${idx}, len:${item.len}, start:${item.start}, end:${item.end}, data len:${data.length}`);
                        });
                        data.sort(sortFunc);
                        // console.log(`data len:${data.length}, total len:${rankLen}`);
                        // console.log(JSON.stringify(data));

                        a({
                          totalPrice:rankData.totalPrice,
                          data:data
                        });
                    })
                });
            // });
        } catch(err) {
            b(err);
        }
    }, (err)=>{ b(err); });
};

exports.currentRankID = currentRankID;
exports.gameID = gameID;
exports.income = income;
exports.getRankDataRaw = getRankData;
exports.getRankData = getRankDataAll;
exports.setRankResult = setRankResult;
exports.getRankResult = getRankResult;