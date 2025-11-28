---
layout: post
title: "MuJoCo MPC (MJPC)"
date: 2025-06-27
header-includes:
    - \usepackage{textcomp}
    - \usepackage{mathtools}
    - \usepackage{amsmath,amssymb,amsfonts}
    - \usepackage{graphicx}
    - \usepackage{textcomp}
    - \usepackage{xcolor}
categories:

categories:
  - Robotics
tags:
  - MuJoCo
  - MPC
  - '2025'
description: "MuJoCo MPC Installation & Demo"
use_math: true
classes: wide
giscus_comments: true
related_posts: true
---

### [Github Repository](https://github.com/google-deepmind/mujoco_mpc)

## MuJoCo MPC (MJPC)

### Installation

MJPC is tested with Ubuntu 20.04 and macOS-12. In principle, other versions and Windows operating system should work with MJPC, but these are not tested.

- macOS

  - Install `Xcode` & `ninja` and `zlib`:

  ```bash
  brew install ninja zlib
  ```

- Ubuntu 20.04
  ```bash
  sudo apt-get update && sudo apt-get install cmake libgl1-mesa-dev libxinerama-dev libxcursor-dev libxrandr-dev libxi-dev ninja-build zlib1g-dev clang-12
  ```

#### Configure & Build:

Clone MuJoCo MPC

```bash
git clone https://github.com/google-deepmind/mujoco_mpc
cd mujoco_mpc
mkdir build
cd build
```

- macOS-12

  > MuJoCo MPC를 macOS-12에서 빌드하려면, `CMakeLists.txt` 파일에서 **abseil** 버전 지정 부분을 아래와 같이 수정해야 합니다.

  ```cmake
  # TODO(nimrod): Update to the latest version of abseil, or use the one defined
  # by MuJoCo, once grpc fix their build issues.
  set(MUJOCO_DEP_VERSION_abseil
      bc257a88f7c1939f24e0379f14a3589e926c950c # LTS 20230802.1
      CACHE STRING "Version of `abseil` to be fetched."
      FORCE
  )
  ```

  ```bash
  cmake .. -DCMAKE_BUILD_TYPE:STRING=Release -G Ninja -DMJPC_BUILD_GRPC_SERVICE:BOOL=ON
  ```

- Ubuntu 20.04
  ```bash
  cmake .. -DCMAKE_BUILD_TYPE:STRING=Release -G Ninja -DCMAKE_C_COMPILER:STRING=clang-12 -DCMAKE_CXX_COMPILER:STRING=clang++-12 -DMJPC_BUILD_GRPC_SERVICE:BOOL=ON
  ```

Note: gRPC is a large dependency and can take 10-20 minutes to initially download.

```bash
-- Found ZLIB: /Library/Developer/CommandLineTools/SDKs/MacOSX15.4.sdk/usr/lib/libz.tbd (found version "1.2.12")
-- mujoco::FindOrFetch: checking for targets in package `gRPC`
-- mujoco::FindOrFetch: checking for targets in package `gRPC` - target `gRPC` not defined.
-- mujoco::FindOrFetch: Using FetchContent to retrieve `gRPC`
...
...
-- Generating done (1.8s)
-- Build files have been written to: /Users/joonhyung-lee/personal/codes/mujoco_mpc/build
```

Now, we can build `mjpc`

```bash
cmake --build . --config=Release
cd bin
./mjpc
```
