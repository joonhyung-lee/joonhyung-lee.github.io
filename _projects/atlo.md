---
layout: page
title: ATLO
description: Digital Companion
img: assets/img/projects/work/atlo.png
importance: 1
category: work
related_publications: true
display_categories: [software, hardware]
horizontal: false
---
<!-- # ATLO: Digital Companion
Brief introduction to the ATLO project... -->

<!-- Sub-categories within ATLO project -->
<div class="projects">
{% if page.display_categories %}
  <!-- Display categorized sub-projects -->
  {% for category in page.display_categories %}
  <h2 class="category">{{ category }}</h2>
  {% assign categorized_projects = site.atlo_projects | where: "category", category %}
  {% assign sorted_projects = categorized_projects | sort: "importance" %}
  <!-- Generate cards for each sub-project -->
  {% if page.horizontal %}
  <div class="container">
    <div class="row row-cols-2">
    {% for project in sorted_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="grid">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
  {% endif %}
  {% endfor %}
{% endif %}
</div>

<!-- You can keep some of the original content below if needed -->