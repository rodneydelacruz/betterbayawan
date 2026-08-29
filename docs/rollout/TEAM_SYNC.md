# LGU Synchronization Protocol

**LGU Name:** City of Bayawan, Negros Oriental
**Last Sync Date:** 2026-02-03

## Roles & Responsibilities

### 1. Developer Team (Code Maintainers)

- **Lead Maintainer:** Ramon Logan Jr. (ramonloganjr) - Responsible for merge requests and deployment.
- **Frontend Dev:** [Name] - Responsible for UI/UX and Accessibility updates.

### 2. Data Custodians (Source of Truth)

- **Designation:** Municipal Planning & Development Coordinator (MPDC)
- **Responsibility:** Provides the raw CSV/Excel files for the Citizen's Charter and Annual Budget.
- **Contact Protocol:** Email submission by the 5th of every month.

### 3. Content Approvers (Gatekeepers)

- **Designation:** Information Officer / Mayor's Chief of Staff
- **Responsibility:** Verifies that the data on the staging site matches the official hard copies before production deployment.

---

## Emergency Information Verification

The following hotlines must be verified monthly against official LGU records:

| Service                 | Number                                   | Source                  |
| ----------------------- | ---------------------------------------- | ----------------------- |
| Police (PNP)            | 0927 144 1875 / 0998 598 7514 / 0998 598 7515 | bayawancity.gov.ph |
| Fire (BFP)              | (035) 527-2567 / 0955 817 3397 / 0917 846 0982 | bayawancity.gov.ph |
| NORECO                  | 0908 864 2365 / 0998 585 8326             | bayawancity.gov.ph |
| Coast Guard             | 0995 746 8679                             | bayawancity.gov.ph |
| Ambulance               | 0945 569 0083                             | bayawancity.gov.ph |
| City Hall (Mayor's Office) | (035) 531-0020 to 21, telefax (035) 430-0020 | bayawancity.gov.ph |
| MSWDO                   | Verify with LGU (unverified)              | Pending                 |
| DILG                    | Verify with LGU (unverified)              | Pending                 |
| MDRRMO                  | Verify with LGU (unverified)              | Pending                 |
| R2TMC                   | Verify with LGU (unverified)              | Pending                 |

**Last Verified:** [DATE]

---

## Data Sync Schedule

### Officials Directory

- **Source:** LGU Bayawan City Human Resources / Election results
- **Frequency:** After every election cycle, or when appointments change
- **File to update:** `data/officials.json`
- **Approver:** Information Officer

### Service Directory (Citizen's Charter)

- **Source:** Citizen's Charter document from each department head
- **Frequency:** Annually, or when fees/requirements change
- **File to update:** `data/services.json`
- **Approver:** MPDC

### Legislative Data (Ordinances & Resolutions)

- **Source:** Sangguniang Panlungsod records
- **Frequency:** After each Sangguniang Panlungsod session
- **Files to update:** `data/ordinances.json`, `data/resolutions.json`
- **Approver:** SB Secretary

### Competitive Index

- **Source:** CMCI DTI Portal (cmci.dti.gov.ph)
- **Frequency:** Annually (after CMCI release, typically Q2)
- **File to update:** `data/competitive-index.json`
- **Approver:** Lead Maintainer

### DPWH Infrastructure Projects

- **Source:** DPWH Regional Office / data.gov.ph
- **Frequency:** Quarterly or after new project listings
- **File to update:** `data/dpwh-projects.json`
- **Approver:** Lead Maintainer

### Budget & Fiscal Transparency

- **Source:** BLGF portal (blgf.gov.ph), LGU Budget Officer
- **Frequency:** Annually (after budget approval) + quarterly updates
- **Files to update:** Budget section pages, `data/fiscal_transparency.json`
- **Approver:** Municipal Accountant / Budget Officer

### Demographics

- **Source:** Philippine Statistics Authority (PSA)
- **Frequency:** After census releases or official population updates
- **File to update:** `data/demographics.json`
- **Approver:** MPDC

---

## Pre-Deployment Sign-Off Checklist

- [ ] All emergency hotline numbers verified against official records
- [ ] Officials directory matches current elected/appointed officials
- [ ] Service fees and processing times verified with department heads
- [ ] Legislative data reflects latest SB sessions
- [ ] Budget/fiscal data matches official documents
- [ ] Lighthouse accessibility audit score >= 90
- [ ] Content reviewed by Information Officer
- [ ] Staging site approved by Content Approver

---

## Change Management Log

| Date       | Change                       | Verified By     |
| ---------- | ---------------------------- | --------------- |
| 2026-02-03 | Initial TEAM_SYNC.md created | Ramon Logan Jr. |
