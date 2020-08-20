var {expect}=require("chai");
conf = require('../../lib/configLoader.js').conf;
tools = require('../../lib/tools.js');
moment=require('moment')
ring = require('../../lib/ring.js');

describe("testLogic",function(){


    it("测试-调用 start",function(){
        tools.loadCtx(conf.rainbow.addr,conf.rainbow.owner.addr,conf.rainbow.owner.pk)
        .then((ret)=>{
            return new Promise((a,b)=>{
                try {
                    console.log(`start`)
                    ring.endTime(ret).then((result)=>{
                        
                        console.log(`return endTime: ${result}`)
                  
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


    it("测试-调用 curentBet",function(){
        tools.loadCtx(conf.rainbow.addr,conf.rainbow.owner.addr,conf.rainbow.owner.pk)
        .then((ret)=>{
            return new Promise((a,b)=>{
                try {
                    console.log(`start`)
                    ring.currentBet(ret).then((result)=>{
                        
                        console.log(`return curentBet: ${result}`)
                  
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

    it("测试-调用 curentBet",function(){
        tools.loadCtx(conf.rainbow.addr,conf.rainbow.owner.addr,conf.rainbow.owner.pk)
        .then((ret)=>{
            return new Promise((a,b)=>{
                try {
                    console.log(`start`)
                    ring.getBetInfo(ret,5).then((result)=>{
                        
                        console.log(`return curentBet: ${JSON.stringify(result)}`)
                  
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
    

    it("测试-调用 getWinNumbers",function(){
        tools.loadCtx(conf.rainbow.addr,conf.rainbow.owner.addr,conf.rainbow.owner.pk)
        .then((ret)=>{
            return new Promise((a,b)=>{
                try {
                    console.log(`start`)
                    ring.getWinNumbers(ret,3,13).then((termInfo)=>{
                        console.log(`return curentBet winnumber: ${termInfo.winNumber}`)
                  
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

    
    it("测试-调用 poolAddr",function(){
        tools.loadCtx(conf.rainbow.addr,conf.rainbow.owner.addr,conf.rainbow.owner.pk)
        .then((ret)=>{
            return new Promise((a,b)=>{
                try {
                    console.log(`start`)
                    ring.poolAddr(ret).then((result)=>{
                        
                        console.log(`return curentBet: ${result}`)
                  
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


    it("测试-调用 setPool",function(){
        tools.loadCtx(conf.rainbow.addr,conf.rainbow.owner.addr,conf.rainbow.owner.pk)
        .then((ret)=>{
            return new Promise((a,b)=>{
                try {
                    console.log(`start`)
                    ring.setPool(ret,conf.miner.addr).then((result)=>{
                        
                        console.log(`return curentBet: ${result}`)
                  
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
}
)