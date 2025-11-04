---
outline: deep
title: Logic Blocks
---

# LogicBlocks

Deep dive into the LogicBlock architecture, lifecycle, and actor model.

## What is a LogicBlock?

A LogicBlock is the fundamental building block of a Vion IoT application. Each LogicBlock:

- Represents a single unit of business logic or device control
- Runs as an isolated actor in the actor system
- Has its own state and lifecycle
- Communicates with other LogicBlocks through interfaces
