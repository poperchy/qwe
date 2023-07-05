<?php

acf_add_local_field_group([
    'key' => 'block_services',
    'title' => 'Services',
    'fields' => [
        [
            'key' => 'block_services_group',
            'label' => 'Services',
            'name' => 'block_services_group',
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
                    'key' => 'block_services_title',
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
                ],
                [
                    'key' => 'block_services_text',
                    'label' => 'Text',
                    'name' => 'text',
                    'type' => 'wysiwyg',
                    'instructions' => '',
                    'required' => 0,
                    'conditional_logic' => 0,
                    'wrapper' => [
                        'width' => '',
                        'class' => '',
                        'id' => ''
                    ],
                    'default_value' => '',
                    'tabs' => 'all',
                    'toolbar' => 'full',
                    'media_upload' => 1,
                    'delay' => 0
                ]
            ]
        ]
    ],
    'location' => [
        [
            [
                'param' => 'block',
                'operator' => '==',
                'value' => 'acf/services'
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
