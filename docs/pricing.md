---
title: Pricing
description: VION pricing tiers, features, and licensing model for system integrators.
layout: page
---

<style>
.pricing-hero {
  text-align: center;
  padding: 48px 24px 40px;
  max-width: 680px;
  margin: 0 auto;
}

.pricing-hero h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 12px;
}

.pricing-hero p {
  font-size: 1.15rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 24px;
}

.pricing-hero .actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.pricing-hero .actions a {
  display: inline-block;
  padding: 10px 24px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}

.pricing-hero .actions .primary {
  background: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
}

.pricing-hero .actions .primary:hover {
  background: var(--vp-button-brand-hover-bg);
}

.pricing-hero .actions .secondary {
  border: 1px solid var(--vp-c-border);
  color: var(--vp-c-text-1);
}

.pricing-hero .actions .secondary:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

/* Tier Cards */
.tier-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  max-width: 1100px;
  margin: 0 auto 48px;
  padding: 0 24px;
}

@media (max-width: 960px) {
  .tier-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .tier-cards {
    grid-template-columns: 1fr;
  }
}

.tier-card {
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  background: var(--vp-c-bg);
  transition: border-color 0.2s;
}

.tier-card:hover {
  border-color: var(--vp-c-brand-1);
}

.tier-card.popular {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 1px var(--vp-c-brand-1);
  position: relative;
}

.tier-card.popular::before {
  content: 'Most Popular';
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--vp-c-brand-1);
  color: var(--vp-button-brand-text);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 14px;
  border-radius: 10px;
  white-space: nowrap;
}

.tier-card.enterprise {
  background: var(--vion-color-jagged-ice-950);
  border-color: var(--vion-color-jagged-ice-700);
  color: var(--vion-color-jagged-ice-100);
}

.tier-card.enterprise .tier-audience,
.tier-card.enterprise .tier-features li {
  color: var(--vion-color-jagged-ice-300);
}

.tier-card .tier-name {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.tier-card .tier-price {
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: 2px;
}

.tier-card .tier-price-unit {
  font-size: 0.85rem;
  font-weight: 400;
  color: var(--vp-c-text-2);
}

.tier-card.enterprise .tier-price-unit {
  color: var(--vion-color-jagged-ice-400);
}

.tier-card .tier-audience {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 16px;
}

.tier-card .tier-features {
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
  flex: 1;
  font-size: 0.88rem;
  line-height: 1.8;
}

.tier-card .tier-features li::before {
  content: '✓ ';
  color: var(--vp-c-brand-1);
  font-weight: 700;
}

.tier-card .tier-cta {
  display: block;
  text-align: center;
  padding: 10px 0;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: background 0.2s;
}

.tier-card .tier-cta.brand {
  background: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
}

.tier-card .tier-cta.brand:hover {
  background: var(--vp-button-brand-hover-bg);
}

.tier-card .tier-cta.outline {
  border: 1px solid var(--vp-c-border);
  color: var(--vp-c-text-1);
}

.tier-card .tier-cta.outline:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.tier-card.enterprise .tier-cta.outline {
  border-color: var(--vion-color-jagged-ice-600);
  color: var(--vion-color-jagged-ice-200);
}

.tier-card.enterprise .tier-cta.outline:hover {
  background: var(--vion-color-jagged-ice-800);
}

/* Section headings */
.pricing-section {
  max-width: 1100px;
  margin: 0 auto 48px;
  padding: 0 24px;
}

.pricing-section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 8px;
  border-top: none;
  padding-top: 0;
}

.pricing-section .section-subtitle {
  color: var(--vp-c-text-2);
  margin-bottom: 24px;
  font-size: 0.95rem;
}

/* Feature matrix */
.feature-matrix {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
}

.feature-matrix th {
  text-align: center;
  padding: 10px 12px;
  border-bottom: 2px solid var(--vp-c-border);
  font-weight: 700;
  font-size: 0.9rem;
}

.feature-matrix th:first-child {
  text-align: left;
}

.feature-matrix td {
  padding: 8px 12px;
  border-bottom: 1px solid var(--vp-c-border);
  text-align: center;
}

.feature-matrix td:first-child {
  text-align: left;
  font-weight: 500;
}

.feature-matrix tr.category td {
  font-weight: 700;
  padding-top: 16px;
  color: var(--vp-c-brand-1);
  border-bottom: none;
}

.feature-matrix .check {
  color: var(--vp-c-brand-1);
  font-weight: 700;
}

.feature-matrix .dash {
  color: var(--vp-c-text-3);
}

/* Add-ons */
.addon-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

@media (max-width: 768px) {
  .addon-grid {
    grid-template-columns: 1fr;
  }
}

.addon-card {
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 16px;
  font-size: 0.88rem;
}

.addon-card .addon-name {
  font-weight: 700;
  margin-bottom: 4px;
}

.addon-card .addon-desc {
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
  line-height: 1.5;
}

.addon-card .addon-price {
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

/* Deployment */
.deploy-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

@media (max-width: 768px) {
  .deploy-grid {
    grid-template-columns: 1fr;
  }
}

.deploy-card {
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 20px;
}

.deploy-card .deploy-name {
  font-weight: 700;
  margin-bottom: 6px;
}

.deploy-card .deploy-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

/* Partner teaser */
.partner-teaser {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}

.partner-teaser p {
  color: var(--vp-c-text-2);
  margin-bottom: 20px;
  line-height: 1.6;
}

.partner-teaser a {
  display: inline-block;
  padding: 10px 24px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  background: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
  transition: background 0.2s;
}

.partner-teaser a:hover {
  background: var(--vp-button-brand-hover-bg);
}

.pricing-note {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin-top: 12px;
}
</style>

<!-- Section 1: Hero -->
<div class="pricing-hero">
  <h1>Pricing</h1>
  <p>Enterprise IoT capabilities at SME prices. Pay per gateway, scale as you grow — your integrator business earns from day one.</p>
  <div class="actions">
    <a href="#plans" class="primary">View Plans</a>
    <a href="https://vion.swiss/" target="_blank" class="secondary">Contact Sales</a>
  </div>
</div>

<!-- Section 2: Tier Cards -->
<div id="plans" class="tier-cards">
  <div class="tier-card">
    <div class="tier-name">Community</div>
    <div class="tier-price">CHF 5 <span class="tier-price-unit">/month</span></div>
    <div class="tier-audience">Makers & prototyping</div>
    <ul class="tier-features">
      <li>Up to 3 gateways</li>
      <li>Core platform (limited)</li>
      <li>Rate-limited API</li>
      <li>Community forum support</li>
      <li>Best effort SLA</li>
    </ul>
    <a href="https://vion.swiss/" target="_blank" class="tier-cta outline">Get Started</a>
  </div>
  <div class="tier-card">
    <div class="tier-name">Startup</div>
    <div class="tier-price">CHF 200 <span class="tier-price-unit">/GW/year</span></div>
    <div class="tier-audience">Growing integrators</div>
    <ul class="tier-features">
      <li>10–50 gateways</li>
      <li>Up to 15 tenants</li>
      <li>Unlimited API access</li>
      <li>Email support</li>
      <li>99.0% uptime SLA</li>
    </ul>
    <a href="https://vion.swiss/" target="_blank" class="tier-cta outline">Get Started</a>
  </div>
  <div class="tier-card popular">
    <div class="tier-name">Professional</div>
    <div class="tier-price">CHF 250 <span class="tier-price-unit">/GW/year</span></div>
    <div class="tier-audience">Established integrators</div>
    <ul class="tier-features">
      <li>50–200 gateways</li>
      <li>Unlimited tenants</li>
      <li>Unlimited API access</li>
      <li>Email + priority support (add-on)</li>
      <li>99.5% uptime SLA</li>
    </ul>
    <a href="https://vion.swiss/" target="_blank" class="tier-cta brand">Get Started</a>
  </div>
  <div class="tier-card enterprise">
    <div class="tier-name">Enterprise</div>
    <div class="tier-price">CHF 350 <span class="tier-price-unit">/GW/year</span></div>
    <div class="tier-audience">Large integrators & OEMs</div>
    <ul class="tier-features">
      <li>200+ gateways</li>
      <li>White-label included</li>
      <li>Private Cloud / Self-Hosted</li>
      <li>Priority support + dedicated AM</li>
      <li>99.8% uptime SLA</li>
    </ul>
    <a href="https://vion.swiss/" target="_blank" class="tier-cta outline">Contact Sales</a>
  </div>
</div>

<!-- Section 3: Feature Matrix -->
<div class="pricing-section">
  <h2>Feature Comparison</h2>
  <p class="section-subtitle">Detailed breakdown of what's included in each tier.</p>
  <table class="feature-matrix">
    <thead>
      <tr>
        <th></th>
        <th>Community</th>
        <th>Startup</th>
        <th>Professional</th>
        <th>Enterprise</th>
      </tr>
    </thead>
    <tbody>
      <tr class="category"><td colspan="5">Deployment</td></tr>
      <tr><td>Shared Cloud</td><td class="check">✓</td><td class="check">✓</td><td class="check">✓</td><td class="check">✓</td></tr>
      <tr><td>Private Cloud</td><td class="dash">—</td><td class="dash">—</td><td class="dash">—</td><td class="check">✓</td></tr>
      <tr><td>Self-Hosted</td><td class="dash">—</td><td class="dash">—</td><td class="dash">—</td><td class="check">✓</td></tr>
      <tr class="category"><td colspan="5">Platform</td></tr>
      <tr><td>Core Platform</td><td>Limited</td><td class="check">✓</td><td class="check">✓</td><td class="check">✓</td></tr>
      <tr><td>Extension Modules</td><td class="dash">—</td><td class="check">✓</td><td class="check">✓</td><td class="check">✓</td></tr>
      <tr><td>API Access</td><td>Rate-Limited</td><td>Unlimited</td><td>Unlimited</td><td>Unlimited</td></tr>
      <tr><td>White-Label</td><td class="dash">—</td><td>Add-on</td><td>Add-on</td><td>Included</td></tr>
      <tr><td>Multi-Tenancy</td><td class="dash">—</td><td>15 tenants</td><td>Unlimited</td><td>Unlimited</td></tr>
      <tr class="category"><td colspan="5">Support & SLA</td></tr>
      <tr><td>Community Forum</td><td class="check">✓</td><td class="check">✓</td><td class="check">✓</td><td class="check">✓</td></tr>
      <tr><td>Email Support</td><td class="dash">—</td><td class="check">✓</td><td class="check">✓</td><td class="check">✓</td></tr>
      <tr><td>Priority Support</td><td class="dash">—</td><td class="dash">—</td><td>Add-on</td><td>Included</td></tr>
      <tr><td>Dedicated Account Manager</td><td class="dash">—</td><td class="dash">—</td><td class="dash">—</td><td class="check">✓</td></tr>
      <tr><td>Uptime SLA</td><td>Best Effort</td><td>99.0%</td><td>99.5%</td><td>99.8%</td></tr>
      <tr class="category"><td colspan="5">Contract</td></tr>
      <tr><td>Minimum Term</td><td>Monthly</td><td>1 yr / Monthly</td><td>1 year</td><td>3 years</td></tr>
    </tbody>
  </table>
</div>

<!-- Section 4: Add-ons -->
<div class="pricing-section">
  <h2>Add-ons</h2>
  <p class="section-subtitle">Extend the platform with specialized modules. Available on Startup, Professional, and Enterprise tiers.</p>
  <div class="addon-grid">
    <div class="addon-card">
      <div class="addon-name">Energy Management</div>
      <div class="addon-desc">Energy dashboards, provider integrations, and specialized widgets.</div>
      <div class="addon-price">CHF 40/GW/year</div>
    </div>
    <div class="addon-card">
      <div class="addon-name">CodeSys Runtime</div>
      <div class="addon-desc">Local CodeSys 3.5 runtime access for IEC 61131-3 programs.</div>
      <div class="addon-price">CHF 20/GW/year</div>
    </div>
    <div class="addon-card">
      <div class="addon-name">TwinCAT HAL</div>
      <div class="addon-desc">Hardware abstraction layer for Beckhoff TwinCAT systems.</div>
      <div class="addon-price">CHF 60/GW/year</div>
    </div>
    <div class="addon-card">
      <div class="addon-name">Forecast</div>
      <div class="addon-desc">ML-based predictions for PV yield, load profiles, and more.</div>
      <div class="addon-price">CHF 30/GW/year</div>
    </div>
    <div class="addon-card">
      <div class="addon-name">White-Label</div>
      <div class="addon-desc">Custom branding, domain, and design for your platform instance.</div>
      <div class="addon-price">from CHF 1'000/year</div>
    </div>
    <div class="addon-card">
      <div class="addon-name">Priority Support</div>
      <div class="addon-desc">4h response time, dedicated portal, prioritized ticket handling.</div>
      <div class="addon-price">from CHF 2'400/year</div>
    </div>
  </div>
  <p class="pricing-note">Partner discounts apply to all add-ons.</p>
</div>

<!-- Section 5: Calculator -->
<div class="pricing-section">
  <h2>Pricing Calculator</h2>
  <p class="section-subtitle">Estimate costs and integrator earnings based on your tier, partnership, and logic block volume.</p>
  <PricingCalculator />
</div>

<!-- Section 6: Partner Program -->
<div class="pricing-section">
  <div class="partner-teaser">
    <h2 style="margin-bottom: 12px; border-top: none; padding-top: 0;">Partner Program</h2>
    <p>VION offers formal partnership tiers for integrators who want better margins, platform discounts, and a voice in the roadmap. Partners invest in the platform's development and receive preferential commercial terms in return.</p>
    <a href="https://vion.swiss/" target="_blank">Learn about partnership</a>
  </div>
</div>

<!-- Section 7: Deployment Options -->
<div class="pricing-section">
  <h2>Deployment Options</h2>
  <p class="section-subtitle">Choose the deployment model that fits your requirements.</p>
  <div class="deploy-grid">
    <div class="deploy-card">
      <div class="deploy-name">Shared Cloud</div>
      <div class="deploy-desc">Standard multi-tenant environment, fully managed by VION. Strict tenant isolation with zero operational overhead for you.</div>
    </div>
    <div class="deploy-card">
      <div class="deploy-name">Private Cloud</div>
      <div class="deploy-desc">Dedicated VION instance, operated by VION but exclusively for your organization. For compliance and data residency requirements.</div>
    </div>
    <div class="deploy-card">
      <div class="deploy-name">Self-Hosted</div>
      <div class="deploy-desc">Run the full platform on your own infrastructure. Complete control, no vendor lock-in. Your logic block source code stays with you.</div>
    </div>
  </div>
  <p class="pricing-note">Private Cloud and Self-Hosted are available on the Enterprise tier. Contact Sales for details.</p>
</div>
