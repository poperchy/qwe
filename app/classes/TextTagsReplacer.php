<?php

namespace EsGlobal;

class TextTagsReplacer
{
    public static function replaceDateHandler(String $string, String $dateFormat, String $search)
    {
        $currentDate = date("$dateFormat");
        return str_replace("$search", $currentDate, $string);
    }

    public static function replaceTagHandler(String $string, String $replace, String $search)
    {
        return str_replace("$search", $replace, $string);
    }
}
