interface IWallet {
    name: string,
    typeAccount: number, // 1 Personal Wallet, 2 Contract Wallet Game
    addressWallet: string,
    visibility: number,
}

export default IWallet