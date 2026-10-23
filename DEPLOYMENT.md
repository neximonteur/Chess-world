# 🚀 Guide de Déploiement sur GitHub et Netlify

## Étape 1: Préparer votre GitHub

### 1.1 Créer un Repository GitHub

1. Allez sur [GitHub](https://github.com/new)
2. Remplissez les informations:
   - **Repository name:** chess-world
   - **Description:** Global Chess Championship Platform with Epic Ranks
   - Cochez **Public** (pour Netlify gratuit)
   - Ne cochez PAS "Initialize this repository with"

3. Cliquez **Create repository**

### 1.2 Initialiser Git Localement

```bash
cd chess-world

# Initialiser git
git init

# Ajouter les fichiers
git add .

# Faire le premier commit
git commit -m "Initial commit: Chess World Platform"

# Renommer la branche (si nécessaire)
git branch -M main

# Ajouter l'origine
git remote add origin https://github.com/VOTRE_USERNAME/chess-world.git

# Pousser vers GitHub
git push -u origin main
```

## Étape 2: Connecter Netlify

### 2.1 Créer un compte Netlify

1. Allez sur [Netlify](https://app.netlify.com)
2. Cliquez **Sign up** (vous pouvez vous enregistrer avec GitHub)
3. Connectez votre compte GitHub si demandé

### 2.2 Déployer via GitHub

1. Une fois connecté à Netlify, cliquez sur **New site from Git**
2. Sélectionnez **GitHub**
3. Autorisez Netlify à accéder à vos repositories
4. Sélectionnez votre repository **chess-world**
5. Laissez les paramètres par défaut:
   - **Branch to deploy:** main
   - **Build command:** npm run build
   - **Publish directory:** dist

6. Cliquez **Deploy site**

Netlify commencera le build et le déploiement! Votre site sera en direct en 2-3 minutes.

### 2.3 Configurer le domaine personnalisé (optionnel)

1. Dans les paramètres du site Netlify
2. Allez à **Site settings** > **Domain management**
3. Cliquez **Add custom domain**
4. Suivez les instructions pour configurer votre domaine

## Étape 3: Déploiement Continu

Après avoir configuré Netlify une fois:

```bash
# À chaque modification locale:
git add .
git commit -m "Description de vos changements"
git push origin main

# Netlify redéploiera automatiquement! 🎉
```

## Étape 4: Vérifier votre Déploiement

### 4.1 Vérifier les Logs

1. Allez sur votre dashboard Netlify
2. Cliquez sur votre site
3. Allez à **Deploys**
4. Vous verrez le statut du build (Building, Building, Published)
5. Cliquez sur un déploiement pour voir les logs

### 4.2 Problèmes Courants

**Erreur: "npm ERR! code ENOENT"**
- Solution: Assurez-vous que `package.json` est dans la racine

**Erreur: "Cannot find module"**
- Solution: Vérifiez que `npm install` fonctionne localement avec `npm install`

**Le site affiche 404**
- Solution: Vérifiez que `vite.config.js` existe et que le `build` produit un dossier `dist`

## Étape 5: Mises à Jour et Maintenance

### Ajouter une nouvelle feature

```bash
# 1. Créer une branche de développement
git checkout -b feature/ma-nouvelle-feature

# 2. Faire vos changements
# 3. Tester localement avec: npm run dev

# 4. Commit et push
git add .
git commit -m "Add: description de la feature"
git push origin feature/ma-nouvelle-feature

# 5. Sur GitHub, créez une Pull Request (optionnel)
# 6. Merger sur main pour déclencher le déploiement Netlify
git checkout main
git pull
git merge feature/ma-nouvelle-feature
git push origin main
```

### Variables d'Environnement sur Netlify

1. **Site settings** > **Build & deploy** > **Environment**
2. Cliquez **Edit variables**
3. Ajoutez vos variables (ex: API_KEY)
4. Redéployez

## 🎯 Checklist de Déploiement

- [ ] Repository GitHub créé et poussé
- [ ] Netlify connecté et premier déploiement fait
- [ ] Le site est accessible en ligne
- [ ] Tester toutes les fonctionnalités
- [ ] Test de création de compte
- [ ] Test de code d'invitation
- [ ] Test du classement mondial
- [ ] Test sur mobile
- [ ] Configuration du domaine personnalisé (si désiré)

## 📱 Test Multi-Navigateur

Testez votre site sur:
- Chrome
- Firefox
- Safari
- Edge

Utilisez [BrowserStack](https://www.browserstack.com) pour tester sur d'autres navigateurs/appareils.

## 🔗 Liens Utiles

- [Documentation Netlify](https://docs.netlify.com)
- [Déploiement Vite sur Netlify](https://vitejs.dev/guide/ssr.html)
- [GitHub Guides](https://guides.github.com)

## 💡 Tips Netlify

1. **Preview Deploy:** Chaque Pull Request crée un preview URL avant de merger
2. **Rollback:** Vous pouvez reverter à une version précédente facilement
3. **Analytics:** Netlify fournit des analytics de base gratuitement
4. **Monitoring:** Recevez des notifications si le build échoue

---

Vous êtes prêt pour le déploiement! 🚀
