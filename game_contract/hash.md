
## hash

### 交互接口 (全部为交易方法)
1. buy(address referrer)
    - 购买彩票接口
    - callvalue 需要大于等于票价(最好为票价的整数倍)，根据callvalue计算购买彩票的张数
    - args
        - address referrer: 推荐人
    - returns
        - 无
    - events
        - 投注成功事件
            - LuckLottory(address user, uint termID, uint startNum, uint endNum);
                - address user: 用户地址
                - uint termID: 轮次编号
                - uint startNum: 彩票起始编号
                - uint endNum: 彩票结束编号

2. end()
    - 结束当前轮次，自动进入下一轮次
    - 要求本轮投注总额大于结束阈值
    - 只有参与本轮投注的玩家可以调用
    - args
        - 无
    - returns
        - 无
    - events
        - 轮次结束事件，播报每各中奖号码的开奖区块 (3个事件，分别对应rank 3，2，1)
            - TermEnd(uint termID, uint rank, uint drawBlockID, uint drawBlockCount);
                - uint termID: 轮次编号
                - uint rank: 第n名
                - uint drawBlockID: 开奖号码计算区块起始号码
                - uint drawBlockCount: 计算使用的连续区块数量

3. draw(uint id)
    - 结算指定轮次，计算开奖号码，分发奖励
    - 任何人可调用
    - 需要指定轮次开奖所需的区块已经确认（出块完成）
    - args
        - uint id: 轮次编号，要求指定轮次已经结束，且未结算
    - returns
        - 无
    - events
        - 用户中奖信息事件
            - Draw(winer, number, prize, id, rank);
                - winer: 中奖用户地址
                - number: 中奖号码
                - prize: 奖金数额
                - id: 轮次编号
                - rank: 名次 （3，2，1）

### 查询接口 (全部为 view 方法)
1. termID() uint
    - 查询当前轮次编号
    - args
        - 无
    - returns
        - uint: 轮次id，范围 `[1, termID]`

2. termInfo(uint id) (...)
    - 查询特定轮次的数据
    - args
        - uint id: 轮次id，范围 `[1, termID]`
    - returns
        - uint256 startBlock: 轮次开始区块
        - uint256 tartTime: 轮次开始时间
        - uint256 endBlock: 轮次结束区块号
        - uint256 drawBlock: 结算触发区块号码
        - uint256 totalAmount: 轮次彩票总收入
        - uint256 maxNumber: 卖出的彩票数量，彩票编号为[0, maxNumber)
        - uint256 totalSpend: 奖金使用数
        - address endUser: 结束本轮用户地址
        - address drawUser: 开奖用户地址
        - uint256 drawBlockGap: 开奖区块和轮次结束区块的差值
        - uint256 drawBlockNum: 开奖所需的连续区块数
        - uint256 drawRankGap: 名次之间的开奖区块差
        - bool drawState: 结算状态，false: 未结算; true: 已结算
        - uint256 profitRate: 本轮次利润率，利润用于邀请返现，排行榜，代币分红和运营开销

3. playCnt() uint
    - 游戏开始以来(从第一期开始到当前)的参与人次
    - args
        - 无
    - returns
        uint 游戏总投注人次

4. totalReceive() uint
    - 游戏开始以来(从第一期开始到当前)的总流水
    - args
        - 无
    - returns
        uint 游戏总流水

5. getTermResult(uint id) (uint[] winNumber, address[] winer, uint[] prize, uint[] calcBlock, uint[] prizeRate)
    - 查询往期开奖结果信息
    - args
        - `uint id` 轮次编号，范围 `[1 ~ 当前期数]`
    - return
        - `uint[] winNumber` 本期开奖号码数组，分别对应 一等奖，二等奖，三等奖
        - `address[] winer` 本期中奖用户数组，分别对应 一等奖，二等奖，三等奖
        - `uint[] prize` 本期奖金，分别对应 一等奖，二等奖，三等奖
        - `uint[] calcBlock` 开奖起始区块号, 分别对应 一等奖，二等奖，三等奖
        - `uint[] prizeRate` 各名次奖金占比, 分别对应 一等奖，二等奖，三等奖

6. getTermNumberOwner(uint number, uint id) (address)
    - 查询特定期数，特定彩票号码的拥有人
    - args
        - uint number: 彩票号码, 范围 `[0, termInfo.maxNumber)`
        - uint id: 轮次编号，范围 `[1, termID]`
    - returns
        - address: 彩票所有人地址

7. getTermUserNumbers(address user, uint id) (uint[] start, uint[] end)
    - 查询特定期数，特定用户的所有彩票
    - 用户只能查询自己的数据
    - args
        - address user: 用户地址
        - uint id: 轮次编号，范围 `[1, termID]`
    - returns
        - 返回两个数组，数组长度为用户在`id`轮次的购买次数
        - `start` 每次购买获得首张彩票号码
        - `end` 每次购买获得的最后一张彩票号码
        - e.g: ([1,10,100], [1,14,109]) 表示用户购买了三次，第一购买1张`[start[0], end[0]] => [1,1] => 1`, 第二次购买5张`[start[1], end[1]] => [10, 14] => 10, 11, 12, 13, 14`, 第三次购买10张`[start[2], end[2]] => [100, 109] => 100, 101, 102, 103, 104, 105, 106, 107, 108, 109`; 用户的总彩票数为`16`张, 号码为`1, 10, 11, 12, 13, 14, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109`

8. endThreshold() uint
    - 查询轮次结束的投注流水阈值；单个轮次的投注流水需要大于等于此值，才可以调用`end()`结束，结束调用成功时确定开奖`draw()`的最小区块号码
    - args
        - 无
    - returns
        - uint 结束投注的阈值，单位SUN

9. price() uint
    - 查询单次投注价格，单位SUN
    - args
        - 无
    - returns
        - uint 单次投注的最小值，单位SUN

10. dividePoolAmount() uint
    - 不再使用，分红金额实时转账给 `dividePoolAddr`
    - 分红池累计金额，单位SUN; 用于代币的冻结分红，每次分红后清零
    - args
        - 无
    - returns
        - uint 分红池累计金额，单位SUN
