<?php

use EsGlobal\ImageManager;

$context = Timber::context();
$imageManager = ImageManager::getInstance();

$context['post'] = new Timber\Post();
$context['post']->logo = new Timber\Image($context['post']->custom_post_type_portfolio_group_logo_id);
$context['post']->image = $imageManager->getPostThumbnailInfoByPostId($context['post']->id, 'custom_post_type_portfolio_single_thumbnail');
$context['header'] = get_field('portfolio_settings_header_group', 'option');
$context['back']['link'] = get_site_url();

Timber::render('layout/single.twig', $context);
