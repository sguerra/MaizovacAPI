import {
    SingleOperation,
    BinaryOperation
} from '../../api/schema/types/operation';

const OperationService = {
    addition({ firstOperand, secondOperand }: BinaryOperation): number {
        return Number(firstOperand) + Number(secondOperand);
    },
    substraction({ firstOperand, secondOperand }: BinaryOperation): number {
        return Number(firstOperand) - Number(secondOperand);
    },
    multiplication({ firstOperand, secondOperand }: BinaryOperation): number {
        return Number(firstOperand) * Number(secondOperand);
    },
    division({ firstOperand, secondOperand }: BinaryOperation): number {
        if (Number(secondOperand) === 0) {
            throw new Error('Division by zero is not allowed');
        }

        return Number(firstOperand) / Number(secondOperand);
    },
    squareRoot({ operand }: SingleOperation): number {
        if (operand === undefined) {
            throw new Error(
                'Square root operation is missing required property: /parameters/operand'
            );
        }
        if (operand < 0) {
            throw new Error(
                'Square root operation property /parameters/operand cannot be a negative number'
            );
        }
        return Math.sqrt(Number(operand));
    }
};

export default OperationService;
