# joke platform node test


## init environment
- install nodejs version > 10
- npm install

## deploy contract


- modify `config.yaml`
- node initCtx.js

## what has initCtx.js done?

1. The Orders for Contract Deployment
    1. token/miner
    2. refer
    3. ranking
    4. game
        1. dice
        2. luckHash
        3. colorRing

2. The Result for Contract Deployment
    What We can get after Contract Deployment
    - miner Token Contract
        - addr: Contract address
        - owner: All information for Token Contract
            - addr: Owner address for Contract
            - pk: owner pk
    - refer
        - addr: Contract Address
        - owner: Owner address for DICE Contract
            - addr: Owner address for Contract
            - pk: owner pk
    - ranking game platform contract
        - addr: Contract Address
        - owner: Owner address for bank
            - addr: Owner address for Contract
            - pk: owner pk
    - dice: dice contract
        - addr: Contract Address
        - owner:
            - addr: Owner address for Contract
            - pk: owner pk
    - luckHash: Luck hash
        - addr: Contract Address
        - owner:
            - addr: Owner address for Contract
            - pk: owner pk
    - colorRing: luck ring
        - addr: Contract Address
        - owner:
            - addr: Owner address for Contract
            - pk: owner pk
