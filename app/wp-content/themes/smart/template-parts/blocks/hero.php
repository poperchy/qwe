<?php

$context = Timber::context();

$context['hero'] = get_field('block_hero_group');
$context['hero']['logo'] = new Timber\Image($context['hero']['logo_id']);

Timber::render('sections/hero.twig', $context);
