/// <reference types="cypress" />

describe('TODO list', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/tasks/active');
  });

  it('Create task', () => {
    cy.get('#create-task-btn').click();
    cy.get('#priority-input').type('2');
    cy.get('#end_date_datepicker').type('{enter}');
    cy.get('#title-input').type('Some title');
    cy.get('#description-input').type('Some description');
    cy.get('#create-btn').click();
    cy.intercept({
      method: 'POST',
      url: 'https://610d1faa48beae001747b6e9.mockapi.io/api/v1/tasks',
    }).as('createTasks');
    cy.wait('@createTasks').its('response.statusCode').should('equal', 201);
  });

  it('Update task', () => {
    cy.intercept({
      method: 'GET',
      url: 'https://610d1faa48beae001747b6e9.mockapi.io/api/v1/tasks',
    }).as('getTasks');
    cy.wait('@getTasks').its('response.statusCode').should('equal', 200);
    cy.get(
      'table tr[aria-rowindex="1"] .table-action-icon:nth-child(2)'
    ).click();
    cy.get('#priority-input').type('3');
    cy.get('#end_date_datepicker').type('{downarrow}{enter}');
    cy.get('#title-input').type('{selectall}{del}Some new title');
    cy.get('#description-input').type('{selectall}{del}Some new description');
    cy.get('#create-btn').click();
    cy.intercept({
      method: 'PUT',
      url: 'https://610d1faa48beae001747b6e9.mockapi.io/api/v1/tasks/*',
    }).as('updateTask');
    cy.wait('@updateTask').its('response.statusCode').should('equal', 200);
  });
});
