<?php

namespace EsGlobal;

class AcfConfigsLoader
{
    private $configsFolderPath;
    public function __construct($configsFolderPath)
    {
        $this->configsFolderPath = $configsFolderPath;
    }

    public function load()
    {
//        $configFiles = scandir($this->configsFolderPath);
        $this->_loadFolder($this->configsFolderPath);
    }

    private function _loadFolder($configsFolderPath)
    {
        $configFiles = scandir($configsFolderPath);
//        $parentFolderPath = dirname($configsFolderPath);
        foreach ($configFiles as $itemName) {
            if (!in_array($itemName, ['.','..'])) {
                $itemFilePath = $configsFolderPath . DIRECTORY_SEPARATOR . $itemName;
                if (is_file($itemFilePath)) {
                    include_once($itemFilePath);
                } elseif (is_dir($itemFilePath)) {
                    $this->_loadFolder($itemFilePath);
                }
            }
        }
    }
}
