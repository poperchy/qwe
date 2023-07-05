<?php

return [
    'label' => __('Project Type', 'russeldesign'),
    'labels' => [
        'name' => __('Project Type', 'russeldesign'),
        'singular_name' => __('Project Type', 'russeldesign'),
    ],
    'public' => true,
    'publicly_queryable' => true,
    'hierarchical' => true,
    'show_ui' => true,
    'show_in_menu' => true,
    'show_in_nav_menus' => true,
    'query_var' => true,
    'rewrite' => [ 'slug' => 'project_type', 'with_front' => true, ],
    'show_admin_column' => true,
    'show_in_rest' => true,
    'rest_base' => 'project_type',
    'rest_controller_class' => 'WP_REST_Terms_Controller',
    'show_in_quick_edit' => false,
];
