# 平台邀请记录
- 平台内的游戏统一调用，记录邀请人、被邀请人关系
- 平台统一设置邀请有效层级，邀请各层级对邀请返现的分成比例
- 邀请人通过平台合约查询、提取邀请收益
- 平台的邀请人是终身制
- 不能自己邀请自己(不抛异常，邀请信息视为无效)
- 测试网
    - 合约地址: `TDkLneNeKJPoThvZBmniFwEav4t5qWGbRs`
    - owner: ``
    - pk: ``
- 测试网挖矿合约
    - 合约地址: `TVjAmMux3YR94dpaWmBTYXUxWjAEiaTtS2`
    - owner: ``
    - pk: ``

    
## 1. 游戏合约调用接口
1.  refer(address user, uint amount, address referrer) external payable
    - 游戏合约调用此方法，通知平台记录用户和邀请人的关系，用户投注额度，同时需将邀请返利的最大额度发送给平台合约
    - 只有平台授权的游戏合约可调用，否则只收钱不记录，邀请人无法提取奖励
    - 游戏合约调用时，需要将邀请返利支付给平台合约，方式为 `PlatformReferIF(platformReferContractIF).refer.value(referBonus)(args...)`
    - 调用会消耗游戏合约的能量，请游戏合约注意能量消耗上限(请集成后进行测试)
    - args
        - address user: 被邀请人地址，一般为游戏玩家
        - uint amount: 玩家的游戏投注额度
        - address referrer: 邀请人地址
    - returns
        - 无
    - events
        - 无
    - 调用示例
        ```
        interface ReferIF {
            function refer(address user, uint amount, address referrer) external payable;
            }

        contract platform_test {

            address public referIF;

            function setReferIF(address addr) public {
                referIF = addr;
            }

            function play(address referrer) public payable {
                ReferIF(referIF).refer.value(msg.value)(msg.sender, msg.value,  referrer);
            }
        }
        ```

## 2. 平台合约的设置接口
1. setGame(address game, bool ok)
    - 只有平台授权的游戏合约可调用，否则只收钱不记录，邀请人无法提取奖励
    - 游戏合约调用时，需要将邀请返利支付给平台合约，方式为 `PlatformReferIF(platformReferContractIF).refer.value(referBonus)(args...)`
    - 调用会消耗游戏合约的能量，请游戏合约注意能量消耗上限(请集成后进行测试)
    - args
        - address user: 被邀请人地址，一般为游戏玩家
        - uint amount: 玩家的游戏投注额度
        - address referrer: 邀请人地址
    - returns
        - 无

## 3. 邀请人交互接口
1. bonus() (uint, uint)
    - 邀请人调用，查询自己的可提取邀请收益和已提取的邀请收益
    - `view`方法
    - args
        - 无
    - returns
        - uint: 可提取的邀请收益
        - uint: 已提取的邀请收益
    - events
        - 无

2. referrerInfo() public view returns (address, uint, uint, uint[])
    - 邀请人/用户查询自身的邀请信息     
    - `view`方法    
    - args
        - 无
    - returns
        - address: 用户的邀请人地址
        - uint: 可提取的邀请收益
        - uint: 已提取的邀请收益
        - uint[]: 数组，从0～n表示用户作为第1～n+1级邀请人的邀请人数
    - events
        - 无

3. withdraw()
    - 邀请人提取当前所有的邀请收益，直接转入邀请人余额，可提取邀请收益为0报错
    - `交易`方法   
    - args
        - 无
    - returns
        - 无
    - events
        - 无
