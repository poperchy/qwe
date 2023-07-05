<?php

/*
 * Template Name: Home Page
 */

$context = Timber::context();

$context['post'] = new Timber\Post();

Timber::render('layout/homepage.twig', $context);
