import {task} from "hardhat/config";

task("approve", "Transfer tokens to given address")
    .addParam('token', "Token address")
    .addParam('spender', "Spender address")
    .addParam('value', "Amount")
    .setAction(async (taskArgs, {ethers}) => {
        const contract = await ethers.getContractFactory('Beerhound');
        const token = contract.attach(taskArgs.token);
        await token.approve(taskArgs.to, taskArgs.value);
        console.log("Approve task finished");
    });