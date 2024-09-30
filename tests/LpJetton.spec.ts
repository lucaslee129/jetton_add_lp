import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { LpJetton } from '../wrappers/LpJetton';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('LpJetton', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('LpJetton');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let lpJetton: SandboxContract<LpJetton>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        lpJetton = blockchain.openContract(LpJetton.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await lpJetton.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: lpJetton.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and lpJetton are ready to use
    });
});
