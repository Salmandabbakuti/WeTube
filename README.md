# WeTube-subgraph

WeTube subgraph

##### Steps:

Create .env file with the following variables:

```
PRIV_KEY=
POLYGON_MUMBAI_RPC_URL=
POLYGON_MAINNET_RPC_URL=
ROPSTEN_RPC_URL=
RINKEBY_RPC_URL=
```

1. Compile and deploy contract
2. Update `abis` folder with abi of deployed contract
3. Update `subgraph.yaml` with contract address and startBlock and any event changes
4. Update `mappings.ts` logic if any changes
5. Create new subgraph in hosted service and copy subgraph slug
6. Generate types
7. Build subgraph
8. Authorize graph cli for deployment using token
9. Deploy subgraph

```
yarn install
npx hardhat compile
npx hardhat deploy --network polygonMumbai
yarn codegen

yarn build

graph auth https://api.thegraph.com/deploy/ <Your account's access token not subgraph's token>

yarn deploy
```

#### indexing
