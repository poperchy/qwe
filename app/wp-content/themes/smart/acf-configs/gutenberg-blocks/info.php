<?php

acf_register_block([
    'name' => 'info',
    'title' => __('Info', 'russeldesign'),
    'description' => __('Info block', 'russeldesign'),
    'render_template' => get_template_directory() . '/template-parts/blocks/info.php',
    'category' => 'portfolio',
    'icon' => 'block-default',
    'mode' => 'edit',
    'keywords' => ['Info']
]);
