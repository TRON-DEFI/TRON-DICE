var {expect}=require("chai");
conf = require('../lib/configLoader.js').conf;
tools = require('../lib/tools.js');
moment=require('moment')
rank = require('../lib/ranking.js');
lucky = require('../lib/luckyhash2.js');


describe("测试ranking",function(){
// it("测试setDev",function(){
//     tools.loadCtx(conf.ranking.addr,conf.ranking.owner.addr,conf.ranking.owner.pk)
//     .then((ret)=>{
//         return new Promise((a,b)=>{
//             try {
//                 console.log(`start setDev`)
//                 rank.setDev(ret,conf.ranking.owner.addr)
//                 a(ret);
//             } catch(err) {
//                 b(ret);
//             }
//         });
//     }, (err)=>{
//     console.log(`init checkin ${conf.ranking.addr} FAILED: ${err}`);
//     })
// })


// it("测试-调用 start",function(){
//     tools.loadCtx(conf.hash.addr,conf.hash.owner.addr,conf.hash.owner.pk)
//     .then((ret)=>{
//         return new Promise((a,b)=>{
//             try {
//                 console.log(`start`)
//                 lucky.buy(ret).then((result)=>{
                    
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
//     console.log(`call play ${conf.hash.addr} ${conf.hash.dev.addr},${conf.hash.dev.pk} FAILED: ${err}`);
//     })
// })

// it("测试-dev调用rankStart",function(){
//     tools.loadCtx(conf.ranking.addr,conf.ranking.owner.addr,conf.ranking.owner.pk)
//     .then((ret)=>{
//         return new Promise((a,b)=>{
//             try {
//                 console.log(`start rankStart`)
//                 rank.rankStart(ret).then(
//                     (trxHash)=>{
//                         console.log(`return currentRankID: ${trxHash}`)
//                     },(err)=>{
//                         console.log(`err:${err}`)
//                     })
//                 a(ret);
//             } catch(err) {
//                 b(ret);
//             }
//         });
//     }, (err)=>{
//     console.log(`init checkin ${conf.ranking.addr} FAILED: ${err}`);
//     })
// })

// tools.loadCtx(conf.ranking.addr, conf.ranking.owner.addr, conf.ranking.owner.pk).then((ret)=>{
//     return new Promise((a, b) => {
//         try {
//             rank.setGame(ret, conf.dice.addr, true);
//             rank.setGame(ret, conf.hashx.addr, true);
//             rank.setGame(ret, conf.rainbow.addr,true);
//             rank.setGame(ret, conf.ranking.owner.addr,true);

//             a(ret);
//         } catch(err) {
//             b(err);
//         }
//     });
// }, (err)=>{});

// it("测试-other调用rankStart",function(){
//     tools.loadCtx(conf.ranking.addr,"TW4fxxgkC1t5WZEzztRzAnfgAabX7FVh5m","958a8a10694e882858cb44d1b57f12556328c63ce5c6c5214cddecd10a3bd846")
//     .then((ret)=>{
//         return new Promise((a,b)=>{
//             try {
//                 console.log(`start rankStart`)
//                 rank.rankStart(ret)
//                 a(ret);
//             } catch(err) {
//                 b(ret);
//             }
//         });
//     }, (err)=>{
//     console.log(`init checkin ${conf.ranking.addr} FAILED: ${err}`);
//     })
// })

it("测试-other调用 gameID",function(){
    tools.loadCtx(conf.ranking.addr,conf.ranking.owner.addr,conf.ranking.owner.pk)
    .then((ret)=>{
        return new Promise((a,b)=>{
            try {
                console.log(`start gameID`)
                rank.gameID(ret).then((result)=>{
                    
                    console.log(`return gameID: ${result}`)
              
                },(err)=>{
                    console.log(`err:${err}`)
                });
                a(ret);
            } catch(err) {
                b(ret);
            }
        });
    }, (err)=>{
    console.log(`init checkin ${conf.ranking.addr} FAILED: ${err}`);
    })
})
it("测试-other调用 income",function(){
    tools.loadCtx(conf.ranking.addr,conf.ranking.owner.addr,conf.ranking.owner.pk)
    .then((ret)=>{
        return new Promise((a,b)=>{
            try {
                console.log(`start income`)
                rank.income(ret).then((result)=>{
                    
                    console.log(`return income: ${result}`)
              
                },(err)=>{
                    console.log(`err:${err}`)
                });
                a(ret);
            } catch(err) {
                b(ret);
            }
        });
    }, (err)=>{
    console.log(`init checkin ${conf.ranking.addr} FAILED: ${err}`);
    })
})

it("测试-other调用 currentRankID",function(){
    tools.loadCtx(conf.ranking.addr,conf.ranking.owner.addr,conf.ranking.owner.pk)
    .then((ret)=>{
        return new Promise((a,b)=>{
            try {
                console.log(`start currentRankID`)
                rank.currentRankID(ret).then((result)=>{
                    
                    console.log(`return currentRankID: ${result}`)
              
                },(err)=>{
                    console.log(`err:${err}`)
                });
                a(ret);
            } catch(err) {
                b(ret);
            }
        });
    }, (err)=>{
    console.log(`init checkin ${conf.ranking.addr} FAILED: ${err}`);
    })
})

// it("测试-other调用 setwhitelist",function(){
//     tools.loadCtx(conf.ranking.addr,conf.ranking.owner,conf.ranking.pk)
//     .then((ret)=>{
//         return new Promise((a,b)=>{
//             try {
//                 console.log(`start currentRankID`)
//                 rank.setWhiteList(ret,conf.ranking.owner,true).then((result)=>{
                    
//                     console.log(`return currentRankID: ${result}`)
              
//                 },(err)=>{
//                     console.log(`err:${err}`)
//                 });
//                 a(ret);
//             } catch(err) {
//                 b(ret);
//             }
//         });
//     }, (err)=>{
//     console.log(`init checkin ${conf.ranking.addr} FAILED: ${err}`);
//     })
// })

it("测试-other调用 ranking",function(){
    tools.loadCtx(conf.ranking.addr,conf.ranking.owner.addr,conf.ranking.owner.pk)
    .then((ret)=>{
        return new Promise((a,b)=>{
            try {
                console.log(`start ranking`)
                rank.ranking(ret,"TW4fxxgkC1t5WZEzztRzAnfgAabX7FVh5m",50000000).then((result)=>{
                    
                    console.log(`return ranking : ${result}`)
              
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
    console.log(`init checkin ${conf.ranking.addr} FAILED: ${err}`);
    })
})

it("测试-获取leaderboard",function(){
    tools.loadCtx(conf.ranking.addr,conf.ranking.owner.addr,conf.ranking.owner.pk)
    .then((ret)=>{
        return new Promise((a,b)=>{
            try {
                console.log(`start leaderboard`)
                ret.ctx.leaderboard().call().then((result)=>{
                    console.log("fdsfs:",parseInt(result,16));
          
                    console.log(`return leaderboard: ${JSON.stringify(result)}`)
              
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
    console.log(`init checkin ${conf.ranking.addr} FAILED: ${err}`);
    })
})

it("测试-other调用 getRankDataAll",function(){
    tools.loadCtx(conf.ranking.addr,conf.ranking.owner.addr,conf.ranking.owner.pk)
    .then((ret)=>{
        return new Promise((a,b)=>{
            try {
                console.log(`start getRankData`)
                rank.getRankData(ret,2).then((result)=>{
                    console.log(`start getRankData:${result.totalPrice}`)
                    result.data.forEach(function(v,i,a){
                        console.log(v.addr);
                        console.log(parseInt(v.amount._hex,16));
                        //console.log(i);
                        //console.log(a);
                    });
                    console.log(`return getRankDataAll: ${JSON.stringify(result)}`)
              
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
    console.log(`init checkin ${conf.ranking.addr} FAILED: ${err}`);
    })
})



// it("测试-dev调用 setRankResult",function(){
//     tools.loadCtx(conf.ranking.addr,conf.tester.addr,conf.tester.pk)
//     .then((ret)=>{
//         return new Promise((a,b)=>{
//             try {
//                 console.log(`start setRankResult`)
//                 rates = [35, 20, 15];
//                 addrs = [
//                 "0x0428A1C9077B5F4C9FA214B9906DDD908C883E6F", 
//                 "0xB2Ee82cFF4a22FF3042B4653Ca8af783b70E327C",
//                 "0xd3F0E1b1BaCc6A3Cea77C4fCce22eD92Cb0E0c7f"];
//                 rank.setRankResult(ret,4,addrs,rates) 
//                 rank.getRankResult(ret, 4).then((result)=>{
//                     result.forEach(function(v,i,a){
//                         console.log(v);
//                         //console.log(parseInt(v.amount._hex,16));
//                         //console.log(i);
//                         //console.log(a);
//                     });
//                     console.log(`return getRankResult: ${JSON.stringify(result)}`)
              
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
//     console.log(`init checkin ${conf.ranking.addr} FAILED: ${err}`);
//     })
// })

}
)