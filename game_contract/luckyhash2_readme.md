# LuckyHash
## 需求
1. 彩票单价50TRX，玩家设置彩票数量，购买多张会获得连续的几个号码。
2. 一张彩票对应一个连续且唯一的号码。
3. 开奖条件：
    1. 每轮次奖池上限2.5wTRX, 达到2.5wTRX，强制开奖
    2. 奖池金额超过5000TRX，任意玩家都可开奖，开奖后即可进入下一轮。
4. 开奖成功后，所有玩家禁止购买，等候生成开奖号码
5. 奖励设置：
    1. 购买最后一张彩票的玩家    免单，即奖励50TRX，当前轮次开奖后返还
    2. 每轮前10的玩家           八折优惠，即 彩票单价 50*0.8=40TRX，当前轮次开奖后返回20TRX
    3. 每轮次第一个开奖成功的玩家  奖励50TRX， 当前轮次开奖后返还
    4. 每轮三个中奖名额，分奖池金额的75%：一等奖：60%，二等奖：30%，三等奖：10%
    5. 奖池金额的25%：10% 进入总奖池  4% 运营  6% 团队奖励  5% 邀请奖励
6. 中奖号码生成规则：【同luckyhash】
    中心化生成随机数，调用合约来生成一个中奖号码。
7. 能查询当前轮次奖池，参与人数【记录历史轮次】
8. 能查询当前轮次玩家的投注详情，地址-投注金额-号码【记录历史轮次】
9. 支持邀请返现【使用公共合约】
10. 支持挖矿逻辑【使用公共合约】
11. 支持排行榜逻辑【使用公共合约】 

## 设计
1. 角色设计
    1. owner: 合约发布者，可设置开发者，奖池地址，市场运营地址
    2. developer：开发者，可设置公共合约【挖矿】【邀请】【排行榜】地址；存储团队抽成奖励
    3. marketing：市场运营者，存储运营抽成

2. 逻辑设计
    1. 用户调用合约buy()可以购买一张或者连续多张的彩票
    2. 合约buy()记录每个用户购买的彩票号码
    3. 当达到开奖触发条件后，用五分钟之内的18个block hash计算一个中奖号码，并根据中奖号码发放奖励，分配利润
    4. 开奖结算成功后，进入下一轮

3. 接口设计
    1. 合约接口
        - `function buy(address ref_) public payable started` 
            - 投注。调用前先查询玩家的邀请人。
            - call value: 单次票价为50TRX，小于50TRX报错，大于50TRX，应为50TRX的整数
            - input param: ref_ 玩家邀请人地址
            - event: `LuckLottory(address user, uint256 termID, uint256 startNumber, uint256 endNumber)`

        - `function draw() public payable pending`
            - 开奖。等待80个区块，且该轮游戏奖池金额大于0
            - call value: 必须为0
            - envet: `LuckDraw(address winer, uint256 rank, uint256 number, uint256 prize uint256 calcStartBlockID, uint256 termID)`

        - `function setRate(uint poolRate,uint developerRate,uint marketRate,uint referRate,uint rankRate,uint rewardRate) public onlyOwner`
            - 设置总分红池，开发者，运营，邀请，排行的分成比例
            - input：
                - uint poolRate, 总分红池抽成比例，整数
                - uint developerRate, 开发者抽成比例，整数
                - uint marketRate,运营抽成比例，整数
                - uint referRate,邀请抽成比例，整数
                - uint rankRate,排行榜抽成比例，整数
                - uint rewardRate，luckyhash游戏奖池
            - 约束条件
                - 必须合约owner调用
                - 所有rate加一起必须等于100

    2. 状态查询
        - 当前期数
            - method: `currentTerm()`
            - return: `(uint256)`, 返回当前期数；有效期数从1开始

        - 当前游戏状态
            - method: `state()`
            - return: `(uint8)`, 返回当期游戏的状态, 状态值及其含义为
                - 0: onging, 进行中
                - 1: pending, 等待开奖
                - 2: finish, 开奖完成，等待开始

        - 当期游戏卖出彩票数
            - method: `number_()`
            - return: `(uint256)`

        - 当期游戏总奖金
            - method: `totalReward_`
            - return: `(uint256)`

        - 游戏开始以来(从第一期开始到当前)的参与人次
            - method: `playCnt()`
            - return: `(uint256)`

        - 游戏开始以来(从第一期开始到当前)的总流水、
            - method: `totalReceive()`
            - return: `(uint256)`

        - 查寻特定期数的状态
            - method: `terms(uint256 termID)`
            - note: `termID` 范围: `1 ~ 当前期数`
            - return: `(uint256 startBlock, uint256 endBlock, uint256 drawBlock, uint256 totalReward, uint256 maxNumber, address endUser, address drawUser)`
                - `startBlock` 本期开始区块
                - `endBlock` 本期结束区块，未结束时为0
                - `drawBlock` 本期开奖区块，未开奖时为0
                - `totalReward` 本期当前时刻总奖金
                - `maxNumber` 本期当前时刻最大彩票号
                - `endUser` 本期触发结束的用户
                - `drawUser` 本期触发开奖的用户

        - `getTermResult(uint256 termID)`
            - 查询往期开奖结果
            - note: `termID` 范围: `1 ~ 当前期数`
            - return: `(uint256[] data1, address[] data2, uint256[] winNumber, address[] winer, uint256[] prize)`
                - `data1` 本期信息，分别对应本期的开始区块，结束区块，开奖区块，总奖金，总彩票数，一等奖，二等奖，三等奖开奖号码计算开始区块
                - `data2` 本期折扣用户列表，分别对应 endUser, drawUser, 本期前十个彩票号码买家
                - `winNumber` 本期开奖号码数组，分别对应 一等奖，二等奖，三等奖
                - `winer` 本期中奖用户数组，分别对应 一等奖，二等奖，三等奖
                - `prize` 本期奖金，分别对应 一等奖，二等奖，三等奖

        - `getTermNumberOwner(uint256 number, uint256 termID)`
            - 查询特定期数，特定彩票号码的拥有人
            - return: (address) 所有人地址

        - `getTermUserNumbers(address user, uint256 termID)`
            - 查询特定期数，特定用户的所有彩票
            - return: `(uint256[] start, uint256[] end)`
                - 返回两个数组，数组长度为用户当期的购买次数
                - `start` 每次购买获得首张彩票号码
                - `end` 每次购买获得的最后一张彩票号码
                - e.g: ([1,10,100], [1,14,109]) 表示用户购买了三次，第一购买1张`[start[0], end[0]] => [1,1] => 1`, 第二次购买5张`[start[1], end[1]] => [10, 14] => 10, 11, 12, 13, 14`, 第三次购买10张`[start[2], end[2]] => [100, 109] => 100, 101, 102, 103, 104, 105, 106, 107, 108, 109`; 用户的总彩票数为`16`张, 号码为`1, 10, 11, 12, 13, 14, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109`

4. 测试用例设计
    1. 角色设置，比例设置，公共合约，总奖池地址设置及查询
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
    2. buy()-getTermUserNumber()-getTermNumberOwner()-term()，检查购买号码是否跟合约一致
    3. draw()-getTermResult(), 
        1. 不满足最少开奖5000TRX，不能开奖
        2. 多买几次，一次买多个号码，够5000TRX，开奖成功
        3. 买到最大开奖金额，能否强制开奖
    4. 数据校验
        1. poolAddr=总投注额*poolRate
        2. developer=总投注额*developerRate
        3. market = 总投注额*marketRate
        4. owner = balance()
    5. 检查公共合约数据是否准确。
        1. 挖矿  miniContract
        2. 邀请  referContract=总投注额*referRate
        3. 排行榜  rankContract=总投注额*rankRate
