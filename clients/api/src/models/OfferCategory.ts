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
 * @interface OfferCategory
 */
export interface OfferCategory {
    /**
     * Offer category.
     * @type {string}
     * @memberof OfferCategory
     */
    name: string;
    /**
     * Used by the clients to lookup specific offers.
     * @type {string}
     * @memberof OfferCategory
     */
    slug: string;
    /**
     * 
     * @type {string}
     * @memberof OfferCategory
     */
    readonly url?: string;
}

export function OfferCategoryFromJSON(json: any): OfferCategory {
    return OfferCategoryFromJSONTyped(json, false);
}

export function OfferCategoryFromJSONTyped(json: any, ignoreDiscriminator: boolean): OfferCategory {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'slug': json['slug'],
        'url': !exists(json, 'url') ? undefined : json['url'],
    };
}

export function OfferCategoryToJSON(value?: OfferCategory | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'slug': value.slug,
    };
}

