# Smile_detector

Application Flask qui permet de détecter un sourire sur un visage.

Les modèles de détection du visage et du sourire sont issues de l'API Javascript face-api.js : https://justadudewhohacks.github.io/face-api.js/docs/index.html

### Fonctionnalités

Détecte le sourire sur un visage.
Compte le nombre de sourires effectués.
Compte le temps total (en s) passé à sourire.

### Lancement de l'application

Cloner ou télécharger le répertoire git.

Installer l'environnement virtuel python :
```bash
pipenv install
```
Entrer dans l'environnement virtuel :
```bash
pipenv shell
```
Lancer l'application sur un serveur local :

```bash
flask run
```
