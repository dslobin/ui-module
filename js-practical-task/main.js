'use strict';

/**
 * You must return a date that comes in a predetermined number of seconds after 01.06.2020 00:00:002020
 * @param {number} seconds
 * @returns {Date}
 *
 * @example
 *      31536000 -> 01.06.2021
 *      0 -> 01.06.2020
 *      86400 -> 02.06.2020
 */
function secondsToDate(seconds) {
    const date = new Date('2020-06-01 00:00:00');
    date.setSeconds(seconds);
    return formattedDate(date);
}

function formattedDate(date) {
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());
    const year = String(date.getFullYear());
    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }
    return `${day}.${month}.${year}`;
}

/**
 * You must create a function that returns a base 2 (binary) representation of a base 10 (decimal) string number
 * ! Numbers will always be below 1024 (not including 1024)
 * ! You are not able to use parseInt
 * @param {number} decimal
 * @return {string}
 *
 * @example
 *      5 -> "101"
 *      10 -> "1010"
 */
function toBase2Converter(decimal) {
    const numeralSystem = 2;
    return Number(decimal).toString(numeralSystem);
}

/**
 * You must create a function that takes two strings as arguments and returns the number of times the first string
 * is found in the text.
 * @param {string} substring
 * @param {string} text
 * @return {number}
 *
 * @example
 *      'a', 'test it' -> 0
 *      't', 'test it' -> 3
 *      'T', 'test it' -> 3
 */
function substringOccurrencesCounter(substring, text) {
    text += "";
    substring += "";

    if (substring.length == 0) {
        return (text.length + 1);
    }

    let repetitionsNumber = 0,
        position = 0,
        step = 1;

    text = text.toUpperCase();
    substring = substring.toUpperCase();
    while (true) {
        position = text.indexOf(substring, position);
        if (position >= 0) {
            repetitionsNumber += 1;
            position += step;
        } else {
            break;
        }
    }
    return repetitionsNumber;
}

/**
 * You must create a function that takes a string and returns a string in which each character is repeated once.
 *
 * @param {string} string
 * @return {string}
 *
 * @example
 *      "Hello" -> "HHeelloo"
 *      "Hello world" -> "HHeello  wworrldd" // o, l is repeated more then once. Space was also repeated
 */
function repeatingLitters(string) {
    const nonRepeatingChars = findNonRepeatingCharacters(string);
    let finalWord = "";
    const characters = Array.from(string);
    const repetitionsNumber = 2;
    for (const char of characters) {
        if (nonRepeatingChars.includes(char)) {
            finalWord += char.repeat(repetitionsNumber);
        } else {
            finalWord += char;
        }
    }
    return finalWord;
}

function findNonRepeatingCharacters(str) {
    const characters = [];
    for (let i = 0; i < str.length; i++) {
        let char = str[i];
        if (str.indexOf(char) == i && str.indexOf(char, i + 1) == -1) {
            characters.push(char);
        }
    }
    return characters;
}

/**
 * You must write a function redundant that takes in a string str and returns a function that returns str.
 * ! Your function should return a function, not a string.
 *
 * @param {string} str
 * @return {function}
 *
 * @example
 *      const f1 = redundant("apple")
 *      f1() ➞ "apple"
 *
 *      const f2 = redundant("pear")
 *      f2() ➞ "pear"
 *
 *      const f3 = redundant("")
 *      f3() ➞ ""
 */
function redundant(str) {
    return () => str;
}

/**
 * https://en.wikipedia.org/wiki/Tower_of_Hanoi
 *
 * @param {number} disks
 * @return {number}
 */
function towerHanoi(disks) {
    stepsToSolveHanoiTower(disks, 'A', 'B', 'C');
}

function stepsToSolveHanoiTower(height, srcPeg, destPeg, bufferPeg) {
    if (height >= 1) {
        // Move a tower of height-1 to the buffer peg, using the destination peg.
        stepsToSolveHanoiTower(height - 1, srcPeg, bufferPeg, destPeg);

        // Move the remaining disk to the destination peg.
        const moveDiskMsg = `Move disk from Tower ${srcPeg} to Tower ${destPeg}`
        console.log(moveDiskMsg);

        // Move the tower of `height-1` from the `buffer peg` to the `destination peg` using the `source peg`.        
        stepsToSolveHanoiTower(height - 1, bufferPeg, destPeg, srcPeg);
    }
    return;
}

/**
 * You must create a function that multiplies two matricies (n x n each).
 *
 * @param {array} matrix1
 * @param {array} matrix2
 * @return {array}
 *
 */
function matrixMultiplication(matrix1, matrix2) {
    let m1RowsNumber = matrix1.length,
        m1ColsNumber = matrix1[0].length,
        m2ColsNumber = matrix2[0].length,
        result = new Array(m1RowsNumber);
    for (let row = 0; row < m1RowsNumber; row++) {
        result[row] = new Array(m2ColsNumber);
        for (let column = 0; column < m2ColsNumber; column++) {
            result[row][column] = 0;
            for (let index = 0; index < m1ColsNumber; index++) {
                result[row][column] += a[row][index] * b[index][column];
            }
        }
    }
    return result;
}

/**
 * Create a gather function that accepts a string argument and returns another function.
 * The function calls should support continued chaining until order is called.
 * order should accept a number as an argument and return another function.
 * The function calls should support continued chaining until get is called.
 * get should return all of the arguments provided to the gather functions as a string in the order specified in the order functions.
 *
 * @param {string} str
 * @return {string}
 *
 * @example
 *      gather("a")("b")("c").order(0)(1)(2).get() ➞ "abc"
 *      gather("a")("b")("c").order(2)(1)(0).get() ➞ "cba"
 *      gather("e")("l")("o")("l")("!")("h").order(5)(0)(1)(3)(2)(4).get()  ➞ "hello"
 */

const EXCLAMATION_MARK = '!';

function gather(str) {
    const tempStr = [str];
    const resultStr = [];

    function getAddResult() {
        return str;
    }

    function add(newStr) {
        tempStr.push(newStr);
        return add;
    }

    function order(index) {
        const searchedStr = tempStr[index];
        if (EXCLAMATION_MARK !== searchedStr) {
            resultStr.push(searchedStr);
        }
        return order;
    }

    function getOrderResult() {
        return resultStr.join('');
    }

    add.get = getAddResult;
    add.order = order;
    order.get = getOrderResult;

    return add;
}

// console.log('Seconds to date:');
// console.log(secondsToDate(31536000));
// console.log(secondsToDate(0));
// console.log(secondsToDate(86400));

// console.log('To base 2 converter:');
// console.log(toBase2Converter(5));
// console.log(toBase2Converter(10));

// console.log('Substring occurrences counter:');
// console.log(substringOccurrencesCounter('a', 'test it'));
// console.log(substringOccurrencesCounter('t', 'test it'));
// console.log(substringOccurrencesCounter('T', 'test it'));

// console.log('Repeating litters:');
// console.log(repeatingLitters('Hello'));
// console.log(repeatingLitters('Hello world'));

// console.log('Redundant:');
// const f1 = redundant('apple');
// console.log(f1());
// const f2 = redundant('pear');
// console.log(f2());
// const f3 = redundant('');
// console.log(f3());

// console.log('Tower Hanoi:');
// console.log('Hanoi with 2 disks');
// towerHanoi(2);
// console.log('Hanoi with 3 disks');
// towerHanoi(3);

// console.log('Matrix multiplication:');
/**
 * c11 = a11·b11 + a12·b21 = 4·3 + 2·(-3) = 12 - 6 = 6
 *
 * c12 = a11·b12 + a12·b22 = 4·1 + 2·4 = 4 + 8 = 12
 *
 * c21 = a21·b11 + a22·b21 = 9·3 + 0·(-3) = 27 + 0 = 27
 *
 * c22 = a21·b12 + a22·b22 = 9·1 + 0·4 = 9 + 0 = 9
 */
// let a = [
//         [4, 7, 5],
//         [6, 4, 6],
//         [5, 7, 4]
//     ],
//     b = [
//         [3, 2, 3],
//         [9, 2, 8],
//         [4, 8, 1]
//     ];
// console.log(matrixMultiplication(a, b));

// console.log('Gather:');
// console.log(
//     gather('a')('b')('c')
//     .order(0)(1)(2)
//     .get()
// );

// console.log(
//     gather('a')('b')('c')
//     .order(2)(1)(0)
//     .get()
// );

// console.log(
//     gather('e')('l')('o')('l')('!')('h')
//     .order(5)(0)(1)(3)(2)(4)
//     .get()
// );
