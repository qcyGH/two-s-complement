const isCorrect = (number) => {
    const alphabet = {
        '0': 0,
        '1': 1,
        '-': '-'
    }
    const numberLength = number.length
    let correct = 0
    //проходимся по каждому елементу number и считаем кол-во правильных символов
    for (let symbol of number) {
        correct = (symbol in alphabet) ? correct + 1 : correct
    }
    if (correct === numberLength && numberLength <= 64) {
        return true
    } else {
        return false
    }
}

const signedNumber = (number) => {
    let binLength
    //задаём длину прямого числа взависимости от его изначальной длинны
    if (numberLength < 8) {
        binLength = 8
    } else if (numberLength < 16) {
        binLength = 16
    } else if (numberLength < 32) {
        binLength = 32
    } else if (numberLength < 64) {
        binLength = 64
    }
    //добавляем немоюходимое кол-во нулей
    number = '0'.repeat(binLength - numberLength - 1) + number
    //добавляем ноль или еденицу взависимости от разряда числа
    number = isPositive ? '0' + number : '1' + number
    return number
};

const reversedNumber = (number) => {
    // преврящаем number в массив
    let numberArray = [...number]
    // обнуляем переменную number
    number = ''
    // пересобераем number с интертированными значениями
    for (let symbol of numberArray) {
        symbol === '1' ? symbol = '0' : symbol = '1'
        number =  number + symbol
    }
    return number
}

const twosComplement = (number) => {
    // находим в какой позиции находиться ноль с конца
    let zeroIndex = number.lastIndexOf('0')
    numberLength = number.length
    if (zeroIndex === numberLength-1) {
        // если ноль находится начале конца, то заменяем его на еденицу
        number = number.slice(0, numberLength-1) + '1'
    } else {
        // в ином случае, обрезаем число до первого нуля, добавяем еденицу и заполняем оставшееся пространство нулями
        number = number.slice(0, zeroIndex) + '1' + '0'.repeat((numberLength-1) - zeroIndex)
    }
    return number
}
//? const signedNumber = (number) => {
//?    let binLength
//?     if (numberLength <= 8) {
//?         binLength = 8
//?     } else if (numberLength >= 8 && numberLength <= 16) {
//?         binLength = 16
//?     }
//?     number = (numberLength === binLength) ? number : '0'.repeat(binLength - numberLength - 1) + number
//?     number = isPositive ? '0' + number : '1' + number
//?     return number
//? };

const main = (number) => {
    signNumber = signedNumber(number)
    // для позитивного числа, прямое число есть конечным ответом
    if (isPositive) {
        let revNumber = comNumber = signNumber
        console.log('Signed number:   ', signNumber + '\n' +
                    'Reversed number: ', revNumber + '\n' +
                    "Two's complement:", comNumber)
    } else {
        let revNumber = reversedNumber(signNumber)
        comNumber = twosComplement(revNumber)
        console.log('Signed number:   ', '-' + signNumber + '\n' +
                    'Reversed number: ', '-' + revNumber + '\n' +
                    "Two's complement:", '-' + comNumber)
    }
}

// добавляем функцию prompt в консоль с помощью node_modules
const prompt = require('prompt-sync')()
do {
    number = prompt('Enter binary number: ')
    if (!isCorrect(number)) {
        console.log('Number type isn`t string! \nTry again')
    }
} while (!isCorrect(number));
let signNumber
let comNumber
let numberLength = number.length
let isPositive = true

//обработка ошибок и вызов main функции
if (typeof(number) == 'string') {
    if (!isCorrect(number)) {
        console.log('Incorrect number!')
    } else {
        if (number.search('-') !== -1) {
            isPositive = false
            numberLength -= 1
            number = number.slice(1)
            main(number)
        } else {
            main(number)
        }
    }
} else {
    console.log('Number type isn`t string! \nTry again')
}