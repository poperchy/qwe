<?php

acf_register_block([
    'name' => 'featured',
    'title' => __('Featured', 'russeldesign'),
    'description' => __('Featured block', 'russeldesign'),
    'render_template' => get_template_directory() . '/template-parts/blocks/featured.php',
    'category' => 'homepage',
    'icon' => 'block-default',
    'mode' => 'edit',
    'keywords' => ['Featured']
]);
