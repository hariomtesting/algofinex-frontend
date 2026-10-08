# AlgoFinex API Contract

Endpoint count: 15

> **Document Status:** Backend Handoff Specification  
> **Audience:** Backend Engineering Team, Tech Lead, Product Owner  
> **Scope:** Precise REST interface definition, trust boundaries, state machines, and open decisions.

---

## Contract Status

To establish complete transparency between frontend and backend engineering, all elements of this specification are explicitly categorized into four contract tiers:

1. **CONFIRMED**
   - Frontend routing topology (React Router v7) and protected-route mechanics.
   - Endpoint inventory (15 endpoints listed in this specification).
   - Frontend state machine models (`AuthStatus`, `ProductAccessStatus`, `SessionEnrollmentStatus`, `TicketStatus`, `OrderStatus`).
   - Strict separation of transport concerns (`apiClient`) from domain services.
   - Decoupling of auth storage: frontend does not mandate `localStorage` or client-managed tokens.
   - Authoritative entitlement rule: frontend never infers access from client-side state or redirects.

2. **PROPOSED**
   - Standard JSON response envelope structure (`{ success, data, error, timestamp }`).
   - Standard error shape (`{ code, message, fieldErrors?, requestId? }`).
   - HTTP status code mapping (200, 201, 400, 401, 403, 404, 409, 422, 429, 500).
   - Provisional REST URI path naming conventions.

3. **BACKEND DECISION REQUIRED**
   - Session management mechanism (HttpOnly cookies vs Bearer tokens).
   - CSRF protection strategy for state-changing endpoints (`POST`, `PUT`, `DELETE`).
   - TradingView provisioning pipeline implementation (internal webhook vs asynchronous batch queue).
   - Payment gateway architecture and webhook verification (`POST /checkout`).
   - Rate limiting quotas and threshold policies (HTTP 429).

4. **BUSINESS DECISION REQUIRED**
   - Actual AlgoFinex indicator technical specification and visual output claims.
   - Commercial pricing, currency, tax rules, and refund policy.
   - 3-Day Session live schedule dates and cohort sizing.
   - Referral program economics: commission percentages, attribution windows, payout thresholds, self-referral, and fraud prevention.

---

## Authentication

### Transport & Storage Policy
- **AUTH STORAGE = BACKEND DECISION, NOT A FRONTEND INVARIANT.**
- **Preferred Architecture:** **HttpOnly, Secure, SameSite-aware server-managed session cookies**.
- The frontend API client configures `credentials: "include"` by default for all requests.
- The frontend state machine only consumes:
  ```text
  loading ──► authenticated ──► unauthenticated ──► error
  ```
- Neither page components nor domain API services depend on or inspect client-side credential storage. If the backend mandates Bearer tokens (`Authorization: Bearer <token>`), that mechanism remains isolated inside the API client transport adapter.

### CSRF Protection Contract
- For all state-changing endpoints (`POST`, `PUT`, `PATCH`, `DELETE`), CSRF mitigation is a **BACKEND DECISION REQUIRED**.
- **Questions for Backend Team:**
  1. Is Double Submit Cookie, Encrypted Token Pattern, or SameSite=Strict/Lax cookie policy used for CSRF defense?
  2. If a CSRF token header is required (e.g. `X-CSRF-Token`), which endpoint issues it (e.g., returned via `GET /auth/me` or set in a readable cookie)?
  3. Does the backend enforce strict `Origin` / `Referer` header validation against permitted domains?

---

## Error Envelope

> **Status:** PROPOSED CONTRACT (Awaiting backend team acceptance or adjustment)

All non-2xx HTTP responses should normalize into this predictable structure:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Invalid email address format.",
    "fieldErrors": {
      "email": ["Please enter a valid corporate or personal email."]
    },
    "requestId": "req_afx_89102381"
  },
  "timestamp": "2026-10-08T12:00:00Z"
}
```

### HTTP Status Code Semantics
- **200 OK / 201 Created:** Successful execution. Data envelope returned.
- **400 Bad Request:** Syntactic or structural validation failure. Populates form `fieldErrors`.
- **401 Unauthorized:** Authentication session absent, invalid, or expired. Client transitions to `unauthenticated` and routes to `/login?redirect=...`.
- **403 Forbidden:** Authenticated user lacks permission to access the requested resource.
- **404 Not Found:** Resource does not exist or user does not have permission to know it exists.
- **409 Conflict:** Resource state conflict (e.g. duplicate email registration or handle collision).
- **422 Unprocessable Entity:** Semantic validation failure (e.g. password does not meet security criteria).
- **429 Too Many Requests:** Rate limit exceeded. Frontend displays cooldown alert.
- **500 / 502 / 503:** Internal server or gateway error. Trapped gracefully by `RouteErrorBoundary` or inline error state without UI crash.

---

## Auth Endpoints

### 1. `POST /auth/signup`
- **Method:** `POST`
- **Path:** `/auth/signup`
- **Authentication:** None (Public)
- **CSRF Required:** BACKEND DECISION REQUIRED
- **Request Body:**
  ```json
  {
    "name": "Alex Sterling",
    "email": "alex@sterlingtrading.io",
    "password": "Password123!"
  }
  ```
- **Query Parameters:** None
- **Success Status:** `201 Created`
- **Success Response:**
  ```json
  {
    "user": {
      "id": "usr_afx_8921",
      "name": "Alex Sterling",
      "email": "alex@sterlingtrading.io",
      "createdAt": "2026-03-15T09:30:00Z",
      "tradingViewUsername": null
    },
    "token": "optional_bearer_token_if_cookie_not_used"
  }
  ```
- **Error Statuses:** `400 Bad Request`, `409 Conflict` (Email already registered), `422 Unprocessable Entity` (Weak password)

---

### 2. `POST /auth/login`
- **Method:** `POST`
- **Path:** `/auth/login`
- **Authentication:** None (Public)
- **CSRF Required:** BACKEND DECISION REQUIRED
- **Request Body:**
  ```json
  {
    "email": "alex@sterlingtrading.io",
    "password": "Password123!"
  }
  ```
- **Query Parameters:** None
- **Success Status:** `200 OK`
- **Success Response:** Same structure as `POST /auth/signup`
- **Error Statuses:** `400 Bad Request`, `401 Unauthorized` (Invalid credentials), `429 Too Many Requests`

---

### 3. `POST /auth/logout`
- **Method:** `POST`
- **Path:** `/auth/logout`
- **Authentication:** REQUIRED (Authenticated User)
- **CSRF Required:** BACKEND DECISION REQUIRED
- **Request Body:** None
- **Query Parameters:** None
- **Success Status:** `200 OK` or `204 No Content`
- **Success Response:**
  ```json
  {
    "loggedOut": true
  }
  ```
- **Error Statuses:** `401 Unauthorized`

---

### 4. `GET /auth/me`
- **Method:** `GET`
- **Path:** `/auth/me`
- **Authentication:** REQUIRED (Authenticated User; identity derived from session cookie/header)
- **CSRF Required:** No (Safe read method)
- **Request Body:** None
- **Query Parameters:** None
- **Success Status:** `200 OK`
- **Success Response:**
  ```json
  {
    "user": {
      "id": "usr_afx_8921",
      "name": "Alex Sterling",
      "email": "alex@sterlingtrading.io",
      "createdAt": "2026-03-15T09:30:00Z",
      "tradingViewUsername": "sterling_trader"
    }
  }
  ```
- **Error Statuses:** `401 Unauthorized` (Triggers frontend transition to `unauthenticated`)

---

## Product Endpoints

### 5. `GET /products`
- **Method:** `GET`
- **Path:** `/products`
- **Authentication:** None (Public)
- **CSRF Required:** No
- **Request Body:** None
- **Query Parameters:** None
- **Success Status:** `200 OK`
- **Success Response:**
  ```json
  {
    "products": [
      {
        "id": "prod_indicator_01",
        "name": "AlgoFinex Indicator",
        "slug": "indicator",
        "description": "Visual tools designed to provide chart clarity and support a disciplined approach to technical analysis on TradingView.",
        "priceDisplay": "Price shown at checkout",
        "status": "available",
        "provenance": "backend_supplied",
        "capabilities": [
          {
            "index": "01",
            "title": "Market View",
            "description": "Visual tools designed to help organize market information directly on the chart.",
            "provenance": "backend_supplied"
          }
        ]
      }
    ]
  }
  ```
- **Error Statuses:** `500 Internal Server Error`

---

### 6. `GET /products/:id`
- **Method:** `GET`
- **Path:** `/products/:id` (Accepts product ID or slug)
- **Authentication:** None (Public)
- **CSRF Required:** No
- **Request Body:** None
- **Query Parameters:** None
- **Success Status:** `200 OK`
- **Success Response:** Returns single `product` object matching the schema in `GET /products`
- **Error Statuses:** `404 Not Found`

---

## Access Endpoints

### 7. `GET /users/me/product-access`
- **Method:** `GET`
- **Path:** `/users/me/product-access`
- **Authentication:** REQUIRED (Authenticated User; identity derived from session)
- **CSRF Required:** No
- **Request Body:** None
- **Query Parameters:** None
- **Success Status:** `200 OK`
- **Success Response:**
  ```json
  {
    "access": {
      "id": "acc_ind_4021",
      "userId": "usr_afx_8921",
      "productId": "prod_indicator_01",
      "productName": "AlgoFinex Indicator",
      "tradingViewUsername": "sterling_trader",
      "status": "active",
      "accessGrantedAt": "2026-03-16T14:20:00Z",
      "errorMessage": null,
      "instructions": [
        "Open any chart on TradingView.com",
        "Click 'Indicators' on the top toolbar",
        "Navigate to the 'Invite-Only Scripts' section",
        "Select 'AlgoFinex Indicator' to add to your layout"
      ],
      "supportContactUrl": "/dashboard/support",
      "provenance": "backend_supplied"
    }
  }
  ```
- **Error Statuses:** `401 Unauthorized`

---

### 8. `POST /users/me/tradingview`
- **Method:** `POST`
- **Path:** `/users/me/tradingview`
- **Authentication:** REQUIRED (Authenticated User; identity derived from session)
- **CSRF Required:** BACKEND DECISION REQUIRED
- **Request Body:**
  ```json
  {
    "tradingViewUsername": "sterling_trader"
  }
  ```
- **Query Parameters:** None
- **Success Status:** `200 OK` (or `202 Accepted` if queued)
- **Success Response:** Returns updated `access` model with status `"provisioning"`
- **Error Statuses:** `400 Bad Request` (Invalid handle format), `401 Unauthorized`, `409 Conflict` (Handle linked to another user)

---

## Session Endpoints

### 9. `GET /sessions`
- **Method:** `GET`
- **Path:** `/sessions`
- **Authentication:** None (Public)
- **CSRF Required:** No
- **Request Body:** None
- **Query Parameters:** None
- **Success Status:** `200 OK`
- **Success Response:**
  ```json
  {
    "sessions": [
      {
        "id": "sess_3day_01",
        "title": "3-Day Session",
        "subtitle": "A focused introduction to the AlgoFinex approach",
        "summary": "A structured curriculum designed to introduce disciplined chart reading, execution habits, and daily process.",
        "provenance": "backend_supplied",
        "days": [
          {
            "dayNumber": "01",
            "title": "Foundation",
            "description": "Core chart principles, contextual orientation, and disciplined risk awareness.",
            "status": "completed",
            "duration": "90 min",
            "provenance": "backend_supplied"
          }
        ]
      }
    ]
  }
  ```
- **Error Statuses:** `500 Internal Server Error`

---

### 10. `GET /sessions/:id`
- **Method:** `GET`
- **Path:** `/sessions/:id`
- **Authentication:** None (Public)
- **CSRF Required:** No
- **Request Body:** None
- **Query Parameters:** None
- **Success Status:** `200 OK`
- **Success Response:** Returns single `session` object
- **Error Statuses:** `404 Not Found`

---

### 11. `GET /users/me/session-enrollment`
- **Method:** `GET`
- **Path:** `/users/me/session-enrollment`
- **Authentication:** REQUIRED (Authenticated User; identity derived from session)
- **CSRF Required:** No
- **Request Body:** None
- **Query Parameters:** None
- **Success Status:** `200 OK`
- **Success Response:**
  ```json
  {
    "enrollment": {
      "id": "enr_sess_1092",
      "userId": "usr_afx_8921",
      "sessionId": "sess_3day_01",
      "sessionTitle": "3-Day Session",
      "status": "confirmed",
      "enrolledAt": "2026-03-18T11:00:00Z",
      "scheduledCohortDate": "2026-04-01T17:00:00Z",
      "scheduleNotice": "Session access details will be delivered via email prior to live schedule."
    }
  }
  ```
- **Error Statuses:** `401 Unauthorized`

---

## Referral Endpoints

### 12. `GET /users/me/referrals`
- **Method:** `GET`
- **Path:** `/users/me/referrals`
- **Authentication:** REQUIRED (Authenticated User; identity derived from session)
- **CSRF Required:** No
- **Request Body:** None
- **Query Parameters:** None
- **Success Status:** `200 OK`
- **Success Response:**
  ```json
  {
    "referral": {
      "referralCode": "STERLING2026",
      "referralUrl": "https://algofinex.io/?ref=STERLING2026",
      "totalInvites": 0,
      "successfulInvites": 0,
      "rewardStatus": "Program details to be announced by the business team.",
      "recentActivity": [],
      "provenance": "backend_supplied"
    }
  }
  ```
- **Error Statuses:** `401 Unauthorized`

---

## Support Endpoints

### 13. `GET /users/me/support-tickets`
- **Method:** `GET`
- **Path:** `/users/me/support-tickets`
- **Authentication:** REQUIRED (Authenticated User; returns tickets owned by authenticated session)
- **CSRF Required:** No
- **Request Body:** None
- **Query Parameters:** None
- **Success Status:** `200 OK`
- **Success Response:**
  ```json
  {
    "tickets": [
      {
        "id": "tkt_8091",
        "subject": "TradingView username confirmation",
        "category": "Indicator Access",
        "message": "Requested confirmation of script provisioning for my TradingView ID.",
        "status": "resolved",
        "createdAt": "2026-03-17T10:14:00Z",
        "updatedAt": "2026-03-17T12:00:00Z",
        "lastResponseAt": "2026-03-17T12:00:00Z"
      }
    ]
  }
  ```
- **Error Statuses:** `401 Unauthorized`

---

### 14. `POST /support-tickets`
- **Method:** `POST`
- **Path:** `/support-tickets`
- **Authentication:** Optional (authenticated session identity is derived on backend; unauthenticated guest inquiries allowed)
- **CSRF Required:** BACKEND DECISION REQUIRED
- **Request Body:**
  ```json
  {
    "subject": "Question regarding script activation",
    "category": "Indicator Access",
    "message": "I submitted my handle earlier and would like to confirm setup instructions."
  }
  ```
- **Query Parameters:** None
- **Success Status:** `201 Created`
- **Success Response:**
  ```json
  {
    "ticket": {
      "id": "tkt_9102",
      "subject": "Question regarding script activation",
      "category": "Indicator Access",
      "message": "I submitted my handle earlier...",
      "status": "open",
      "createdAt": "2026-10-08T13:00:00Z",
      "updatedAt": "2026-10-08T13:00:00Z"
    }
  }
  ```
- **Error Statuses:** `400 Bad Request` (Missing fields), `429 Too Many Requests`

---

## Checkout Endpoints

### 15. `POST /checkout`
- **Method:** `POST`
- **Path:** `/checkout`
- **Authentication:** Optional (Guest checkout supported)
- **CSRF Required:** BACKEND DECISION REQUIRED
- **Request Body:**
  ```json
  {
    "productId": "prod_indicator_01",
    "tradingViewUsername": "sterling_trader",
    "contactEmail": "alex@sterlingtrading.io"
  }
  ```
- **Query Parameters:** None
- **Success Status:** `200 OK` (or `201 Created`)
- **Success Response:**
  ```json
  {
    "order": {
      "id": "ord_890123",
      "items": [
        {
          "productId": "prod_indicator_01",
          "productName": "AlgoFinex Indicator",
          "priceDisplay": "Price shown at checkout"
        }
      ],
      "subtotalDisplay": "Price shown at checkout",
      "taxesDisplay": "Calculated at provider checkout",
      "totalDisplay": "Price shown at checkout",
      "status": "pending",
      "tradingViewUsername": "sterling_trader",
      "contactEmail": "alex@sterlingtrading.io",
      "createdAt": "2026-10-08T13:00:00Z"
    },
    "paymentProvider": "stripe",
    "paymentRedirectUrl": "https://checkout.stripe.com/c/pay/cs_live_...",
    "requiresPayment": true
  }
  ```
- **Error Statuses:** `400 Bad Request` (Missing required parameters), `422 Unprocessable Entity`

---

## State Machines

### Product Access State Machine
```text
┌────────────────┐     User submits handle     ┌────────────────┐
│  not_entitled  ├────────────────────────────►│    pending     │
└────────────────┘                             └───────┬────────┘
                                                       │
                                                       ▼
┌────────────────┐     Provisioning rejected   ┌────────────────┐
│     error      │◄────────────────────────────┤  provisioning  │
└───────┬────────┘                             └───────┬────────┘
        │                                              │
        │ Re-submit handle                             │ Provisioning confirmed
        ▼                                              ▼
┌───────────────────────────────────────────────────────────────┐
│                            active                             │
└───────────────────────────────────────────────────────────────┘
```
- `not_entitled`: Account holds no active entitlement.
- `pending`: Entitlement is purchased/registered, but TradingView handle has not yet been submitted.
- `provisioning`: TradingView handle received; backend provisioning workflow in progress.
- `active`: TradingView handle granted invite-only permissions on TradingView.
- `error`: Handle could not be resolved or authorization rejected.

### Session Enrollment State Machine
- `not_enrolled`: User has not registered for an educational cohort.
- `pending`: Application received, cohort allocation pending.
- `confirmed`: Seat confirmed for upcoming live cohort.
- `active`: Live session cohort is currently underway.
- `completed`: User completed all 3 curriculum days.

---

## Security Boundaries

### 1. Payment Trust Boundary
- **Product access is granted only from backend-confirmed payment/order state. Client-side redirects are not authoritative.**
- The frontend will:
  - Submit the checkout order intent (`POST /checkout`).
  - Redirect the browser to `paymentRedirectUrl` if supplied by backend.
  - Display pending, success, or failure state returned by authoritative backend queries.
- The frontend **never** infers that a payment succeeded or grants entitlement based on returning to a URL like `/checkout?status=success`. Webhook confirmation and entitlement issuance belong strictly to the backend.

### 2. Product Entitlement Trust Boundary
- `GET /users/me/product-access` is the **sole authoritative source** for frontend indicator access state.
- The frontend never infers entitlement from:
  - Checkout URL parameters
  - Button clicks
  - Optimistic client state
  - Payment return query strings
  - Mock state

### 3. Identity & Ownership Derivation
- For all `/users/me/*` endpoints and authenticated mutations (`POST /support-tickets`, `POST /users/me/tradingview`), the backend **must derive user identity exclusively from the authenticated session**.
- Client-supplied `userId` values in request bodies are never trusted for ownership or authorization decisions.

### 4. Client Environment Variable Isolation
- Only variables prefixed with `VITE_*` are bundled into the client build.
- `VITE_*` variables are completely public and inspectable by anyone who loads the website.
- **Never place:** database credentials, private API keys, payment secret keys (e.g. Stripe Secret Key), JWT signing secrets, or backend service credentials into frontend `.env` files.

---

## Open Backend Decisions

The following items are designated **BACKEND DECISION REQUIRED** and must be resolved by the backend engineering team:

1. **Session Cookie Configuration**:
   - Cookie name (e.g., `__Host-afx_session`).
   - Domain, SameSite (`Lax` vs `Strict`), Secure, and HttpOnly attributes.
2. **CSRF Mitigation Architecture**:
   - Requirement of CSRF tokens for state-changing endpoints (`POST /auth/logout`, `POST /users/me/tradingview`, `POST /support-tickets`, `POST /checkout`).
   - Token issuance and validation mechanics.
3. **TradingView Provisioning Pipeline**:
   - Exact provisioning mechanism (webhook-driven automated bot vs administrative dashboard queue). This is a backend implementation detail; the frontend only tracks the 5 status enum states.
4. **Checkout & Payment Processor**:
   - Selection of payment vendor (Stripe Hosted Checkout, Adyen, custom merchant processor, crypto).
   - Webhook endpoint design and reconciliation flow.
5. **Rate Limiting (HTTP 429)**:
   - Rate limiting thresholds for sensitive endpoints (`POST /auth/login`, `POST /auth/signup`, `POST /support-tickets`).

---

## Open Business Decisions

The following items are designated **BUSINESS DECISION REQUIRED** and must be resolved by product leadership:

1. **Indicator Functional Specification**:
   - Final product capability descriptions and technical requirements. (Currently labeled `provenance: "placeholder"`).
2. **Commercial Pricing & Currency**:
   - Authoritative pricing tiers, recurring subscription vs one-time license, VAT/sales tax handling.
3. **3-Day Session Cohorts**:
   - Cohort dates, attendance caps, and delivery platforms (Zoom, Discord, YouTube Unlisted, custom stream).
4. **Referral Program Economics**:
   - Commission structures, fixed rewards vs percentages, attribution cookies, payout rules, minimum withdrawal thresholds, and self-referral/fraud policies.

---

## Frontend Integration Notes

1. **Decoupled Architecture**:
   - UI components interact strictly with domain API modules (`authApi`, `productApi`, `accessApi`, `sessionApi`, `referralApi`, `supportApi`, `checkoutApi`).
   - No direct `fetch()` or `axios()` calls exist within UI components.
2. **Mock Mode Toggle**:
   - Local mock simulation is controlled by `VITE_USE_MOCK=true` in `.env`.
   - Running with `VITE_USE_MOCK=false` dispatches requests to `VITE_API_BASE_URL` without altering page components.
3. **SPA Hosting Requirement**:
   - All client routes must rewrite to `/index.html` with HTTP 200 on production web servers.
   - Example Nginx: `try_files $uri $uri/ /index.html;`
   - Example Vercel: `{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }`
   - Example Netlify: `/* /index.html 200`
