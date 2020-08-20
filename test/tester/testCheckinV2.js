var {expect}=require("chai");
conf = require('../lib/configLoader.js').conf;
tools = require('../lib/tools.js');
moment=require('moment')
checkin = require('../lib/checkinV2.js');

describe("测试 CallCheckinV2",function(){
    //1. 不开启活动，签到功能：签到总次数，连续次数的准确性，白名单校验
    //2. 开启活动，未在开启活动时间之后签到的人无法累计
                //开启活动时间之后签到的人可以累计
                //累计数据是否正确

// it("测试-other调用 setwhitelist",function(){
//     tools.loadCtx(conf.checkinV2.addr,conf.checkinV2.owner,conf.checkinV2.pk)
//     .then((ret)=>{
//         return new Promise((a,b)=>{
//             try {
//                 console.log(`start currentRankID`)
//                 checkin.setWhiteList(ret,conf.checkinV2.owner,true).then((result)=>{
                    
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
//     console.log(`init checkin ${conf.checkinV2.addr} FAILED: ${err}`);
//     })
// })

// it(" 测试 CallCheckin",function(){
//     tools.loadCtx(conf.checkinV2.addr,conf.checkinV2.owner,conf.checkinV2.pk)
//     .then((ret)=>{
//         return new Promise((a,b)=>{
//             try {
//                 console.log(`start checkin`)
//                 checkin.CallCheckin(ret,conf.tester.addr)
//                 a(ret);
//             } catch(err) {
//                 b(ret);
//             }
//         });
//     }, (err)=>{
//     console.log(`init checkin ${conf.checkinV2.addr} FAILED: ${err}`);
//     })
// })

it("CallGetCheckinInfo",function(){
// call checkin info
tools.loadCtx(conf.checkinV2.addr,conf.tester.addr,conf.tester.pk)
.then((ret)=>{
    return new Promise((a,b)=>{
        try {
            console.log(`get checkin info`)
            checkin.CallGetCheckinInfo(ret,conf.tester.addr).then((result)=>{
                var day = moment.unix(result.latestCheckinTime).format('YYYY-MM-DD HH:mm:ss');
                console.log(`return checkInInfo: ${result.addr}, ${result.totalCnt},${result.continuousCnt},${day}`)
          
            },(err)=>{
                console.log(`err:${err}`)
            });
            a(ret);
        } catch(err) {
            b(ret);
        }
    });
}, (err)=>{
    console.log(`init checkin ${conf.checkin.addr} FAILED: ${err}`);
});
})


it("CallTotalCnt",function(){
// call total checkin
tools.loadCtx(conf.checkinV2.addr,conf.tester.addr,conf.tester.pk)
.then((ret)=>{
    return new Promise((a,b)=>{
        try {
            console.log(`get checkin total count`)
            checkin.CallTotalCnt(ret).then((result)=>{
                console.log(`return checkInInfo total checkin cnt:  ${result}`)
          
            },(err)=>{
                console.log(`err:${err}`)
            });
            a(ret);
        } catch(err) {
            b(ret);
        }
    });
}, (err)=>{
    console.log(`init checkin ${conf.checkin.addr} FAILED: ${err}`);
});
})

//---------------------------------------------------------------------------

    
// it("测试-owner调用checkinStart",function(){
//     tools.loadCtx(conf.checkinV2.addr,conf.checkinV2.owner,conf.checkinV2.pk)
//     .then((ret)=>{
//         return new Promise((a,b)=>{
//             try {
//                 console.log(`start checkinStart`)
//                 checkin.checkinStart(ret)
//                 a(ret);
//             } catch(err) {
//                 b(ret);
//             }
//         });
//     }, (err)=>{
//     console.log(`init checkin ${conf.ranking.addr} FAILED: ${err}`);
//     })
// })

// it("测试-other调用checkinStart",function(){
//     tools.loadCtx(conf.checkinV2.addr,"TW4fxxgkC1t5WZEzztRzAnfgAabX7FVh5m","958a8a10694e882858cb44d1b57f12556328c63ce5c6c5214cddecd10a3bd846")
//     .then((ret)=>{
//         return new Promise((a,b)=>{
//             try {
//                 console.log(`start checkinStart`)
//                 checkin.checkinStart(ret)
//                 a(ret);
//             } catch(err) {
//                 b(ret);
//             }
//         });
//     }, (err)=>{
//     console.log(`init checkin ${conf.ranking.addr} FAILED: ${err}`);
//     })
// })


// it("测试-other调用 getCurrentCheckin",function(){
//     tools.loadCtx(conf.checkinV2.addr,"TW4fxxgkC1t5WZEzztRzAnfgAabX7FVh5m","958a8a10694e882858cb44d1b57f12556328c63ce5c6c5214cddecd10a3bd846")
//     .then((ret)=>{
//         return new Promise((a,b)=>{
//             try {
//                 console.log(`start getCurrentCheckin`)
//                 checkin.getCurrentCheckin(ret).then((result)=>{
                    
//                     console.log(`return getCurrentCheckin: ${result}`)
              
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


// it("测试-other调用 updateCheckin",function(){
//     tools.loadCtx(conf.checkinV2.addr,conf.checkinV2.owner,conf.checkinV2.pk)
//     .then((ret)=>{
//         return new Promise((a,b)=>{
//             try {
//                 console.log(`start updateCheckin`)
//                 checkin.updateCheckin(ret,conf.tester.addr,50000000).then((result)=>{
                    
//                     console.log(`return updateCheckin: ${result}`)
              
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
//     console.log(`init checkin ${conf.checkinV2.addr} FAILED: ${err}`);
//     })
// })



it("测试-other调用 getCheckinDataAll",function(){
    tools.loadCtx(conf.checkinV2.addr,conf.checkinV2.owner,conf.checkinV2.pk)
    .then((ret)=>{
        return new Promise((a,b)=>{
            try {
                console.log(`start getCheckinData`)
                checkin.getCheckinData(ret,1).then((result)=>{
                    console.log(`start getCheckinData:${result}`)
                    result.forEach(function(v,i,a){
                        console.log(v.addr);
                        console.log(parseInt(v.amount._hex,16));
                        //console.log(i);
                        //console.log(a);
                    });
                    console.log(`return getCheckinData: ${JSON.stringify(result)}`)
              
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



// it("测试-dev调用 setCheckinResult",function(){
//     tools.loadCtx(conf.checkinV2.addr,conf.tester.addr,conf.tester.pk)
//     .then((ret)=>{
//         return new Promise((a,b)=>{
//             try {
//                 console.log(`start setCheckinResult`)
//                 rates = [35, 20, 15];
//                 addrs = [
//                 "0x0428A1C9077B5F4C9FA214B9906DDD908C883E6F", 
//                 "0xB2Ee82cFF4a22FF3042B4653Ca8af783b70E327C",
//                 "0xd3F0E1b1BaCc6A3Cea77C4fCce22eD92Cb0E0c7f"];
//                 checkin.setCheckinResult(ret,4,addrs,rates) 
//                 checkin.getCheckinResult(ret, 4).then((result)=>{
//                     result.forEach(function(v,i,a){
//                         console.log(v);
//                         //console.log(parseInt(v.amount._hex,16));
//                         //console.log(i);
//                         //console.log(a);
//                     });
//                     console.log(`return getCheckinResult: ${JSON.stringify(result)}`)
              
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