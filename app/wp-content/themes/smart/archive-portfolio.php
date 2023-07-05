<?php

use EsGlobal\ImageManager;

$context = Timber::context();
$imageManager = ImageManager::getInstance();

$context['posts'] = new Timber\PostQuery();
foreach ($context['posts'] as $post) {
    $post->logo = new Timber\Image($post->custom_post_type_portfolio_group_logo_id);
    $post->image = $imageManager->getPostThumbnailInfoByPostId($post->id, 'custom_post_type_portfolio_archive_thumbnail');
}
$context['header'] = get_field('portfolio_settings_header_group', 'option');
$context['back']['link'] = get_site_url();

Timber::render('layout/portfolio.twig', $context);
