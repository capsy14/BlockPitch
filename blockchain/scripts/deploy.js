const hre = require("hardhat");

async function main() {
  // Replace with the actual name of the contract in your investingDetails.sol
  const ContractFactory = await hre.ethers.getContractFactory("StartupInvestment");

  console.log("Deploying contract...");
  const contract = await ContractFactory.deploy();

  await contract.deployed();

  console.log("✅ Contract deployed at:", contract.address);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
