<?php

$themeSettings = acf_add_options_page([
    'page_title' 	=> 'Theme Settings',
    'menu_title'	=> 'Theme Settings',
    'menu_slug' 	=> 'theme-settings',
    'capability'	=> 'edit_posts',
    'redirect'		=> true
]);

acf_add_options_sub_page([
    'page_title' 	=> 'General Settings',
    'menu_title' 	=> 'General Settings',
    'menu_slug' 	=> 'general-settings',
    'parent_slug' 	=> $themeSettings['menu_slug']
]);

acf_add_options_sub_page([
    'page_title' 	=> 'Portfolio Settings',
    'menu_title' 	=> 'Portfolio Settings',
    'menu_slug' 	=> 'portfolio-settings',
    'parent_slug' 	=> $themeSettings['menu_slug']
]);
