# Create-Wallet
# 🔐 Gerador de Carteira Bitcoin (Testnet)

Este projeto é um script em **Node.js** que gera uma carteira Bitcoin na **testnet** (rede de testes), usando padrões modernos de derivação (BIP39 + BIP32 + BIP84).

Ele faz:

- Geração de **frase mnemônica (seed)** com `bip39`
- Conversão da mnemônica em **seed binária**
- Criação de uma **carteira HD (Hierarchical Deterministic)** com `bip32`
- Derivação de um endereço **SegWit nativo (P2WPKH)** em **testnet** (formato `tb1...`)
- Exibição da:
  - **seed (mnemônica)**
  - **chave privada em WIF**
  - **endereço Bitcoin de testnet**

> ⚠️ Este projeto é para **fins de estudo** na **testnet**.  
> Não use este código, como está, para guardar valores reais em mainnet.

---

## O que mudou em relação ao código original

O código original:
- Usava um caminho de derivação inconsistente com o tipo de endereço:
  - `m/49'/1'/0'/0` (BIP49 → P2WPKH-in-P2SH)
  - Mas gerava endereço com `p2pkh` (legado)

O endereço gerado começava com `m...` (P2PKH de testnet).  
Apesar de válido na teoria, alguns **faucets de testnet** não aceitam esse formato e reclamam com erro do tipo:

> `"mtpAFJgeT5aAhm3SWHmHnP2u6PqeW2PYCC" is not a valid bitcoin testnet address`

### ✅ Solução adotada

- Migramos para **BIP84** (SegWit nativo) em testnet:
  ```js
  const path = `m/84'/1'/0'/0/0`
  
Passamos a gerar endereços P2WPKH (bech32) com:
bitcoin.payments.p2wpkh({ pubkey: node.publicKey, network })
Resultado: endereços no formato:
tb1qxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
que são aceitos normalmente pelos faucets de Bitcoin testnet.

Usamos o site: https://mempool.space/testnet para conferir a carteira criada
https://bitcoinfaucet.uo1.net/ para enviar Bitcoin testnet para a carteira
E o Electron para fazer as transações de envio para outra carteira gerada.
