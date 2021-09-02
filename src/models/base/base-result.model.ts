export interface BaseResult<T> {
    [x: string]: any;
    data: T
}