---
author: John Doe
title: Lego I/O
blurb: An input/output exercise using Legos.
postId: 1
image: /lego-sort-example-clumping.png
tags:
  - Groupwork
  - I/O
  - Counting
  - Medium
  - Hard
  - Medium Length
  - Long
---

# Simulating I/O with LEGOs

This proposal details an adaptation of the KIDATA Computer Science Standards 4.2 LEGO stacking game idea in an in-person format.

## Essential Questions

- What is a pattern?
- How can we describe repeating and growing patterns using words, tables, graphs, or symbols?
- How can pattern identification be used to solve problems?

## Overview

The game is intended to be a problem solving game that encourages its participants to solve problems in unique ways using a set of provided tools.

## Resources

Participants will divide into groups. They will be given a small set of tracking-related resources: a pencil, and one (or a few) sheets of paper.

The activity is oriented around LEGOs of varying color. Both the number and color of the necessary LEGOs vary with respect to the rules of the “LEGO exchange” (see below).

## Operation

Participants will be provided a stack of LEGOs of varying color (all groups receive the same pattern), and are provided a reference image of a stack of LEGOs. The participants’ goal is to match the reference image by splitting and using LEGO exchange in the fewest possible steps, with the intent of encouraging friendly competition between groups. The group that uses the fewest sum of steps from all of the rounds can be subject to a prize.

![LEGO Reference Image Example](/lego-sort-reference-sample.png)

<center>An example of a reference image using three LEGO colors.</center>
<br />

If an exchange key is not provided to groups, participants will have to consume steps to figure out the rules of the exchange. This encourages group members to engage with each other.
Groups may either be entrusted to track themselves, or a chaperone may be assigned to each group to track their actions for them and provide healthy guidance throughout the activity. Steps consist of:

- Exchange: 1 exchange = 1 step
- Attaching LEGOs together: 1 step
- Detaching LEGOs: 1 step

## LEGO Exchange

A LEGO “exchange” will be set up somewhere in the vicinity of all of the groups. This will be a line of chaperones that allow the participants to trade their LEGO colors. The LEGO exchange is intended to be a direct parallel to functions, converting a given input by a set of rules.

Generally, the exchange should have rules that engage critical thinking skills. The transactions should be consistent and presented to the participants in a clean, concise manner. For example, the exchange can follow:

1.  Color: if a participant provides a blue LEGO to a yellow exchange, they will receive a yellow LEGO.
2.  Mix colors: if a participant presents a blue LEGO to a yellow LEGO exchange, they will receive a green LEGO.
3.  Change yield: a yellow LEGO exchange may only accept groups of 2 LEGOs, and may provide a single blue LEGO in return.

It is also encouraged to later allow clumping, the process where a single exchange may convert groups of LEGOs.

![LEGO Exchange Clumping](/lego-sort-example-clumping.png)

<center>An example of clumping. Here, three coloring rules were compressed into one.</center>
<br />

The exchange may also be presented in a finite manner. In this case, students should be eager to figure out the rules of the game as soon as possible before their allotted pieces are gone. In the case that a group cannot create the LEGO stack as presented in the reference image, they are automatically given a certain amount of steps. Such a policy may have some caveats, like groups hoarding LEGOs, so it must be carefully doctored.

## Example

Let's say we are provided the following stack using three colors of LEGOs and exchange key:

![LEGO Provided Stack](/lego-sort-example-reference.png)

<center>Provided LEGO stack.</center>
<br />

![LEGO Exchange Key](/lego-sort-example-exchange.png)

<center>LEGO exchange key (not presented to participants).</center>
<br />

...and we need to convert our LEGO stack to look like the following reference image:

![LEGO Reference Image](/lego-sort-example-target.png)

<center>Provided LEGO reference image.</center>
<br />

Here, we allot 3 steps to discover the rule. Ideally, this would mean someone provides a red LEGO to the exchange. Via the key, the exchange provides a blue LEGO. This same blue LEGO can put into the exchange again to yield a yellow, and likewise for the yellow. This covers all bases for the exchange rules.

Since all 3 steps were used for experimentation, whatever actions we take next now will count against us.

Let's consider two cases for this problem:

1.  Clumping is not allowed.

Since clumping is not allowed, we must present LEGOs in groups of the same color to the LEGO exchange.

![Splitting Example](/lego-sort-splitting.png)

<center>An example of splitting. Each division counts as a step, so 2 steps were made.</center>
<br />

To get our reference image, we may follow a process similar to the following:

![Splitting Solution](/lego-sort-example-splits.png)

<center>A sample solution using splitting.</center>
<br />

We were only allowed one split at a time, each consuming a step. This solution was relatively simple due to the minimal amount of colors and LEGOs, but prohibiting clumping may introduce excess complexity to solutions, causing participants to develop lengthy algorithms. Introducing this complexity may also better engage critical thinking and teamwork skills, which may lead groups to come up with more unique solutions.

2.  Clumping is allowed.

Here, the solution is much more simple. Since we have identified the exchange rules, it is clear that each of our LEGO bricks in the stack went through one cycle in the exchange. Thus, we can provide the entire stack to the exchange at once:

![Splitting Solution](/lego-sort-example-clumping.png)

<center>A sample solution using clumping.</center>
<br />

Introducing clumping does not eliminate the concept of splitting, but may simplify certain operations by a significant margin. Allowing both is ideal, providing participants more of a sandbox-like experience; however, it may be wise to use these two examples as an introduction to each of the concepts.

## Recommendations

It is is _highly_ recommended to create your base and goal target LEGO stacks after creating your LEGO exchange.

Using a random reference image may lead to impossible (or extremely difficult) solutions. It is also encouraged to create your LEGO exchange rules with a means to revert an in-progress stack back to its initial state.

If this is not feasible, you can offer a "reset", where groups can reset their steps to `+ 1` of its original state (e.g. resetting once makes you start with 1 step, restarting twice makes you start with 2). This may damage continuity, as participants may be able to explore the exchange more with little to no penalty.

## Contact

If you have any questions, feel free to email me at golden2402@vt.edu.
