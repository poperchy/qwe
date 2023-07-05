<?php

acf_add_local_field_group([
    'key' => 'portfolio_settings',
    'title' => 'Portfolio Settings',
    'fields' => [
        [
            'key' => 'portfolio_settings_header_group',
            'label' => 'Header',
            'name' => 'portfolio_settings_header_group',
            'type' => 'group',
            'instructions' => '',
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => [
                'width' => '',
                'class' => '',
                'id' => ''
            ],
            'layout' => 'block',
            'sub_fields' => [
                [
                    'key' => 'portfolio_settings_header_title',
                    'label' => 'Title',
                    'name' => 'title',
                    'type' => 'text',
                    'instructions' => '',
                    'required' => 0,
                    'conditional_logic' => 0,
                    'wrapper' => [
                        'width' => '',
                        'class' => '',
                        'id' => ''
                    ],
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'maxlength' => ''
                ]
            ]
        ]
    ],
    'location' => [
        [
            [
                'param' => 'options_page',
                'operator' => '==',
                'value' => 'portfolio-settings'
            ]
        ]
    ],
    'menu_order' => 0,
    'position' => 'normal',
    'style' => 'default',
    'label_placement' => 'top',
    'instruction_placement' => 'label',
    'hide_on_screen' => '',
    'active' => true,
    'description' => ''
]);
