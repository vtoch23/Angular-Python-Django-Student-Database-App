import { mount } from 'cypress/angular';
import { CrudComponent } from './crud.component';
import { AppComponent } from '../app.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

describe('CrudComponent Tests', () => {
  const createConfig = (properties = {}) => ({
    imports: [BrowserModule, CommonModule, CrudComponent, AppComponent],
    componentProperties: {
      StudentArray: [],
      name: '',
      address: '',
      fee: 0,
      currentStudentID: '',
      ...properties
    }
  });

  it('should mount the component', () => {
    mount(CrudComponent, createConfig({}));
    cy.getDataCy('students-input-form').should('exist');
    cy.getDataCy('students-output').should('exist');
  });

  it('should display correct input elements', () => {
    mount(CrudComponent, createConfig({}));
    cy.getDataCy('title').should('exist').and('have.text', 'Student Registration');
    cy.getDataCy('name-input-title').should('exist').and('have.text', 'Student Name');
    cy.getDataCy('address-input-title').should('exist').and('have.text', 'Country');
    cy.getDataCy('fee-input-title').should('exist').and('have.text', 'Fee');
    cy.getDataCy('save-button').should('exist').and('be.visible');
    cy.getDataCy('update-button').should('exist').and('be.visible');
  })

  it('should display correct output elements', () => {
    mount(CrudComponent, createConfig({}));
    cy.getDataCy('students-output').should('exist')
    cy.getDataCy('database-title').should('have.text', 'Students Database');
    cy.getDataCy('student-data').should('exist').children()
      .getDataCy('student-output-name').should('exist')
      .getDataCy('student-output-address').should('exist')
      .getDataCy('student-output-fee').should('exist')
      .getDataCy('edit-button').should('exist').and('be.visible')
      .getDataCy('delete-button').should('exist').and('be.visible');
      
  })

  it('should add a student', () => {
    mount(CrudComponent, createConfig({}));
    cy.getDataCy('student-name-input').type('New Student');
    cy.getDataCy('student-address-input').type('New Address');
    cy.getDataCy('student-fee-input').type('5000');
    cy.getDataCy('save-button').click();

    cy.getDataCy('students-output').should('contain', 'New Student');
    cy.getDataCy('students-output').should('contain', 'New Address');
    cy.getDataCy('students-output').should('contain', '5000');
  });

  it('should update a student record', () => {
    mount(CrudComponent, createConfig({}));
    cy.getDataCy('edit-button').first().click();

    cy.getDataCy('student-name-input').clear().type('Updated Student');
    cy.getDataCy('student-address-input').clear().type('Updated Address');
    cy.getDataCy('student-fee-input').clear().type('6000');
    cy.getDataCy('update-button').click();

    cy.getDataCy('student-data').should('contain', 'Updated Student');
  });

  it('should delete a student record', () => {
    mount(CrudComponent, createConfig({}));

    cy.getDataCy('student-name-input').type('Temp student');
    cy.getDataCy('student-address-input').type('Temp Address');
    cy.getDataCy('student-fee-input').type('0');
    cy.getDataCy('save-button').click();

    cy.getDataCy('student-data').contains('Temp student')
      .parent()
      .find('[data-cy="delete-button"]').click();

    cy.getDataCy('student-data').should('not.contain', 'Temp student');
  });
});
