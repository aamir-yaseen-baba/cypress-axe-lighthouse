import { defaultAxeConfiguration } from "../support/axe-config"
function terminalLog(violations) {
  cy.task(
    'log',
    `${violations.length} accessibility violation${
      violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected`
  )
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length
    })
  )

  cy.task('table', violationData)
}
describe('Tests Todo application for accessibility issues with global Axe configuration', () => {
  beforeEach(()=>{
    cy.visit('https://todomvc.com/examples/react/#/')
    cy.injectAxe()
    // to enforce global AXE Configuration
   cy.configureAxe(defaultAxeConfiguration)
  })

  it('it should log any accessiblity failures for the full page', () => {
    cy.checkA11y()
  })
  it('Logs violations to the terminal', () => {
    cy.checkA11y(null, null, terminalLog)
  })
})