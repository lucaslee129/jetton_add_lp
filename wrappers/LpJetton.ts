import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type LpJettonConfig = {};

export function lpJettonConfigToCell(config: LpJettonConfig): Cell {
    return beginCell().endCell();
}

export class LpJetton implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new LpJetton(address);
    }

    static createFromConfig(config: LpJettonConfig, code: Cell, workchain = 0) {
        const data = lpJettonConfigToCell(config);
        const init = { code, data };
        return new LpJetton(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
