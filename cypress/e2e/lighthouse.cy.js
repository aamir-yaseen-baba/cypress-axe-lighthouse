
it("should verify the lighthouse scores with thresholds", function () {
    cy.visit('https://todomvc.com/examples/react/#/')
    cy.lighthouse({
     performance: 60,
      accessibility: 88,
     "best-practices": 83,
      seo: 78,
     //pwa: 100,
    });
  });