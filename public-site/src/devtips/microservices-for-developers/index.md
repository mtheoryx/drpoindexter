---
title: "Microservices, Monoliths, and Myths, for Developers"
date: "2021-03-22"
description: "'Microservices' as a term gets thrown around a lot in conversation, but let's break down what this term even means for a developer. And call out some potential problems."
status: "seedling"
---

You see the term `microservices` tossed around often on powerpoint slides, webinars, and sales glossy handouts, but it's one of those words that we seldom discuss in detail as developers. Let's cut through the noise and talk about what this means to you, a developer.

## <a name="top"></a>Why Microservices

AWS themselves have a few things to say about this, and we'll touch on each of them shortly.

[8 Reasons for Microservices from AWS (external link)](https://pages.awscloud.com/rs/112-TZM-766/images/AWS_8_Reasons_pdf.pdf)

_You can click to jump to the sections, if you'd like_

- [Pick the Right Tool for the Job](#right-tool)
- [Improved Resiliency](#resiliency)
- [Refined Cost control](#cost)
- [Improved Team productivity](#productivity)
- [Reuse with Composition](#reuse)
- [Safely experiment, Reduce Failure Impact](#experiment)
- [Accelerate Tech Adoption](#tech-adoption)
- [Deploy Faster, and Safer](#deploy-safe)

### <a name="right-tool"></a>Pick the Right Tool for the Job

[Back to list](#top)

One misunderstanding about this is that it's just a buffet of programming languages and stacks that you get to pick whatever you want to use. It promises freedom from bureaucracy telling you what to use.

Is it maybe a little bit of that? Sure. But that's not really the intent. It's a lot less about language choice, and a lot more about systems design.

Netflix, for example, uses a concept they call the "Paved Road." There are a core set of languages, stacks, libraries, and services that are very well understood. And most importantly, very well supported internally. There is flexibility, but it's the most-supported "road" to stay close to.

Can you wander off-road? Sure, but you're a little bit on your own at that point, and need to make that decision intentionally, and do extra things to mitigate risks.

So what is an example of "the right tool" not being about programming languages? Data stores. Specifically, picking the correct, purpose-built data store for the service.

If the service is going to be highly transactional, with purely relational data, Redis is not going to be the best choice. If the service requires burstable high-throughput writes of non relational data, DynamoDB may be a better fit than a large RDS instance.

> To sum it up:
>
> - It's not 30 programming languages
> - Stick to Paved Road (Netflix example)
> - Purpose-built data stores (recommended practice)

### <a name="resiliency"></a>Improved Resiliency

[Back to list](#top)

Resiliency is crucial when architecting systems. Failure should be expected as a rule, not treated as an exception. There are things beyond control, but not beyond design. Identify failure modes, and compensate for those from the beginning.

Microservices allow you to take the many different parts of your system and separate them into controllable pieces that all have their own failure modes. What happens when one service fails? The entire system need not come crumbling down. Instead, it may just result in temporary availability issues of one part of the system. How about an example?

Take a look at the entirety of Amazon eCommerce. To start, you can break this into a few crucial components:

- Inventory Listing (How do we see the thing?)
- Adding things to carts (How do we select the thing?)
- Financial transactions (How do we buy thing?)
- Logistics and Delivery (How do we get the thing?)

Taking a look at financial transactions. One could say for an eCommerce company, and outage of this functionality would be the end of the world, and we'd call the whole thing "crashed". With a monolith, you'd be right.

However, just because you can't pay for a thing doesn't mean things currently on trucks just... stop being on trucks on the way to you. Nor does it mean you just can't list any items. And it also doesn't mean you can't still shop and select items you want to buy. You know, when the payment service recovers.

> To sum it up:
>
> - One service failing should not be a total system failure
> - Inventory, add to cart, payment, shipping, should be independent and fault tolerant

### <a name="cost"></a>Refined Cost control

[Back to list](#top)

In a monolith, the environment must scale up to the demand that is required by any part of the system. WordPress is a great example of this. Regardless what part of the CMS is experiencing the demand, the entire thing must grow to compensate for this.

However, if this were broken apart into independent services, those could be scaled independently, leaving the other services right where they were. And metrics can be granularly collected on each service to pinpoint exactly which one is experiencing demand increase.

If the internet is giving your latest article a great big hug, you shouldn't need to scale the authoring service if you're the only one authoring content.

> To sum it up:
>
> - Each service can be measured independently
> - Each service can scale independently
> - Each service can have it's own approved quotas and alerting

### <a name="productivity"></a>Improved Team productivity

[Back to list](#top)

Developing features and remediating defects in a monolith requires a wholesale reproduction of the entire system and stack, just to get started. Depending on the size and complexity of such a monolith, even the most sophisticated development environments can be sufficiently taxed for resources.

There's also the "where is the problem" aspect of tracking down the issue, finding the code culprits, then fixing (hopefully) the problem. The entire stack then needs shoved through the CI/CD pipeline, and redeployed in its entirety, often involving some system-wide downtime.

Alternatively, with microservices, it's easier to track down an individual service's failure (thanks to more fine grained alerting, logging, and monitoring). This then means there is less complexity to reproduce, and find, and fix, and push, and redeploy.

As discussed above, it's possible for this entire process to be done with minimal interruption to the system if we've architected for expected failure modes.

> To sum it up:
>
> - Far easier to collaborate via api contracts
> - Faster and easier to unit test and develop against specific services
> - Faster to run a service vs an entire stack
> - Mocking stacks to api contracts

### <a name="reuse"></a>Reuse with Composition

[Back to list](#top)

If we think about the Single Responsibility Principle in software design, and apply the same line of thought to systems and services, a fascinating pattern emerges. So long as we honor our existing service contracts, we can enhance our service as feature requirements change, with impact limited to only the responsible service.

Additionally, it often happens that a service already exists that can just be leveraged by another system as business needs change. As an example, a service that aggregates metrics and analytics data could then be orchestrated into a new service to collect user behavior data, uptime reporting, resource utilization, and much more.

The additional use cases require changes only to one service, instead of something that threads and snakes its way through the monolith. Or worse, complete rewrites of previously-working functionality.

> To sum it up:
>
> - New use cases don't require rewrites
> - Services can consume others as new features are made available

### <a name="experiment"></a>Safely experiment, Reduce Failure Impact

[Back to list](#top)

Experimenting with new technology and design patterns used to be quite difficult in a monolith. One particular challenge is the codebase itself; keeping in sync with the rest of the changes while you develop your experiment. Using a service based architecture reduces the amount of "other" code you are competing with as you try to migrate to a new pattern.

As an example, trying to migrate to leveraging state machines for state management. It's difficult to do this to an entire monolithic application, but can be more manageable when limited to a purpose-built, focused service, while not impacting others.

> To sum it up:

- Experiment in controlled isolation
- Easily deprecate failed experiments
- One bad feature doesn't bring down an existing system

### <a name="tech-adoption"></a>Accelerate Tech Adoption

[Back to list](#top)

As an example, adopting new logging and metrics tools is scoped down to a single, focused service. And if the experiment is deemed a failure, the impact of that failure is restricted down to just the service, while the rest of the system can still perform as before. Consider it a canary, of sorts.

And any time a new service is being considered, it's a perfect opportunity to use it as a test bed for a new emerging technology or a different design pattern. The risk is tightly controlled, and more easily measured and evaluated.

Additionally because there is less functionality and responsibility in a single microservice, there is also much less to grok for new team members when trying to onboard. These new contributors can more quickly bring their expertise and new ideas to the project, demonstrate the ideas, and perhaps kick off a broader adoption in other services in a planned and coordinated fashion.

> To sum it up:
>
> - Allows adopting new tech in isolation vs entire stack rewrite
> - Allows new team members to bring new experience to the team and freedom to more narrowly demonstrate future tech

### <a name="deploy-safe"></a>Deploy Faster, and Safer

[Back to list](#top)

Ah, deploy day. Or night. What a time to be alive, right? Middle of the night, sure hope traffic is low and everyone is logged out. Hope it all goes as planned. Oh it didn't? Hecc, how do we unravel this, redeploy the whole thing another time after we fixed this.

That's life in the monolith. Personally? I don't miss it.

Instead, it's less stress when focusing on a single service. Consider possibly a canary or a blue-green deployment. The code changes are smaller, the build and test times are faster, the deploy and go-live times are minutes, not hours.

Problem with the deploy? You still need to roll back, but the rest of the system is left much less disturbed, and the previous working version will be reverted to via DNS or redeployed much faster than an entire monolith.

> To sum it up:
>
> - Deploying the world vs one service
> - Downtime is shorter or non-existent
> - Rollbacks are faster

## <a name="recap"></a>Recap

[Back to list](#top)

Breaking a monolith into loosely-coupled, event-driven services offers some amazing potential benefits in the areas of cost, flexibility, and security.

This is not to say there won't be challenges. Microservices done poorly are worse than a mediocre monolith. The complications will normally come in a few flavors:

- Service discover
- Versioning
- Couple-changes
- Breaking contracts

With this in mind, make sure to have a discussion with your team. Identify those challenge points and consider them from the start as you start to adopt an application modernization effort, or green field development.

[Back to list](#top)
