
conf = require('./lib/configLoader.js').conf;
tools = require('./lib/tools.js');
moment=require('moment')
checkin = require('./lib/checkin.js');


/*
// call checkin
tools.loadCtx(conf.checkin.addr,conf.checkin.owner.addr,conf.checkin.owner.pk)
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
});*/
// call checkin info
tools.loadCtx(conf.checkin.addr,conf.checkin.owner.addr,conf.checkin.owner.pk)
.then((ret)=>{
    return new Promise((a,b)=>{
        try {
            console.log(`get checkin info`)
            checkin.CallGetCheckinInfo(ret,conf.checkin.owner.addr).then((result)=>{
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

// call total checkin
tools.loadCtx(conf.checkin.addr,conf.checkin.owner.addr,conf.checkin.owner.pk)
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