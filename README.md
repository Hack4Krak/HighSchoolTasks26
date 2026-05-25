# 🎓 High School Tasks 26

Tasks for the 3rd edition of Hack4Krak CTF!

## Documentation

You can read about how to configure each task in [STRUCTURE.md](docs/STRUCTURE.md).\
Each task must be properly tested before submission - both manually and by writing automated tests, as described in [TESTING.md](docs/TESTING.md).

And if your name begins with `N` and ends with `orbiros`, and you are responsible for deploying tasks, check out [DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Architecture
- [tasks/](tasks/) - configuration for all tasks
- [config/](config/) - configuration for the specific CTF event
- [toolbox/](toolbox/) - our custom CLI for working with this repository
- [docs/](docs/) - documentation

## Development
*Required only for running Hack4Krak Toolbox*

### 1. Download all required dependencies
```shell
uv sync
```

### 2. Run CLI
```shell
uv run toolbox 
```
