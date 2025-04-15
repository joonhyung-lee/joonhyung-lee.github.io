---
layout: page
permalink: /teaching/
title: teaching
description: Materials for courses what I taught in undergraduate and graduate.
nav: false
nav_order: 0
---

{% assign sorted_courses = site.teaching | sort: 'year' | reverse %}
{% assign semester_order = "Spring,Summer,Fall,Winter" | split: "," %}

{% for course in sorted_courses %}
<div class="card mt-3 mb-3">
  <div class="card-body">
    <h5 class="card-title">{{ course.title }}</h5>
    <h6 class="card-subtitle mb-2 text-muted">{{ course.semester }} {{ course.year }}</h6>
    <p class="card-text">{{ course.description }}</p>
    <a href="{{ course.url | relative_url }}" class="btn btn-primary">Course Details</a>
  </div>
</div>
{% endfor %}