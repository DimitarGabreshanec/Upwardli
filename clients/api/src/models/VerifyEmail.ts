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
 * @interface VerifyEmail
 */
export interface VerifyEmail {
    /**
     * 
     * @type {string}
     * @memberof VerifyEmail
     */
    key: string;
}

export function VerifyEmailFromJSON(json: any): VerifyEmail {
    return VerifyEmailFromJSONTyped(json, false);
}

export function VerifyEmailFromJSONTyped(json: any, ignoreDiscriminator: boolean): VerifyEmail {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'key': json['key'],
    };
}

export function VerifyEmailToJSON(value?: VerifyEmail | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'key': value.key,
    };
}

