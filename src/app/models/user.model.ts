// export class User {

//     constructor(
//         public _id?: string,
//         public name: string,
//         public balance: number,
//         public transactions: Array<object>
//     ) { }
// }

export interface User {
    _id: string,
    name: string,
    balance: number,
    transactions: Array<object>
}