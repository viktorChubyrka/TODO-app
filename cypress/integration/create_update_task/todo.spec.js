///<reference types="cypress" />

describe('TODO list', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/tasks/active');
  });
  let variables = require('../../support/variables.json');

  it('Create task', () => {
    cy.intercept({
      method: 'POST',
      url: 'https://610d1faa48beae001747b6e9.mockapi.io/api/v1/tasks',
    }).as('createTasks');

    //Create 2 tasks
    for (let index = 0; index < 2; index++) {
      cy.get('[data-cy="create-task-btn"]').click();
      cy.get('[data-cy="priority-input"]').type(variables.create_task.priority);
      cy.get('[data-cy="end_date_datepicker"]').type('{enter}');
      cy.get('[data-cy="title-input"]').type(variables.create_task.title);
      cy.get('[data-cy="description-input"]').type(
        variables.create_task.description
      );
      cy.get('[data-cy="create-btn"]').click();
      cy.wait('@createTasks').its('response.statusCode').should('equal', 201);
    }

    //Go to the last page if it exists
    cy.get('body')
      .find('[data-cy="paginator"] h2:last-of-type')
      .click({ force: true });

    //Check is the element created
    cy.get('table').contains('td', variables.create_task.priority);
    cy.get('table').contains('td', variables.create_task.title);
    cy.get('table').contains('td', variables.create_task.description);

    //Select task
    cy.get('table tr').then((array) => {
      array[array.length - 1].click();
    });

    //Create group
    cy.get('[data-cy="create-group"]').click();
    cy.get('[data-cy="group-name-input"]').type(variables.create_group.name);
    cy.get('[data-cy="group-image-input"]').type(variables.create_group.image);
    cy.get('[data-cy="save"]').click();
    cy.wait(5000);

    //Go to groups page
    cy.get('[data-cy="special_list_link"]').click();

    //Update group
    cy.get(
      '[data-cy="special-list-card"]:last-child div div [data-cy="update-group-btn"]'
    ).click();
    cy.get('[data-cy="group-name-input"]').type(
      variables.clear_input + variables.update_group.name
    );
    cy.get('[data-cy="group-image-input"]').type(
      variables.clear_input + variables.update_group.image
    );
    cy.get('[data-cy="save"]').click();
    cy.wait(5000);

    //Delete group
    cy.get(
      '[data-cy="special-list-card"]:last-child div div [data-cy="delete-group-btn"]'
    ).click();
    cy.wait(10000);
  });

  it('Update and delete task', () => {
    cy.intercept({
      method: 'GET',
      url: 'https://610d1faa48beae001747b6e9.mockapi.io/api/v1/tasks',
    }).as('getTasks');
    cy.wait('@getTasks').its('response.statusCode').should('equal', 200);
    //Update task
    cy.get(
      'table tr[aria-rowindex="1"] .table-action-icon:nth-child(2)'
    ).click();
    cy.get('[data-cy="priority-input"]').type(variables.update_task.priority);
    cy.get('[data-cy="end_date_datepicker"]').type('{downarrow}{enter}');
    cy.get('[data-cy="title-input"]').type(
      variables.clear_input + variables.update_task.title
    );
    cy.get('[data-cy="description-input"]').type(
      variables.clear_input + variables.update_task.description
    );
    cy.get('[data-cy="create-btn"]').click();
    cy.intercept({
      method: 'PUT',
      url: 'https://610d1faa48beae001747b6e9.mockapi.io/api/v1/tasks/*',
    }).as('updateTask');
    cy.wait('@updateTask').its('response.statusCode').should('equal', 200);

    //Check is the task updated
    cy.get('table').contains('td', variables.update_task.priority);
    cy.get('table').contains('td', variables.update_task.title);
    cy.get('table').contains('td', variables.update_task.description);

    //Move task to Archive
    cy.get(
      'table tr[aria-rowindex="1"] .table-action-icon:nth-child(1)'
    ).click();
    cy.wait(1000);

    //Go to the archive page
    cy.get('[data-cy="dropdown"]').click();
    cy.get(':nth-child(2) > .dropdown-item').click();
    cy.wait(3000);
    //Delete task
    cy.get(
      'table tr[aria-rowindex="1"] .table-action-icon:nth-child(1)'
    ).click();
  });
});
