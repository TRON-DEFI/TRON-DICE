
conf = require('./lib/configLoader.js').conf;
tools = require('./lib/tools.js');
hash = require('./lib/hash.js');
events = require('events');

ev = new events.EventEmitter();


// load dice
tools.loadCtx(conf.hashx.addr, conf.hashx.owner.addr, conf.hashx.owner.pk)
.then((ret)=>{

    drawResult = [];
    draw = async(id) => {
        if (id <= 0) {
            return;
        }
        console.log(`draw(${id}) triggered......`);
        termInfo = await hash.termInfo(ret, id);
        if (termInfo.drawState == true) {
            drawResult[id] = true;
            return;
        }

        termResult = await hash.termResult(ret, id);
        curBlock = await ret.tron.trx.getCurrentBlock();
        nowBlockID = curBlock.block_header.raw_data.number;
        if (termInfo.drawState == false && nowBlockID >= termResult[3][0].toNumber()) {
            trxHash = await hash.draw(ret, id);
            console.log(`hash draw(${id}), trxHash:${trxHash}`);
        }
    };
    ev.on("draw", draw);

    checkDrable = async() => {
        curTermID = await hash.termID(ret);
        for (i = 1; i < curTermID; i++) {
            if (drawResult[i] == true) {
                continue;
            }
            ev.emit("draw", i);
        }
    }
    setInterval(checkDrable, 30000);

}, (err)=>{
    console.log("init dice FAILED: ${err}");
});
