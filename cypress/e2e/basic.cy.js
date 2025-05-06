describe('Pokemon Game', () => {
  it('Loads homepage', () => {
    // 设置视口大小以匹配桌面设备
    cy.viewport(1280, 720);
    // 访问主页
    cy.visit(Cypress.env('baseUrl') || '/', {
      timeout: 20000 // 增加超时时间
    });
    // 在 cy.visit() 后添加应用状态检查
cy.document().should('have.property', 'readyState', 'complete')

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

    // 检查控制台错误
cy.on('window:before:load', (win) => {
  win.console.error = (msg) => {
    throw new Error(`Console Error: ${msg}`)
  }
})
  });
});
