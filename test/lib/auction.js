
TronWeb = require('tronweb');
conf = require('./configLoader.js').conf;
tools = require('./tools.js');

init = async(ret, tokenAddr, diceAddr, bankAddr) => {
    return new Promise((a, b)=>{
        try {
            ret.ctx.init(tokenAddr, diceAddr, bankAddr).send().then(
            (trxHash) => {
                console.log(`auction.init(${tokenAddr}, ${diceAddr}, ${bankAddr}) done, TrxHash: ${trxHash}`);
                a(trxHash);
            },
            (err) => {
                console.log(`auction.init FAILED: ${err}`);
                b(err);
            }).catch((err)=>{
                b(err);
            });
        } catch(err) {
            console.log(`auction.init FAILED: ${err}`);
            b(err);
        }
    });
};

end = async(ret) => {
    return new Promise((a,b)=>{
        try {
            ret.ctx.end().send().then(
            (trxHash) => {
                console.log(`auction.end() done TrxHash:${trxHash}`);
                a(trxHash);
            },
            (err) => {
                console.log(`FAILED: auction.end(): ${err}`);
                b(err);
            });
        } catch(err) {
            console.log(`FAILED auction.end(): ${err}`);
            b(err);
        }
    });
};

getTermID = async(ret) => {
    return new Promise((a, b)=>{
        try{
            ret.ctx.termID().call().then((termID)=>{
                console.log(`termID:${termID}`);
                a(termID);
            }, (err)=>{ b(err); });
        } catch (err) {
            b(err);
        }
    });
};

getTermInfo = async(ret, termID) => {
    return new Promise((a, b)=>{
        try{
            ret.ctx.terms(termID).call().then((retList)=>{
                // console.log(retList);
                a(retList);
            }, (err)=>{ b(err); });
        } catch (err) {
            b(err);
        }
    });
};

auctionEnd = async(ret, interval = 3000) => {
    return new Promise((a,b)=>{
        timer = setInterval(()=>{
        try{
            getTermID(ret)
            .then((termID)=>{
                getTermInfo(ret, termID)
                .then((termInfo)=>{
                    timeGap = termInfo.endTime - Date.now()/1000;
                    console.log(`timeGap:${timeGap}, endTime:${termInfo.endTime}, now:${Date.now()/1000}`)
                    if (timeGap <= 0) {
                        end(ret);
                    }
                });
            }, (err)=>{ b(err); });
        } catch(err) {
            b(err);
        }}, interval);

        a({
            timer: timer,
            stop: function() {
                clearInterval(timer);
            }
        });
    });
};


setBidFloor = async(ret, val) => {
    return new Promise((a, b)=>{
        try{
            ret.ctx.setBidFloor(val).send().then((trxHash)=>{
                console.log(`setBidFloor(${val}) trxHash:${trxHash}`);
                a(trxHash);
            }, (err)=>{ b(err); });
        } catch (err) {
            b(err);
        }
    });
};

currentPrize = async(ret) => {
    return new Promise((a, b)=>{
        try{
            ret.ctx.currentPrize().call().then((val)=>{
                console.log(`currentPrize() got ${val}`);
            }, (err)=>{ b(err); });
        } catch (err) {
            b(err);
        }
    });  
};

exports.init = init;
exports.end = end;
exports.getTermID = getTermID;
exports.getTermInfo = getTermInfo;
exports.endRoutine = auctionEnd;;
exports.setBidFloor = setBidFloor;
exports.currentPrize = currentPrize;