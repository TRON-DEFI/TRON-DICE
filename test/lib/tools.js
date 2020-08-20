
var TronWeb = require('tronweb');

exports.loadCtx = async(addr, owner, pk) => {
    return new Promise((a, b)=>{
        let ret = {};
        let tron = new TronWeb(conf.net);
        tron.setAddress(owner);
        tron.setPrivateKey(pk);
        tron.contract().at(addr).then(function(ctx) {
            console.log(`contract [${addr}] load success`);
            ret.ctx = ctx;
            ret.tron = tron;
            a(ret);
        }, function(err) {
            console.log(`err:${err}`);
            b(err);
        });
    });
};

exports.getTrxInfo = async(trxHash) => {
    return new Promise((a, b) => {
        let tron = new TronWeb(conf.net);
        tron.trx.getTransactionInfo(trxHash).then(
        resolve = (trxInfo) => {
            a(trxInfo);
            delete tron;
        },
        reject = (err) => {
            b(err);
            delete tron;
        });
    });
};


exports.getTRC20Info = async() => {
    let tron = new TronWeb(conf.net);
    tron.setAddress(conf.token.addr)
    tron.contract().at(conf.token.addr).then(function(ret) {
        console.log(`TRC20 is:${ret}`);
        conf.token.ctx = ret;

        checkToken();
    }, function(err) {
        console.log(`err is:${err}`);
    });
};

exports.checkToken = async(ret) => {
    print = function (msg) {
        return function(err, ret) {
            if (null != err) {
                console.log(out, ` FAILED: ${err}`);
                return
            }
            console.log(`${msg}: ${ret}`);
        };
    };

    try {
    ret.ctx.totalSupply().call(callback = print("totalSupply"));
    ret.ctx.name().call(callback = print("name"));
    ret.ctx.symbol().call(callback = print("symbol"));
    ret.ctx.decimals().call(callback = print("decimal"));
    } catch(err) {
        console.log();
    }
};

// export.sendCall = async(ctx, user, pk, method, arguments) => {
//     return new Promise((a, b) => {
//         loadCtx(addr, user, pk).then(
//         (ret)=>{
//             ret.ctx[method](args...)
//         },
//         (err)=>{});
//     });
// };
