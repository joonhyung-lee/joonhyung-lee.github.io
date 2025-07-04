---
layout: post
title: "Generative Agents"
date: 2025-07-04
header-includes:
    - \usepackage{textcomp}
    - \usepackage{mathtools}
    - \usepackage{amsmath,amssymb,amsfonts}
    - \usepackage{graphicx}
    - \usepackage{textcomp}
    - \usepackage{xcolor}
categories:

categories:
  - Package Manager
tags:
  - Python
  - Package Manager
description: "Python Package Manager"
use_math: true
classes: wide
giscus_comments: true
related_posts: true
---

<div style="text-align: center;">
    <img src="/assets/img/ga/overview.png" style="max-width: 50%; height: auto;" />
</div>

## Motivation

- 기존의 게임 NPC, 시뮬레이션 에이전트, 사회학 실험용 인공사회 모델 등은 **short-term context 기반 rule-based/finite-state behavior**에 머물렀음.
- 인간과 비슷한 장기적 일관성, 기억에 기반한 행동 변화, 관계 형성, 정보 확산 등은 구현 불가능했음.
- LLM의 언어적 시뮬레이션 능력 덕분에 **"Believable social agents"** 가능성이 열림 → 하지만 **memory, reflection, planning 같은 장기 coherence 구조 부재**.


## Main Contributions

1. **Generative Agent라는 새로운 개념 제안**
    - **장기 기억**, **상황별 memory retrieval**, **반성적 reflection**, **일일 계획 수립**, **환경에 따른 재계획**, **실시간 대화** 능력을 갖춘 에이전트.
2. **LLM + Long-Term Memory 기반 Agent Architecture 제안**
    - 메모리 스트림 (Memory Stream)
    - 중요도/관련도/시간가중 기반 memory retrieval
    - Reflection Tree를 통한 자기 일반화 및 inference
    - Hierarchical Planning (하루 계획 → 시간 chunk → 5~15분 행동 단위)
    - Event-driven Reactive behavior loop
3. **Emergent Social Behavior Demonstration**
    - 예시: Valentine’s Day 파티
        
        → 단일 seed intent에서 시작 → Information Diffuse → 초대 → date 신청 → Event
        
4. **Controlled User Study로 Believability 검증**
    - Human baseline과 ablation models 대비
        
        → Full architecture > no-reflection > no-reflection/planning > no-memory > human baseline 순으로 성능 우위.
        


## Architecture

<div style="text-align: center;">
    <img src="/assets/img/ga/architecture.png" style="max-width: 50%; height: auto;" />
</div>

<div style="text-align: center;">
    <img src="/assets/img/ga/memory_1.png" style="max-width: 22%; height: auto; margin: 0 1%;" />
    <img src="/assets/img/ga/memory_2.png" style="max-width: 22%; height: auto; margin: 0 1%;" />
    <img src="/assets/img/ga/memory_3.png" style="max-width: 22%; height: auto; margin: 0 1%;" />
    <img src="/assets/img/ga/memory_4.png" style="max-width: 22%; height: auto; margin: 0 1%;" />
</div>

1. **Memory Stream**
    - Agent의 모든 observation, plan, reflection을 natural language로 기록 (timestamp 포함)
    - 각 memory에는 **Recency, Importance, Relevance score**가 있음.
2. **Memory Retrieval**
    - **Query-dependent weighted sum**으로 top-k memory 선택
    - Retrieval function: `score = α1·recency + α2·importance + α3·relevance`
    - Similarity는 embedding 기반 cosine similarity.
3. **Reflection**
    - 일정 중요도 이상 메모리 축적 시 **self-query generation → LLM summarization → reflection memory 생성**
    - 예: "Klaus is passionate about research" 같은 agent-level generalization 생성
    - **Recursive Reflection Tree** 형식으로 저장
4. **Planning**
    - **Day-level → Hour-level → Minute-level top-down hierarchical planning**
    - LLM으로 next-day plan 생성 → 하위 행동 시퀀스로 재귀 분할
5. **Action & Reaction**
    - 실시간 상황 입력 → Plan 유지 여부 판단 → 필요 시 Replanning
    - Agent 간 대화 시 **retrieved partner-specific memory + dialogue history**를 context로 사용.
6. **World Grounding**
    - Smallville sandbox world (The Sims 유사)
    - Environment는 JSON tree → 자연어 표현으로 flatten 후 LLM에 전달
    - User intervention 시 객체 state 변화 반영 → agent가 변화 감지 후 행동.


## 주요 실험 (Evaluation)

1. **개별 에이전트 Believability 평가**
    - Interview 기반 memory recall, planning ability, reflection ability 평가
    - Ablation study로 **reflection과 planning 모듈의 기여도 정량화**
2. **End-to-End 시뮬레이션**
    - 2일간의 virtual life 기록
    - 정보 전파, 관계 형성, 이벤트 coordination (예: 선거 후보 출마 및 소문 퍼짐, 밸런타인데이 파티 등)
    - Human raters의 believability ranking (TrueSkill 기반 비교)


## Limitation & Discussion

- Memory retrieval miss, LLM hallucination, overly formal speech style 등
- Ethics: **Parasocial relationship 위험**, **deepfake risk**, **persuasion bias**에 대한 우려
- 차후 연구방향: **long-context LLM + structured knowledge integration + realistic social simulation + real-world robotics 적용 가능성**


## Thoughts

Generative Agents는 **LLM의 언어적 생성능력 + Explicit memory / planning / reflection 모듈**을 결합해, 단순한 LLM-based chatbot이나 기존 state-machine agent와는 차별화된 **장기 일관성, 사회적 상호작용, 자기성찰형 behavior 시뮬레이션 플랫폼**을 실현했다는 점에서 의미가 크다.