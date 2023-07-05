<?php

return [
    'label' => __('Portfolio', 'russeldesign'),
    'labels' => [
        'name' => __('Portfolio', 'russeldesign'),
        'singular_name' => __('Portfolio', 'russeldesign'),
    ],
    'description' => '',
    'public' => true,
    'publicly_queryable' => true,
    'show_ui' => true,
    'show_in_rest' => true,
    'rest_base' => '',
    'rest_controller_class' => 'WP_REST_Posts_Controller',
    'has_archive' => true,
    'show_in_menu' => true,
    'show_in_nav_menus' => true,
    'delete_with_user' => false,
    'exclude_from_search' => false,
    'capability_type' => 'post',
    'map_meta_cap' => true,
    'hierarchical' => false,
    'rewrite' => [ 'slug' => 'portfolio', 'with_front' => true ],
    'query_var' => true,
    'supports' => [ 'title', 'editor', 'thumbnail' ],
];
