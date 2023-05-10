# Redesigned DAO Website

# How do I contribute

1. yarn install to build dependencies ( Don't use npm install )
2. yarn dev while editing code for live changes
3. yarn build to ensure there's no error during compilation
4. commit to your own branch once there's no errors

## Smart Contract

Smart Contract source code can be found [here](https://github.com/NUS-Fintech-Society/BC_DAO_contracts).

### Contract Addresses

- DaoPool.sol: https://goerli.etherscan.io/address/0x31933694Ee18C19E69434134642A18C0644905fd
- NUSToken.sol: https://goerli.etherscan.io/address/0x5cc93ea88E3A114D586263E8B42e2c49d3943092
- Voting.sol: https://goerli.etherscan.io/address/0x0091d2eb482899b2bc0e786706daa77ed1604c2b

### How it works

1. NUSToken.sol is an ERC777 token used to for voting purposes
2. DaoPool.sol is used to reward users with NUSToken (address of this token can only be set by admins of DaoPool.sol)
3. Voting.sol wraps around DaoPool.sol, and this is the contract which we are doing proposal creation/update and vote creation
4. Content of the proposals are stored on IPFS, which is identified using the IPFS hashes (same with votes)

# WIP documentation
