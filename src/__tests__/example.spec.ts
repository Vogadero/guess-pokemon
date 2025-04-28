import { describe, expect, it } from 'vitest';

describe('Basic Arithmetic Operations', () => {
  // 测试分组：加法运算
  describe('Addition Operations', () => {
    it('should return 2 when adding 1 and 1', () => {
      expect(1 + 1).toBe(2);
    });

    it('should handle decimal addition correctly', () => {
      expect(0.1 + 0.2).toBeCloseTo(0.3); // 避免浮点数精度问题
    });
  });

  // 测试分组：边界条件
  describe('Edge Cases', () => {
    it('should return 0 when adding 0 and 0', () => {
      expect(0 + 0).toBe(0);
    });

    it('should handle negative numbers correctly', () => {
      expect(-1 + -1).toBe(-2);
    });
  });
});

// 扩展的测试套件示例
describe('Advanced Scenarios', () => {
  it('should fail when comparing NaN values', () => {
    expect(NaN).toBeNaN(); // 更专业的断言方式
  });

  it('should validate truthy/falsy values', () => {
    expect('').toBeFalsy();
    expect(1).toBeTruthy();
  });
});
