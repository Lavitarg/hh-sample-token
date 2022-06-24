import {task} from "hardhat/config";

task("transfer", "Transfer tokens to given address")
    .addParam('token', "Token address")
    .addParam('to', "Reciever address")
    .addParam('value', "Amount")
    .setAction(async ({taskArgs}, {ethers}) => {
        const contract = await ethers.getContractFactory('Beerhound');
        const token = contract.attach(taskArgs.token);
        await token.transfer(taskArgs.to, taskArgs.value);
        console.log("Transfer task finished");
    });