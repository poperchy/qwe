<?php

$context = Timber::context();

$context['post'] = new Timber\Post();
$context['header']['title'] = $context['post']->title();
$context['back']['link'] = get_site_url();

Timber::render('layout/base.twig', $context);
