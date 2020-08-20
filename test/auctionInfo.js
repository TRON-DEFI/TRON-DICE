
conf = require('./lib/configLoader.js').conf;
tools = require('./lib/tools.js');
auction = require('./lib/auction.js');

tools.loadCtx(conf.auction.addr, conf.auction.owner.addr, conf.auction.owner.pk)
.then((ret)=>{

    auction.setBidFloor(ret, 100000000);

    auction.currentPrize(ret);

    auction.getTermID(ret)
    .then((termID)=>{
        auction.getTermInfo(ret, termID)
        .then((termInfo)=>{
            console.log(`termInfo(${termID}):${JSON.stringify(termInfo)}`);
            console.log(`bid price:${termInfo.price}`);
        }, (err)=>{
            console.log(`get termInfo failed:${err}`);
        })
        .catch((err)=>{
            console.log(`get termInfo error:${err}`); 
        });
    }, (err)=>{
        console.log(`get termID failed:${err}`);
    })
    .catch((err)=>{
        console.log(`get termID error:${err}`);
    });
    
}, (err)=>{
    console.log("load auction contract FAILED: ${err}");
});
