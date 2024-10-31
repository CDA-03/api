# Utiliser l'image officielle d'ubuntu comme base
FROM ubuntu:latest

ENV DEBIAN_FRONTEND=noninteractive

# Mettre à jour et installer Apache, PHP et les extensions nécessaires pour Symfony et PostgreSQL
RUN apt-get update && apt-get install -y \
    apache2 \
    php \
    php-cli \
    php-pgsql \
    php-gd \
    php-xml \
    php-mbstring \
    php-zip \
    php-curl \
    php-intl \
    php-redis \
    php-xml \
    php-tokenizer \
    curl \
    unzip \
    git \
    libapache2-mod-php \
    && apt-get clean

# Installer Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Configurer le répertoire de travail pour Symfony
WORKDIR /var/www/symfony

# Copier les fichiers source de Symfony
COPY . /var/www/symfony

# Installer les dépendances de Symfony
RUN composer install

# Changer les permissions pour le répertoire Symfony
RUN chown -R www-data:www-data /var/www/symfony

# Copier le fichier de configuration du vhost et activer le module rewrite
COPY vhost.conf /etc/apache2/sites-available/000-default.conf
RUN a2enmod rewrite

# Exposer le port 80 pour Apache
EXPOSE 80

# Démarrer Apache en tant que processus principal
CMD ["apachectl", "-D", "FOREGROUND"]
