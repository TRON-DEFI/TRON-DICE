var {expect}=require("chai");
conf = require('../../lib/configLoader.js').conf;
tools = require('../../lib/tools.js');
moment=require('moment')
lucky = require('../../lib/luckyhash2.js');

describe("testLogic",function(){


    it("测试-调用 start",function(){
        tools.loadCtx(conf.hash.addr,conf.hash.owner.addr,conf.hash.owner.pk)
        .then((ret)=>{
            return new Promise((a,b)=>{
                try {
                    console.log(`start`)
                    lucky.buy(ret).then((result)=>{
                        
                        console.log(`return currentRankID: ${result}`)
                  
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
        console.log(`call play ${conf.hash.addr} ${conf.hash.dev.addr},${conf.hash.dev.pk} FAILED: ${err}`);
        })
    })

// it("测试-other调用 play",function(){
//     tools.loadCtx(conf.hash.addr,conf.hash.owner.addr,conf.hash.owner.pk)
//     .then((ret)=>{
//         return new Promise((a,b)=>{
//             try {
//                 console.log(`start play`)
//                 lucky.buy(ret,"TWDeyfVpE8b8ERwwiSuwKb6w1HFGWh6Uwm",5000000).then((result)=>{
                    
//                     console.log(`return currentRankID: ${result}`)
              
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
//     console.log(`call play ${conf.hash.addr} FAILED: ${err}`);
//     })
// })


}
)