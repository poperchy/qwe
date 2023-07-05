<?php

use EsGlobal\ImageManager;

$context = Timber::context();
$imageManager = ImageManager::getInstance();

$context['featured'] = get_field('block_featured_group');
foreach ($context['featured']['items'] as $key => &$item) {
    $item['post'] = new Timber\Post($item['portfolio_id']);
    $item['post']->logo = new Timber\Image($item['post']->custom_post_type_portfolio_group_logo_id);
    $item['image'] = $imageManager->getPostThumbnailInfoById($item['image_id'], 'block_featured_thumbnail');
}
$context['featured']['button']['link'] = get_site_url() . '/' . $context['featured']['button']['slug'];

Timber::render('sections/featured.twig', $context);
