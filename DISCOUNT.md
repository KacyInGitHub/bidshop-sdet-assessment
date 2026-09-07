# Bonus Task – 10% Order Discount

## Clarifying Questions

Before implementation, I would confirm the following with the Product Owner and developers:

1. Is this a permanent discount rule or a time-limited promotion? If it is promotional, what are the start and end dates, and which timezone should be used to determine when the discount becomes active or expires?
2. Does the discount apply when the subtotal is exactly NZD $100, or only when it is greater than $100?
3. Is the 10% discount applied before or after GST?
4. Does the discount apply to all products, or are any products or categories excluded?For example, the business may introduce special, promotional, or already-discounted products in the future, so it would be useful to clarify whether these products should still contribute to the $100 threshold and receive the 10% discount.
5. Is this discount rule specific to the New Zealand market, or should it also apply to customers in other countries? If it applies globally, should the NZD $100 threshold be converted to an equivalent amount in each local currency?
6. What rounding rule should be used for the discount and final monetary values?
7. How should the discount be presented to the customer in the cart, checkout, and order confirmation?

## Required Changes

### API Test Framework

#### API Layer

The existing cart and order API clients would need to support any new discount or promotion fields introduced by the backend, for example:

- `discount`
- `discountRate`
- discounted `total`
- promotion information, if exposed by the API

The corresponding TypeScript response interfaces should also be updated so the test framework reflects the new API contract.

If the backend introduces a promotion-specific endpoint, the corresponding API client would be added to the API layer. Business rules such as whether the discount should apply would remain outside the API layer.

#### Test Data and Configuration

Test data would be extended to cover different qualifying subtotals, particularly around the NZD $100 boundary.

If Product confirms that the discount is a permanent New Zealand business rule, the discount rate and threshold could be maintained in shared market configuration alongside other market-specific rules such as GST.

If it is a time-limited promotion, I would keep the promotion configuration separate from permanent market rules. It could include:

- discount rate
- qualifying subtotal threshold
- applicable market
- start time
- end time
- timezone

The promotion should be controlled through configuration or application state rather than requiring test code changes when the promotion starts or ends.

#### Scene Layer

The existing cart and order Scenes would remain reusable.

The verification Scenes would be extended to validate both discounted and non-discounted states, including:

- whether the order qualifies for the discount
- whether the promotion is currently applicable
- the expected discount amount
- the relationship between subtotal, discount, GST, and total
- whether the discount is preserved after the order is created and retrieved

I would reuse the existing cart and order verification Scenes where the discount forms part of those business states.

A promotion-specific Scene would only be introduced if the application exposes separate reusable promotion behaviour that does not fit naturally into the existing cart or order Scenes.

#### Context

The existing test-scoped Context can continue to share runtime state between Scenes.

Runtime values returned by the application, such as the applied discount amount or promotion identifier, can be stored in `dynamicData` when they are needed by later Scenes.

Expected business rules and scenario conditions should come from test data or configuration rather than being hard-coded inside the Scenes.

#### Cases

I would extend the API coverage with discount-focused scenarios using the existing reusable Scenes and different test data.

The scenarios would cover the NZD $100 threshold and, if this is a temporary promotion, the promotion lifecycle, including behaviour before the promotion starts, while it is active, and after it expires.

The promotion-related tests should remain as regression coverage after the promotion ends, including validation that an expired promotion is no longer applied. The existing purchase flow would also remain as the main regression scenario for the overall purchasing process.

### UI Test Framework

The existing Page Objects and Components would be extended only where the user interface changes.

The cart and checkout Page Objects would expose any new discount or promotion information displayed to the customer, such as the discount amount, promotion message, and final total.

The UI automation would focus on representative customer-visible behaviour rather than duplicating all calculation and boundary scenarios already covered at the API level.

I would cover both active and inactive promotion states, for example:

- a qualifying order shows the discount while the promotion is active
- the same type of order does not show the discount after the promotion has expired

The tests should rely on a controllable promotion state or test environment rather than the real current date and time, so the same UI cases can remain stable and reusable after the promotion ends.

## Test Strategy

### 1. Test Scope and Risk Analysis

I would first define the test scope based on the confirmed business rules, technical design, and source-code impact analysis.

#### Functional Scope

The functional scope would cover the complete discount behaviour, including:

- eligibility based on the NZD $100 subtotal threshold
- discount calculation
- interaction with GST
- currency rounding
- applicable products or categories
- applicable markets
- promotion start and end rules, if the discount is time-limited
- customer-visible discount information in cart, checkout, and order confirmation
- persistence of discount information after order creation

The highest-risk areas are the pricing calculation and promotion eligibility rules because errors directly affect the amount charged to customers. Boundary conditions around the NZD $100 threshold and, if applicable, the promotion start and end times would therefore receive the highest testing priority.

#### Regression Scope

The regression scope would be determined through technical design and source-code impact analysis.

I would identify modules and flows affected directly or indirectly by the pricing change, especially:

- cart subtotal and total calculation
- GST calculation
- checkout pricing
- order creation
- persisted order values
- order retrieval
- quantity changes and product removal
- shared pricing or promotion utilities
- UI components displaying subtotal, discount, GST, or total

The existing end-to-end purchase flow would remain part of regression testing. Areas such as registration or product search would receive broader regression only if the implementation changes shared components or dependencies that affect them.

### 2. Test Approach

Testing would be performed at multiple levels, with detailed business-rule validation at lower levels and representative customer journeys at the UI level.

#### Test Design Techniques

I would use boundary value analysis around the NZD $100 threshold and equivalence partitioning for qualifying and non-qualifying orders.

If eligibility depends on multiple conditions such as market, product type, promotion status, and subtotal, I would use a decision table to cover the combinations systematically.

For a time-limited promotion, state-transition testing would be used to cover the states before, during, and after the promotion period.

#### Test Levels

- **Unit / Module Testing:** Developers should cover the core discount calculation, boundary conditions, rounding, and promotion status.

- **API Testing:** Validate discount eligibility and calculations through the cart and order APIs, including consistency between cart, order creation, and order retrieval.

- **Integration Testing:** Verify that the discount works correctly across pricing, cart, checkout, order, persistence, and promotion configuration where applicable.

- **UI Testing:** Validate representative customer journeys and confirm that discount and final pricing information are displayed correctly to the customer.

### 3. Test Execution Plan

Testing would begin as early as possible once the business rules and technical design are confirmed.

During development, unit and API-level testing would start first because the pricing logic can be validated before the full UI is complete.

Integration and UI testing would follow as the feature becomes available end to end.

Before release, I would run the focused discount coverage together with the agreed regression scope and the existing end-to-end purchase flow.

If the feature is a time-limited promotion, I would also ensure the test environment can simulate promotion start and expiry conditions before release.

### 4. Defect Management

Defects would be recorded with clear reproduction steps, expected and actual results, relevant calculation values, and supporting logs or screenshots.

Defects would be triaged regularly based on severity, business impact, and release risk. Issues affecting discount eligibility, GST, or final order totals would receive the highest priority and should be investigated and addressed as soon as possible.

Lower-priority defects would be reviewed and scheduled based on their impact and the release timeline.

Critical and high-priority defects should be resolved and retested before release, while any accepted lower-priority issues should be documented and agreed with Product and Engineering.

## Validation of Existing Functionality

As described in the regression scope above, I would use technical design and source-code impact analysis to identify the existing functionality that may be affected by the discount change.

I would also apply a shift-left approach so that potential regression risks are identified before the feature reaches the formal testing stage.

### 1. Requirement and Design Stage

During requirement and design review, I would confirm the business rules described above, review the technical design for testability and regression risk, identify impacted existing flows, and define acceptance criteria and key scenarios early.

This helps prevent incorrect assumptions from being implemented and allows regression risks to be identified before development starts.

### 2. Development Stage

During implementation, I would work with developers to validate the change continuously rather than waiting for the completed feature.

This would include:

- reviewing source-code changes to refine the impact analysis and regression scope
- encouraging unit/module tests around the discount calculation, threshold boundaries, rounding, GST interaction, and promotion state
- adding API-level automated tests as soon as the relevant endpoints are available
- verifying that existing automated tests continue to pass during development
- reviewing API contract or data-model changes that may affect existing consumers
- including the relevant automated tests in CI so regressions can be detected early

### 3. Pre-release Validation

Before release, I would execute focused regression against the areas identified by the impact analysis, particularly pricing, cart, GST, checkout, order creation, and persistence.

For a high-risk pricing change, I would also run the broader existing regression suite where appropriate, together with the existing end-to-end purchase flow.

Particular attention would be given to non-qualifying orders because their existing behaviour should remain unchanged.

### 4. Release and Post-release Validation

After deployment, I would run a small set of production smoke tests against critical purchase flows to confirm that the feature behaves correctly in the deployed environment.

If controlled rollout is supported, I would recommend enabling the feature gradually through a feature flag or limited rollout and monitoring pricing, order creation, and error metrics before enabling it more broadly.

A rollback or feature-disable mechanism should also be available if unexpected pricing issues are detected.

## Release Readiness

Before releasing the feature, I would want the following in place:

- The business rules and acceptance criteria are confirmed, particularly the NZD $100 boundary, GST interaction, rounding, promotion period, and applicable markets or products.
- The existing GST discrepancy between the documented 15% rule and the current implementation is resolved, because the discount calculation depends on the same pricing flow.
- Critical and high-priority defects are resolved, and the agreed feature and regression testing has passed.
- The promotion configuration, including start/end time and timezone if applicable, has been verified in a production-like environment.
- The final behaviour should be reviewed against the agreed acceptance criteria and accepted by Product before release.
- Sufficient logging and monitoring are available for discount application, pricing calculations, and order failures so that production issues can be detected and investigated quickly.
- For a high-risk pricing change, I would prefer a feature flag or controlled rollout mechanism so the feature can be enabled gradually and disabled quickly if unexpected issues occur.
- A rollback or feature-disable plan is agreed before release.
