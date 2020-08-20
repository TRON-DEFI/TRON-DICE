
conf = require('./lib/configLoader.js').conf;
tools = require('./lib/tools.js');
dice = require('./lib/dice.js');

// load dice
tools.loadCtx(conf.dice.addr, conf.dice.owner.addr, conf.dice.owner.pk)
.then((ret)=>{
    return new Promise((a,b)=>{
        try {
            dice.diceEventListener(ret);
            a(ret);
        } catch(err) {
            b(ret);
        }
    });
}, (err)=>{
    console.log("init dice FAILED: ${err}");
});
