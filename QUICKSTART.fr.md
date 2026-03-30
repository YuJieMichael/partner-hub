# Guide de Démarrage Rapide PartnerHub

## ⚡ Démarrage en 30 Secondes

Copiez et collez la commande ci-dessous pour démarrer le projet en un clic:

```powershell
cd c:\Users\yujie\Documents\GitHub\partner-hub
.\start.ps1 -UseDocker
```

Après l'achèvement, visitez:
- 🌐 Frontend: http://localhost:3000
- 🔧 Backend: http://localhost:3001

### Compte de Test
- Email: `admin@example.com` 
- Mot de passe: `password123`

---

## 📋 Résumé des Améliorations du Projet

### Nouvelles Fonctionnalités
✅ Support Docker - Démarrez tout l'environnement en un clic  
✅ Initialisation Automatique de la Base de Données - Auto-exécutez les migrations et les données de semence  
✅ Script de Démarrage Amélioré - Supportez Docker ou PostgreSQL local  
✅ Documentation Complète - Guide de démarrage rapide en anglais et français  
✅ Correctifs de Sécurité - 0 vulnérabilité connue  

### Liste des Fichiers
| Fichier | Statut | Description |
|---|---|---|
| `backend/.env` | ✅ Nouveau | Variables d'environnement |
| `backend/.env.example` | ✅ Nouveau | Modèle de configuration |
| `backend/prisma/seed.mjs` | ✅ Nouveau | Semence de base de données |
| `backend/Dockerfile` | ✅ Nouveau | Image backend |
| `frontend/Dockerfile` | ✅ Nouveau | Image frontend |
| `docker-compose.yml` | ✅ Nouveau | Orchestration Docker |
| `start.ps1` | ✅ Amélioré | Script de démarrage amélioré |
| `stop.ps1` | ✅ Amélioré | Script d'arrêt amélioré |
| `README.md` | ✅ Amélioré | Documentation complète |
| `README.en.md` | ✅ Nouveau | Documentation anglaise |
| `README.fr.md` | ✅ Nouveau | Documentation française |
| `IMPROVEMENTS.md` | ✅ Nouveau | Résumé des améliorations |
| `QUICKSTART.md` | ✅ Nouveau | Guide de démarrage original |
| `QUICKSTART.en.md` | ✅ Nouveau | Guide de démarrage anglais |
| `QUICKSTART.fr.md` | ✅ Nouveau | Ce fichier |

---

## 🎯 Prochaines Étapes

### 1. Démarrer le Projet
```powershell
.\start.ps1 -UseDocker
```

### 2. Attendre le Démarrage des Services
- 📊 Base de Données: Démarrage automatique (3-5 secondes)
- 🔨 Backend: Initialisation et démarrage automatiques (10-15 secondes)
- 🎨 Frontend: Construction et démarrage automatiques (20-30 secondes)

### 3. Ouvrir dans le Navigateur
- Visitez http://localhost:3000
- Entrez l'email: `admin@example.com`
- Entrez le mot de passe: `password123`

### 4. Arrêter les Services
```powershell
.\stop.ps1
```

---

## ⚙️ Autres Méthodes de Démarrage

### Utilisation de PostgreSQL Local
```powershell
# PostgreSQL doit être installé et en cours d'exécution en premier
.\start.ps1
```

### Démarrage Manuel (pour le débogage)
```powershell
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Docker Compose
```powershell
# Démarrer
docker-compose up --build

# Exécuter en arrière-plan
docker-compose up -d --build

# Arrêter
docker-compose down
```

---

## 🔑 Comptes de Test

| Rôle | Email | Mot de passe |
|---|---|---|
| Admin | admin@example.com | password123 |
| Propriétaire | owner@example.com | password123 |
| Candidat | applicant@example.com | password123 |

---

## 📖 Documentation Complète

Voir [README.fr.md](README.fr.md) et [IMPROVEMENTS.md](IMPROVEMENTS.md)

---

**Bon utilisation!** 🎉
