<?php

acf_register_block([
    'name' => 'picture',
    'title' => __('Picture', 'russeldesign'),
    'description' => __('Picture block', 'russeldesign'),
    'render_template' => get_template_directory() . '/template-parts/blocks/picture.php',
    'category' => 'portfolio',
    'icon' => 'block-default',
    'mode' => 'edit',
    'keywords' => ['Picture']
]);
