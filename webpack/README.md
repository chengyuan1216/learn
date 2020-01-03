1、在根目录下 npm link
2、在0test目录下 npm link webpack

3、修改代码

// tapable Hook.js _tap()
		var fn1 = fn
		fn = function callback1() {
			// debugger
			var name = 'FileKindPlugin'
			if (options ==  name||options.name == name) {
				debugger
				console.trace(type + ' Hook -> ', typeof options == 'string'? options: options.name)
			}
			console.error(type + ' Hook -> ', typeof options == 'string'? options: options.name)
			return fn1(...arguments)
		}