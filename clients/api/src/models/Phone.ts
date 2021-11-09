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
 * @interface Phone
 */
export interface Phone {
    /**
     * 
     * @type {number}
     * @memberof Phone
     */
    readonly id?: number;
    /**
     * 
     * @type {string}
     * @memberof Phone
     */
    phone: string;
}

export function PhoneFromJSON(json: any): Phone {
    return PhoneFromJSONTyped(json, false);
}

export function PhoneFromJSONTyped(json: any, ignoreDiscriminator: boolean): Phone {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'phone': json['phone'],
    };
}

export function PhoneToJSON(value?: Phone | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'phone': value.phone,
    };
}
