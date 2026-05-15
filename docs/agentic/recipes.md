---
title: Recipes
description: Example prompts and workflows for AI-assisted Dale development.
---

# Recipes

These recipes show example prompts and the expected agent workflow. They work with any AI coding tool.

## Create a Logic Block from a Description

**Prompt:**
> Create a logic block called `RoomController` that has a temperature measuring point (double, °C), a setpoint property (double, °C, configurable, default 21), and a heating output (boolean). Every 5 seconds, compare temperature to setpoint and enable heating if temperature is below setpoint minus 0.5°C hysteresis.

**Expected agent workflow:**
1. `dale add logicblock RoomController`
2. Add properties, measuring points, and a service provider contract for the output
3. Implement the control logic with `[Timer(5)]`
4. `dale build` to verify compilation
5. Write tests for the hysteresis logic
6. `dale test` to verify

## Add a Modbus Device Integration

**Prompt:**
> Add a logic block that reads 3 voltage registers (float, starting at address 0) and 1 power register (float, at address 52) from a Modbus RTU device every 2 seconds. Expose voltage L1/L2/L3 and total power as service properties with units.

**Expected agent workflow:**
1. Create the logic block with `[ServiceProviderContractBinding]` for `IModbusRtu`
2. Add service properties with `[ServiceMeasuringPoint]` and unit annotations
3. Implement `[Timer(2)]` method with batch read for voltages and individual read for power
4. Add error handling with error count property
5. `dale build` and `dale test`

## Write Tests for an Existing Block

**Prompt:**
> Write comprehensive tests for the RoomController logic block. Test that heating turns on below setpoint, turns off above setpoint, and respects the hysteresis band.

**Expected agent workflow:**
1. `dale list --output json` to understand the block's structure
2. Create test class using TestKit
3. Use `InitializeForTest()` and `CreateTestContext()`
4. Test boundary conditions around the hysteresis
5. `dale test` to run the tests

## Build, Test, and Publish

**Prompt:**
> Build the project, run tests, fix any failures, then upload to VION Cloud with release notes "Added room controller with hysteresis logic".

**Expected agent workflow:**
1. `dale build` — fix any compilation errors
2. `dale test` — fix any test failures
3. `dale upload --release-notes "Added room controller with hysteresis logic"`
4. Report success or failure

## Refactor Properties for Dashboard Display

**Prompt:**
> Update the BatterySimulation logic block: mark StateOfCharge as primary on the dashboard tile, group the charging and discharging properties under Status, and add a status indicator enum for battery state (Charging, Discharging, Idle, Fault).

**Expected agent workflow:**
1. `dale list --output json` to see current structure
2. Add `[Presentation(Group = PropertyGroup.Status, Importance = Importance.Primary)]` to `StateOfCharge`
3. Add `[Presentation(Group = PropertyGroup.Status, Importance = Importance.Secondary)]` to the charging / discharging power properties
4. Create a `BatteryState` enum with `[EnumLabel("...")]` and `[Severity(StatusSeverity.X)]` on each member
5. Add a status enum property with `[Presentation(Group = PropertyGroup.Alarm, StatusIndicator = true)]`
6. `dale build` to verify (the Dale analyzers catch most authoring mistakes)
