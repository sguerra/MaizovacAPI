/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface APIOperation {
    $schema?: 'api:operation';
    parameters: SingleOperation | BinaryOperation | RandomStringOperation;
}
export interface SingleOperation {
    operand: number;
    [k: string]: unknown;
}
export interface BinaryOperation {
    firstOperand: number;
    secondOperand: number;
    [k: string]: unknown;
}
export interface RandomStringOperation {
    length: number;
    digits: boolean;
    upperAlphabetic: boolean;
    lowerAlphabetic: boolean;
    unique: boolean;
    [k: string]: unknown;
}
