---
title: "paper-review / Preference-Based Learning"
permalink: /categories/paper-review/PBL/
layout: archive
author_profile: true
---

{% assign posts = site.tags['Prefernce-Based Learning'] %}
{% for post in posts %} 
    {% if post.url contains "%EB%85%BC%EB%AC%B8%EB%A6%AC%EB%B7%B0" %}
        {% include archive-single.html type=page.entries_layout %}
    {% endif %}
{% endfor %}