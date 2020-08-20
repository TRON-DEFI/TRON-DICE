
conf = require('./lib/configLoader.js').conf;
tools = require('./lib/tools.js');
ring = require('./lib/ring.js');

events = require('events');

ev = new events.EventEmitter();

// load ring
tools.loadCtx(conf.rainbow.addr, conf.rainbow.dev.addr, conf.rainbow.dev.pk)
.then((ret)=>{

    drawResult = [];
    //var currentBet = 1 ;
    ringDraw = async(id) => {
        var waitingDraw=6000; //6s
        if (id <= 0) {
            return;
        }
        // var start = 1;
        // if (id>100){
        //     start=100;
        // }
        console.log(`ringDraw(${id}) triggered......`);

        //校验当前轮次是否已经开奖
        betInfo = await ring.getBetInfo(ret, id);
        console.log(`ringDraw betID ${id}} getWinNumber(${betInfo.winNumber}) - winColor(${betInfo.winColor})`);
     
        if (betInfo.winNumber>=0&&betInfo.winColor>0) {
            console.log(`round(${id}) already drawed, waiting next round`);
            drawResult[id] = true;
            return;
        }
        var endTime = await ring.endTime(ret);
        var curRound = await ring.currentBet(ret);
        var now = Date.now()/1000;
        var et = parseInt(endTime);
        var dur =  parseInt((et-now)*1000);
        if (dur<0){
            dur=0;
        }

        console.log(`current round ${curRound} endTime : ${et} now: ${now} interval: ${dur} waiting draw: ${waitingDraw}`)
            
        trxHash = await ring.draw(ret, dur+waitingDraw, 53);
        console.log(`ringDraw draw end (${id}), trxHash:${trxHash}, draw end time ${Date.now()/1000}`);

        
        startHash = await ring.startTimeOut(ret, 6000);
        console.log(`ringDraw draw start , trxHash:${startHash}, start end time ${Date.now()/1000}`);
    };
    ev.on("ringDraw", ringDraw);

    checkDrable = async() => {
        console.log(`checkDrable start ${Date.now()/1000}`)
        currentID = await ring.currentBet(ret);
        for (i = 0; i <= currentID; i++) {
            if (drawResult[i] == true) {
                continue;
            }
            //currentBet++;
            ev.emit("ringDraw", i);
        }
    }
    setInterval(checkDrable, 30000);
 });
