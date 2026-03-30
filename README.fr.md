# PartnerHub - Plateforme de Recrutement Full-Stack

Une plateforme complète de recrutement full-stack construite avec **Next.js 16** + **NestJS 11** + **PostgreSQL**. Supporte trois rôles d'utilisateur — **Candidat**, **Propriétaire de Projet** et **Administrateur** — avec des flux complets pour la publication d'emploi, la candidature, l'examen, le contrôle d'accès basé sur les rôles et les notifications en temps réel.

> **Projet Démo Complet** — Démontre les capacités de développement full-stack, notamment la conception d'architecture système, la gestion des permissions, les systèmes de notification et les pratiques de code au niveau production.

---

## Stack Technologique

| Couche | Technologie |
|---|---|
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript, Ant Design 6, Tailwind CSS 4, Zustand |
| **Backend** | NestJS 11, Prisma 5, Passport JWT, bcrypt |
| **Base de Données** | PostgreSQL (local ou cloud Neon) |
| **Internationalisation** | Anglais, Français |
| **Conteneurisation** | Docker, Docker Compose |

---

## Fonctionnalités Principales

### Candidat
- 🔍 Parcourir et rechercher tous les postes actifs
- ⭐ Collectionner (favoriser) les postes
- 📝 Postuler aux emplois - Remplir des questionnaires personnalisés + télécharger des fichiers (CV, portfolio)
- 👤 Remplissage automatique des informations personnelles enregistrées
- 📊 Suivre l'état de la candidature (postulé → examiné / rejeté)
- 🔔 Recevoir les notifications de changement d'état
- 🌍 Sélection en cascade Pays/État

### Propriétaire de Projet
- ✍️ Créer des postes à partir de zéro ou importer à partir de modèles
- 📋 Gérer les modèles de postes réutilisables
- 📱 Afficher la liste des candidatures (triée par nombre d'examinés)
- ✅ Examen/rejet des candidatures en un clic
- 🔴 Indicateur de badge pour les postes avec candidatures en attente
- 🔔 Recevoir les notifications lorsque de nouvelles candidatures arrivent

### Administrateur
- 👥 Gestion des utilisateurs (CRUD + trail d'audit)
- 🔐 Gestion des rôles et permissions
- 📚 Gestion du dictionnaire (pays, régions, configuration)
- 📋 Trail d'audit complet (tous les enregistrements de modifications)

### Fonctionnalités Système
- 🔑 Authentification JWT + gestion de session
- 🛡️ Navigation et contrôle d'accès basés sur les rôles
- 🔔 Système de notifications (icône cloche, compteur non lu, marquer comme lu)
- 📊 Tableaux de données réactifs (recherche, filtre, tri, pagination)
- 📤 Téléchargement de fichiers (nommage UUID)
- 💾 Sauvegarde automatique des brouillons de postes
- 🎯 Navigation inter-pages (surbrillance et défilement vers la cible)
- 🎓 Guide interactif (Ant Design Tour)
- 📖 Documentation d'aide (manuel d'application paginé de 8 pages)
- 🌐 Support complet en anglais et français

---

## Structure du Projet

```
PartnerHub/
├── backend/                     # Backend NestJS 11
│   ├── src/
│   │   ├── auth/                # Authentification JWT
│   │   ├── users/               # Gestion des utilisateurs
│   │   ├── roles/               # Gestion des rôles
│   │   ├── permissions/         # Gestion des permissions
│   │   ├── job-post/            # CRUD des postes
│   │   ├── job-post-template/   # Modèles de postes
│   │   ├── application/         # Gestion des candidatures
│   │   ├── applicant-info/      # Informations du candidat
│   │   ├── notification/        # Système de notifications
│   │   ├── dictionary/          # Gestion du dictionnaire
│   │   ├── audit-trail/         # Enregistrement des modifications
│   │   ├── upload/              # Téléchargement de fichiers
│   │   └── prisma/              # Service de base de données
│   ├── prisma/
│   │   ├── schema.prisma        # Schéma de base de données (10 modèles)
│   │   ├── seed.mjs             # Initialiser rôles, permissions, dictionnaire
│   │   └── migrations/          # 21 fichiers de migration
│   ├── Dockerfile               # Image production
│   └── package.json
│
├── frontend/                    # Frontend Next.js 16
│   ├── app/                     # Pages
│   │   ├── login/               # Authentification
│   │   ├── admin/               # Utilisateurs, rôles, permissions, dictionnaire
│   │   ├── applicant/           # Profil du candidat
│   │   ├── template/            # Modèles de postes
│   │   ├── post/                # Création et détails du poste
│   │   └── application/         # Détails de l'examen de candidature
│   ├── components/              # Composants partagés
│   │   ├── home/                # Vues d'accueil basées sur les rôles (avec Tour)
│   │   ├── layout/              # Navigation, menu, fil d'Ariane
│   │   └── table/               # Tableau de données réutilisable
│   ├── api/                     # Fonctions client API
│   ├── lib/                     # Utilitaires, i18n, état, intercepteurs
│   ├── Dockerfile               # Image production
│   └── package.json
│
├── docker-compose.yml           # Configuration Docker Compose
├── start.ps1                    # Script de démarrage (PowerShell)
├── stop.ps1                     # Script d'arrêt (PowerShell)
├── .gitignore
└── README.fr.md                 # Ce fichier
```

---

## Schéma de Base de Données

**Relations Centrales:**
```
User ──< JobPost ──< Application >── User (applicant)
  │         │
  │         └── questions (JSON)
  │
  ├──< JobPostTemplate
  ├──< Notification
  ├──1 ApplicantInformation
  ├──< AuditTrail
  └──<> Role ──<> Permission

Dictionary (key-value configuration)
```

**10 Modèles**: User, Role, Permission, Dictionary, AuditTrail, JobPostTemplate, JobPost, ApplicantInformation, Application, Notification

**Énumérations**: `JobPostState` (active, closed) · `ApplicationState` (applied, reviewed, rejected)

---

## Démarrage Rapide

### Prérequis

- **Node.js** 20+ ([Télécharger](https://nodejs.org/))
- **PostgreSQL** 15+ ([Télécharger](https://www.postgresql.org/download/)) **OU** **Docker** + **Docker Compose**
- **npm** 10+ (installé automatiquement avec Node.js)
- **Git**

### Option 1: Démarrage Local (Windows PowerShell)

#### 1. Cloner et Installer les Dépendances

```powershell
# Cloner le projet
git clone <repository-url>
cd partner-hub

# Installer les dépendances racine
npm install

# Installer les dépendances backend
npm install --prefix backend

# Installer les dépendances frontend
npm install --prefix frontend
```

#### 2. Configurer la Base de Données

**Option A: Utiliser PostgreSQL Local**
- Installer et démarrer PostgreSQL
- Vérifier la chaîne de connexion: `postgresql://postgres:postgres@localhost:5432/partnerhub`
- Éditer `backend/.env` avec la chaîne de connexion correcte

**Option B: Utiliser Docker** (Recommandé)
```powershell
# Démarrer le projet avec Docker et auto-initialisation
.\start.ps1 -UseDocker
```

#### 3. Démarrer le Projet

```powershell
# Démarrage standard (PostgreSQL doit être en cours d'exécution)
.\start.ps1

# Utiliser Docker PostgreSQL (Recommandé)
.\start.ps1 -UseDocker

# Ignorer l'initialisation de la base de données
.\start.ps1 -SkipDb

# Ignorer les données de semence
.\start.ps1 -SkipSeed
```

### Option 2: Docker Compose (Plus Facile) ⭐

```powershell
# Construire et démarrer tous les services (PostgreSQL + Backend + Frontend)
docker-compose up --build

# Exécuter en arrière-plan
docker-compose up -d --build

# Afficher les journaux
docker-compose logs -f backend

# Arrêter les services
docker-compose down

# Nettoyer toutes les données et recommencer
docker-compose down -v
```

### Accéder à l'Application

Après le démarrage, accédez dans votre navigateur:

| Service | URL | Remarque |
|---|---|---|
| **Frontend** | http://localhost:3000 | Application principale |
| **API Backend** | http://localhost:3001 | API REST |
| **Docs API** | http://localhost:3001/api | Swagger (si configuré) |
| **Vérification Santé** | http://localhost:3001/api/health | Statut backend |

### Comptes de Test

Après l'exécution de `npm run seed --prefix backend` (ou auto-initialisation):

| Rôle | Email | Mot de passe | Permissions |
|---|---|---|---|
| **Admin** | admin@example.com | password123 | Toutes les permissions |
| **Propriétaire** | owner@example.com | password123 | Gestion des emplois et candidatures |
| **Candidat** | applicant@example.com | password123 | Parcourir et postuler |

---

## Flux de Développement

### Frontend Uniquement

```powershell
cd frontend
npm run dev
# Accédez à http://localhost:3000
```

### Backend Uniquement

```powershell
cd backend
npm run start:dev
# L'API s'exécute sur http://localhost:3001
```

### Frontend et Backend

```powershell
# Méthode 1: Utiliser le script de démarrage
.\start.ps1

# Méthode 2: Utiliser la commande npm
npm run dev
```

### Opérations de Base de Données

```bash
# Exécuter les migrations en attente
cd backend && npm run prisma:migrate

# Déployer les migrations en production
npm run prisma:migrate:deploy

# Réinitialiser la base de données (supprime toutes les données) ⚠️
cd backend
npx prisma migrate reset

# Données de semence de test
npm run seed --prefix backend

# Ouvrir Prisma Studio (éditeur de base de données visuel)
cd backend && npx prisma studio
```

---

## Construire pour la Production

### Construire Localement

```powershell
# Construire le frontend
npm run build:frontend

# Construire le backend
npm run build:backend

# Ou construire les deux
npm run build:frontend && npm run build:backend
```

### Construire des Images Docker

```powershell
# Construire des images individuelles
docker build -t partnerhub-backend:latest ./backend
docker build -t partnerhub-frontend:latest ./frontend

# Ou utiliser Docker Compose
docker-compose build
```

### Déployer en Production

```bash
# Définir les variables d'environnement de production
set DATABASE_URL="your-production-database-url"
set JWT_SECRET="generate-a-strong-random-key"
set FRONTEND_URL="your-domain.com"

# Exécuter les migrations et initialiser
cd backend && npm run start:prod

# Utiliser Docker (Recommandé)
docker-compose -f docker-compose.prod.yml up -d
```

---

## Arrêter les Services

```powershell
# Arrêter tous les services locaux
.\stop.ps1

# Arrêter et supprimer les conteneurs Docker
.\stop.ps1 -RemoveDocker

# Ou arrêter manuellement:
# 1. Appuyez sur Ctrl+C dans la fenêtre PowerShell de démarrage
# 2. PostgreSQL s'arrêtera automatiquement
```

---

## Aperçu des Points de Terminaison API

| Module | Points Principaux |
|---|---|
| **Authentification** | `POST /api/auth/login` · `GET /api/auth/me` |
| **Utilisateurs** | `GET /api/users` · `POST /api/users` · `PUT /api/users/:id` |
| **Rôles** | `GET /api/roles` · `POST /api/roles` · `DELETE /api/roles/:id` |
| **Permissions** | `GET /api/permissions` · `POST /api/permissions` |
| **Postes** | `GET /api/job-posts` · `POST /api/job-posts` · `PATCH /api/job-posts/:id` |
| **Modèles** | `GET /api/job-post-templates` · `POST /api/job-post-templates` |
| **Candidatures** | `POST /api/applications` · `PATCH /api/applications/:id/state` |
| **Notifications** | `GET /api/notifications` · `PATCH /api/notifications/:id/reviewed` |
| **Dictionnaire** | `GET /api/dictionary` · `POST /api/dictionary` |
| **Téléchargement** | `POST /api/upload` · `GET /api/upload/:filename` |
| **Trail d'Audit** | `GET /api/audit-trail` |

---

## Variables d'Environnement

### Backend (`backend/.env`)

```env
# Connexion à la base de données
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/partnerhub"

# Configuration du service
PORT=3001
FRONTEND_URL="http://localhost:3000"

# Authentification JWT
JWT_SECRET="your-secret-key-change-in-production"
JWT_EXPIRATION="24h"
```

### Frontend (`frontend/.env.local`)

```env
# Adresse API
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

---

## Dépannage

### Erreur de Connexion PostgreSQL

**Problème:** `Error: connect ECONNREFUSED 127.0.0.1:5432`

**Solution:**
1. Vérifier que PostgreSQL est en cours d'exécution
2. Vérifier `DATABASE_URL` dans `backend/.env`
3. Utiliser `.\start.ps1 -UseDocker` pour exécuter la version Docker

### Port Déjà Utilisé

**Problème:** `Error: listen EADDRINUSE :::3000` ou `:::3001`

**Solution:**
```powershell
# Trouver le processus utilisant le port spécifique
Get-NetTCPConnection -LocalPort 3000 | Select-Object OwningProcess
Get-Process -Id <ProcessId> | Stop-Process -Force
```

### Erreur Module Non Trouvé

**Problème:** `Error: Cannot find module '@nestjs/common'`

**Solution:**
```bash
# Effacer et réinstaller les dépendances
rm -r backend/node_modules backend/package-lock.json
cd backend && npm install
```

### Échec de la Migration de Base de Données

**Problème:** `Error: Migration X failed`

**Solution:**
```bash
# Réinitialiser la base de données et relancer les migrations ⚠️ supprime toutes les données
cd backend
npx prisma migrate reset
```

---

## Guide de Contribution

1. Forker le projet
2. Créer une branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Valider vos modifications (`git commit -m 'Add: AmazingFeature'`)
4. Pousser vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## Licence

Ce projet est destiné à des fins de démonstration. Consultez [LICENSE](LICENSE) pour plus de détails.

---

## Contact

- **Lien du Projet:** [Référentiel GitHub](https://github.com/your-username/partner-hub)
- **Rapports de Bogues:** [Problèmes](https://github.com/your-username/partner-hub/issues)

---

## Ressources Associées

- 📘 [Documentation Next.js](https://nextjs.org/docs)
- 📘 [Documentation NestJS](https://docs.nestjs.com)
- 📘 [Documentation Prisma](https://www.prisma.io/docs)
- 📘 [Documentation PostgreSQL](https://www.postgresql.org/docs)
- 🐳 [Documentation Docker](https://docs.docker.com)
- 🎨 [Ant Design](https://ant.design)
- 🎨 [Tailwind CSS](https://tailwindcss.com)

---

**Dernière Mise à Jour:** 30 Mars 2026  
**Version:** 1.0.0  
**Statut:** 🔧 En Développement
