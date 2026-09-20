# GoAbroad Admissions

## JSONBin setup

The Vue login, homepage scholarship list, and dashboard scholarship CRUD share one JSONBin document.

1. Create a JSONBin bin containing this shape:

```json
{
	"admins": [
    { "email": "goabroad@gmail.com", "password": "go!!!abroadadmissions", "name": "Admin" }
	],
	"scholarships": [],
	"subscribers": [],
	"contacts": [],
	"inquiries": []
}
```

2. Copy `.env.example` to `.env.local`.
3. Set `VITE_JSONBIN_KEY` and `VITE_JSONBIN_BIN_ID` in `.env.local`.
4. Restart the Vite dev server after changing environment variables.

The JSONBin master key is exposed to the browser by this frontend-only setup. For production, put JSONBin access behind a server-side API so the master key is never public.

## Dashboard email replies

The dashboard sends replies to the backend endpoint:

```http
POST /api/contact/reply
Authorization: Bearer <adminToken>
Content-Type: application/json
```

Request body:

```json
{
	"to": "student@example.com",
	"subject": "Re: Scholarship Inquiry",
	"message": "Your reply text",
	"originalMessageId": "contact-123",
	"originalMessage": "The student's original message"
}
```

The backend must authenticate the admin token and send the email through its configured email provider. Set `VITE_API_URL` if the API is hosted somewhere other than the default backend URL.
# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).
