<?php

$context = Timber::context();

$context['infoBox'] = get_field('block_info_box_group');
$context['infoBox']['image'] = new Timber\Image($context['infoBox']['image_id']);

Timber::render('sections/info-box.twig', $context);
