var {expect}=require("chai");
conf = require('../../lib/configLoader.js').conf;
tools = require('../../lib/tools.js');
moment=require('moment')
ring = require('../../lib/ring.js');

describe("testLogic",function(){


    // it("测试-调用 draw",function(){
    //     tools.loadCtx(conf.rainbow.addr,conf.rainbow.dev.addr,conf.rainbow.dev.pk)
    //     .then((ret)=>{
    //         return new Promise((a,b)=>{
    //             try {
    //                 console.log(`start`)
    //                 ring.draw(ret,1000,54).then((trxHash)=>{
                        
    //                     console.log(`return trxHash: ${trxHash}`)
                  
    //                 },(err)=>{
    //                     console.log(`err:${err}`)
    //                 });
    //                 a(ret);
    //             } catch(err) {
    //                 console.log(`err:${err}`)
    //                 b(ret);
    //             }
    //         });
    //     }, (err)=>{
    //     console.log(`call play ${conf.rainbow.addr} ${conf.rainbow.dev.addr},${conf.rainbow.dev.pk} FAILED: ${err}`);
    //     })
    // })

    it("测试-调用 buy",function(){
        tools.loadCtx(conf.rainbow.addr,conf.rainbow.dev.addr,conf.rainbow.dev.pk)
        .then((ret)=>{
            return new Promise((a,b)=>{
                try {
                    console.log(`start buy`)
                    ring.buy(ret,conf.rainbow.market.addr,3, 100000000).then((trxHash)=>{
                        
                        console.log(`return trxHash: ${trxHash}`)
                  
                    },(err)=>{
                        console.log(`err:${err}`)
                    });
                    a(ret);
                } catch(err) {
                    console.log(`err:${err}`)
                    b(ret);
                }
            });
        }, (err)=>{
        console.log(`call play ${conf.rainbow.addr} ${conf.rainbow.dev.addr},${conf.rainbow.dev.pk} FAILED: ${err}`);
        })
    })


}
)