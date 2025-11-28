# Personal Homepage

Homepage: [https://joonhyung-lee.github.io/](https://joonhyung-lee.github.io/)

Hello, I am **joonhyung-lee**, a master's student at the A.I. Department of Korea University. My research primarily focuses on **`Robotics`**, with a particular interest in **`Robotics with Large Language Models`**, **`Physics-based Simulation`**.

If you are interested in discussing research or potential collaborations, please feel free to contact me at [dlwnsgud8823@korea.ac.kr]. This repository contains related to my research, including publication, code, and project information. Thank you for visiting.

Contact: dlwnsgud8823@korea.ac.kr

### Local development

Use the helper script to ensure the repository-local Ruby (`.rbenv`) and Python (`.venv`) environments are loaded before running Jekyll:

```bash
# Install the dependencies once
bundle install
python3 -m venv .venv && source .venv/bin/activate && pip install jupyter

# Serve the site
bin/jekyll-serve --livereload
```

`bin/jekyll-serve` wires up `rbenv`, activates `.venv` (if present), and then executes `bundle exec jekyll serve` so you do not have to manually export paths each time.
