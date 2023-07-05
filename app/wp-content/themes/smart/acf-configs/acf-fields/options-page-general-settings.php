<?php

acf_add_local_field_group([
    'key' => 'general_settings',
    'title' => 'General Settings',
    'fields' => [
        [
            'key' => 'general_settings_contact_us_group',
            'label' => 'Contact Us',
            'name' => 'general_settings_contact_us_group',
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
                    'key' => 'general_settings_contact_us_title',
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
        ],
        [
            'key' => 'general_settings_contact_form_group',
            'label' => 'Contact Form',
            'name' => 'general_settings_contact_form_group',
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
                    'key' => 'general_settings_contact_form_form_shortcode',
                    'label' => 'Form Shortcode',
                    'name' => 'form_shortcode',
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
        ],
        [
            'key' => 'general_settings_contact_info_group',
            'label' => 'Contact Info',
            'name' => 'general_settings_contact_info_group',
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
                    'key' => 'general_settings_contact_info_subtitle',
                    'label' => 'Subtitle',
                    'name' => 'subtitle',
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
                    'key' => 'general_settings_contact_info_items',
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
                    'layout' => 'row',
                    'button_label' => '',
                    'sub_fields' => [
                        [
                            'key' => 'general_settings_contact_info_location',
                            'label' => 'Location',
                            'name' => 'location',
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
                            'key' => 'general_settings_contact_info_name',
                            'label' => 'Name',
                            'name' => 'name',
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
                            'key' => 'general_settings_contact_info_address',
                            'label' => 'Address',
                            'name' => 'address',
                            'type' => 'textarea',
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
                            'maxlength' => '',
                            'rows' => '',
                            'new_lines' => ''
                        ],
                        [
                            'key' => 'general_settings_contact_info_phones',
                            'label' => 'Phones',
                            'name' => 'phones',
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
                            'layout' => 'row',
                            'button_label' => '',
                            'sub_fields' => [
                                [
                                    'key' => 'general_settings_contact_info_phone',
                                    'label' => 'Phone',
                                    'name' => 'phone',
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
                ],
                [
                    'key' => 'general_settings_contact_info_email',
                    'label' => 'Email',
                    'name' => 'email',
                    'type' => 'email',
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
                    'append' => ''
                ]
            ]
        ],
        [
            'key' => 'general_settings_footer_group',
            'label' => 'Footer',
            'name' => 'general_settings_footer_group',
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
                    'key' => 'general_settings_footer_text',
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
                'param' => 'options_page',
                'operator' => '==',
                'value' => 'general-settings'
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
