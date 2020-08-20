# luckyhash 合约交互

## 1. 参与游戏接口

### 1. 投注

- method: `buy()`
- call value: 单次票价为100TRX，小于100TRX报错，大于100TRX，应为100TRX的整数
- event: `Lottory(address user, uint256 termID, uint256 startNumber, uint256 endNumber)`

### 2. 开奖

- method: `draw()`
- call value: 必须为0
- envet: `Draw(address winer, uint256 rank, uint256 number, uint256 prize uint256 calcStartBlockID, uint256 termID)`

## 2. 状态查询

### 1. 当前期数

- method: `currentTerm()`
- return: `(uint256)`, 返回当前期数；有效期数从1开始

### 2. 当前游戏状态

- method: `state()`
- return: `(uint8)`, 返回当期游戏的状态, 状态值及其含义为
    - 0: onging, 进行中
    - 1: pending, 等待开奖
    - 2: finish, 开奖完成，等待开始

### 3. 当期游戏卖出彩票数

- method: `number_()`
- return: `(uint256)`

### 4. 当期游戏总奖金

- method: `totalReward_`
- return: `(uint256)`

### 5. 游戏开始以来(从第一期开始到当前)的参与人次

- method: `playCnt()`
- return: `(uint256)`

### 6. 游戏开始以来(从第一期开始到当前)的总流水

- method: `totalReceive()`
- return: `(uint256)`

### 7. 查寻特定期数的状态

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

### 8. 查询往期开奖结果

- method: `getTermResult(uint256 termID)`
- note: `termID` 范围: `1 ~ 当前期数`
- return: `(uint256[] data1, address[] data2, uint256[] winNumber, address[] winer, uint256[] prize)`
    - `data1` 本期信息，分别对应本期的开始区块，结束区块，开奖区块，总奖金，总彩票数，一等奖，二等奖，三等奖开奖号码计算开始区块
    - `data2` 本期折扣用户列表，分别对应 endUser, drawUser, 本期前十个彩票号码买家
    - `winNumber` 本期开奖号码数组，分别对应 一等奖，二等奖，三等奖
    - `winer` 本期中奖用户数组，分别对应 一等奖，二等奖，三等奖
    - `prize` 本期奖金，分别对应 一等奖，二等奖，三等奖

### 9. 查询特定期数，特定彩票号码的拥有人

- method: `getTermNumberOwner(uint256 number, uint256 termID)`
- return: (address) 所有人地址

### 10. 查询特定期数，特定用户的所有彩票

- method: `getTermUserNumbers(address user, uint256 termID)`
- return: `(uint256[] start, uint256[] end)`
    - 返回两个数组，数组长度为用户当期的购买次数
    - `start` 每次购买获得首张彩票号码
    - `end` 每次购买获得的最后一张彩票号码
    - e.g: ([1,10,100], [1,14,109]) 表示用户购买了三次，第一购买1张`[start[0], end[0]] => [1,1] => 1`, 第二次购买5张`[start[1], end[1]] => [10, 14] => 10, 11, 12, 13, 14`, 第三次购买10张`[start[2], end[2]] => [100, 109] => 100, 101, 102, 103, 104, 105, 106, 107, 108, 109`; 用户的总彩票数为`16`张, 号码为`1, 10, 11, 12, 13, 14, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109`
