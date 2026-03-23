// 作用同上：给 Swagger metadata.ts 提供可加载的运行时入口。
try {
  module.exports = require('../../../dist/todo/entities/todo.entity.js');
} catch {
  module.exports = require('./todo.entity.ts');
}
