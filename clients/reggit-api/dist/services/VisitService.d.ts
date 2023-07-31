import type { CreateVisitorDTO } from '../models/CreateVisitorDTO';
import type { Visitor } from '../models/Visitor';
import type { VisitorUpdateDTO } from '../models/VisitorUpdateDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class VisitService {
    /**
     * @returns Visitor Success
     * @throws ApiError
     */
    static getVisitors(): CancelablePromise<Array<Visitor>>;
    /**
     * @param requestBody
     * @returns number Success
     * @throws ApiError
     */
    static createVisitor(requestBody?: CreateVisitorDTO): CancelablePromise<number>;
    /**
     * @param requestBody
     * @returns any Success
     * @throws ApiError
     */
    static updateVisitor(requestBody?: VisitorUpdateDTO): CancelablePromise<any>;
    /**
     * @param id
     * @returns Visitor Success
     * @throws ApiError
     */
    static getVisitor(id: number): CancelablePromise<Visitor>;
    /**
     * @param id
     * @returns any Success
     * @throws ApiError
     */
    static deleteVisitor(id: number): CancelablePromise<any>;
    /**
     * @param requestBody
     * @returns any Success
     * @throws ApiError
     */
    static deleteVisitors(requestBody?: Array<number>): CancelablePromise<any>;
}
