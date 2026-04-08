# Screen Flow

> Navigation map for all screens in the application.
> Figma File Key: `9ypp4enmFmdK3YAFJLIu6C`

---

## Login

| Property | Value |
|---|---|
| Screen ID | `GzbNeVGJHz` |
| Screen Name | Login |
| Route | `/login` |
| Auth Required | No (public screen) |

### Entry Points (Navigation TO this screen)

| Source | Trigger |
|---|---|
| Direct URL | User navigates to `/login` |
| Protected route redirect | Unauthenticated user attempts to access a protected route and is redirected here |

### Exit Points (Navigation FROM this screen)

| Destination | Destination Screen ID | Trigger |
|---|---|---|
| Homepage SAA | `i87tDx10uM` | Successful Google OAuth login |
| Dropdown-ngon ngu | `hUyaaugye2` | Language selector click (opens dropdown overlay) |

### Key Components

| Component ID | Description |
|---|---|
| A_Header | Header with logo and language selector |
| B_Bia | Hero section with ROOT FURTHER key visual, description text, and LOGIN With Google button |
| D_Footer | Copyright footer |

---
