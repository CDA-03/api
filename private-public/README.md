docker-compose up -d  

docker exec -it treelearning_symfony bash 

# Générez une clé privée
openssl genpkey -algorithm RSA -out /app/config/jwt/private.pem -aes256

# Générez la clé publique à partir de la clé privée
openssl rsa -pubout -in /app/config/jwt/private.pem -out /app/config/jwt/public.pem


chmod 600 /app/config/jwt/private.pem
chmod 644 /app/config/jwt/public.pem