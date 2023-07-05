<?php

acf_add_local_field_group([
    'key' => 'block_picture',
    'title' => 'Picture',
    'fields' => [
        [
            'key' => 'block_picture_group',
            'label' => 'picture',
            'name' => 'block_picture_group',
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
                    'key' => 'block_picture_title',
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
                    'key' => 'block_picture_description',
                    'label' => 'Description',
                    'name' => 'description',
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
                ],
                [
                    'key' => 'block_picture_image_id',
                    'label' => 'Image ID',
                    'name' => 'image_id',
                    'type' => 'image',
                    'instructions' => '',
                    'required' => 0,
                    'conditional_logic' => 0,
                    'wrapper' => [
                        'width' => '',
                        'class' => '',
                        'id' => ''
                    ],
                    'return_format' => 'id',
                    'preview_size' => 'medium',
                    'library' => 'all',
                    'min_width' => '',
                    'min_height' => '',
                    'min_size' => '',
                    'max_width' => '',
                    'max_height' => '',
                    'max_size' => '',
                    'mime_types' => ''
                ]
            ]
        ]
    ],
    'location' => [
        [
            [
                'param' => 'block',
                'operator' => '==',
                'value' => 'acf/picture'
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
