<?php

$context = Timber::context();

$context['services'] = get_field('block_services_group');

Timber::render('sections/services.twig', $context);
