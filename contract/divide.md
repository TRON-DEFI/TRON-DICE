## 分红接口

1. divideInfo() (uint, uint, uint)
    - 获取当期分红信息
    - args
        - 无
    - returns
        - uint: 代币总锁定量
        - uint: 分红池总额
        - uint: 当期分红比例；档期分红总额 = 分红池总额 * 当期分红比例 / 100


2. bonus() uint
    - 获取用户可提取的分红奖励
    - args
        - 无
    - returns
        - uint: 用户可提取的分红总额，单位SUN

3. withdrawBonus(uint amount)
    - 需要签名
    - 提取分红奖励
    - args
        - uint amount: 提取的额度，应小于等于用户的`bonus()`，传入`0`表示提取全部
    - returns
        - 无

4. divideTermID()
    - 返回当前分红期数
    - args
        - 无
    - returns
        - uint: 分红期数ID 

5. divideTermInfo(uint id) (uint id, uint divideRate, uint divideAmount, uint lockedAmount, uint startTime, uint endTime, uint maxUID)
    - 查询往期分红信息，当期信需使用`divideInfo`查询
    - args
        - uint id: 分红期数ID
    - returns
        - uint id: 分红期数ID
        - uint divideRate: 当期分红比例
        - uint divideAmount: 当期分红总额
        - uint lockedAmount: 当期分红的代币总锁定量
        - uint startTime: 当期分红开始时间
        - uint endTime: 当期分红结束时间
        - uint maxUID: 当期分红参与人数


## dev 分红逻辑接口

- dev用户在运营需要分红时调用如下接口完成分红
- 分红使用记账模式-提取模式
- 分红过程中，`lock`,`unlock`无法调用
- 分红结束自动创建下一轮分红，如需调整分红比例，需要在本轮分红结束前调用，下次分红时生效
- 所有函数只有`dev`可以调用

1. setDivideRate(uint rate)
    - 设置分红比例；分红比例应小于100，大于0，默认10
    - args
        - uint rate: 单次分红所发放奖金占分红池的比例，范围 (0,100]

2. startDivide()
    - 开始分红，禁用代币的锁定，解锁函数，记录锁定总量，分红池当前额度，根据分红比例计算本次分红总金额

3. divide(uint count) uint
    - 必须处于分红状态才可调用
    - 计算`count`个用户的分红所得，增加对应用户的分红奖励可提取值
    - args
        - uint count: 一次计算的用户数量
    - returns
        - uint: 已处理的用户数量；当此值达到`maxUID`时，表明所有用户的分红数据处理完成

4. endDivide()
    - 结束分红状态，记录下一次分红使用的分红比例
    - 必须处于分红状态
    - 必须处理完所有用户的分红数据