describe('Pokemon Game', () => {
  it('Loads homepage', () => {
    // 访问主页
    cy.visit(Cypress.env('baseUrl') || '/', {
      timeout: 20000 // 增加超时时间
    });

    // 先检查body是否包含内容
    cy.get('body').should('not.be.empty');

    // 验证Vue应用根元素
    cy.get('#app').should('be.visible');

    // 添加截图用于调试
    cy.screenshot('homepage');

    // 精确匹配文本
    cy.contains('h1', /？？？/i, { timeout: 20000 });

    // 验证页面标题
    cy.title().should('eq', "Who's that pokemon?");
  });
});
