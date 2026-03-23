// 这是给 Swagger metadata.ts 用的 shim。
// metadata.js 在运行时会去绝对路径加载 src/todo/dto/todo-response.dto，
// 这里把它转发到真正的 dist 编译产物。
try {
  module.exports = require('../../../dist/todo/dto/todo-response.dto.js');
} catch {
  module.exports = require('./todo-response.dto.ts');
}
