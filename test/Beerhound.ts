import { expect } from "chai";
import { ethers } from "hardhat";

describe("Token contract", function () {

    let Token;
    let contract;
    let owner;
    let addr1;
    let addr2;
    let addrs;
    let ownerAddress;
    let addr1Address;


    beforeEach(async function () {
        Token = await ethers.getContractFactory("Beerhound");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        ownerAddress = owner.address;
        addr1Address = addr1.address;
        // To deploy our contract, we just have to call Token.deploy() and await
        // for it to be deployed(), which happens once its transaction has been
        // mined.
        contract = await Token.deploy();
    });

    // You can nest describe calls to create subsections.
    describe("Deployment", function () {
        // `it` is another Mocha function. This is the one you use to define your
        // tests. It receives the test name, and a callback function.

        // If the callback function is async, Mocha will `await` it.
        it("Should set the right owner", async function () {
            // Expect receives a value, and wraps it in an Assertion object. These
            // objects have a lot of utility methods to assert values.

            // This test expects the owner variable stored in the contract to be equal
            // to our Signer's owner.
            expect(await contract.owner()).to.equal(owner.address);
        });

        it("Should assign the total supply of tokens to the owner", async function () {
            const ownerBalance = await contract.balanceOf(owner.address);
            expect(await contract.totalSupply()).to.equal(ownerBalance);
        });
    });

    describe("Transactions", function () {
        it("Should transfer tokens between accounts", async function () {
            // Transfer 50 tokens from owner to addr1
            await contract.transfer(addr1.address, 50);
            const addr1Balance = await contract.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(50);

            // Transfer 50 tokens from addr1 to addr2
            // We use .connect(signer) to send a transaction from another account
            await contract.connect(addr1).transfer(addr2.address, 50);
            const addr2Balance = await contract.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(50);
        });

        it("Should fail if sender doesn???t have enough tokens", async function () {
            const initialOwnerBalance = await contract.balanceOf(owner.address);

            // Try to send 1 token from addr1 (0 tokens) to owner (1000000 tokens).
            // `require` will evaluate false and revert the transaction.
            await expect(
                contract.connect(addr1).transfer(owner.address, 1)
            ).to.be.revertedWith("Not enough tokens");

            // Owner balance shouldn't have changed.
            expect(await contract.balanceOf(owner.address)).to.equal(
                initialOwnerBalance
            );
        });

        it("Should update balances after transfers", async function () {
            const initialOwnerBalance = await contract.balanceOf(owner.address);

            // Transfer 100 tokens from owner to addr1.
            await contract.transfer(addr1.address, 100);

            // Transfer another 50 tokens from owner to addr2.
            await contract.transfer(addr2.address, 50);

            // Check balances.
            const finalOwnerBalance = await contract.balanceOf(owner.address);
            expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(150));

            const addr1Balance = await contract.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(100);

            const addr2Balance = await contract.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(50);
        });

        it("Should update allowances for user", async function (){
            const initialBalance = await contract.allowance(ownerAddress, addr1Address);
            expect(initialBalance).to.equal(0);

            let isApproved = await contract.approve(addr1Address, 100);
            // expect(isApproved).to.equal(true);

            const updatedBalance = await contract.allowance(ownerAddress, addr1Address);
            expect(updatedBalance).to.equal(100);

        });

        it("Should decrease allowances after successful transferFrom call", async function(){
            await contract.transfer(addr1Address, 100);
            await contract.connect(addr1).approve(ownerAddress, 100);
            console.log("approved:" + await contract.connect(ownerAddress).allowance(addr1Address, ownerAddress));
            await contract.connect(owner).transferFrom(addr1Address, addr2.address, 50);
            const updatedBalance = await contract.allowance(addr1Address, ownerAddress);
            expect(updatedBalance).to.equal(50);
        });
    });
});