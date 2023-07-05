<?php

use EsGlobal\AcfConfigsLoader;
use EsGlobal\GitRevisionRetriever;
use EsGlobal\ImageManager;
use Smart\SmartSite;
use Smart\Cf7Helper;
use Smart\DefaultPostTypeRemover;

define('THEME_PATH', get_template_directory());
define('FRONTEND_PATH', THEME_PATH . '/frontend');
define('THEME_URI', get_stylesheet_directory_uri());
define('FRONTEND_URI', THEME_URI . '/frontend');
define('FRONTEND_PUBLIC_URI', FRONTEND_URI . '/public');

$timber = new Timber\Timber();

$acfConfigLoader = new AcfConfigsLoader(THEME_PATH . '/acf-configs');
add_action('acf/init', [$acfConfigLoader, 'load']);

$gitRevisionRetriever = new GitRevisionRetriever(ABSPATH);
$gitRevision = $gitRevisionRetriever->retrieve();

$imageManager = ImageManager::getInstance();
$imageManager->addThumbnailSize('block_featured_thumbnail', 450, 450, true);
$imageManager->addThumbnailSize('custom_post_type_portfolio_archive_thumbnail', 708, 405, true);
$imageManager->addThumbnailSize('custom_post_type_portfolio_single_thumbnail', 708, 405, true);


Timber::$dirname = ['frontend/src/templates'];
Timber::$autoescape = false;

$russelDesignSite = new SmartSite();
add_action('after_setup_theme', [$russelDesignSite, 'addThemeSupports']);
add_action('init', [$russelDesignSite, 'registerPostTypes']);
add_action('init', [$russelDesignSite, 'registerTaxonomies']);
add_filter('block_categories', [$russelDesignSite, 'addBlockCategories'], 10, 2);
add_action('wp_enqueue_scripts', [$russelDesignSite, 'enqueueScripts']);
add_filter('timber/context', [$russelDesignSite, 'addToContext']);
add_filter('timber/twig', [$russelDesignSite, 'addToTwig']);

$cf7Helper = new Cf7Helper();
add_filter('wpcf7_load_js', [$cf7Helper, 'setUpFalse']);
add_filter('wpcf7_load_css', [$cf7Helper, 'setUpFalse']);
add_filter('wpcf7_autop_or_not', [$cf7Helper, 'setUpFalse']);
add_filter('wpcf7_form_elements', [$cf7Helper, 'removeHtmlTags']);

$defaultPostTypeRemover = new DefaultPostTypeRemover();
add_action('admin_menu', [$defaultPostTypeRemover, 'removeItemFromSidebarMenu']);
add_action('admin_bar_menu', [$defaultPostTypeRemover, 'removeItemFromTopMenuBar'], 999);
add_action('wp_dashboard_setup', [$defaultPostTypeRemover, 'removeQuickDraftDashboardWidget'], 999);
