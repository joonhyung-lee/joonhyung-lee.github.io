---

layout: post
title: "Flow Matching"
date: 2025-07-09
header-includes:
\- \usepackage{textcomp}
\- \usepackage{mathtools}
\- \usepackage{amsmath,amssymb,amsfonts}
\- \usepackage{graphicx}
\- \usepackage{textcomp}
\- \usepackage{xcolor}
categories:

* Generative Models
* Flow Matching
  tags:
* Generative Models
* ICLR
* '2023'
  description: "Flow Matching"
  use\_math: true
  classes: wide
  giscus\_comments: true
  related\_posts: true

---

## Motivation

최근 생성 모델에서 두각을 드러내고 있는 두 가지 접근 방식은 **Diffusion 모델**과 **Flow Matching**이다. 이 두 기법은 겉보기엔 유사해 보이지만, 실제로는 어떤 관계인지 헷갈리기 쉽다. 이 글은 Google DeepMind의 Article ["Diffusion Meets Flow Matching: Two Sides of the Same Coin"](https://diffusionflow.github.io/)을 바탕으로, 이 두 framework의 본질적인 equivalence을 정리하고, 실질적으로 상호 변환 가능한 구조라는 것을 설명한다.

## Overview

### Diffusion 모델

* 데이터를 점점 노이즈로 덮어씌우는 **forward process**과, 노이즈로부터 데이터를 복원하는 **reverse process**으로 구성됨.
* 대표적인 sampling 방법으로 **DDIM(Denoising Diffusion Implicit Models)**이 있음. 이는 deterministic한 방법이며, 초기 노이즈로부터 점진적으로 깨끗한 샘플로 이동함. (그러나 모델 학습은 여전히 implicit density modeling 이다. 즉, likelihood를 명시적으로 정하지 않으며, sampling 과정을 통해 데이터를 생성한다.)

> ## Summary:
>
> **DDPM (Denoising Diffusion Probabilistic Models)**
> 
> * stochastic forward & backward SDE (noise injection 포함)
> 
> * sampling은 stochastic, likelihood-based training
> 
> **DDIM (Denoising Diffusion Implicit Models)**
> 
> * 같은 학습 방식 사용, 같은 사전 훈련 모델 사용
> 
> * 단지 sampling 과정만 deterministic하게 재구성
> 
> * deterministic ODE 기반의 sampling
> 
> * 여전히 explicit한 likelihood는 없으므로 implicit model

### Flow Matching

* 데이터와 노이즈 간의 **Linear Interpolation**을 고려함. 특히 Gaussian noise를 사용할 경우, diffusion 모델과 동일한 Forward 과정이 됨.
* 핵심은 **velocity field** 를 학습하는 것. 이를 기반으로 deterministic하게 샘플링 가능.

> ## Summary:
>
> ### 중요한 유사점
> 
> * Forward 과정이 동일함 (Gaussian noise로 가정했을 때에).
> 
> * Sampling 또한 본질적으로 동일하며, DDIM = Flow Matching Euler Sampler임.

## Sampling

* 일반적으로 diffusion은 **곡선 경로**, flow matching은 **직선 경로**라 알려졌으나 이는 오해임.
* 실제로는 모델이 **정확**할 때만 직선 경로가 나오며, 현실적 분포에서는 noise schedule에 따라 경로가 달라짐.

> ## Summary:
>
> * **DDIM = Flow Matching (Euler 방식)**
> 
> * noise schedule에 linear scaling을 적용해도 결과 샘플은 동일함 (sampling path만 달라짐)

## Training

* Diffusion과 Flow Matching 모두, MSE 기반의 손실함수 사용:
  * (i.e.,: $\mathbb{E}[\| \hat{x}_\lambda - x \|^2]$)
* Flow Matching은 **vector field** ($\vec{v}_t$)를 직접 예측하는 형태를 사용함.
* Network 출력은 다양하지만, 적절한 reweighting을 통해 모두 같은 목적함수로 변경 가능함.
* Flow Matching에서 제안된 출력 형태는 $\hat{v}_{\mathrm{prediction}}$과 유사하며, High/Low Frequency 영역 모두에서 안정적임.

### Weighting Function

* 학습 시 가장 중요한 것은 **weighting function**임.
* 이는 고주파/저주파 구성 성분의 중요도를 조절하여, 모델이 더 유의미한 특징에 집중하게 함.
* Flow Matching에서 사용되는 가중치는, diffusion에서 자주 쓰이는 **$\hat{v}_{\mathrm{MSE}}$ + cosine schedule weighting**과 동일함.

### Noise Schedule

* 학습에서 noise schedule은 비교적 덜 중요함.
* 핵심은 log SNR(i.e., Signal Noise Rate)이 양 끝단에서 잘 정의되어 있는지임.

## Sampler 비교

### Deterministic vs Stochastic

* DDIM은 deterministic 샘플러이며, flow matching과 동일.
* DDPM은 stochastic하며, 샘플링 중간에 랜덤성을 추가함.
* 이 두 방식은 서로 **reparameterizable** 하며, 중간에 renoising step을 추가하면 양자 간 혼합도 가능함.

### Churn

* 샘플링 과정에서 **초기 예측보다 후기 예측에 더 무게를 두기 위한 기법**임.
* 초기 단계의 불확실성을 줄이고, 후기의 더 정확한 예측에 비중을 높임.

## 수학적 관점: ODE vs SDE

* Diffusion은 **확률 미분방정식(SDE)** 로 설명됨: Brownian motion 기반.
* Flow Matching은 **결정론적 미분방정식(ODE)** 로 설명됨.
* SDE와 ODE 모두 같은 표현을 가질 수 있으며, 서로 변환 가능함.

## 결론

1. **Diffusion 모델과 Flow Matching은 Gaussian 가정 하에 본질적으로 동일**하다.
2. **Flow Matching의 새로운 기여**:
   * 새로운 Vector Field 기반의 네트워크 출력 제안
   * 단순한 noise schedule로도 동일한 샘플링 가능
3. 이 equivalence 덕분에 두 framework 간 **혼합해서 사용이 가능**하며, 실제 응용에서 매우 유용할 수 있음.
4. 향후 연구는 Gaussian 이외의 분포로의 확장 (예: 구조화된 데이터, 단백질 등)에 초점을 둘 수 있다.

