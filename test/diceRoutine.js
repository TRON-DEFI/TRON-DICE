
conf = require('./lib/configLoader.js').conf;
tools = require('./lib/tools.js');
dice = require('./lib/dice.js');

// load dice
tools.loadCtx(conf.dice.addr, conf.dice.owner.addr, conf.dice.owner.pk)
.then((ret)=>{
    return new Promise((a,b)=>{
        try{
            dice.diceDraw(ret, 3000);
            a(ret);
        } catch(err) {
            b(err);
        }
    });
}, (err)=>{
    console.log("init dice FAILED: ${err}");
});
