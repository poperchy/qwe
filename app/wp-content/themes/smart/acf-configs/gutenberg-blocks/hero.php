<?php

acf_register_block([
    'name' => 'hero',
    'title' => __('Hero', 'russeldesign'),
    'description' => __('Hero block', 'russeldesign'),
    'render_template' => get_template_directory() . '/template-parts/blocks/hero.php',
    'category' => 'homepage',
    'icon' => 'block-default',
    'mode' => 'edit',
    'keywords' => ['Hero']
]);
