import { toNano } from '@ton/core';
import { LpJetton } from '../wrappers/LpJetton';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const lpJetton = provider.open(LpJetton.createFromConfig({}, await compile('LpJetton')));

    await lpJetton.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(lpJetton.address);

    // run methods on `lpJetton`
}
