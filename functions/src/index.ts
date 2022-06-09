import { AccountId, Client, ContractCallQuery, ContractCreateFlow, ContractExecuteTransaction, ContractFunctionParameters, ContractId, Hbar } from "@hashgraph/sdk";
import { Interface } from "@ethersproject/abi";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
dotenv.config();
let abiInterface: Interface;

const bytecode = "608060405234801561001057600080fd5b506116fc806100206000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063885126991161007157806388512699146101d9578063a4a1d6af14610209578063a61e463c14610239578063ad35b83d14610269578063d810b26b14610299578063f22f2a1a146102c9576100b4565b80630c130de8146100b957806315533a27146100e957806332220a241461011957806342413315146101495780634c00d2b0146101795780637337dcff146101a9575b600080fd5b6100d360048036038101906100ce9190610eea565b6102f9565b6040516100e09190611370565b60405180910390f35b61010360048036038101906100fe9190610f44565b610399565b6040516101109190611355565b60405180910390f35b610133600480360381019061012e9190610fe9565b6104c8565b6040516101409190611355565b60405180910390f35b610163600480360381019061015e91906110bd565b6105b1565b6040516101709190611355565b60405180910390f35b610193600480360381019061018e9190610f44565b6105e0565b6040516101a09190611355565b60405180910390f35b6101c360048036038101906101be9190610f17565b610703565b6040516101d09190611370565b60405180910390f35b6101f360048036038101906101ee9190610f44565b6107a3565b60405161020091906113b4565b60405180910390f35b610223600480360381019061021e9190610f44565b6107cb565b60405161023091906113b4565b60405180910390f35b610253600480360381019061024e9190611061565b6107f9565b6040516102609190611370565b60405180910390f35b610283600480360381019061027e9190610f44565b6108c8565b6040516102909190611392565b60405180910390f35b6102b360048036038101906102ae9190610f44565b610a6b565b6040516102c09190611333565b60405180910390f35b6102e360048036038101906102de9190610f8d565b610b62565b6040516102f09190611355565b60405180910390f35b6004602052806000526040600020600091509050805461031890611567565b80601f016020809104026020016040519081016040528092919081815260200182805461034490611567565b80156103915780601f1061036657610100808354040283529160200191610391565b820191906000526020600020905b81548152906001019060200180831161037457829003601f168201915b505050505081565b600080600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002080546103e690611567565b80601f016020809104026020016040519081016040528092919081815260200182805461041290611567565b801561045f5780601f106104345761010080835404028352916020019161045f565b820191906000526020600020905b81548152906001019060200180831161044257829003601f168201915b50505050509050600381604051610476919061131c565b9081526020016040518091039020839080600181540180825580915050600190039060005260206000200160009091909190915090805190602001906104bd929190610bfe565b506001915050919050565b6000806040518060400160405280858152602001848152509050806007856040516104f3919061131c565b9081526020016040518091039020600082015181600001908051906020019061051d929190610bfe565b50602082015181600101908051906020019061053a929190610c84565b5090505060068190806001815401808255809150506001900390600052602060002090600202016000909190919091506000820151816000019080519060200190610586929190610bfe565b5060208201518160010190805190602001906105a3929190610c84565b505050600191505092915050565b6000826005836040516105c4919061131c565b9081526020016040518091039020819055506001905092915050565b600080600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805461062d90611567565b80601f016020809104026020016040519081016040528092919081815260200182805461065990611567565b80156106a65780601f1061067b576101008083540402835291602001916106a6565b820191906000526020600020905b81548152906001019060200180831161068957829003601f168201915b505050505090506003816040516106bd919061131c565b90815260200160405180910390208054806106db576106da6115f9565b5b6001900381819060005260206000200160006106f79190610ce4565b90556001915050919050565b6001602052806000526040600020600091509050805461072290611567565b80601f016020809104026020016040519081016040528092919081815260200182805461074e90611567565b801561079b5780601f106107705761010080835404028352916020019161079b565b820191906000526020600020905b81548152906001019060200180831161077e57829003601f168201915b505050505081565b60006005826040516107b5919061131c565b9081526020016040518091039020549050919050565b6005818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b600382805160208101820180518482526020830160208501208183528095505050505050818154811061082b57600080fd5b9060005260206000200160009150915050805461084790611567565b80601f016020809104026020016040519081016040528092919081815260200182805461087390611567565b80156108c05780601f10610895576101008083540402835291602001916108c0565b820191906000526020600020905b8154815290600101906020018083116108a357829003601f168201915b505050505081565b6108d0610d24565b6007826040516108e0919061131c565b908152602001604051809103902060405180604001604052908160008201805461090990611567565b80601f016020809104026020016040519081016040528092919081815260200182805461093590611567565b80156109825780601f1061095757610100808354040283529160200191610982565b820191906000526020600020905b81548152906001019060200180831161096557829003601f168201915b5050505050815260200160018201805480602002602001604051908101604052809291908181526020016000905b82821015610a5c5783829060005260206000200180546109cf90611567565b80601f01602080910402602001604051908101604052809291908181526020018280546109fb90611567565b8015610a485780601f10610a1d57610100808354040283529160200191610a48565b820191906000526020600020905b815481529060010190602001808311610a2b57829003601f168201915b5050505050815260200190600101906109b0565b50505050815250509050919050565b6060600382604051610a7d919061131c565b9081526020016040518091039020805480602002602001604051908101604052809291908181526020016000905b82821015610b57578382906000526020600020018054610aca90611567565b80601f0160208091040260200160405190810160405280929190818152602001828054610af690611567565b8015610b435780601f10610b1857610100808354040283529160200191610b43565b820191906000526020600020905b815481529060010190602001808311610b2657829003601f168201915b505050505081526020019060010190610aab565b505050509050919050565b6000600283908060018154018082558091505060019003906000526020600020016000909190919091509080519060200190610b9f929190610bfe565b5082600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209080519060200190610bf3929190610bfe565b506001905092915050565b828054610c0a90611567565b90600052602060002090601f016020900481019282610c2c5760008555610c73565b82601f10610c4557805160ff1916838001178555610c73565b82800160010185558215610c73579182015b82811115610c72578251825591602001919060010190610c57565b5b509050610c809190610d3e565b5090565b828054828255906000526020600020908101928215610cd3579160200282015b82811115610cd2578251829080519060200190610cc2929190610bfe565b5091602001919060010190610ca4565b5b509050610ce09190610d5b565b5090565b508054610cf090611567565b6000825580601f10610d025750610d21565b601f016020900490600052602060002090810190610d209190610d3e565b5b50565b604051806040016040528060608152602001606081525090565b5b80821115610d57576000816000905550600101610d3f565b5090565b5b80821115610d7b5760008181610d729190610ce4565b50600101610d5c565b5090565b6000610d92610d8d846113f4565b6113cf565b90508083825260208201905082856020860282011115610db557610db461165c565b5b60005b85811015610e0357813567ffffffffffffffff811115610ddb57610dda611657565b5b808601610de88982610ea7565b85526020850194506020840193505050600181019050610db8565b5050509392505050565b6000610e20610e1b84611420565b6113cf565b905082815260208101848484011115610e3c57610e3b611661565b5b610e47848285611525565b509392505050565b600081359050610e5e81611681565b92915050565b600082601f830112610e7957610e78611657565b5b8135610e89848260208601610d7f565b91505092915050565b600081359050610ea181611698565b92915050565b600082601f830112610ebc57610ebb611657565b5b8135610ecc848260208601610e0d565b91505092915050565b600081359050610ee4816116af565b92915050565b600060208284031215610f0057610eff61166b565b5b6000610f0e84828501610e4f565b91505092915050565b600060208284031215610f2d57610f2c61166b565b5b6000610f3b84828501610e92565b91505092915050565b600060208284031215610f5a57610f5961166b565b5b600082013567ffffffffffffffff811115610f7857610f77611666565b5b610f8484828501610ea7565b91505092915050565b60008060408385031215610fa457610fa361166b565b5b600083013567ffffffffffffffff811115610fc257610fc1611666565b5b610fce85828601610ea7565b9250506020610fdf85828601610e4f565b9150509250929050565b6000806040838503121561100057610fff61166b565b5b600083013567ffffffffffffffff81111561101e5761101d611666565b5b61102a85828601610ea7565b925050602083013567ffffffffffffffff81111561104b5761104a611666565b5b61105785828601610e64565b9150509250929050565b600080604083850312156110785761107761166b565b5b600083013567ffffffffffffffff81111561109657611095611666565b5b6110a285828601610ea7565b92505060206110b385828601610ed5565b9150509250929050565b600080604083850312156110d4576110d361166b565b5b60006110e285828601610ed5565b925050602083013567ffffffffffffffff81111561110357611102611666565b5b61110f85828601610ea7565b9150509250929050565b60006111258383611226565b905092915050565b600061113882611461565b6111428185611484565b93508360208202850161115485611451565b8060005b8581101561119057848403895281516111718582611119565b945061117c83611477565b925060208a01995050600181019050611158565b50829750879550505050505092915050565b60006111ad82611461565b6111b78185611495565b9350836020820285016111c985611451565b8060005b8581101561120557848403895281516111e68582611119565b94506111f183611477565b925060208a019950506001810190506111cd565b50829750879550505050505092915050565b611220816114e5565b82525050565b60006112318261146c565b61123b81856114a6565b935061124b818560208601611534565b61125481611670565b840191505092915050565b600061126a8261146c565b61127481856114b7565b9350611284818560208601611534565b61128d81611670565b840191505092915050565b60006112a38261146c565b6112ad81856114c8565b93506112bd818560208601611534565b80840191505092915050565b600060408301600083015184820360008601526112e68282611226565b91505060208301518482036020860152611300828261112d565b9150508091505092915050565b6113168161151b565b82525050565b60006113288284611298565b915081905092915050565b6000602082019050818103600083015261134d81846111a2565b905092915050565b600060208201905061136a6000830184611217565b92915050565b6000602082019050818103600083015261138a818461125f565b905092915050565b600060208201905081810360008301526113ac81846112c9565b905092915050565b60006020820190506113c9600083018461130d565b92915050565b60006113d96113ea565b90506113e58282611599565b919050565b6000604051905090565b600067ffffffffffffffff82111561140f5761140e611628565b5b602082029050602081019050919050565b600067ffffffffffffffff82111561143b5761143a611628565b5b61144482611670565b9050602081019050919050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b60006114de826114fb565b9050919050565b60008115159050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b83811015611552578082015181840152602081019050611537565b83811115611561576000848401525b50505050565b6000600282049050600182168061157f57607f821691505b60208210811415611593576115926115ca565b5b50919050565b6115a282611670565b810181811067ffffffffffffffff821117156115c1576115c0611628565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b61168a816114d3565b811461169557600080fd5b50565b6116a1816114f1565b81146116ac57600080fd5b50565b6116b88161151b565b81146116c357600080fd5b5056fea26469706673582212200aa14ab8e8805575cfd58e6cfe1d6c1b0addff1d4b561f44e275948fffa3e52f64736f6c63430008070033"


async function createCompany(name: string, client: Client, companyAddress: AccountId) {
  const txn = new ContractExecuteTransaction()
    .setContractId(contractID)
    .setGas(100_000)
    .setMaxTransactionFee(new Hbar(100))
    .setFunction("createCompany", new ContractFunctionParameters()
      .addString(name)
      .addAddress(companyAddress.toSolidityAddress()))
  const response = await txn.execute(client);
  const receipt = await response.getReceipt(client);
  console.log(`Company creation returns: ${receipt.status}`);
}

async function addSupplier(supplierName: string, client: Client) {
  const txn = new ContractExecuteTransaction()
    .setContractId(contractID)
    .setGas(100_000)
    .setMaxTransactionFee(new Hbar(100))
    .setFunction("addSupplier", new ContractFunctionParameters()
      .addString(supplierName));
  const response = await txn.execute(client);
  const receipt = await response.getReceipt(client);
  console.log(`Add supplier Status ${receipt.status}`);
}
async function addEmission(facilityName: string, client: Client, emissionValue: number) {
  const txn = new ContractExecuteTransaction()
    .setContractId(contractID)
    .setGas(100_000)
    .setMaxTransactionFee(new Hbar(100))
    .setFunction("addData", new ContractFunctionParameters()
      .addUint256(emissionValue)
      .addString(facilityName));
  const response = await txn.execute(client);
  const receipt = await response.getReceipt(client);
  console.log(`Add Emission Status ${receipt.status}`);
}

const abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../contracts/contractabi.json'), 'utf-8'));
abiInterface = new Interface(abi);
async function addFacility(facilityName: string, client: Client, facilityOutputs: string[]) {

  const txn = new ContractExecuteTransaction()
    .setContractId(contractID)
    .setGas(300_000)
    .setMaxTransactionFee(new Hbar(100))
    .setFunction("addFacility", new ContractFunctionParameters()
      .addString(facilityName)
      .addStringArray(facilityOutputs));
  const response = await txn.execute(client);
  const receipt = await response.getReceipt(client);
  console.log(`Add Facility Status ${receipt.status}`);
}
async function getFacility(facilityName: string, client: Client) {
  const query = new ContractExecuteTransaction()
    .setContractId(contractID)
    .setGas(300000)
    .setFunction("getFacility", new ContractFunctionParameters()
      .addString(facilityName));
  const res = await query.execute(client);

  let result = abiInterface.decodeFunctionResult('getFacility', Buffer.from((await res.getRecord(client)).contractFunctionResult.bytes));
  console.log(result);
}

async function getEmission(facilityName: string, client: Client) {
  const query = new ContractExecuteTransaction()
    .setContractId(contractID)
    .setGas(300000)
    .setFunction("getEmission", new ContractFunctionParameters()
      .addString(facilityName));
  const res = await query.execute(client);

  let result = abiInterface.decodeFunctionResult('getEmission', Buffer.from((await res.getRecord(client)).contractFunctionResult.bytes));
  console.log(result);

}

async function getCompanySuppliers(comapnName: string, client: Client) {
  const query = new ContractExecuteTransaction()
    .setContractId(contractID)
    .setGas(300000)
    .setFunction("getCompanySuppliers", new ContractFunctionParameters()
      .addString(comapnName));
  const res = await query.execute(client);
  let result = abiInterface.decodeFunctionResult('getCompanySuppliers', Buffer.from((await res.getRecord(client)).contractFunctionResult.bytes));
  console.log(result);
}
var contractID: ContractId;

async function deploycontract(client: Client) {


  const contractCreate = new ContractCreateFlow()
    .setGas(100000)
    .setBytecode(bytecode);
  const txResponse = await contractCreate.execute(client);
  const receipt = await txResponse.getReceipt(client);
  const newContractId = receipt.contractId;
  console.log(`New contract id is: ${newContractId}`);
  contractID = newContractId;


}

async function main() {

  const myAccountIdString = process.env.MY_ACCOUNT_ID;
  const myPrivateKeyString = process.env.MY_PRIVATE_KEY;

  const my_AccountID = AccountId.fromString(myAccountIdString);
  const client = Client.forTestnet();
  client.setOperator(myAccountIdString, myPrivateKeyString);


  await deploycontract(client);
  await createCompany("Abeluka", client, my_AccountID);
  await addSupplier('Baba buhari', client);
  await addFacility('OffGrid', client, ['yarn', 'cylinders']);
  await addEmission('OffGrid', client, 4432);
  await getFacility('OffGrid', client);
  await getCompanySuppliers('Abeluka', client);
  await getEmission("OffGrid", client);

};
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});