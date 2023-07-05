<?php

namespace Smart;

class DefaultPostTypeRemover
{
    public function removeItemFromSidebarMenu()
    {
        remove_menu_page('edit.php');
    }

    public function removeItemFromTopMenuBar($wp_admin_bar)
    {
        $wp_admin_bar->remove_node('new-post');
    }

    public function removeQuickDraftDashboardWidget()
    {
        remove_meta_box('dashboard_quick_press', 'dashboard', 'side');
    }
}
