/*
对象的扩展
*/

//属性简写
var foo = 'bar';
var baz = {foo};	//等同于var baz = {foo:foo}

function f(x,y){	//function f(x,y){return {x:x,y:y}
	return {x,y}
}

//方法简写
var o = {			//var o = {method:function(){return 'Hello!'}}
	method(){
		return 'Hello!';
	}
}

var birth = '2000/01/01';
var Person = {
	name:'张三',
	birth,
	hello(){
		//console.log('my name is', this.name);
	}

}

function getPoint(){
	var x = 1;
	var y = 10;
	return {x,y}
}

var ms = {}

function getItem(key){
	return key in ms ? ms[key] : null;
}

function setItem(key, value){
	ms[key] = value;
}

function clear(){
	ms = {}
}

//module.exports = {getItem, setItem, clear};
var cart = {
	_wheels:4,
	get wheel(){
		return this._wheels;
	},
	set wheels(value){
		if(value<this._wheels){
			throw new Error('数值太小了！');
		}
		this._wheels = value;
	}
}

/*var obj = {
	class(){}
}

var obj = {
	* m(){
		yield 'hello world';
	}
}*/

//属性名表达式
let propKey = 'foo';
let obj = {
	[propKey]:true,
	['a'+'bc']:123
}

var lastWord = 'last world';
var a = {
	'first world':'hello',
	[lastWord]:'world'
}

let obj1 = {
	['h'+'ello'](){
		return 'hi';
	}
}


const keyA = {a:1}
const keyB = {b:2}
const myObject = {
	[keyA]:'valueA',
	[keyB]:'valueB'
}

//方法的name属性
const person = {
	sayName(){
		//console.log('hello!');
	}
}

const obj2 = {
	get foo(){},
	set foo(x){}
}

const descriptor = Object.getOwnPropertyDescriptor(obj2, 'foo');

(new Function()).name;

var doSomething = function(){

}
doSomething.bind().name;

const key1 = Symbol('description');
const key2 = Symbol();
let obj3 = {
	[key1](){},
	[key2](){},
}

//Object.is() 用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致
Object.is('foo', 'foo');
Object.is({}, {})
//不同之处：
//console.log(+0 === -0);
//console.log(NaN === NaN);

//console.log(Object.is(+0,-0));
//console.log(Object.is(NaN, NaN));

Object.defineProperty(Object, 'is', {
	value:function(x,y){
		if(x===y){
			//针对+0不等于-0的情况
			return x !== 0 || 1/x === 1/y;
		}
		//针对NaN的情况
		return x !== x && y !== y;
	},
	configurable:true,
	enumerable:false,
	writable:true
});

//Object.assign();方法用于对象的合并，将源对象（source）的所有可枚举属性，
//复制到目标对象target（浅复制）
var target = {a:1, b:1}
var source1 = {b:2, c:2}
var source2 = {c:3}
//如果该参数不是对象、则会先转成对象、然后返回，undefined和null无法转成对象，如果他们作为参数，就会报错
//如果其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错，但除了字符串会以数组形式，拷贝入目标对、其他值都不会产生效果

var v1 = 'abc';
var v2 = true;
var v3 = 10;
var obj4 = Object.assign({},v1,v2,v3);

Object.assign({b:'c'}, 
	Object.defineProperty({}, 'invisible', {
		enumerable:false,
		value:'hello'
	})
);

Object.assign({a:'b'}, {[Symbol('c')]:'d'})
//Object.assign浅复制

class point {
	constructor(x,y){
		Object.assign(this, {x,y})
	}
}

var po = new point(1,2);

//为对象添加方法
function SomeClass(){};
Object.assign(SomeClass.prototype, {
	someMethod(arg1, arg2){

	},
	anotherMethod(){

	}
});

function clone(origin){
	return Object.assign({}, origin);
}

function clone(origin){
	let originProto = Object.getPrototypeOf(origin);
	return Object.assign(Object.create(originProto), origin);
}

//合并多个对象
const merge1 = (target, ...sources) => Object.assign(target, ...sources);
const merge2 = (...sources) => Object.assign({}, ...sources);

//为属性指定默认值
const DEFAULTS = {
	logLevel:0,
	outputFormat:'html'
}

var oo = {};

function processContent(options){
	options = Object.assign({}, DEFAULTS, options);
	//console.log(options);
}
//processContent(oo);

//属性的可枚举性和遍历
//可枚举性
let obj6 = {foo:123};
Object.getOwnPropertyDescriptor(obj6, 'foo')

/*
目前有四个操作会忽略enumerable为false的属性
for...in循环：只遍历对象自身的和继承的可枚举的属性
Object.keys()：返回对自身的所有可枚举的属性的键名
JSON.stringify():只串化对象自身的可枚举的属性。
Object.assign()忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性
*/
Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable;

Object.getOwnPropertyDescriptor([], 'length').enumerable;


//ES6规定，所有Class的原型的方法都是不可枚举的

Object.getOwnPropertyDescriptor(class{foo(){}}.prototype, 'foo').enumerable;

/*
属性的遍历
ES6一共有5中方法可以遍历对象的属性
1.for...in
for...in循环遍历对象自身的和继承的可枚举属性（不含Symbol属性）
2.Object.keys(obj)
object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含Symbol属性）
3.Object.getOwnPropertyNames(obj)
Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含Symbol属性，但是包含不可枚举属性）
4.Object.getOwnPropertySymbols(obj)
Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有Symbol属性
5.Reflect.ownKeys(obj)
Reflect.ownKeys返回一个数组，包含对象自身的所有属性，不管属性名是Symbol或字符串，也不管是否可枚举。
以上5中方法遍历对象的属性，都遵守同样的 属性遍历的次序规则
-首先遍历所有书名为数值的属性，按照数字排序
-其次遍历所有属性名为字符串的属性，按照生成时间排序
-最后遍历所有属性名为Symbol值得属性，按照生成时间排序


*/
Reflect.ownKeys({[Symbol()]:0, b:0, 10:0, 2:0, a:0});

//7.Object.getOwnPropertyDescriptors();

const obj7 = {
	foo:123,
	get bar(){return 'abc'}
}
Object.getOwnPropertyDescriptors(obj7);


function getOwnPropertyDescriptors(obj){
	const result = {}
	for(let key of Reflect.ownKeys(obj)){
		result[key]=Object.getOwnPropertyDescriptor(obj, key)
	}
	return result;
}

const source = {
	set foo(value){
		console.log(value);
	}
};
const target1 = {};
Object.assign(target1, source);
Object.getOwnPropertyDescriptor(target1, 'foo')

const target2 = {}
Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source))
Object.getOwnPropertyDescriptor(target2, 'foo')

const shalloMerge = (target, source) => Object.defineProperties(
	target,
	Object.getOwnPropertyDescriptors(source)
)

//Object.getOwnPropertyDescriptors方法的另一个用处，是配合Object.create方法，将对象属性克隆岛一个新对象
const clone1 = Object.create(Object.getPrototypeOf(obj7),Object.getOwnPropertyDescriptors(obj7));

const shallowClone = (obj) => Object.create(Object.getPrototypeOf(obj7),Object.getOwnPropertyDescriptors(obj));


var prot = {aaa:'123'}
const obj8 = Object.assign(
	Object.create(prot),
	{foo:123}
)

const obj9 = Object.create(
	prot,
	Object.getOwnPropertyDescriptors({
		foo:123
	})
)

let mix = (object) => ({
	with:(...mixins) => mixins.reduce(
		(c, mixin) => Object.create(
			c, Object.getOwnPropertyDescriptors(mixin)
		), object)
})

var mix1 = function mix(object) {
	return {
		with: function _with() {
			for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
				mixins[_key] = arguments[_key];
			}

			return mixins.reduce(function (c, mixin) {
				return Object.create(c, Object.getOwnPropertyDescriptors(mixin));
			}, object);
		}
	};
};
let a1 = {a:'a'}
let b1 = {b:'b'}
let c1 = {c:'c'}
let d1 = mix(c1).with(a1,b1);
let d2 = mix1(c1).with(a1,b1);

//__proto__属性,Object.setPrototypeOf(), Object.getPrototypeOf();
//__proto__属性,所有浏览器（包括IE11）都部署了这个属性

var someOtherObj = d1;

var obj10 = {
	method:function(){}
}
obj10.__proto__ = someOtherObj;

Object.defineProperty(Object.prototype, '__proto__', {
	get(){
		let _thisObj = Object(this);
		return Object.getPrototypeOf(_thisObj)
	},
	set(proto){
		if(this === undefined || this === null){
			throw new TypeError();
		}
		if(!isObject(this)){
			return undefined;
		}
		if(!isObject(proto)){
			return undefined;
		}
		let status = Reflect.setPrototypeOf(this, proto);
		if(!status){
			throw new TypeError()
		}

	}
});
function isObject(value){
	return Object(value) === value;
}

//Object.setPrototypeOf();
var obj11 = Object.setPrototypeOf({}, null);

let proto = {}
let obj12 = {x:10}
Object.setPrototypeOf(obj12, proto);
proto.y = 20;
proto.z = 40;


function Retangle(){
	() => null,
	this.val = 'rest';
}
var rec = new Retangle();
Object.getPrototypeOf(rec) === Retangle.prototype;

Object.setPrototypeOf(rec, Object.prototype);
Object.getPrototypeOf(rec) === Retangle.prototype;


//Object.keys(),Object.values(),object.entries()

var obj13 = {foo:'bar', baz:42}
Object.keys(obj13);
let {keys, values, entries} = Object;
let obj14 = {a:1, b:2, c:3}
for(let key of keys(obj14)){
	//console.log(key);
}
for(let value of values(obj14)){
	//console.log(value);
}
for(let [key, value] of entries(obj14)){
	//console.log([key, value]);
}

//Object.values方法返回一个数组，成员是参数对象自身（不含继承的）所有可遍历（enumerable）属性的键值
var obj15 = Object.create({}, {
	p:{
		value:42,
		enumerable:true
	}
})
Object.values(obj15);


function* entries1(obj){
	for(let key of Object.keys(obj)){
		return yield [key, obj[key]];
	}
}

//console.log(entries1(obj15));

//Symbol值通过Symbol函数生成，对象的属性名现在可以有两种类型、一种是原来就有的字符串，另一种就是
//新增的Symbol类型。独一无二的，
let s = Symbol(); //是原始类型的值，不是对象，不能添加属性
//console.log(s);

let s1 = Symbol('foo');
let s2 = Symbol('bar');
//console.log(s1.toString())
//console.log(s2.toString())

var obj16 = {
	toString(){
		return 'abc';
	}
}

const sym = Symbol(obj16);
//console.log(sym);

var s3 = Symbol();
var s4 = Symbol();
//console.log(s3 == s4);

//Symbol不能与其他类型的值进行运算，会报错
//symbol值可以转为布尔值，但不能转为数值
//console.log(Boolean(sym))
//console.log(!sym)

var mySymbol = Symbol();

var a = {}
a[mySymbol] = 'Hello!';

var b = {
	[mySymbol]:'hello'
}
var c = {}
Object.defineProperty(c, mySymbol, {value:'hello'});

//console.log(a[mySymbol]);
//console.log(b[mySymbol]);
//console.log(c[mySymbol]);

//点运算符后面总是字符串，所以不会读取mySymbol作为标识名所知带的那个值，导致a的属性名实际上是一个字符串，而不是一个Symbol值

let obj17 = {
	[s](arg){console.log(arg)}
}

//console.log(obj17[s](123));

const COLOR_RED   = Symbol();
const COLOR_GREEN = Symbol();

function getComplement(color){
	switch(color){
		case COLOR_RED:
		 	return COLOR_GREEN;
		case COLOR_GREEN:
			return COLOR_RED;
		default:
			throw new Error('Undefined color');
	}
}

function getArea(shape, options){
	var area = 0
	switch(shape){
		case 'Triangle':
			area = 0.5 * options.width * options.height;
			break;
	}
	//console.log(area)
	return area;
}

//getArea('Triangle', { width: 100, height: 100 });

var shapeType = {
	triangle:Symbol()
};

function getArea(shape, options){
	var area = 0;
	switch(shape){
		case shapeType.triangle:
			area = .5 * options.width * options.height;
			break;
	}
	//console.log(area)
	return area;
}

getArea(shapeType.triangle, {width:100, height:100});

//属性名的遍历
var obj18 = {}
obj18[s1] = 'Hello';
obj18[s2] = 'World';
var objectSymbols = Object.getOwnPropertySymbols(obj18)
//console.log(objectSymbols);

var obj19 = {}
var foo = Symbol('foo');
Object.defineProperty(obj19, foo, {value:'foobar'});
for(var i in obj19){
	console.log(i)
}
//console.log(Object.getOwnPropertyNames(obj19))
//console.log(Object.getOwnPropertySymbols(obj19))

let obj20 = {
	[Symbol('my_key')]:1,
	enum:2,
	nonEnum:3
}

//console.log(Reflect.ownKeys(obj20));
var size = Symbol('size');

class Collection {
	constructor(){
		this[size] = 0;
	}

	add(item){
		console.log(size);
		console.log(this[size]);
		console.log(this[this[size]]);
		this[this[size]] = item;
		this[size]++;
	}

	static sizeOf(instance){
		return instance[size];
	}
}

var x = new Collection();
Collection.sizeOf(x);
//x.add('foo')
//console.log(Collection.sizeOf(x));

//console.log(Object.keys(x));
//console.log(Object.getOwnPropertyNames(x));
//console.log(Object.getOwnPropertySymbols(x))

//Symbol.for(),Symbol.keyFor()

//实例：模块的Singleton模式
//Singleton模式值得是调用一个类，任何时候返回都是同一个实例
//对于Node来说、模块文件可以看成一个类


class MyClass {
	[Symbol.hasInstance](foo){
		return foo instanceof Array;
	}
}

//console.log([1,2,3] instanceof new MyClass());

class Even{
	static [Symbol.hasInstance](obj){
		return Number(obj) % 2 === 0;
	}
}

//console.log(1 instanceof Even);
//console.log(2 instanceof Even);
//console.log(12345 instanceof Even);

//Symbol.isConcatSpreadable
var arr1 = ['c', 'd'];
//console.log(['a', 'b'].concat(arr1, 'e'));
//console.log(arr1[Symbol.isConcatSpreadable]);

let arr2 = ['c', 'd'];
arr2[Symbol.isConcatSpreadable] = false;
//console.log(['a', 'b'].concat(arr2,'e'))

class A1 extends Array{
	constructor(args){
		super(args);;
		this[Symbol.isConcatSpreadable] = true;
	}
}

class A2 extends Array{
	constructor(args){
		super(args)
	}
	get[Symbol.isConcatSpreadable](){
		return false;
	}
}

let aa1 = new A1();
aa1[0] = 3;
aa1[1] = 4;
let aa2 = new A2();
aa2[0] = 5;
aa2[1] = 6;
//console.log([1,2].concat(aa1).concat(aa2))

//Symbol.species
//Symbol.species属性，指向当前对象的构造函数。创造实例时，默认会调用这个方法，及时用这个属性返回的函数当做构造函数
class MyArray1 extends Array{
	static get [Symbol.species](){return Array;}
}

class MySplitter {
	constructor(value){
		this.value = value;
	}

	[Symbol.split](string){
		var index = string.indexOf(this.value);
		if(index === -1){
			return string;
		}

		return [
			string.substr(0, index),
			string.substr(index + this.value.length)
		]
	}
}

//Symbol.iterator
var myIterable = {}
myIterable[Symbol.iterator] = function*(){
	yield 1;
	yield 2;
	yield 3;
}
//console.log([...myIterable]);

class Collection1{
	*[Symbol.iterator](){
		let i = 0;
		while(this[i] !== undefined){
			yield this[i];
			++i;
		}
	}
}

let myCollection = new Collection1();
myCollection[0] = 1;
myCollection[1] = 2;

for(let value of myCollection){
	console.log(value)
}
