---
title: "[paper-review] 6-DOF GraspNet: Variational Grasp Generation for Object Manipulation"
last_modified_at: 2023-11-14
# header-includes:
#    - \usepackage{bbm}
categories:
  - paper-review
  - paper-review/cv
tags:
  - Grsap
  - VAE
  - ICCV
  - '2019'
excerpt: "paper review about 6-DOF GraspNet"
use_math: true
classes: wide
---
> ICCV 2019. [[Paper](https://arxiv.org/abs/1905.10520)] [[Github](https://github.com/NVlabs/6dof-graspnet)]
>
> Arsalan Mousavian, Clemens Eppner, Dieter Fox
> NVIDIA
> 
> 17 Aug 2019

<div align="center">
  <img src="/assets/img/6dof-graspnet/6dof-graspnet-introudction.png" width="75%">
  <p>Fig. 1: Introduction figure about 6-dof graspnet paper.</p>
</div>


### Summary
The paper addresses the challenge of robotic object manipulation, specifically the generation of grasp poses. The author formulates the problem as sampling a set of grasps using a variational autoencoder (VAE) and refining these grasps with a grasp evaluator model. The key contribution of the approach is to generate diverse and stable grasps of unknown objects using 3D point clouds from a depth camera.


### Methodology:

<div align="center">
  <img src="/assets/img/6dof-graspnet/6dof-graspnet-framework.png" width="100%">
  <p>Fig. 2: Overall framework about 6-dof graspnet.</p>
</div>

The author introduces a two-fold architecture: (1) a VAE for sampling diverse grasps and (2) a grasp evaluator network for refining these grasps. The VAE is trained to map partial point clouds of objects to a diverse set of grasps. The evaluator assesses and refines these grasps based on grasp quality.

<div align="center">
  <img src="/assets/img/6dof-graspnet/6dof-graspnet-vae.png" width="100%">
  <p>Fig. 3: VAE network about 6-dof graspnet.</p>
</div>

Network Architecture: Training is conducted using simulated data for grasp generation. The network is based on the PointNet++ architecture, which effectively handles 3D point cloud data. After initial grasp generation, the grasps are iteratively refined using the evaluator network, enhancing both the success rate and the diversity of the grasps.

### Experiments & Evaluation:

<div align="center">
  <img src="/assets/img/6dof-graspnet/6dof-graspnet-environement.png" width="100%">
  <p>Fig. 4: Environmental setting about 6-dof graspnet.</p>
</div>

Simulation-Based Training: The model is trained using data generated from physics simulations, FleX,  ensuring a wide range of object shapes and grasp types.
Real-World Robot Experiments: The author tests the model in real-world scenarios with a Franka Panda manipulator. The experiments involve picking up various objects, demonstrating the model's ability to generate successful grasps in a physical environment.
Evaluation Metrics: The success rate and coverage rate of grasps are used as metrics, with the model showing high performance in both aspects.

<div align="center">
  <img src="/assets/img/6dof-graspnet/result-table.png" width="100%">
  <p>Fig. 5: Result Table.</p>
</div>

<div align="center">
  <img src="/assets/img/6dof-graspnet/result-refinement.png" width="100%">
  <p>Fig. 6: Result of Refinement Network.</p>
</div>


### Conclusion: 
This paper makes a significant step in robotic grasp generation by combining deep learning with physics simulator to obtain efficient, diverse, and successful grasps for object manipulation. The model's success in both simulated and real-world tests underlines its potential for broad applications in robotics. 

### Thoughts:
The author presents an innovative approach to robotic grasp generation using a variational autoencoder and a grasp evaluator to handle a wide range of objects. The paper is the first to introduce both a learning-based method for generating grasp poses (i.e., learned grasp sampler) and a gradient-based optimization technique for improving these grasp poses (i.e., gradient-based refinement process). Trained with simulated data and validated with real-world experiments, the model effectively generates and refines grasp poses using 3D point clouds. Despite its reliance on simulated data, the paper shows a significant advancement in robotic manipulation, demonstrates practical applications.