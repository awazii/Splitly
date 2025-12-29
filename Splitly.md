# 📘 Splitly App: Master Data & Logic Blueprint

**Version:** 1.0 (Post-Ideation Phase)
**Purpose:** This document defines the data architecture, mathematical formulas, and display logic for the core financial features of the Splitly app.

---

## 1. Core Architectural Concepts

### A. The "Master Ledger" (The Engine)
At the heart of the app is a global registry that tracks the financial relationship between any two given users.
* Every time money is involved in an expense, the app calculates the net impact between the involved parties and updates their specific page in the Master Ledger.
* The "Global Net Balance" between two friends is simply the current running total on their Master Ledger page.

### B. Immutable History vs. Settlements
This is crucial for keeping the backend simple.
* **Expenses are History:** When an expense is saved, it is carved in stone. We **never** go back and edit an old expense record to mark it as "paid."
* **Settlements are New Transactions:** When someone pays back a debt, it is recorded as a *new*, separate transaction (a "Payment"). This payment has a negative value that offsets the positive debt value in the Master Ledger.

---

## 2. Data Definitions & Math Formulas

We use specific terms that mean very specific things. Do not mix these up.

### A. "My Total Lifetime Expense" (The Spending Counter)
This is the measure of consumption. It is an ever-growing counter that never resets.
* **Definition:** The cumulative total value of your personal share in every expense you have ever been part of.
* **The Math:** `Sum of (Your Calculated Share Amount) for every expense record in history.`
* **Why:** This is the honest number of what life has cost you, regardless of who paid the bill at the time.

### B. The Three Types of "Net Balance"
"Net Balance" means different things depending on the context.

#### 1. Local Group Net Balance (Scope: One specific group)
* **Context:** Inside a group page (e.g., "Murree Trip").
* **The Math:** `(Total Cash You Paid in this Group) - (Your Total Share in this Group)`
* **Use Case:** Shows if you are up or down *on this specific adventure*.

#### 2. Friend-Specific (Bilateral) Net Balance (Scope: Two people)
* **Context:** The main "Friends" list and Friend Detail page.
* **The Math:** `(Total amount they owe YOU globally) - (Total amount you owe THEM globally)`
* **Use Case:** The "Real World" debt. This is the number you pay to settle up completely.

#### 3. Global Overall Net Balance (Scope: The User)
* **Context:** Main Dashboard summary.
* **The Math:** `(Sum of ALL money you paid globally) - (Sum of ALL your shares globally)`
* **Use Case:** A high-level health check. Is everyone owing you, or do you owe everyone?

---

## 3. View Hierarchy: What Data Goes Where?

### VIEW: Main Dashboard (Home Screen)
Two primary stats cards to give the complete picture.

* **Card 1: "My Total Lifetime Expense"**
    * *Data Source:* Definition 2A (Cumulative Share).
    * *Purpose:* The "cool", big, ever-growing number showing total consumption.
* **Card 2: "Overall Net Balance"**
    * *Data Source:* Definition 2B.3 (Global Overall).
    * *Style:* If Negative (Red), prominent highlight. "Spending you haven't paid for yet."

### VIEW: Group Page (Local Context)
* **Each Member Card:** Shows **Local Group Net Balance** (Def 2B.1).
* **Group Stat:** "Top Spender" (See section 5 below).

### VIEW: Friend Detail Page (Global Context)
* **Hero Section:** Big number showing **Friend-Specific Net Balance** (Def 2B.2).
* **Action Button:** "Settle Up Globally".
* **Transaction History:** See section 4 below.

---

## 4. Transaction History Logic (Simplified View)

The history feed on a Friend Detail page shows the "proof" of debt. It is viewed from the perspective of the logged-in user (**YOU**). It shows the *net impact* of an event, not the full event details.

### A. Expense Impact Events
*Happens automatically when an expense is saved in a group.*

* 🔴 **Red Text (-): You Borrowed.** Someone else covered your share.
    * *Format:* `[Icon] - [Your Share Amount] for [Expense Name] in [Group Name]`.
* 🟢 **Green Text (+): You Lent.** You paid more than your share, covering others.
    * *Format:* `[Icon] + [Amount You Covered] for [Expense Name] in [Group Name]`.

### B. Settlement Events
*Happens when the "Settle" button is used.*

* 🔴 **Red Text (-): Money Out.** You paid cash to settle debt.
    * *Format:* `💸 - [Amount] paid to [Friend Name]`.
* 🟢 **Green Text (+): Money In.** You received cash to settle debt.
    * *Format:* `💰 + [Amount] received from [Friend Name]`.

---

## 5. Bonus Logic: "Top Spender" (Group Context)

Who carried the financial burden during a trip?

* **Definition:** The person who physically paid the most cash out of pocket for group activities.
* **The Math:** For a specific group ID, sum the "Cash Paid" amount for every user. The user with the highest sum wins.
* *Note:* Their personal share doesn't matter for this metric. It's just about who swiped the card the most.