import { Result } from "./Result";

export class SuccessDataResult<T> extends Result {
    data :T
    constructor(data:T){
        super(true, `data fetched`)
        this.data = data
    }
}