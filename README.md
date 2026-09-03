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

## Project portfolio

| Project | Status | Links |
|---|---|---|
| ProofThread Telegram Bot | Completed; hosting pending | [GitHub](https://github.com/Oluwafemi1x/proofthread-telegram-bot) |
| Pycoder URL Shortener | Live | [Live demo](https://oluwafemi1x.github.io/url-shortener/) · [GitHub](https://github.com/Oluwafemi1x/url-shortener) |
| FESOMI School Management System | Completed Windows desktop application | Demo and repository available on request |
| Task Manager | Live | [Live demo](https://oluwafemi1x.github.io/Task-Manager/) · [GitHub](https://github.com/Oluwafemi1x/Task-Manager) |

## Quality checks

```bash
python tests/validate_site.py
node --check script.js
```

GitHub Actions runs both checks on every push and pull request.

## Privacy

Task data remains in the visitor's browser `localStorage`. This static site does not send the task
list to a server.
