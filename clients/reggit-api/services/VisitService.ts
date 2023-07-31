/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateVisitorDTO } from '../models/CreateVisitorDTO';
import type { Visitor } from '../models/Visitor';
import type { VisitorUpdateDTO } from '../models/VisitorUpdateDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class VisitService {

    /**
     * @returns Visitor Success
     * @throws ApiError
     */
    public static getVisitors(): CancelablePromise<Array<Visitor>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Visit',
        });
    }

    /**
     * @param requestBody
     * @returns number Success
     * @throws ApiError
     */
    public static createVisitor(
        requestBody?: CreateVisitorDTO,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/Visit',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns any Success
     * @throws ApiError
     */
    public static updateVisitor(
        requestBody?: VisitorUpdateDTO,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/Visit',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @returns Visitor Success
     * @throws ApiError
     */
    public static getVisitor(
        id: number,
    ): CancelablePromise<Visitor> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Visit/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id
     * @returns any Success
     * @throws ApiError
     */
    public static deleteVisitor(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/Visit/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param requestBody
     * @returns any Success
     * @throws ApiError
     */
    public static deleteVisitors(
        requestBody?: Array<number>,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/Visit/DeleteVisitors',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
