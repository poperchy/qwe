<?php

acf_register_block([
    'name' => 'info-box',
    'title' => __('Info Box', 'russeldesign'),
    'description' => __('Info Box block', 'russeldesign'),
    'render_template' => get_template_directory() . '/template-parts/blocks/info-box.php',
    'category' => 'portfolio',
    'icon' => 'block-default',
    'mode' => 'edit',
    'keywords' => ['Info', 'Info Box']
]);
