// importando as dependências
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

// rede de teste (testnet)
const network = bitcoin.networks.testnet

// BIP84 para SegWit nativo (P2WPKH) em testnet:
// 84' = BIP84, 1' = testnet, 0' = conta 0, 0 = external, 0 = index 0
const path = `m/84'/1'/0'/0/0`

// criando o mnemonic (NUNCA use isso em mainnet pra dinheiro real!!!)
const mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

// raiz da carteira HD
const root = bip32.fromSeed(seed, network)

// derivando o nó do endereço
const node = root.derivePath(path)

// gerando endereço SegWit nativo (bech32) → deve começar com "tb1..."
const { address } = bitcoin.payments.p2wpkh({
  pubkey: node.publicKey,
  network,
})

console.log('Carteira gerada (TESTNET)')
console.log('Endereço (SegWit):', address)
console.log('Chave privada (WIF):', node.toWIF())
console.log('Seed (mnemonic):', mnemonic)
