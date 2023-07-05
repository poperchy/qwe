<?php

$context = Timber::context();

$context['picture'] = get_field('block_picture_group');
$context['picture']['image'] = new Timber\Image($context['picture']['image_id']);

Timber::render('sections/picture.twig', $context);
