# 分红相关

## dice 游戏合约
1. stakingPool() uint
    - 获取dice分红池当前金额
    - return
        - uint: 分红池金额

2. circulation() uint
    - 获取当前出矿总量
    - return
        - uint: 已挖出的代币总量

3. tokenSupply() uint
    - 获取可挖出的代币总量-代币发行量
    - return
        - uint: 代币总发行量

4. currentStagePriceRate() uint
    - 当前挖矿阶段的价格增幅分子
    - return
        - uint: 代币总发行量

5. stageRateBase() uint
    - 当前挖矿阶段的价格增幅分母
    - return
        - uint: 代币总发行量

### 挖矿进度逻辑
每释放代币总量的`2%`为一个阶段，共计`50`个阶段

- 每阶段释放代币总量 = tokenSupply * 2 / 100
- 当前阶段 = circulation / 每阶段释放代币总量 + 1  (整除逻辑)
- 当前阶段上限 = 每阶段释放代币总量 * (当前阶段 + 1)
- 当前挖矿阶段价格 = 100 * currentStagePriceRate / stageRateBase (结果保留6位小数，单位为TRX)


## 2. token 代币合约

### 1. 交互接口
1. lock(uint amount)
    - 锁定代币接口，用户调用锁定自己所持代币，amount应小于等于用户的当前余额
    - args
        - uint amount: 锁定量，单位为最小精度

2. unlock(uint amount)
    - 解锁代币接口，用户调用解锁自己处于锁定状态的代币，amount应小于等于用户的锁定总量
    - 解锁成功后，对应数量的代币进入冻结状态
    - args
        - uint amount: 解锁量，单位为最小精度，0: 解锁所有可解锁的金额

3. unfreeze(uint amount)
    - 解冻代币接口，用户调用解冻自己处于冻结状态的代币，amount应小于等于用户的冻结总量
    - 解冻成功后，对应数量的代币进入用户账户余额
    - args
        - uint amount: 解冻量，单位为最小精度，0: 解冻所有可解锁的金额

### 2. 查询接口
1. totalLock() uint
    - 获取当前代币总锁定量
    - return
        - uint: 代币总锁定量

2. lockedAmount(address addr) uint
    - 查询特定地址的代币锁定量
    - args
        - address addr: 查询的地址
    - return
        - uint: 对应地址的锁定量，最小单位

3. unlockTime(address addr) uint
    - 查询特定地址的可解锁时间
    - args
        - address addr: 查询的地址
    - return
        - uint: 对应地址的解锁时间，UTC秒

4. fronzenAmount(address addr) uint
    - 查询特定地址的代币冻结量
    - args
        - address addr: 查询的地址
    - return
        - uint: 对应地址的冻结量，最小单位

5. unfreezeTime(address addr) uint
    - 查询特定地址的可解冻时间
    - args
        - address addr: 查询的地址
    - return
        - uint: 对应地址的解冻时间，UTC秒
