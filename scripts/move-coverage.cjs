const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, '../coverage-vitest/coverage.json');
const targetDir = path.join(__dirname, '../coverage');
const target = path.join(targetDir, 'coverage-final.json');

// 添加文件存在性检查
if (!fs.existsSync(source)) {
  console.error(`Source file not found: ${source}`);
  process.exit(1);
}

// 递归创建目录（兼容旧 Node 版本）
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 使用 copy + unlink 替代 rename（跨分区兼容）
try {
  fs.copyFileSync(source, target);
  fs.unlinkSync(source);
  console.log(`Successfully moved coverage file to ${target}`);
} catch (err) {
  console.error('Error moving coverage file:', err);
  process.exit(1);
}