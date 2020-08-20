# 平台合约——分红池

## 功能需求

1. 接受并累计平台游戏的分红金额
2. 以记账方式发放分红
3. 玩家提现
4. 数据查询

## 设计

### 角色设计

1. owner: 合约发布者，可设置开发者，添加游戏名单，提现
2. developer：开发者，分发奖励给
3. gamer：游戏合约，设置游戏累计如分红池合约的金额

### 逻辑设计

1. 合约初始化：
    1. setDev：设置合约开发者
    2. setGame: 设置游戏合约地址
2. 游戏合约将需要累计的分红打入分红池合约
3. owner在计算分红规则之后，调用分红池合约方法将分红奖励计入玩家账单；
4. 用户玩家查询自己可提取的金额，提取自己的分红。

### 接口设计

1. 合约接口

    1. `function pooling(uint256 value) payable external onlyGame` 
        - 设置游戏分红池金额
        - 约束条件
            - 必须已注册的游戏合约地址
            - call value == value
            - 投注时间必须小于上轮结束时间+轮次投注周期（18s）
        - call value: 投注金额
        - input param: 
            - value: 待累计的游戏分红
        - event: 
            - `event PoolIncome(address indexed game, uint value);`

    2. `function sendBonus(address[] to, uint256[] value) public onlyDev`
        - 分发分红
        - 约束条件：
            - 必须使用开发者调用
            - to长度必须等于value长度
            - value必须小于分红池总额
        - input：
            - address[] to:  奖励发放的玩家名单
            - uint256[] value: 玩家对应的奖励金额
        - event: `event SendBonus(address indexed to,uint value);` 

    3. `function withdraw() external returns (bool)`
        - 用户提现
        - 约束条件
            - 提现用户不在合约黑名单
            - 提现用户有可提取分红
            - msg.sender 不是空地址
        - event: `event Withdraw(address indexed player, uint value);`


    4. `function setDev(address _dev) public onlyOwner`
        - 设置开发者地址

    5. `function setGame(address game, bool ok) onlyDev`
        - 设置合法的游戏合约地址


2. 状态查询

    1. `function getTotalBonusOf(address to) public view returns (uint256)`
        - 查询玩家累计提现的总额
        - input:
            - to 玩家地址
        - return: 
            - uint256： 累计的提取金额

    2. `function getBanlance(address to) public view returns (uint256)`
        - 查询玩家可提取金额
        - input:
            - to 玩家地址
        - return: 
            - uint256, 可提取金额
    3. `totalPayment()`
        - 可用的分红池金额
