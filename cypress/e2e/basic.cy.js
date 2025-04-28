describe('Pokemon Game', () => {
  it('Loads homepage', () => {
    cy.visit(Cypress.env('baseUrl') || '/');

    // 验证Vue应用根元素
    cy.get('#app').should('be.visible');

    // 添加截图用于调试
    cy.screenshot('homepage');

    // 精确匹配文本
    cy.get('h1').should(($h1) => {
      expect($h1).to.have.text('我是谁？');
    });

    // 验证页面标题
    cy.title().should('eq', "Who's that pokemon?");
  });
});
