
function add(a: number, b: number): number {
    return a + b;
}


function show(message: string): void {
    console.log(`Message: ${message}`);
}


function isPositive(number: number): boolean {
    return number > 0;
    }



let num1: number = 25;
let num2: number = 25;
let sum: number = add(num1, num2);
show(`TThe sum is: " ${sum}`);

let checkNumber: number = -5;
if (isPositive(checkNumber)) {
    show("The number is positive.");
} else {
    show("The number is not positive.");
}
