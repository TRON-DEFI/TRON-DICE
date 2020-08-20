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

exports.CallCheckin = async(ret) => {
    return new Promise((a, b)=>{
        try{
            ret.ctx.checkin().send().then((trxHash)=>{
                console.log(`TrxHash:${trxHash}`);
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
            ret.ctx.getCheckinInfo().call().then((result)=>{
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