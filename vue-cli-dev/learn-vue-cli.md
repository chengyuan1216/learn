# 1、如何自定义node命令

在package.json文件中增加下面的代码， 在`npm i` 之后就会在**`./node_modules/.bin/`**下生成对应的`vue-cli-service` 和 `vue-cli-service.cmd` 两个文件。在使用 vue-cli-service 命令时会`执行bin/vue-cli-service.js文件`。全局路径npm路径： `C:\Users\83662\AppData\Roaming\npm\node_modules`

```
  "bin": {
    "vue-cli-service": "bin/vue-cli-service.js"
  }
```

vue-cli-service 文件内容如下：

```
#!/bin/sh
basedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")

case `uname` in
    *CYGWIN*) basedir=`cygpath -w "$basedir"`;;
esac

if [ -x "$basedir/node" ]; then
  "$basedir/node"  "$basedir/../@vue/cli-service/bin/vue-cli-service.js" "$@"
  ret=$?
else 
  node  "$basedir/../@vue/cli-service/bin/vue-cli-service.js" "$@"
  ret=$?
fi
exit $ret

```

vue-cli-service .cmd文件内容如下：

```
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\@vue\cli-service\bin\vue-cli-service.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\@vue\cli-service\bin\vue-cli-service.js" %*
)
```

# 2、调试vue-cli代码

 node --inspect-brk .\vue-cli-service.js serve

 node  .\vue-cli-service.js serve

# 3、npm包

## 1、dotenv

用于从文件中加载环境变量