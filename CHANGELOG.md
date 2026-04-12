# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
<!-- _No unreleased changes_ -->

## [0.2.0] - 2026-04-12
### Added
- Graph dots turn red on ping failure and return to normal color on recovery

### Changed
- Upgraded Electron 16 → 41, resolving all known CVEs
- Upgraded all dependencies: Bootstrap 5.1 → 5.3, Chart.js 3.6 → 4.4, FontAwesome 5 → 6, electron-updater 4 → 6, electron-builder 22 → 26
- Start button now shows "Running" while pings are active
- Log file path now uses `path.join()` — consistent across environments

### Fixed
- Status log capped at 500 entries to prevent unbounded memory growth on long runs

## [0.1.1] - 2022-04-07
### Security
- Updated packages for CVE-2021-44906

## [0.1.0] - 2022-11-24
### Initial Release

[0.2.0]: https://github.com/aosterwyk/Pingpal/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/aosterwyk/Pingpal/tree/v0.1.1
[0.1.0]: https://github.com/aosterwyk/Pingpal/tree/v0.1.0
[Unreleased]: https://github.com/aosterwyk/Pingpal/compare/v0.2.0...dev
