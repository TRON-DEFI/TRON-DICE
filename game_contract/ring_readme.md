# 彩环游戏

## 需求 

1. 彩环一共54个彩段，彩段分为黑（26，2倍率），红（17，3倍率），绿（10，5倍率），黄（1，50倍率）四种颜色。
2. 投注上限：
	1. 黑：20000 TRX
	2. 红：10000 TRX
	3. 绿：5000 TRX
	4. 黄：500 TRX
3. 游戏逻辑：
	1. 每轮18s用于用户投注
	2. 停止投注，进行开奖
	3. 按照投注情况进行分发奖金
4. 利润分配：
	1. 团队: 20%
	2. 邀请: 10%
	3. 进入总分红池: 70%
5. 挖矿：与dice逻辑一致。
6. 邀请: 与dice逻辑一致。

## 设计

### 角色设计

1. owner: 合约发布者，可设置开发者，奖池地址，市场运营地址
2. developer：开发者，可设置公共合约【挖矿】【邀请】【排行榜】地址，邀请者地址；存储团队抽成奖励
3. referer：邀请者，设置玩家的邀请人，用于计算邀请奖励

### 逻辑设计

1. 彩环定义：
    黑：[2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52]
    红：[3,5,7,13,15,17,23,25,27,29,31,37,39,41,47,49,51]
    绿：[1,9,11,19,21,33,35,43,45,53]
    黄：[0]

2. 彩环投注：保存每种颜色的倍数，投注总人数，总投注量，投注人-投注金额，并提供查询接口；投注时，校验每个颜色的总投注量是否超过最大允许的投注量，以及当前轮次是否结束。
3. 开奖策略：
    中心化生成一个随机数作为中奖号码，传入合约执行开奖逻辑
    TODO：随机数对利润的影响
4. 结算中奖结果：
    1. 累计该轮次参与明细，流水，中奖人
    2. 奖励发放
    3. 挖矿，邀请逻辑
5. 游戏流程
    1. 用户购买某个色段，调用合约buy方法投注
    2. buy方法记录每个色段的投注用户及投注金额列表，返回更新后的当前色段的所有投注用户信息
    3. 18s之内投注完成，之后无法投注，等待5s之后的开奖结果
    4. 页面调用中心化接口开奖：依据策略生成随机数调用合约draw(),执行奖励发放，利润分配
    5. 开奖完成后，自动开启下一轮

### 接口设计

1. 合约接口

    > 合约初始化时，4，5，6 接口必须依次调用

    1. `function buy(adress ref,int color)` 
        - 投注。
        - 约束条件
            - color 必须1-4
            - call value>10TRX
            - 投注时间必须小于上轮结束时间+轮次投注周期（18s）
        - call value: 投注金额
        - input param: 
            - color: 色段编码 1-black,2-red,3-green,4-yellow
            - ref: 邀请者地址
        - event: 
            - `RingLottory(address indexed user, uint256 currentBet, uint256 color, uint256 playAmount, uint256 totalPrize)`

    2. `function draw(uint256 winNum)`
        - 开奖。18s定时调用开奖
        - 约束条件：
            - 必须使用开发者调用
            - winNum 取值必须[0-53]
        - call value: 必须为0
        - input：
            - winNum:  中奖号码，由中心化计算得出
        - event: `RingWin(uint currentBet, uint winNum, uint betInfo.winColor)` 中奖号码信息
        - event: `RingDraw(address indexed winner, uint256 prize, uint256 term);`中奖人信息
        - event: `RingStart(msg.sender, currentBet);`  下一轮开启事件

    3. `function setRate(uint poolRate,uint developerRate,uint marketRate,uint referRate,uint rankRate,uint rewardRate) public onlyOwner`
        - 设置总分红池，开发者，运营，邀请，排行的分成比例
        - 约束条件
            - 必须合约owner调用
            - 除rewardRate以外rate加一起必须等于rewardRate
            - 如不设置，将采用合约默认值
                - 总奖金池 50%
                - 团队  20%
                - 邀请  10%
        - input：
            - uint poolRate, 总分红池抽成比例，整数
            - uint developerRate, 开发者抽成比例，整数
            - uint marketRate,运营抽成比例，整数
            - uint referRate,邀请抽成比例，整数
            - uint rankRate,排行榜抽成比例，整数
            - uint rewardRate，luckyhash游戏奖池

    4. `function initColor() public onlyDev`
        - 设置色块编码，默认1-黑色，2-红色，3-绿色 4- 黄色
        - 约束条件
            - 必须合约dev调用

    5. `function initColorInfo(uint[] mutis, uint[]max) onlyDev`
        - 设置色块对应的最大投注金额，奖励倍率
        - 约束条件
            - 必须合约dev调用
            - mutis， max， color 数组长度必须一致
        - uint[] mutis  色块对应倍率
        - uint[] max    色块每轮次对应最大投注金额

    6. `function initColorNumbers(uint256[] colorArr) onlyDev`
        - 设置色块数组索引及其对应色块编码，如输入为空，则默认使用TRONBET彩环
        - 约束条件
            - 必须合约dev调用
        - uint[] colorArr  色块数组索引及其对应色块编码
  

2. 状态查询
    1. 彩环数组
        - method: `colorNumbers()`
        - return: 
            - `(uint[])`, 返回数组索引是色块编码，数组值是色块颜色枚举

    2. 彩环色号枚举
        - method: `colors()`
        - return: `(uint[])`, 返回色号枚举值
            - 1: black, 黑色
            - 2: red, 红色
            - 3: green, 绿色
            - 4: yellow, 黄色

    3. 当前游戏状态
        - method: `state()`
        - return: `(uint8)`, 返回当期游戏的状态, 状态值及其含义为
            - 0: onging, 进行中
            - 1: pending, 等待开奖
            - 2: finish, 开奖完成
    
    4. 当期游戏轮次
        - method: `currentBet()`
        - return: `(uint256 betID)`

    5. 当期游戏结束时间
        - method: `endTime_`
        - return: `(uint256)`
            - unix时间戳
    
    6. 每轮次投注周期
        - method: `roundTime`
        - return: `(uint256)`
            - 当前默认18s

    7. 游戏开始以来(从第一期开始到当前)的参与人次
        - method: `totalPlayCount()`
        - return: `(uint256)`

    8. 游戏开始以来(从第一期开始到当前)的总流水、
        - method: `totalReceive()`
        - return: `(uint256)`
    

    9. `getWinNumbers(uint256 st, uint256 et) returns(uint256[] memory,uint[] memory)`
        - 获取所有的中奖色块
        - return: 
            - uint256[], 历次中奖号码
            - uint256[]，历次中奖号码对应色块

    10. `getPlayer(uint256 betID,uint256 color) returns (address[] memory,uint256[] memory,uint256)`
        - 获取某轮次某色块下的用户投注信息
        - return: 
            - address[], 投注地址列表
            - uint256[], 投注地址的投注金额
            - uint256, 总投注金额

###  测试用例设计
1. 角色设置，比例设置，公共合约，总奖池地址设置及查询  done
    - owner: TYvRQn5ycznkN3Mv6SBpFQyxVqa3xbbe2e
    - developer: TAMCNz6xsA1KYGNMsJV8nMjFiP4it1cmbN   setDeveloper
    - market: TW4fxxgkC1t5WZEzztRzAnfgAabX7FVh5m  setMarketing
    - poolAddr: TGvPbgh63Hub5LR783hf4wJRyC8kn4FkhT   setPool
    - referContract:  setReferIF
    - rankContract:   setRankIF
    - miniContract:   setMineIF
    - poolRate: 10   setRate
    - developerRate: 6
    - marketRate: 4
    - referRate: 5
    - rankRate: 5
2. 彩环显示colorNumbers()   done
3. buy()-getPlayer()，检查购买号码是否跟合约一致    done
4. draw()-getPlayer()-getWinNumbers,    done
    1. 18s自动开奖
    2. 校验开奖状态

5. 数据校验                     done
    1. poolAddr=总投注额*poolRate
    2. developer=总投注额*developerRate
    3. market = 总投注额*marketRate
    4. owner = balance()
6. 检查公共合约数据是否准确。   done
    1. 挖矿  miniContract
    2. 邀请  referContract=总投注额*referRate
    3. 排行榜  rankContract=总投注额*rankRate
