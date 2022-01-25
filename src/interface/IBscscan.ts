export interface IBscscan {
    action: string,
    contractAddress?: string,
    address: string,
    apikey: string,
    page: Number
}

export interface IBscscanTokenSupply {
    contractAddress: string,
}