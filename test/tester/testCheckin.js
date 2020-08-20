var {expect}=require("chai");
conf = require('../lib/configLoader.js').conf;
tools = require('../lib/tools.js');
moment=require('moment')
checkin = require('../lib/checkin.js');

describe("测试setDev",function(){
it("CallCheckin",function(){
    tools.loadCtx(conf.checkin.addr,conf.tester.addr,conf.tester.pk)
    .then((ret)=>{
        return new Promise((a,b)=>{
            try {
                console.log(`start checkin`)
                checkin.CallCheckin(ret)
                a(ret);
            } catch(err) {
                b(ret);
            }
        });
    }, (err)=>{
    console.log(`init checkin ${conf.checkin.addr} FAILED: ${err}`);
    })
})
}
)