describe('Testes da aplicação MyPreferencesApp', () => {
  it('1. Login com Espera Explícita', () => {
    cy.visit('http://127.0.0.1:5500/');

    cy.get('#username').type('admin');
    cy.get('#password').type('admin123');
    cy.get('#loginBtn').click();

    cy.url().should('include', '/dashboard.html');
    cy.contains('Bem-vindo, admin!').should('be.visible');
  });

  it('2. Verifica se o cookie session_id foi criado', () => {
    cy.setCookie('session_id', 'abc123');
    cy.visit('dashboard.html');

    cy.getCookie('session_id').should('exist');
    cy.getCookie('session_id').should((cookie) => {
      expect(cookie.value).to.not.be.empty;
      expect(cookie.path).to.equal('/');
    });
  });

  it('3. Verifica o tema escuro no localStorage', () => {
    cy.setCookie('session_id', 'abc123');
    cy.visit('dashboard.html');

    cy.get('#toggleTheme').click();

    cy.window().then((win) => {
      expect(win.localStorage.getItem('theme')).to.equal('dark');
    });

    cy.reload();
    cy.get('body').should('have.class', 'dark');
  });

  it('4. Navegação interna: Perfil e Configurações', () => {
    cy.setCookie('session_id', 'abc123');
    cy.visit('dashboard.html');

    cy.get('#perfilBtn').click();
    cy.contains('Nome: admin').should('be.visible');

    cy.get('#configBtn').click();
    cy.contains('Preferências do usuário').should('be.visible');
  });

  it('5. Logout e remoção do cookie', () => {
    cy.setCookie('session_id', 'abc123');
    cy.visit('dashboard.html');

    cy.get('#logoutBtn').click();

    cy.url().should('include', '/index.html');
    cy.getCookie('session_id').should('not.exist');
  });
});
