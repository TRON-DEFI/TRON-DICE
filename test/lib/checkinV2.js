TronWeb = require('tronweb');
conf = require('./configLoader.js').conf;

exports.CallTotalCnt = async(ret) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.totalCnt().call().then(
            (totalCnt)=>{
                console.log(`checkin totalCnt done, totalCnt: ${totalCnt}`);
                a(totalCnt);
            },
            (err)=>{
                console.log(`checkin totalCnt FAILED: ${err}`);
                b(err)
            });
        } catch(err) {
            b(err);
        }
    });
};

exports.CallCheckin = async(ret,addr) => {
    return new Promise((a, b)=>{
        try{
            ret.ctx.checkin(addr).send().then((trxHash)=>{
                console.log(`TrxHash: ${trxHash}`);
                a(trxHash);
            }, (err)=> {
                b(err);
            });
        } catch (err) {
            b(err);
        }
    });
};


exports.CallGetCheckinInfo = async(ret) => {
    return new Promise((a, b)=>{
        try{
            ret.ctx.getCheckinInfo(conf.tester.addr).call().then((result)=>{
                 console.log(`checkInInfo:${result}`);
                 var arr = result.toString().split(",").map(function (val) {  
                    return String(val);  
                  }); 
                a({
                    addr: arr[0],
                    totalCnt: arr[1],
                    continuousCnt: arr[2],
                    latestCheckinTime: arr[3]
                });
            }, (err)=>{
                console.log(err);
                b(err);
            });
        } catch (err) {
            b(err);
        }
    });
};




exports.setWhiteList = async(ret, addr, allow) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.setPrivilege(addr,allow).send().then(
            (trxHash)=>{
                console.log(`dice setWhiteList(${addr}) done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`dice setWhiteList FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

exports.checkinStart = async(ret) => {
    return new Promise((a, b) => {
        try {
            ret.ctx.checkinStart().send().then(
            (trxHash)=>{
                console.log(`dice checkinStart() done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err)=>{
                console.log(`dice checkinStart FAILED: ${err}`);
            });
        } catch(err) {
            b(err);
        }
    });
};

getCurrentCheckin = async(ret) => {
    return new Promise((a, b)=>{
        try{
            ret.ctx.getCurrentCheckin().call().then((rankID)=>{
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

exports.updateCheckin = async(ret, player, amount) => {
    return new Promise((a, b)=>{
        try{
            //ret.tron.setAddress = player;
            //ret.tron.setPrivateKey = playerPK;
            // console.log(`point:${point}, amount:${amount}`)
            //ret.ctx.play(50,player,amount).send({callValue: amount}).then((trxHash)=>{
            ret.ctx.updateCheckin(player,amount).send().then((trxHash)=>{ 
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


getCheckinData = async(ret, rankID, start = 1, end = 10) => {
    return new Promise((a, b)=>{
        try{
            ret.ctx.getCheckinData(rankID, start, end).call().then((rankData)=>{
                 console.log(`rankData:${JSON.stringify(rankData)}`);
                rankData.rankID = rankID;
                rankData.start = start;
                rankData.end = end;
                a({
                    raw: rankData,
                    id: rankID,
                    start: start,
                    end: end,
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

setCheckinResult = async(ret, rankID, adds, rates) => {
    return new Promise((a, b)=>{
        try{
            ret.ctx.setCheckinResult(rankID, adds, rates).send().then((trxHash)=>{
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

getCheckinResult = async(ret, rankID) => {
    return new Promise((a, b)=>{
        try{
            ret.ctx.getCheckinResult(rankID).call().then((result)=>{
                console.log(`getCheckinResult result:${result}`);
                a(result);
            }, (err)=>{
                console.log(err);
            });
        } catch (err) {
            b(err);
        }
    });
};

getCheckinDataAll = async(ret, rankID) => {
    return new Promise((a,b)=>{
        try{
            data = [];
            sortFunc = (i, j) => {
                if (null == i) return false;
                if (null == j) return false;
                return j.amount - i.amount;
            };

            // currentRankID(ret).then((rankID)=>{
                getCheckinData(ret, rankID, 1, 100).then((rankData)=>{
                    ps = [];
                    rankLen = rankData.raw[0];
                    console.log(`rank data len:${rankLen}, ret data len:${rankData.raw[1].length}`);
                    console.log(`start:${rankData.start}, end:${rankData.end}`);
                    console.log(`rankData:${JSON.stringify(rankData)}`);
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

                        a(data);
                    })
                });
            // });
        } catch(err) {
            b(err);
        }
    }, (err)=>{ b(err); });
};

exports.getCurrentCheckin = getCurrentCheckin;
exports.getCheckinDataRaw = getCheckinData;
exports.getCheckinData = getCheckinDataAll;
exports.setCheckinResult = setCheckinResult;
exports.getCheckinResult = getCheckinResult;