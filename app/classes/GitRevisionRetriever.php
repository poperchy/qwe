<?php

namespace EsGlobal;

class GitRevisionRetriever
{
    private $gitRootDirectoryPath;

    public function __construct($gitRootDirectoryPath)
    {
        $gitRootDirectoryPath = (DIRECTORY_SEPARATOR === '\\') ?
            str_replace('/', '\\', $gitRootDirectoryPath) :
            str_replace('\\', '/', $gitRootDirectoryPath);
        $this->gitRootDirectoryPath = $gitRootDirectoryPath;
    }

    public function retrieve(): string
    {
        $result = exec(sprintf('cd %s && %s', $this->gitRootDirectoryPath, 'git rev-parse --short HEAD'));
        return $result ?: false ;
    }
}
