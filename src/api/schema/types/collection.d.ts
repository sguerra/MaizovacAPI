/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface APICollection {
    $schema: 'api:collection';
    items: (APIService | APIUser | APIRole | APIRecord | APIBalance)[];
}
export interface APIService {
    $schema?: 'api:service';
    uuid?: string;
    type:
        | 'addition'
        | 'subtraction'
        | 'multiplication'
        | 'division'
        | 'square_root'
        | 'random_string';
    cost?: number;
    status?: 'active' | 'beta' | 'inactive';
}
export interface APIUser {
    $schema?: 'api:user';
    uuid?: string;
    username: string;
    role?: 'user' | 'admin';
    status?: 'active' | 'trial' | 'inactive';
}
export interface APIRole {
    $schema: 'api:role';
    uuid: string;
}
export interface APIRecord {
    $schema?: 'api:record';
    uuid?: string;
    Service?: {
        [k: string]: unknown;
    };
    User?: {
        [k: string]: unknown;
    };
    cost?: number;
    balance?: number;
    response?: string;
    date?: string;
}
export interface APIBalance {
    $schema?: 'api:balance';
    User: {
        [k: string]: unknown;
    };
    balance: number;
}
