ARG WORDPRESS_VERSION
ARG PHP_VERSION

FROM wordpress:${WORDPRESS_VERSION}-php${PHP_VERSION}-fpm
ARG COMPOSER_VERSION
ARG PROJECT_FILES

RUN apt-get update && apt-get install -y \
        libcurl4-openssl-dev \
        libzip-dev \
        unzip \
        git \
        netcat

RUN docker-php-ext-install pdo pdo_mysql curl zip \
    && pecl install xdebug \
    && docker-php-ext-enable xdebug \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN set -ex; \
	curl -O "https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar"; \
	chmod +x wp-cli.phar; \
    mv wp-cli.phar /usr/local/bin/wp

ARG USER_ID=0
RUN groupadd -r appuser
RUN useradd -r -u ${USER_ID} -g appuser appuser

ARG COMPOSER_DIRECTORY="/home/appuser/.composer"
RUN mkdir -p ${COMPOSER_DIRECTORY}
RUN chown -R ${USER_ID}:${USER_ID} ${COMPOSER_DIRECTORY}

WORKDIR ${PROJECT_FILES}
USER appuser

CMD ["php-fpm"]