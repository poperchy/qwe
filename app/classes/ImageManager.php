<?php

namespace EsGlobal;

use stdClass;

final class ImageManager
{
    public const RETINA_IMAGE_RATIO = 2;
    private static $instance = null;

    public static function getInstance(): ?ImageManager
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    private function __construct()
    {
        add_theme_support('post-thumbnails');
    }

    private function __clone()
    {
    }

    public function __wakeup()
    {
    }

    public function addThumbnailSize(string $name, int $width, int $height, $crop): void
    {
        $this->addRegularThumbnailSize($name, $width, $height, $crop);
        $this->addRetinaThumbnailSize($name, $width, $height, $crop);
    }

    private function addRegularThumbnailSize(string $name, int $width, int $height, $crop): void
    {
        if ($this->isFlyDynamicImageResizerActive()) {
            fly_add_image_size($name, $width, $height, $crop);
        } else {
            add_image_size($name, $width, $height, $crop);
        }
    }

    private function addRetinaThumbnailSize(string $name, int $width, int $height, $crop): void
    {
        $retinaRatio = self::RETINA_IMAGE_RATIO;

        if ($this->isFlyDynamicImageResizerActive()) {
            fly_add_image_size("{$name}@{$retinaRatio}x", $width * $retinaRatio, $height * $retinaRatio, $crop);
        } else {
            add_image_size("{$name}@{$retinaRatio}x", $width * $retinaRatio, $height * $retinaRatio, $crop);
        }
    }

    public function getPostThumbnailInfoById(int $thumbnailId, string $size): stdClass
    {
        $imageInfo = new stdClass();
        $retinaRatio = self::RETINA_IMAGE_RATIO;

        if ($this->isFlyDynamicImageResizerActive()) {
            $imageInfo->srcset_1x = fly_get_attachment_image_src($thumbnailId, $size)['src'] ?? wp_get_attachment_image_src($thumbnailId)[0] ?? null;
            $imageInfo->srcset_2x = fly_get_attachment_image_src($thumbnailId, "{$size}@{$retinaRatio}x")['src'] ?? wp_get_attachment_image_src($thumbnailId)[0] ?? null;
        } else {
            $imageInfo->srcset_1x = $thumbnailId ? wp_get_attachment_image_src($thumbnailId, $size)[0] : null;
            $imageInfo->srcset_2x = $thumbnailId ? wp_get_attachment_image_src($thumbnailId, "{$size}@{$retinaRatio}x")[0] : null;
        }

        $imageInfo->alt = $thumbnailId ? get_post_meta($thumbnailId, '_wp_attachment_image_alt', true) : null;

        return $imageInfo;
    }

    public function getPostThumbnailInfoByPostId(int $postId, string $size): stdClass
    {
        $imageId = get_post_thumbnail_id($postId);
        return $this->getPostThumbnailInfoById($imageId, $size);
    }

    private function isFlyDynamicImageResizerActive(): bool
    {
        return function_exists('fly_add_image_size');
    }
}
