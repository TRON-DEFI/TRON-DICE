# 平台公共功能

## 1. 挖矿
1. 用户和开发者的得矿比例默认`10:1`, 可调节
2. 根据设置的出矿比例出矿，100表示用户投入100TRX，用户可获得1个代币，开发者得到0.1个代币(10:1)；总出矿量为1.1个代币
3. 接口 `interface Mine`
    1. mine(address user, address dev, uint amount)
        - 游戏合约调用代币合约的`mine`函数，根据当前挖矿价格计算出矿量，代币由`token owner`转给`user`和`dev`
        - args
            - user: 游戏用户
            - dev: 游戏设置的开发者地址
            - amount: 用户本次交易支付的TRX数额
    2. 事件:
        - Transfer(tokenOwner, miner, userMineAmount)
        - Transfer(tokenOwner, dev, devMineAmount)
    3. 返回值: 无
4. 设置接口
    1. setMinePrice(uint price)
        - 设置挖矿价格, 只有`token owner`可以调用
        - args
            - price: 挖矿价格（代币的TRX价格)，要求>0; 1 表示1个TRX对应1个代币，100表示100个TRX对应一个代币；
    2. setMineDevRate(uint rate)
        - 设置开发者挖矿收益比例
        - args
            - rate: 开发者挖矿百分比，如rate=10表示如果用户挖出10个代币，开发者可得到1个代币(总出矿量为11个代币)
    3. addMiner(address miner, uint price, uint rate)
        - 增加或删除矿主
        - 只有`token owner`可以调用
        - args
            - miner: 矿主(可挖矿的游戏合约的地址)
            - price: 挖矿价格, 含义同`setMinePrice`，针对特定游戏的设置
            - rate: 开发者挖矿收益百分比，含义同`setMineDevRate`, 针对特定游戏的设置
    3. setMinerInfo(address miner, bool ok, uint price, uint rate, bool checkPrice, bool checkRate)
        - 增加或删除矿主
        - 只有`token owner`可以调用
        - args
            - miner: 矿主(可挖矿的游戏合约的地址)
            - ok: 是否可以挖矿(false 不出矿，调用mine不抛异常)
            - price: 挖矿价格, 含义同`setMinePrice`，针对特定游戏的设置
            - rate: 开发者挖矿收益百分比，含义同`setMineDevRate`, 针对特定游戏的设置
            - checkPrice: 是否检查价格，true时要求挖矿价格应该不小于全局价格(使用价格高的，少出矿)
            - checkRate: 是否检查dev出矿比例, true时要求出矿比例不大于全局比例(使用比例低的，少出矿)

5. 查询接口

## 2. 邀请 (用户ID)
为被邀请人和邀请人编号，好处是可以统计数量，遍历，坏处是存储
1. 所有邀请关系统一处理
2. 记录被邀请人，邀请人，本次邀请可用总收益
3. 接口
    1. refer(address user, uint referrerID, uint referBonus, uint amount)
        - user: 被邀请人
        - referrerID: 邀请人ID
        - referBonus: 邀请奖励总额 (多级邀请返利的总和)
        - amount: 用户本次支付的价值币总额
    2. 事件: 可选
    3. 返回值: 可选
4. 提供referrerID和地址的对应关系
5. 提供数据统计
    1. 用户投注额度
    2. 邀请人收益，各级被邀请人统计(人数，收益)
6. 邀请奖励提取及查询


## 3. 签到
1. 功能描述：
   1. 累计用户签到信息
   2. 查询用户签到信息
   3. 签到奖励活动
      - 活动开启关闭，由外部程序在活动时间点触发
      - 累计签到用户平台投注金额，只累计用户有效签到之后投注金额
      - 活动奖励发放，由外部程序控制随机奖励用户及金额
2. 设置接口
   1. function checkin(address to) public 
      - 签到：在有效的周期内，累计用户签到总次数，连续签到次数和上次签到时间，同时累计总签到数，
      - 约束条件
          - msg.sender 必须在白名单内
      - args:
          - to: 签到用户
   2. function setPrivilege(address addr, bool ok) public onlyOwner
      - 设置白名单，允许白名单内的地址调用合约方法（updateRank）  仅owner可用
      - args:
          - addr: 白名单地址
          - ok: true-允许调用；false-禁止调用
   3. function checkinStart() public onlyDev
       - 开启排行统计轮次：清空上轮次数据，开启新排行周期，仅开发者可用
       
    4. function setCheckinResult(uint checkID, address[] checkinResult, uint [] rewards ) public onlyDev
       - 设置排行结果，及奖励发放，仅开发者可用。调用之前先遍历所有排行数据，按投注量排序后，将前十个用户地址以及对应的奖励比例传入setRankResult方法
       - args:
           - checkID: 签到奖励轮次
           - checkinResult: 排序后的地址列表
           - rewards: 地址列表对应奖励金额
       - 约束条件:
           - 有效checkID ，仅能发放往期奖励，当前轮次无法参与奖励发放
           - checkinResult长度与rewards长度相等

3. 查询接口
    1. function getCheckinInfo(address to) public view returns (address,uint256,uint256,uint256)
       - 获取某用户的签到数据
       - args:
           - to: 签到用户
       - output：
           - 签到用户
           - 签到总次数
           - 签到连续次数
           - 最后一次签到时间
        
    2. function getCurrentCheckinRank() public view returns (uint checkinID)
       - 获取当前轮次ID
       - output:
           - checkinID: 当前轮次ID
    3. function getCheckinData(uint checkinID, uint start, uint end) public view returns (uint, address[] memory, uint[] memory)
       - 获取某轮次的签到数据
       - args:
           - checkinID: 签到活动轮次
           - start,end：当前轮次签到数据偏移量，用于遍历
       - output：
           - 当前最大用户数，参与计算start，end偏移量
           - 遍历出的地址列表
           - 对应地址列表的投注金额列表
        
    4. function getCheckinResult(uint checkinID) public view returns(address[] memory)
        - 获取某轮次发放活动奖励地址列表
        - args:
            - checkinID: 轮次ID
        - output:
            - address[]: 本轮次发放奖励的地址列表

4. 合约接口
    1. function updateCheckin(address player, uint value) public payable returns (bool) whitelist
       - 累计用户总投注量，奖池总金额，仅白名单地址可用
       - 约束条件：
           - msg.sender 必须在白名单地址里
           - msg.value 必须与传入的value相同
       - args
           - player: 投注者
           - amount: 投注金额
      


## 4. 排行榜
1. 排行榜有周期概念，单个周期内的排行独立；周期间无数据关联
2. 统计用户的总投注量，投注次数，游戏合约 **和邀请奖励的统计可能有重复**
3. 排行榜的奖池金额从所有游戏的奖池中分成得到，具体比例由游戏决定
4. 设置接口
    1. function setDev(address _dev) public onlyOwner
       - 设置开发者，仅owner可用，允许开发这调用合约方法(rankStart,setRankResult)
       - args:
           - _dev: 开发者地址
    2. function setPrivilege(address addr, bool ok) public onlyOwner
       - 设置白名单，允许白名单内的地址调用合约方法（updateRank）  仅owner可用
       - args:
           - addr: 白名单地址
           - ok: true-允许调用；false-禁止调用
    3. function Start() public onlyDev
       - 开启排行统计轮次：清空上轮次数据，开启新排行周期，仅开发者可用
       
    4. function setRankResult(uint rankID, address[] rankResult, uint [] rate ) public onlyDev
       - 设置排行结果，及奖励发放，仅开发者可用。调用之前先遍历所有排行数据，按投注量排序后，将前十个用户地址以及对应的奖励比例传入setRankResult方法
       - args:
           - rankID: 排行榜轮次
           - rankResult: 排序后的地址列表
           - rate: rankResult地址列表对应奖励比例
       - 约束条件:
           - 有效rankID ，仅能发放往期奖励，当前轮次无法参与排行奖励发放
           - rankResult长度不超过10，切与rate长度相等

5. 查询接口
    1. function getCurrentRank() public view returns (uint rankID)
       - 获取当前轮次ID
       - output:
           - rankID: 当前轮次ID
    2. function getRankData(uint rankID, uint start, uint end) public view returns (uint, address[] memory, uint[] memory, uint)
       - 获取某轮次的排行数据
       - args:
           - rankID: 排行榜轮次
           - start,end：当前轮次排行数据偏移量，用于遍历
       - output：
           - 当前最大用户数，参与计算start，end偏移量
           - 遍历出的地址列表
           - 对应地址列表的投注金额列表
           - 当前轮次的总奖金
        
    3. function getRankResult(uint rankID) public view returns(address[] memory)
        - 获取某轮次排行奖励地址列表
        - args:
            - rankID: 轮次ID
        - output:
            - address[]: 本轮次发放奖励的地址列表

6. 合约接口
    1. function updateRank(address player, uint value, uint bonus) public payable returns (bool) whitelist
       - 累计用户总投注量，奖池总金额，仅白名单地址可用
       - 约束条件：
           - msg.sender 必须在白名单地址里
           - msg.value 必须与传入的value相同
       - args
           - player: 投注者
           - amount: 投注金额
           - bonus: 奖池金额，累计入奖池总金额
       - 调用示例
            ```
            interface RankingIF {
                function ranking(address user, uint amount) external payable;
            }

            contract Test {

                address public rankCtx;

                function setRankingIF(address addr) public {
                    rankCtx = addr;
                }

                function ranking() public payable {
                    RankingIF(rankCtx).ranking.value(msg.value)(msg.sender, msg.value);
                }
            }
            ```
      
