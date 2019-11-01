export{}

declare global {

    export interface Array<T> {
        isEmpty: boolean;
        isNotEmpty: boolean;
        firstElement: T;
        lastElement: T;
    }
}
