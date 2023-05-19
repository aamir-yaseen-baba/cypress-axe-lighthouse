

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
describe('Tests Todo application for accessibility issues', () => {
  beforeEach(()=>{
    cy.visit('https://todomvc.com/examples/react/#/')
    cy.injectAxe()
  })
  it('should only test specific element of the page', ()=>{
    cy.checkA11y({include:['.learn']})
  })

  it('it should log any accessiblity failures for the full page', () => {
    cy.checkA11y()
  })

  it('should exclude specific elments on the page', ()=>{
    cy.checkA11y({exclude: ['.learn']})
  })
 
 it('it should include only critcial and serious impacts',()=>{
  cy.checkA11y(null, {includedImpacts: ['serious', 'critical']})
 })
it('it excludes specific rules',()=>{
  cy.checkA11y(null,{rules:{
    'color-contrast':{enabled:false}
  }})
})
it('Logs violations to the terminal', () => {
  cy.checkA11y(null, null, terminalLog)
})

})