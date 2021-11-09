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
 * @interface GoogleLogin
 */
export interface GoogleLogin {
    /**
     * 
     * @type {string}
     * @memberof GoogleLogin
     */
    accessToken?: string;
    /**
     * 
     * @type {string}
     * @memberof GoogleLogin
     */
    code?: string;
    /**
     * 
     * @type {string}
     * @memberof GoogleLogin
     */
    idToken?: string;
}

export function GoogleLoginFromJSON(json: any): GoogleLogin {
    return GoogleLoginFromJSONTyped(json, false);
}

export function GoogleLoginFromJSONTyped(json: any, ignoreDiscriminator: boolean): GoogleLogin {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'accessToken': !exists(json, 'access_token') ? undefined : json['access_token'],
        'code': !exists(json, 'code') ? undefined : json['code'],
        'idToken': !exists(json, 'id_token') ? undefined : json['id_token'],
    };
}

export function GoogleLoginToJSON(value?: GoogleLogin | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'access_token': value.accessToken,
        'code': value.code,
        'id_token': value.idToken,
    };
}
