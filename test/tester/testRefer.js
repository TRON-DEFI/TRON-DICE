var {expect}=require("chai");
conf = require('../lib/configLoader.js').conf;
tools = require('../lib/tools.js');
moment=require('moment')
refer = require('../lib/refer.js');

describe("testLogic",function(){

    it("测试-调用 referrerInfo",function(){
        //tools.loadCtx(conf.refer.addr,"TAMCNz6xsA1KYGNMsJV8nMjFiP4it1cmbN","bd79e0d4144badbf13335785166a068dca3a4f02458ec7f1b578db63dd241db4")
        tools.loadCtx(conf.refer.addr,"TW4fxxgkC1t5WZEzztRzAnfgAabX7FVh5m","958a8a10694e882858cb44d1b57f12556328c63ce5c6c5214cddecd10a3bd846")
        .then((ret)=>{
            return new Promise((a,b)=>{
                try {
                    console.log(`start referrerInfo`)
                    refer.referrerInfo(ret).then((trxHash)=>{
                        
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