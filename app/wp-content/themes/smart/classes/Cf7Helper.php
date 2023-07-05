<?php

namespace Smart;

class Cf7Helper
{
    public function removeHtmlTags($content)
    {
        $content = preg_replace('/<(span).*?class="\s*(?:.*\s)?wpcf7-form-control-wrap(?:\s[^"]+)?\s*"[^\>]*>(.*)<\/\1>/i', '\2', $content);

        return $content;
    }

    public function setUpFalse()
    {
        return false;
    }
}
