<?php

namespace Smart;

use Timber\Site;

class SmartSite extends Site
{
    public function __construct()
    {
        parent::__construct();
    }

    public function addThemeSupports()
    {
        add_theme_support('automatic-feed-links');
        add_theme_support('title-tag');
        add_theme_support('post-thumbnails');
        add_theme_support(
            'html5',
            [
                'comment-form',
                'comment-list',
                'gallery',
                'caption',
            ]
        );
        add_theme_support(
            'post-formats',
            [
                'aside',
                'image',
                'video',
                'quote',
                'link',
                'gallery',
                'audio',
            ]
        );
        add_theme_support('menus');
    }

    public function registerPostTypes()
    {
        register_post_type('portfolio', require THEME_PATH . '/configs/custom-post-type-portfolio.php');
    }

    public function registerTaxonomies()
    {
        register_taxonomy('project_type', [ 'portfolio' ], require THEME_PATH . '/configs/taxonomy-project-type.php');
    }

    public function addBlockCategories($categories, $post)
    {
        return array_merge($categories, [
            require THEME_PATH . '/configs/block-category-homepage.php',
            require THEME_PATH . '/configs/block-category-portfolio.php']);
    }

    public function enqueueScripts()
    {
        global $gitRevision;

        wp_enqueue_style('russeldesign-stylesheet', THEME_URI . '/frontend/public/styles/style.css', [], $gitRevision, 'all');
        wp_enqueue_script('russeldesign-libraries', THEME_URI . '/frontend/public/js/libraries.js', ['jquery'], $gitRevision, true);
        wp_enqueue_script('russeldesign-scripts', THEME_URI . '/frontend/public/js/scripts.js', ['jquery'], $gitRevision, true);
        wp_localize_script('russeldesign-scripts', 'ajaxObject', array('ajaxUrl' => admin_url('admin-ajax.php')));
    }

    public function addToContext($context)
    {
//        $context['menu'] = new \Timber\Menu();
//        $context['site'] = null;
//        $context['user'] = null;
        $context['contactUs'] = get_field('general_settings_contact_us_group', 'option');
        $context['contactForm'] = get_field('general_settings_contact_form_group', 'option');
        $context['contactForm']['form_html'] = do_shortcode($context['contactForm']['form_shortcode']);
        $context['contactInfo'] = get_field('general_settings_contact_info_group', 'option');
        $context['footer'] = get_field('general_settings_footer_group', 'option');
        $context['footer']['text'] = \EsGlobal\TextTagsReplacer::replaceDateHandler($context['footer']['text'], 'Y', '{year}');
        $context['frontend_public_uri'] = FRONTEND_PUBLIC_URI;

        return $context;
    }

    public function addToTwig($twig)
    {
        $twig->addExtension(new \Twig\Extension\StringLoaderExtension());
        $twig->addFilter(new \Twig\TwigFilter('myfoo', [ $this, 'myfoo' ]));

        return $twig;
    }

    public function myfoo($text)
    {
        $text .= ' bar!';

        return $text;
    }
}
