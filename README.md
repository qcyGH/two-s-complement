# Two's complement

## Описание
Программа создана для преобразовния двоичного кода (позитивного и негативного) в обратном и дополнительном кодах.

### Работа программы
1. Добавление функции `prompt()` в консоль.    
>Иначально, поскольку программа писалась под консоль VS Code, мне пришлось добавить `prompt()` через `node-modules (npm)`. 
   
Для этого нужно написать в консоль: `npm install prompt-sync`   
И добавить следующий код: 
```js
 const prompt = require('prompt-sync')()
```
***Но для запуска в браузере, этот шаг можно пропустить.***
____
2. Ввод информации и обработка ошибок:
```js
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
```
Так выглядит фунция `isCorrect()`, которую я использую для проверки введённой информации:
```js
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
```
____
3. Главная фунция, обработка информации и вывод:
```js
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
```
***Все функции находяться в файле `main.js`, поэтому весь код дублировать не буду.***

### Пример работы
>Enter binary number: 1011010101   
>Signed number:    0000001011010101   
>Reversed number:  0000001011010101   
>Two's complement: 0000001011010101

>Enter binary number: 456gfd3   
>Number type isn`t string!   
>Try again  
>Enter binary number: fgd   
>Number type isn't string!   
>Try again   
>Enter binary number: 456   
>Number type isn't string!   
>Try again   
>Enter binary number: 101   
>Signed number:    00000101  
>Reversed number:  00000101   
>Two's complement: 00000101  
