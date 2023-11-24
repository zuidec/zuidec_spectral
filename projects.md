---
layout: page
title: Projects
description: 
image: hobo_grove_cedar.jpg
use-featured-image-as-background: false
---

<div class="box alt">
		<div class="row uniform 50%">
	{% for post in site.posts limit:site.tiles-count %}
		<div class="4u"><span class="image fit">{% if page.image %}<img src="{% if site.featured-image-source %}{{ post.image | prepend: site.featured-image-source | absolute_url }}{% else %}{{ "" | absolute_url }}/assets/images/{{ post.image }}{% endif %}" alt="" />{% endif %}</span>
		<div class="content">
			<h2><a href="{{ post.url | relative_url }}" class="link">{{ post.title }}</a></h2>
			<p>{{ post.description }}</p>
		</div>
        </div>
	{% endfor %}
	</div>
</div>
