---
title: "Thinking about how to really give Docker help"
---

Over the past months, I'm noticing some understandable confusion around some of these Docker concepts:

- Build time vs Run time concerns
- Images vs Containers
- Layers, cache, and optimization (and when you should even care)
- Containers vs Services
- Networks, ports, compose, and "localhost"
- Volume Mounts (and the different types)
- Container reuse patterns
- Sidecar container patterns
- Stateless vs Stateful

Of course I try to assist others as much as possible. There is even this running bat signal joke in the Twitch Dev community that if you say "Docker" three times, I show up in chat/discord to help.

That said, jumping right in the middle of something, and via chat only, leads to more confusion and frustration. Here are a few reasons why:

1. Chat is async, one-way, and has a delay. The delay is both technological (speed of light) and human (how often the streamer/poster is looking at when you are sharing).
1. Instead of holistically being able to teach a concept, you are treating immediate "stuffs on fire, and I'm getting frustrated" symptoms.

I plan to start tackling a few of these confusions. Primarily because I want people to get "help" when I'm not available, and also because you can get yourself in to serious issues and end up hating Docker, Containers, and all this, and go back to running a steady-state, stateful solution that needs previous gen attention and grooming forever.

Here is what I'm thinking in terms of a plan of approach:
`

1. As many quick notes and tips as it takes to cover the actual basic misunderstandings.
1. Stream the education live on [my Twitch stream](https://www.twitch.tv/roberttables), and archive the VODs for future use.
1. Ensure discovery and quick sharing when someone needs help.
1. Formalise the content into more of a structured, logical progression curriculum.
1. Solicit feedback from of others and curate examples
1. Sell all of it <3
