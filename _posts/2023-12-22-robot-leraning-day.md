---
layout: post
title: "[seminar] Robot Learning Day"
date: 2023-12-22
# header-includes:
#    - \usepackage{bbm}
categories:
  - seminar
tags:
  - Robotics and Learning
description: "seminar summary about Robot Learning Day"
use_math: true
classes: wide
giscus_comments: true
related_posts: true
---

> Robot Learning Day 세미나 내용을 기록했습니다.

### 이경재 교수님 세미나

**Sequential Preference Ranking for Efficient Reinforcement Learning from Human Feedback**

- RLHF
  - Design Reward Function from Human Feedback
- Preference: Starts with assuming.
  - Deterministic: underlined human’s return value
  - Stochastic: Bradley-Terry model
- Cognitive Load and Decision Fatigue
  - lead to incorrect, noisy labels

⇒ Using **transitivity**: 한 번의 feedback으로 많은 양의 preference label을 만들자.

- Transitivity: Set of items $$\mathcal{A}$$, a > b | b > c ⇒ a > c
- Linear Stochastic Transitivity

  - Bradley-Terry

- Sequential Pairwise Comparison
  - Preference Labelling 이후에, **하나의 component를 남겨놓음.**
    - `Increasing sequence`: j-th index 까지 increase하는 상황을 가정. (Average case.)
- Root Pairwise Comparison
  - 지금까지 수행한 것 중 **가장 선호하는 것을 Back-tracking.**
  - case가 훨씬 단순하며, augmentation의 양이 더욱 많음. (Best, Worst Case)
    ⇒ 새로운 trajectory data에 대해서 많은 양의 preference label이 추가됨.
    - 보라색 line은 transitivity를 통해 얻어낼 수 있는 데이터를 뜻함.

#### Is it always beneficial?

- 반드시 data dependency가 생기게 됨.
- Dependency Graph $$G$$
  - error bound 유도가 이미 되어 있음.
  - $$\Delta G$$: dependency graph
    - edge의 수가 해당 값인 degree를 의미함.
  - Every M roond 때에 dependency graph를 끊어줌.

### 오윤선 교수님 세미나

- MAPF: Multi-Agent Path Finding

  - Conflict-Based Search: Optimality를 보장함.
  - Priority-Based Search: 계획 속도 측면에서 효율적.

- Robot Safety conflict

  - Cycle Conflict가 발생하게 됨. 서로 갇히게 됨.

- Implicit language instruction이 제공되었을 때에 적절히 수행할 수 있는 연구를 수행 중임.

  - `Get me something to tighten`
  - `Get me something to wear on`
    - Grasp pose를 retrieval

- `“대부분의 작업 계획은 상식을 기반으로 수행됨.”`
- LLM + Feasibility를 확보하는 연구.
- Scene Graph를 Text-embedding으로 표현.
- VLM-based Task Planning
  - `Tell me the order of which objects to pick up.`
  - **LaVIN**

### 강민재 연구원 논문 소개

#### Object Rearrangement Planning for Target Retrieval

- Target 회수 문제

  - Occlusion + Collision
  - Unoccupied space is limited

- 기존의 가정: 모든 size를 알고 있음 + 모든 방향에서 잡을 수 있음.

  - shape+position을 추정 + grasping 자세가 제한됨
  - NP-Hard ⇒ Sequential sub-problem
    - What is sub-problem?
    - How can we solve this?
    - Sequential sub-problem: able to solve?

- TSAD: Tree Search with Approaching Direction
  - Ref: GP3 paper; **optimal theta**를 얻게 됨.
  - 이러한 theta set을 **Smallest Rearrangement Set**으로 정의함.
    - 이 집합이 공집합이 되면, collision 없이 물체를 꺼내올 수 있다는 것임.
  - Point Cloud-Based Simulation;
    - pointcloud를 움직이며 간접적으로 이해하려고 함.
      - Prehensile Decision Network
      - Task-Specific State Reward Function

### 홍민의 연구원 논문 소개

#### Diffused Task-Agnostic Milestone Planner

Goal-conditioned RL

- Temporally-Sparese Milestone: sub-goal을 tracking 하게끔 함
- Predict milestones only once.

#### 권오빈 연구원 논문 소개

- Grid-based Visual Navigation
  - RNR-Map: Renderable Neural Radiance Map

### 기호건 연구원 논문 소개

#### SDF-Based Graph Convolutional Q-Network

- Find Action sequence
  - Sign-Distance Function을 기반으로 학습.
    - Fast Marching Method
    - MDP의 state로 정의됨.
- SDFGCN
  - Scene Graph Generation
    - Init image / Final image를 기반으로, **어떠한 방향으로 밀어낼지**를 학습함.
    - Complete Sub-graph를 생성함.
    - **SDF representation이 나름 표현력이 뛰어남.**

### 오정우 연구원 논문 소개

#### SCAN: Socially-Aware Navigation Using MCTS

- plan paths without considering future states or human-robot interaction

  - HRI must be considered!

- MCTS로 multi-traj를 sampling

  - Simulation에서 Value-function 계산
  - Real-world Deploy
  - High-level planner를 만듦.
    1. Cost-aware RRT-Star: Tree Search
    2. Value Prediction:
       1. MCTS-sampled trajectory
       2. Local goal
       3. Global goal
    3. Candidate Selection based on Value

- Evaluation
  - Task: Point Goal Navigation
  - SANS: Socially-aware navigation score
    - CR: goal까지 온전하게 수행될 percentage
    - SP: speed
    - PE: Path efficiency
    - SF: Safety score, LIDAR 값 중 최소값을 기준으로 safety-verification
    - ST: Stability score; 이러한 Unsafe state에서 얼마나 빠르게 stable state로 빠져나왔는지.
