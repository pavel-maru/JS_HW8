// 2. Не выполняя кода, ответить, что выведет браузер и почему:


// a
if (!("a" in window)) {
    var a = 1;
}
alert(a);
// Браузер выведет "undefined". 
// Несмотря на то, что переменная а объявляется внутри тела if, объявление var (в отличие от let) 
// находится в глобальной области видимости, и интерпретатор JS "видит" его. Однако присвоение 
// переменной а значения должно происходить внутри тела if. Поскольку условие в if означает: 
// "если переменной а нет", то оно никогда не выполняется, инициализации переменной а (а = 1) 
// не происходит и значение а остаётся неопределённым (undefined).


// b
var b = function a(x) {
    x && a(--x);
};
alert(a);
// По идее код должен выводить описание функции (так утверждают компетентные источники))), 
// однако мой Хром упорно не выводит ничего. Вот когда я убираю первые несколько символов ('var b = '),
// и оставляю просто объявление функции а, тогда получается нужный результат, и в окне alert выводится: 
// function a(x) {
//     x && a(--x)
// }
// Данный результат объясняется тем, что на вывод передвётся просто имя функции, без её вызова 
// (с аргументом в скобках). Однако же, когда я пытаюсь вызвать саму функцию, вставив подходящий аргумент 
// (скажем, 2: a(2)), выводится undefined. Результат обусловлен тем, что в описании функции отсутствует 
// return, т.е. функция не возвращает ничего, несмотря на мудрёные вычислительные процессы внутри неё. 
// Поставил return в нужном месте: выводит 0 при любом положительном значении аргумента. 
// Данный результат я пока не осмыслил: в теле функции присутствует рекурсивный вызов, но отсутствует
// базовый случай (условие остановки; т.е. по идее рекурсивные вызовы должны идти бесконечно). Однако 
// интерпретатор  справляется с задачей, не задумываясь. Видимо, в нём есть на этот случай специальные механизмы))
// Задачка заинтересовала, попробую протестировать на Питоне)
// Протестировал на Питоне. Результат аналогичный. 


// c
function a(x) {
    return x * 2;
}
var a;
alert(a);
// Аналогично предыдущему примеру, выводится описание функции. Из двух команд, объявление а функцией и переменной, 
// интерпретатор отдаёт предпочтение функции, т.к. эта декларация имеет более высокий приоритет. 
// Если функцию убрать и оставить только объявление переменной, то в окне предупреждений выведется 
// значение переменной а: undefined, как в первом примере. 


// d
function b(x, y, a) {
    arguments[2] = 10;
    alert(a);
}
b(1, 2, 3);
// При вызове функции b ей передаются аргументы (1, 2, 3), таким образом, аргумент а функции b получает 
// значение 3. Однако при дальнейшем выполнении кода аргументу с индексом [2] (а это и есть а) 
// присваивается значение 10. После чего в окне браузера выводится число 10. 


// e
function a() {
    alert(this);
}
a.call(null);

// Браузер выводит сообщение [object Window]. 
// Поскольку мне сложно описать работу данного кода своими словами, прибегну к Гугл-переводу 
// найденной Гуглом же статьи: "Стандарт ECMA - 262 (3 - е издание) описывает, что должно произойти, 
// если null передаётся в качестве первого аргумента call():
// 
// Если thisArg имеет значение null или undefined, 
// вызываемой функции передаётся 
// глобальный объект как значение this. 
// В противном случае вызываемой функции передаётся 
// ToObject(thisArg) как значение this."
// 
// Я попробовал вставлять вместо null другие значения: 1 (выводится 1); 0 (выводится 0);
// а (выводится тело функции а); 'a' (выводится а). Разобрался, что означает фраза 
// "В противном случае вызываемой функции передаётся ToObject(thisArg) как значение this."
