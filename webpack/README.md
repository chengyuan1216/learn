1、在根目录下 npm link
2、在0test目录下 npm link webpack

3、修改代码

// tapable Hook.js _tap()
var fn1 = fn 
fn = function callback1() {
  return fn1(...arguments)
}