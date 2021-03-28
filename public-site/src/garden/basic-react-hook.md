---
title: "What is a react Hook anyway, and why am I excited?"
---

# What is a Hook

React introduced Hooks in version 16-something. At first, there was a lot of confusion. And some of the most consequential benefits were barely noticed.

That said, what React did communicate is Hooks let you handle two important things: State and Side Effects. Previously, you had to use Class components and the component lifecycle for either of these. A simple stateless functional component, obviously would not work.

## What a Hook is NOT

A Hook is not just a way to always only use functional components, and there is no mandate to rewrite anything. Class components are not deprecated.

When things like this come up, there is always a knee-jerk reaction and fear of "well we knew it, Facebook broke everything!" This is not the case. At all.

Hooks are just another tool in your toolbox.

## Why this is important

I feel like Hooks are one of those shifts that require some time to appreciate. Remember when Dan Abramov created (and famously demoed) Redux? It was a game-changer for managing complex state, isolating where your state can change (and thus be broken and need debugging), and introduced an entire ecosystem of interesting uni-directional data flow solutions.

Now we have Hooks. And they are going to do the same thing for the concept of "lifecycles." Instead of all these component lifecycle methods, describe your function as an effect of your state. We don't need to have a lifecycle for 'componentWillUnmount', 'componentDidUnmount', or anything that narrowly focused. Just describe a cleanup function. Unset some stuff, clear out some LocalStorage, unregister some event listeners.

Changing how we look at a component from being a "thing" that has these lifecycles we need to do stuff with to being the end-result of your state and data will simplify how we build components that have side effects on 3rd party resources. Things like file systems, the browser, API calls, and anything that could have blocking behavior are now easier to describe and understand.
