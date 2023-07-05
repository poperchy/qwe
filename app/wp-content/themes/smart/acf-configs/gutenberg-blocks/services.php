<?php

acf_register_block([
    'name' => 'services',
    'title' => __('Services', 'russeldesign'),
    'description' => __('Services block', 'russeldesign'),
    'render_template' => get_template_directory() . '/template-parts/blocks/services.php',
    'category' => 'homepage',
    'icon' => 'block-default',
    'mode' => 'edit',
    'keywords' => ['Services']
]);
