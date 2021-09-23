export const ABOUT_NOTABLE_STATISTICS_SECTION_KEY =
  "sections.notable-statistics";
export const ABOUT_NOTABLE_STATISTICS_SECTION_DATA = {
  id: 12348,
  __component: ABOUT_NOTABLE_STATISTICS_SECTION_KEY,
  imageBackground: {
    id: 123481,
    url: "https://bholdus.s3.ap-southeast-1.amazonaws.com/bholdus-web/notable_statistic_bg_025ef9093b.png",
    alternativeText: "notable-statistics-bg",
    width: 1680,
    height: 725,
  },
  imageContent: {
    id: 123482,
    url: "https://bholdus.s3.ap-southeast-1.amazonaws.com/bholdus-web/notable_statistic_2_min_e6537adacd.png",
    alternativeText: "notable-statistics-content",
    width: 1680,
    height: 725,
  },
  enable: true,
};

export const ABOUT_TOKEN_SECTION_KEY = "sections.about-token";
export const ABOUT_TOKEN_SECTION_DATA = {
  id: 12345,
  __component: ABOUT_TOKEN_SECTION_KEY,
  imageBackground: {
    id: 12345,
    url: "https://bholdus.s3.ap-southeast-1.amazonaws.com/bholdus-web/about_token_0352f98613.png",
    alternativeText: "about-token-bg",
    width: 1044,
    height: 692,
  },

  title: "About Token",
  enable: true,
};

export const ABOUT_DISTRIBUTION_SECTION_KEY = "sections.token-distribution";
export const ABOUT_DISTRIBUTION_SECTION_DATA = {
  id: 12346,
  __component: ABOUT_DISTRIBUTION_SECTION_KEY,
  imageBackground: {
    id: 12346,
    url: "https://bholdus.s3.ap-southeast-1.amazonaws.com/bholdus-web/token_distribution_be944c01f7.png",
    alternativeText: "about-distribution-bg",
    width: 821,
    height: 723,
  },
  smallTitle: "OUR DATA",
  title: "Token Distribution",
  enable: true,
};

export const ABOUT_FAQ_SECTION_KEY = "sections.faq-section";
export const ABOUT_FAQ_SECTION_DATA = {
  id: 12347,
  __component: ABOUT_FAQ_SECTION_KEY,
  imageBackground: null,
  questions: [
    {
      id: 123471,
      question: "What is BHOLDUS, BHOLDUS Multi-chain Network, BHO?",
      answers: [
        `BHOLDUS multi-chain is an interoperable blockchain network where we can issue the 1:1 synthetic assets on different chains such as BHOLDUS itself and Binance Smart Chain, Ethereum, etc… BHOLDUS multi-chain network also acts as a hybrid model to accelerate open finance, allowing its users to record their digital assets on-chain with NFT. The BHOLDUS Multi-chain network features its native token (BHO), Black Hole Pools, BHoldus hot wallet and other partnership projects building on top.   BHO is a native token of Bholdus chain, which is issued on different platforms such as Binance Smart Chain, Ethereum, etc.. BHO acts as a digital asset that stores values, generates yield (interest) and provides access to an open lending network. In addition, it represents its owner’s voting rights over economic factors (i.e. inflation and deflation rates)`,
      ],
    },
    {
      id: 123472,
      question:
        "What is an interoperable blockchain network? How BHOLDUS can be “interoperable” with Bitcoin, Ethereum, Polkadot?",
      answers: [
        `Through the Bholdus staking algorithm, investors will have the privilege and priority in capturing attractive yields and participate in the BHoldus ecosystem, which interconnects with other blockchain networks in the market such as Binance, Ethereum, Bitcoin, Polkadot, amongst others.`,
        `There is a decentralised wallet where users will keep their own private keys having access, check balance and exchange and do other token services in Bholdus Wallet.  									`,
      ],
    },
    {
      id: 123473,
      question:
        "How do users store Bholdus coins on hot wallets? What are the main parts of Bholdus wallet?",
      answers: [
        `- Multisig Accounts: in some other blockchain networks, multisig works in a way that multiple keys must be used to sign a single transaction off-chain before submitting the transaction on-chain. BHoldus multisig accounts follow a different approach: an account ID which is used to uniquely identify an account (it can either be the public key corresponding to a private key or simply a 32-byte number) is generated based on a pre-processed set of information including the individual accounts involved in the multisig and the requisite threshold needed to dispatch from the generated account.`,
        `- The created account intuitively does not have a corresponding private key. So in order to authorize a transaction originating from the newly created account, the members of the multisig “must mutually agree” on the function that the multisig account will make. By leveraging hash functions, such process follows a manner where only one account needs to submit a transaction on-chain with the actual function while other members submit the hash of that function without submitting the same transaction again. By doing this, the space occupied on the chain could significantly reduce.`,
        `- Proxy Accounts: by introducing a new concept, proxy account, multisig address now has the ability to delegate authority to another account. This means, a proxy account can give some privileges from one account to another to make function calls on its behalf. The given authorities can be specific and tailored depending on the use cases. The functions dispatched are then marked with origin being the proxied account after the chain verifies that the proxy has the right to make the function calls. To achieve a higher security level, a time delay is added to the proxy where the actual function call only happens after the time delay is over. Prior to the delay, the proxied account’s owner can optionally reject the function call by submitting a transaction before the time delay is over.`,
        `- Derivative Accounts: each account can have its own set of derivative accounts. Again, by leveraging hash functions, a derivative account ID can be created based on the combination of calling account ID, derivative account index and some other special information such as derivative prefix. Deposit address for each new user can then be generated for effective and clear accounting. To access the funds of these accounts, proxy accounts come into play.`,
      ],
    },
    {
      id: 123474,
      question: "How NFTs works on BHOLDUS Network? ",
      answers: [
        `Bholdus uses NFTs to represent real-world, digital assets and evidence for creditworthiness, including but not limited to artworks, real estate, audited financial statements, invoices or audited mortgages, property rights, etc.`,
        `Bholdus can help issue different digital assets which are NFTs in Bholdus chain. Each NFTs token will be a unique identity.`,
      ],
    },
    {
      id: 123475,
      question: "How to tokenize my assets via BHOLDUS Network?",
      answers: [
        `As an asset originator, an user may lock an NFT representing a “Real World Asset” into a set of smart contracts as collateral. The NFT is minted based on audited documents created and shared via the BHO BHoldus blockchain network. Auditing providers will determine the structure of these financing offers through an on-chain “Pricing Oracles.” Upon repayment, the NFT is unlocked and transferred back into the Asset Originator’s wallet.`,
      ],
    },
  ],
  smallTitle: "FAQ",
  title: "Frequency Asked Questions",
  enable: true,
};
