import { mount } from 'cypress/angular';
import { AppComponent } from './app.component';

describe('AppComponent Component Tests', () => {
  const createConfig = (properties = {}) => ({
    imports: [
      AppComponent
    ],
    componentProperties: {
      title: 'Student Registration',
      tasks: [],
      newTask: "",
      ...properties
    }
  });

  it('should mount the component and display the title', () => {
    mount(AppComponent, createConfig({}));
    cy.getDataCy('crud-component').should('exist');
  });
});
