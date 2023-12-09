---
title: "[paper-review] Folding for Learning on Point Clouds"
last_modified_at: 2023-11-22
# header-includes:
#    - \usepackage{bbm}
categories:
  - paper-review
  - paper-review/cv
tags:
  - Point Cloud
  - Auto Encoder
  - ACM
  - '2019'
excerpt: "paper review about FoldingNet"
use_math: true
classes: wide
---
> ACM 2019. [[Paper](https://arxiv.org/abs/1801.07829)] [[Github](https://github.com/WangYueFt/dgcnn)]
>
> Yue Wang<sup>1</sup>, Yongbin Sun<sup>1</sup>, Ziwei Liu<sup>2</sup>, Sanjay E. Sarma<sup>1</sup>, Michael M. Bronstein<sup>3</sup>, Justin M. Solomon<sup>1</sup>
> Salah Rifai<sup>1</sup>, Pascal Vincent<sup>1</sup>, Xavier Muller<sup>1</sup>, Xavier Glorot<sup>1</sup>, Yoshua Bengio<sup>1</sup>
> 
> Jun. 11

### 한 문장 요약

Point Cloud의 Feature를 Graph CNN 구조로 추출해보자.

### Contribution

* **EdgeConv**:
  * local geometric structure를 얻어냄. 
  * `edge feature`를 만들어내며, 이는 point와 its neighbor의 relationship을 나타낸다. 그리고 당연하게도 이는 permutation invariant 하다.
    * 기존의 PointNet++ 에서는 local feature에 대해 포착하지 못하는 한계점을 극복하고자 한다.
* layer를 거쳐가며, dynamic하게 업데이트 되는 grpah에서도 잘 작동한다.
* 쉽게 다른 방법론에 붙일 수 있다.

### Methodology:

$$
\begin{equation}
  \mid \mid J_{f}(x) \mid \mid^{2}_{F} = \sum_{ij} \left( \frac{\partial h_{j}(x)}{\partial x_{i}}\right)^{2}
\end{equation}
$$

* $x \in \R^{d_{x}}$: Input is mapped by encoding function $f$ to hidden representation $h$, $h \in \R^{d_{h}}$

이 sensitivity penalization term은 feature space에서 학습 데이터간에 **contractive** 하게 만들어준다. 즉, 조금 더 representation이 좋아지게 하려는 의도인 것이다.

그렇게 Objective loss function은 아래와 같이 전개할 수 있다.

$$
\begin{equation}
  \mathcal{J}_{\text{CAE}}(\theta) = \sum_{x\in D_{n}} (L(x, g(f(x))) + \lambda \mid\mid J_{f}(x) \mid\mid^{2}_{F})
\end{equation}
$$


### Conclusion: 

DAE 에서는 Encoder가 입력 데이터의 작은 변화 혹은 노이즈에 저항하는 것에 목적을 두었으며,
CAE 에서는 Decoder에서 reconstruction을 할 때에 중요하지 않은 입력의 변화를 무시하는 것에 목적을 둔다.
저자는 이러한 효과를 Encoder의 Jacobian matrix에 penalty function을 추가하며 구현했다.

### Thoughts:

* Auto-encoder에 대한 연구 흐름을 잘 요약해주는 연구인 것 같다.
* Encoder의 Jacobian matrix에 Penalty, 즉 이 행렬을 최소화 하는 것이 명확하게 어떠한 물리적인 의미로 Contractive 한 측면에서 도움이 되는지는 잘 이해가 되지 않았다.
* Point cloud feature extraction 관련된 논문을 찾다가 읽게 되었으며, 구현된 코드를 돌려보며 얼마나 잘 represent 되는지 확인해봐야 할 것 같다.