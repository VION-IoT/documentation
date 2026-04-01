<script setup>
import { ref, computed } from 'vue'

const tier = ref('professional')
const partnerLevel = ref('none')
const gateways = ref(20)
const logicBlockSpend = ref(500)

const tiers = {
  startup:      { label: 'Startup',      price: 200 },
  professional: { label: 'Professional', price: 250 },
  enterprise:   { label: 'Enterprise',   price: 350 },
}

const partners = {
  none:      { label: 'No partnership', discount: 0,    vionShare: 0.30 },
  palladium: { label: 'Palladium',      discount: 0.15, vionShare: 0.20 },
  platinum:  { label: 'Platinum',        discount: 0.25, vionShare: 0.15 },
}

const validCombos = {
  startup:      ['none'],
  professional: ['none', 'palladium'],
  enterprise:   ['palladium', 'platinum'],
}

function onTierChange() {
  if (!validCombos[tier.value].includes(partnerLevel.value)) {
    partnerLevel.value = validCombos[tier.value][0]
  }
}

const listPrice = computed(() => tiers[tier.value].price)
const discount = computed(() => partners[partnerLevel.value].discount)
const vionSharePct = computed(() => partners[partnerLevel.value].vionShare)

const platformLicense = computed(() => listPrice.value * (1 - discount.value))
const vionShare = computed(() => logicBlockSpend.value * vionSharePct.value)
const vionReceives = computed(() => Math.max(platformLicense.value, vionShare.value))
const platformApplies = computed(() => platformLicense.value >= vionShare.value)
const integratorReceives = computed(() => logicBlockSpend.value * (1 - vionSharePct.value))
const endCustomerPays = computed(() => vionReceives.value + integratorReceives.value)

const fmt = (v) => v.toLocaleString('de-CH', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
</script>

<template>
  <div class="calc">
    <div class="calc-inputs">
      <div class="calc-field">
        <label>Tier</label>
        <div class="calc-radio-group">
          <label v-for="(t, key) in tiers" :key="key" class="calc-radio" :class="{ active: tier === key }">
            <input type="radio" :value="key" v-model="tier" @change="onTierChange" />
            {{ t.label }}
          </label>
        </div>
      </div>

      <div class="calc-field">
        <label>Partner Level</label>
        <div class="calc-radio-group">
          <label
            v-for="(p, key) in partners"
            :key="key"
            class="calc-radio"
            :class="{ active: partnerLevel === key, disabled: !validCombos[tier].includes(key) }"
          >
            <input
              type="radio"
              :value="key"
              v-model="partnerLevel"
              :disabled="!validCombos[tier].includes(key)"
            />
            {{ p.label }}
          </label>
        </div>
      </div>

      <div class="calc-field">
        <label>Gateways <span class="calc-value">{{ gateways }}</span></label>
        <input type="range" v-model.number="gateways" min="1" max="500" step="1" />
        <div class="calc-range-labels"><span>1</span><span>500</span></div>
      </div>

      <div class="calc-field">
        <label>Logic block spend per GW <span class="calc-value">CHF {{ fmt(logicBlockSpend) }}/yr</span></label>
        <input type="range" v-model.number="logicBlockSpend" min="0" max="3000" step="50" />
        <div class="calc-range-labels"><span>CHF 0</span><span>CHF 3'000</span></div>
      </div>
    </div>

    <div class="calc-outputs">
      <div class="calc-panel">
        <div class="calc-panel-title">Per Gateway / Year</div>
        <div class="calc-row">
          <span>Platform license</span>
          <span>
            CHF {{ fmt(platformLicense) }}
            <span v-if="discount > 0" class="calc-discount">{{ (discount * 100).toFixed(0) }}% off</span>
          </span>
        </div>
        <div class="calc-row">
          <span>Logic block spend</span>
          <span>CHF {{ fmt(logicBlockSpend) }}</span>
        </div>
        <div class="calc-divider" />
        <div class="calc-row" :class="{ 'calc-highlight': platformApplies }">
          <span>VION receives <span class="calc-mechanic">{{ platformApplies ? '(platform fee applies)' : '(revenue share applies)' }}</span></span>
          <span>CHF {{ fmt(vionReceives) }}</span>
        </div>
        <div class="calc-row calc-accent">
          <span>Integrator earns</span>
          <span>CHF {{ fmt(integratorReceives) }}</span>
        </div>
        <div class="calc-divider" />
        <div class="calc-row calc-total">
          <span>End-customer pays</span>
          <span>CHF {{ fmt(endCustomerPays) }}</span>
        </div>
      </div>

      <div class="calc-panel">
        <div class="calc-panel-title">Fleet Total / Year ({{ gateways }} GW{{ gateways > 1 ? 's' : '' }})</div>
        <div class="calc-row">
          <span>VION receives</span>
          <span>CHF {{ fmt(vionReceives * gateways) }}</span>
        </div>
        <div class="calc-row calc-accent">
          <span>Integrator earns</span>
          <span>CHF {{ fmt(integratorReceives * gateways) }}</span>
        </div>
        <div class="calc-divider" />
        <div class="calc-row calc-total">
          <span>End-customer pays</span>
          <span>CHF {{ fmt(endCustomerPays * gateways) }}</span>
        </div>
      </div>
    </div>

    <p class="calc-explainer">
      Your end customers pay a single annual fee per gateway. When logic block usage is high enough, the platform fee is effectively included — covered by VION's share of logic block revenue.
    </p>
  </div>
</template>

<style scoped>
.calc {
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 24px;
  background: var(--vp-c-bg);
}

.calc-inputs {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 28px;
}

.calc-field > label {
  display: block;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.calc-value {
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin-left: 6px;
}

.calc-radio-group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.calc-radio {
  padding: 6px 16px;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  font-size: 0.88rem;
  cursor: pointer;
  transition: all 0.15s;
  user-select: none;
}

.calc-radio input {
  display: none;
}

.calc-radio.active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.calc-radio.disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

input[type="range"] {
  width: 100%;
  accent-color: var(--vp-c-brand-1);
}

.calc-range-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
  margin-top: 2px;
}

.calc-outputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

@media (max-width: 640px) {
  .calc-outputs {
    grid-template-columns: 1fr;
  }
}

.calc-panel {
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 16px;
}

.calc-panel-title {
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 12px;
}

.calc-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.88rem;
  padding: 4px 0;
}

.calc-row span:last-child {
  font-weight: 600;
  white-space: nowrap;
}

.calc-divider {
  border-top: 1px solid var(--vp-c-border);
  margin: 8px 0;
}

.calc-highlight {
  background: var(--vp-c-brand-soft);
  border-radius: 4px;
  padding: 4px 6px;
  margin: 0 -6px;
}

.calc-mechanic {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
  font-weight: 400;
}

.calc-accent span:last-child {
  color: var(--vp-c-brand-1);
}

.calc-total {
  font-weight: 700;
  font-size: 0.95rem;
}

.calc-discount {
  font-size: 0.75rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 1px 6px;
  border-radius: 4px;
  margin-left: 4px;
  font-weight: 600;
}

.calc-explainer {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
}
</style>
