---
layout: post
title: "Real-Time Operating System(RTOS) in Jetson"
date: 2025-06-04
header-includes:
    - \usepackage{textcomp}
    - \usepackage{mathtools}
    - \usepackage{amsmath,amssymb,amsfonts}
    - \usepackage{graphicx}
    - \usepackage{textcomp}
    - \usepackage{xcolor}
categories:

categories:
  - OS
tags:
  - RTOS
  - Jetson
  - '2025'
description: "Detailed explanation of RTOS in Jetson"
use_math: true
classes: wide
giscus_comments: true
related_posts: true
---

## RTOS란 무엇인가?

>  **RTOS (Real-Time Operating System)**는 특정 작업이 **정해진 시간 안에 반드시 실행되어야 하는** 시스템을 위한 운영체제이다.
> Jetson 플랫폼에서 RTOS를 적용하는 주된 목적은 **지연 시간을 줄이고**, **결정론적(deterministic)** 처리를 보장하는 데 있다.

### 일반 커널과 RT 커널의 차이

| 항목           | 일반 커널         | RT 커널 (PREEMPT_RT)               |
| -------------- | ----------------- | ---------------------------------- |
| 작업 응답 시간 | Best-effort       | 결정론적 (Deterministic)           |
| 인터럽트 처리  | 대부분 하드 IRQ   | Thread 기반 softirq                |
| 스케줄링       | CFS (공정성 중심) | FIFO / Round-Robin (우선순위 기반) |
| 커널 선점성    | 부분적            | 완전 선점 가능                     |
| 사용 사례      | 데스크탑, 서버    | 로봇 제어, 산업 제어, 자율주행 등  |

## Jetson에서 RT 커널 설치 방법

Jetson에서는 NVIDIA가 제공하는 RT 커널을 **간단히 패키지 설치 방식으로 적용**할 수 있다.

### 1. 커널 버전 확인

```bash
uname -r
```

- 일반 커널: `5.15.148-tegra`
- RT 커널: `5.15.148-rt-tegra`

### 2. 저장소 등록

```bash
sudo vi /etc/apt/sources.list.d/nvidia-l4t-apt-source.list
```

아래의 내용을 추가한다.

```
deb https://repo.download.nvidia.com/jetson/rt-kernel r36.4 main
```

### 3. RT 커널 설치

```bash
sudo apt update
sudo apt install nvidia-l4t-rt-kernel nvidia-l4t-rt-kernel-headers nvidia-l4t-rt-kernel-oot-modules nvidia-l4t-display-rt-kernel
sudo reboot
```

### 4. 부트 커널 전환 (설치/제거 없이)

```bash
sudo vi /boot/extlinux/extlinux.conf
# DEFAULT 값을 변경:
# - 실시간 커널: DEFAULT real-time
# - 일반 커널: DEFAULT primary
sudo reboot
```

<details>
<summary>extlinux.conf 파일 내용</summary>

```bash
TIMEOUT 30
DEFAULT real-time

MENU TITLE L4T boot options

LABEL primary
      MENU LABEL primary kernel
      LINUX /boot/Image
      INITRD /boot/initrd
      APPEND ${cbootargs} root=/dev/mmcblk0p1 rw rootwait rootfstype=ext4 mminit_loglevel=4 console=ttyTCU0,115200 firmware_class.path=/etc/firmware fbcon=map:0 nospectre_bhb video=efifb:off console=tty0

# When testing a custom kernel, it is recommended that you create a backup of
# the original kernel and add a new entry to this file so that the device can
# fallback to the original kernel. To do this:
#
# 1, Make a backup of the original kernel
#      sudo cp /boot/Image /boot/Image.backup
#
# 2, Copy your custom kernel into /boot/Image
#
# 3, Uncomment below menu setting lines for the original kernel
#
# 4, Reboot

# LABEL backup
#    MENU LABEL backup kernel
#    LINUX /boot/Image.backup
#    INITRD /boot/initrd
#    APPEND ${cbootargs}

LABEL real-time
        MENU LABEL real-time kernel
        LINUX /boot/Image.real-time
        INITRD /boot/initrd
        APPEND ${cbootargs} root=/dev/mmcblk0p1 rw rootwait rootfstype=ext4 mminit_loglevel=4 console=ttyTCU0,115200 firmware_class.path=/etc/firmware fbcon=map:0 nospectre_bhb video=efifb:off console=tty0
```

</details>

- 예시) DEFAULT 값을 `real-time`으로 설정:

```
DEFAULT real-time
```

- reboot 후 `uname -r`로 확인

### 5. 제거 시

```bash
sudo apt remove nvidia-l4t-rt-kernel nvidia-l4t-rt-kernel-headers nvidia-l4t-rt-kernel-oot-modules nvidia-l4t-display-rt-kernel
sudo reboot
```

## Python에서 실시간 우선순위 설정하기

실시간 커널만으로는 모든 사용자 애플리케이션이 실시간이 되지 않습니다. Python 스크립트도 실시간 우선순위로 실행되어야 합니다.

### 1. Python에 `cap_sys_nice` 권한 부여

```bash
sudo setcap 'cap_sys_nice=eip' /usr/bin/python3.8
```

### 2. 실시간 스케줄링 코드 예시

```python
import ctypes

SCHED_FIFO = 1
class SchedParam(ctypes.Structure):
    _fields_ = [('sched_priority', ctypes.c_int)]

def set_realtime_priority(priority=99):
    libc = ctypes.CDLL('libc.so.6')
    param = SchedParam(priority)
    if libc.sched_setscheduler(0, SCHED_FIFO, ctypes.byref(param)) != 0:
        raise ValueError("실시간 우선순위 설정 실패")
```

### 3. 사용 시

```python
set_realtime_priority()
```

## RTOS를 활용한 ROS2 설계 시 고려사항

- `rclcpp::MultiThreadedExecutor`를 활용하여 ROS 콜백 스레드를 분리할 것
- 실시간 요구가 있는 노드에는 `ReentrantCallbackGroup` 사용
- 동적 메모리 할당, 동기화 객체 사용을 최소화하여 **RT-safe** 코드로 작성
- 노드 간 통신은 DDS QoS 설정 (e.g., `reliable`, `deadline`)을 통해 시간 보장

## 결론

RT 커널 설치 이후에도 Python이나 ROS2 환경에서 적절한 스케줄링과 구조 설계가 병행되어야 진정한 RTOS-like 시스템을 구축할 수 있다.

---

### References

- [NVIDIA RT Kernel 공식 문서](https://docs.nvidia.com/jetson/archives/r36.3/DeveloperGuide/SD/SoftwarePackagesAndTheUpdateMechanism.html#real-time-kernel-using-ota-update)
- [Jetson 포럼의 PREEMPT_RT 적용 사례](https://forums.developer.nvidia.com/t/applying-a-preempt-rt-patch-to-jetpack-4-5-on-jetson-nano/168428/4)

## 설치방법 (Raspberry PI)

- [Raspberry Pi 4B](https://lemariva.com/blog/2019/09/raspberry-pi-4b-preempt-rt-kernel-419y-performance-test)
- [raspberrypi-realtime-linux](https://sudormrf.run/2022/06/18/raspberrypi-realtime-linux/)
