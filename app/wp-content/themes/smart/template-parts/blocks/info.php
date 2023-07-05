<?php

$context = Timber::context();

$context['info'] = get_field('block_info_group');

Timber::render('sections/info.twig', $context);
