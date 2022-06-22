import {ethers} from "hardhat";
import {task} from "hardhat/config";

task("transferFrom", "Transfer tokens from one member to another")
    .addParam('token', "Token address")
    .addParam('from', "Sender address")
    .addParam('to', "Reciever address")
    .addParam('value', "Amount")
    .setAction(async (taskArgs) => {
        const contract = await ethers.getContractFactory('Beerhound');
        const token = contract.attach(taskArgs.token);
        await token.transferFrom(taskArgs.from, taskArgs.to, taskArgs.value);
        console.log("TransferFrom task finished");
    });