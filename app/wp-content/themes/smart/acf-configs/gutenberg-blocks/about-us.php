<?php

acf_register_block([
    'name' => 'about-us',
    'title' => __('About Us', 'russeldesign'),
    'description' => __('About Us block', 'russeldesign'),
    'render_template' => get_template_directory() . '/template-parts/blocks/about-us.php',
    'category' => 'homepage',
    'icon' => 'block-default',
    'mode' => 'edit',
    'keywords' => ['About', 'About Us']
]);
