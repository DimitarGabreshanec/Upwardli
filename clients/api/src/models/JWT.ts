/* tslint:disable */
/* eslint-disable */
/**
 * 
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    JWTUser,
    JWTUserFromJSON,
    JWTUserFromJSONTyped,
    JWTUserToJSON,
} from './';

/**
 * 
 * @export
 * @interface JWT
 */
export interface JWT {
    /**
     * 
     * @type {string}
     * @memberof JWT
     */
    accessToken: string;
    /**
     * 
     * @type {string}
     * @memberof JWT
     */
    refreshToken: string;
    /**
     * 
     * @type {JWTUser}
     * @memberof JWT
     */
    user: JWTUser;
}

export function JWTFromJSON(json: any): JWT {
    return JWTFromJSONTyped(json, false);
}

export function JWTFromJSONTyped(json: any, ignoreDiscriminator: boolean): JWT {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'accessToken': json['access_token'],
        'refreshToken': json['refresh_token'],
        'user': JWTUserFromJSON(json['user']),
    };
}

export function JWTToJSON(value?: JWT | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'access_token': value.accessToken,
        'refresh_token': value.refreshToken,
        'user': JWTUserToJSON(value.user),
    };
}

