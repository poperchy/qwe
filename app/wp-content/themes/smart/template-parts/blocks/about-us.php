<?php

$context = Timber::context();

$context['aboutUs'] = get_field('block_about_us_group');

Timber::render('sections/about-us.twig', $context);
