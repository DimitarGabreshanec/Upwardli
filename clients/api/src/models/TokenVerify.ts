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
/**
 * 
 * @export
 * @interface TokenVerify
 */
export interface TokenVerify {
    /**
     * 
     * @type {string}
     * @memberof TokenVerify
     */
    token: string;
}

export function TokenVerifyFromJSON(json: any): TokenVerify {
    return TokenVerifyFromJSONTyped(json, false);
}

export function TokenVerifyFromJSONTyped(json: any, ignoreDiscriminator: boolean): TokenVerify {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'token': json['token'],
    };
}

export function TokenVerifyToJSON(value?: TokenVerify | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'token': value.token,
    };
}

