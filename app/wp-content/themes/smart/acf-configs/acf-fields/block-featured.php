<?php

acf_add_local_field_group([
    'key' => 'block_featured',
    'title' => 'Featured',
    'fields' => [
        [
            'key' => 'block_featured_group',
            'label' => 'Featured',
            'name' => 'block_featured_group',
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
                    'key' => 'block_featured_title',
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
                    'key' => 'block_featured_items',
                    'label' => 'Items',
                    'name' => 'items',
                    'type' => 'repeater',
                    'instructions' => '',
                    'required' => 0,
                    'conditional_logic' => 0,
                    'wrapper' => [
                        'width' => '',
                        'class' => '',
                        'id' => ''
                    ],
                    'collapsed' => '',
                    'min' => 0,
                    'max' => 0,
                    'layout' => 'block',
                    'button_label' => '',
                    'sub_fields' => [
                        [
                            'key' => 'block_featured_items_portfolio_id',
                            'label' => 'Portfolio',
                            'name' => 'portfolio_id',
                            'type' => 'post_object',
                            'instructions' => '',
                            'required' => 0,
                            'conditional_logic' => 0,
                            'wrapper' => [
                                'width' => '',
                                'class' => '',
                                'id' => ''
                            ],
                            'post_type' => [
                                'portfolio'
                            ],
                            'taxonomy' => '',
                            'allow_null' => 0,
                            'multiple' => 0,
                            'return_format' => 'id',
                            'ui' => 1
                        ],
                        [
                            'key' => 'block_featured_items_image_id',
                            'label' => 'Image',
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
                ],
                [
                    'key' => 'block_featured_button_group',
                    'label' => 'Button',
                    'name' => 'button',
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
                            'key' => 'block_featured_button_slug',
                            'label' => 'Slug',
                            'name' => 'slug',
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
                            'key' => 'block_featured_button_text',
                            'label' => 'Text',
                            'name' => 'text',
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
            ]
        ]
    ],
    'location' => [
        [
            [
                'param' => 'block',
                'operator' => '==',
                'value' => 'acf/featured'
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
