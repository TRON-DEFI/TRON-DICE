var {expect}=require("chai");
conf = require('../../lib/configLoader.js').conf;
tools = require('../../lib/tools.js');
moment=require('moment')
ring = require('../../lib/ring.js');

tools.loadCtx(conf.rainbow.addr, conf.rainbow.dev.addr, conf.rainbow.dev.pk)
.then((ret)=>{
    return new Promise((a,b)=>{
        try{
            ring.start(ret);

        } catch(err) {
            b(err);
        }
    });
}, (err)=>{
    console.log("init dice FAILED: ${err}");
});
