# Task Manager · Build with Femi

A responsive browser-based task manager and project showcase by
[Oluwafemi Olawumi Steven](https://github.com/Oluwafemi1x).

## Live site

[Open the Task Manager](https://oluwafemi1x.github.io/Task-Manager/)

## Task Manager features

- Add tasks with the button or Enter key.
- Search the current list instantly.
- Save and restore tasks privately with browser storage.
- Schedule in-session reminder alerts.
- Clear individual tasks or the full list.
- Persist the selected light or dark theme.
- Responsive and keyboard-accessible interface.

## Featured engineering work

The page also presents
[ProofThread](https://github.com/Oluwafemi1x/proofthread-telegram-bot), a privacy-first
decision and accountability ledger for Telegram groups built with Python, aiogram, PostgreSQL,
SQLAlchemy, Alembic, and Docker.

## Quality checks

```bash
python tests/validate_site.py
node --check script.js
```

GitHub Actions runs both checks on every push and pull request.

## Privacy

Task data remains in the visitor's browser `localStorage`. This static site does not send the task
list to a server.

