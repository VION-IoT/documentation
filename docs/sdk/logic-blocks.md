---
title: Logic Blocks
description: Understanding logic blocks -- the fundamental building blocks of Dale applications, including lifecycle, state management, and the actor model.
---

# Logic Blocks

## What Is a Logic Block?

A conceptual overview of logic blocks as the primary unit of behavior in a Dale application.

## LogicBlockBase

The base class all logic blocks inherit from, and what it provides out of the box.

## The `[LogicBlock]` Attribute

How to decorate a class with `[LogicBlock]` and what metadata it accepts.

## Lifecycle

### Ready

What happens when a logic block enters the Ready state and how to hook into it.

### Stop

What happens when a logic block is stopped and how to perform cleanup.

## State Management

How logic blocks manage internal state, including thread-safety guarantees from the actor model.

## Actor Model Basics

How Dale uses the actor model to ensure logic blocks process messages sequentially and safely.

## Creating a Logic Block

A step-by-step outline for creating a minimal logic block from scratch.
